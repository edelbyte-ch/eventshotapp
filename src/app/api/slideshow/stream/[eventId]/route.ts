import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { activeScreensWhere, screenLimit } from '@/lib/slideshow-screens'

/** Haelt die Verbindung warm und deckt tote Sockets auf. */
const HEARTBEAT_INTERVAL = 20_000

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await context.params

  const clientId = req.nextUrl.searchParams.get('clientId')
  if (!clientId) {
    return new Response('Missing clientId', { status: 400 })
  }

  /* ----------------------------------
     Event + Plan
  ---------------------------------- */
  // Diese Route liegt unter /api und wird vom Proxy-Matcher ('/tenant/:path*')
  // nicht erfasst — sie war strukturell unbewacht. Der Platzzaehler haengt
  // allein an einer frei waehlbaren clientId, und bei BASIC ist genau ein
  // Platz vorhanden: ein Fremder mit der oeffentlichen eventId belegte ihn und
  // die Leinwand der bezahlenden Hochzeit bekam den Abend lang 403.
  //
  // Kein Session-Zwang: der Beamer laeuft die Nacht durch, eine ablaufende
  // Session risse den Stream mitten im Fest ab. Der publicCode des Events ist
  // der richtige Schluessel — er steht nicht auf der Tischkarte.
  const code = req.nextUrl.searchParams.get('code')

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { plan: true, publicCode: true, isActive: true },
  })

  if (!event || !event.isActive || !code || code !== event.publicCode) {
    return new Response('Event not found', { status: 404 })
  }

  const SCREEN_LIMIT = screenLimit(event.plan)
  const userAgent = req.headers.get('user-agent')?.slice(0, 300) ?? null

  /* ----------------------------------
     Atomic Session Handling
  ---------------------------------- */
  let sessionId: string

  try {
    const session = await prisma.$transaction(async (tx) => {
      // 🔁 remove old session from same client (reload safe)
      await tx.slideshowSession.deleteMany({
        where: { eventId, clientId },
      })

      const activeScreens = await tx.slideshowSession.count({
        where: activeScreensWhere(eventId),
      })

      if (activeScreens >= SCREEN_LIMIT) {
        throw new Error('SCREEN_LIMIT')
      }

      return tx.slideshowSession.create({
        data: {
          eventId,
          clientId,
          plan: event.plan,
          lastPing: new Date(),
          userAgent,
        },
      })
    })

    sessionId = session.id
  } catch (err) {
    if ((err as Error).message === 'SCREEN_LIMIT') {
      return new Response('Screen limit reached', { status: 403 })
    }
    throw err
  }

  /* ----------------------------------
     SSE Stream
  ---------------------------------- */
  // alive/closed/heartbeat stehen ausserhalb von start(), damit cancel() sie
  // erreicht. Vorher lebten sie in der start()-Closure: bei einem
  // Verbindungsabbruch loeschte cancel() nur die Sitzungszeile, waehrend die
  // while-Schleife weiter alle zwei Sekunden die Datenbank abfragte — jede
  // abgebrochene Beamer-Verbindung hinterliess einen Poller auf Dauer.
  let alive = true
  let closed = false
  let heartbeat: ReturnType<typeof setInterval> | null = null

  const stopStream = () => {
    alive = false
    closed = true
    if (heartbeat) clearInterval(heartbeat)
    heartbeat = null
  }

  // Geister-Screens: Schloss der Kunde den Beamer-Tab, rief Node cancel()
  // nicht zuverlaessig auf. Der Heartbeat lief weiter, frischte lastPing
  // alle 20 s auf und hielt den einzigen BASIC-Platz bis zum naechsten
  // Container-Neustart besetzt ("Screen bereits aktiv"). Deshalb zwei
  // unabhaengige Wege, den Abbruch zu bemerken: das Abort-Signal der Anfrage
  // und ein Schreibversuch bei jedem Heartbeat.
  const beenden = () => {
    if (closed && !alive) return
    stopStream()
    prisma.slideshowSession
      .deleteMany({ where: { id: sessionId } })
      .catch(() => {})
  }
  req.signal.addEventListener('abort', beenden, { once: true })

  const stream = new ReadableStream({
    async start(controller) {
      let lastUpdate = new Date(0)

      const send = (data: any) => {
        if (closed) return
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
        } catch {
          closed = true
        }
      }

      /* ---------- Heartbeat ---------- */
      heartbeat = setInterval(async () => {
        if (!alive || req.signal.aborted) return beenden()

        // SSE-Kommentar: der Browser ignoriert ihn, aber ein toter Socket
        // wirft hier. lastPing frischt dagegen nur der Browser selbst auf
        // (/api/slideshow/ping) — siehe lib/slideshow-screens.ts.
        try {
          controller.enqueue(': ping\n\n')
        } catch {
          beenden()
        }
      }, HEARTBEAT_INTERVAL)

      try {
        while (alive) {
          const [evt, sitzung] = await Promise.all([
            prisma.event.findUnique({
              where: { id: eventId },
              select: { photosUpdatedAt: true },
            }),
            prisma.slideshowSession.findUnique({
              where: { id: sessionId },
              select: { endedAt: true },
            }),
          ])

          if (req.signal.aborted) break

          // In den Einstellungen beendet (oder von aussen abgeraeumt): dem
          // Screen Bescheid geben, damit er nicht sofort neu verbindet.
          if (!sitzung || sitzung.endedAt) {
            send({ type: 'ended' })
            break
          }

          if (evt?.photosUpdatedAt && evt.photosUpdatedAt > lastUpdate) {
            lastUpdate = evt.photosUpdatedAt
            send({ type: 'photos-updated' })
          }

          await new Promise((r) => setTimeout(r, 2000))
        }
      } catch (err) {
        console.error('[SSE] stream error', err)
      } finally {
        stopStream()

        await prisma.slideshowSession
          .deleteMany({ where: { id: sessionId } })
          .catch(() => {})
      }
    },

    cancel() {
      beenden()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
