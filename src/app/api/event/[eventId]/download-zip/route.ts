import { GetObjectCommand } from '@aws-sdk/client-s3'
import archiver from 'archiver'
import { PassThrough, type Readable } from 'stream'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'

function sanitizeFilename(name: string) {
  return name.replace(/[\/\\]/g, '_').replace(/[^\w.\-]+/g, '_')
}

function buildFilename(photo: {
  originalName: string
  mimeType: string
  createdAt: Date
}) {
  if (photo.originalName?.trim()) {
    return sanitizeFilename(photo.originalName)
  }

  const ext = photo.mimeType?.split('/')[1] ?? 'jpg'
  return `photo_${photo.createdAt.getTime()}.${ext}`
}

/**
 * Drossel pro IP und Event.
 *
 * Eine einzige Anfrage stoesst bis zu 5000 GetObject-Aufrufe an und streamt
 * die komplette Galerie aus dem Objektspeicher. Ohne Bremse genuegen zwanzig
 * parallele Verbindungen, um Egress- und Requestkosten zu vervielfachen.
 *
 * Gezaehlt wird pro IP, nicht pro Event: nach dem Fest druecken vierzig Gaeste
 * gleichzeitig auf den Knopf, jeder aus einem anderen Netz. Eine Bremse pro
 * Event haette genau diese vierzig gegenseitig ausgesperrt.
 *
 * Im Speicher gehalten, nicht in der Datenbank: die Bremse muss billiger sein
 * als das, wovor sie schuetzt. Nach einem Neustart ist sie leer — das ist der
 * Preis und fuer diesen Zweck vertretbar.
 */
const FENSTER_MS = 60_000
const MAX_PRO_FENSTER = 3
const letzteZugriffe = new Map<string, number[]>()

function zuVieleAnfragen(schluessel: string) {
  const jetzt = Date.now()
  const bisher = (letzteZugriffe.get(schluessel) ?? []).filter(
    (t) => jetzt - t < FENSTER_MS,
  )
  if (bisher.length >= MAX_PRO_FENSTER) {
    letzteZugriffe.set(schluessel, bisher)
    return true
  }
  bisher.push(jetzt)
  letzteZugriffe.set(schluessel, bisher)

  // Die Map darf nicht unbegrenzt wachsen.
  if (letzteZugriffe.size > 5000) {
    for (const [k, v] of letzteZugriffe) {
      if (!v.some((t) => jetzt - t < FENSTER_MS)) letzteZugriffe.delete(k)
    }
  }
  return false
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unbekannt'
  if (zuVieleAnfragen(`${ip}:${eventId}`)) {
    return new Response('Zu viele Anfragen. Bitte kurz warten.', {
      status: 429,
      headers: { 'Retry-After': '60' },
    })
  }

  // Bleibt bewusst ohne Anmeldung: der Knopf steht in der Gaeste-Galerie, und
  // die Gaeste haben kein Konto. Was fehlte, waren die Filter — das Archiv
  // enthielt jedes Foto der Tabelle, auch aussortierte, auch aus einem
  // abgeschalteten Event. Die Galerie zeigt nur approved + ready; das ZIP
  // muss dieselbe Auswahl liefern, sonst gibt es spaeter genau die Bilder
  // heraus, die jemand bewusst nicht freigegeben hat.
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      name: true,
      isActive: true,
      photos: {
        where: { approved: true, status: 'ready' },
        select: {
          objectKey: true,
          originalName: true,
          mimeType: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!event || !event.isActive) {
    return new Response('Event not found', { status: 404 })
  }

  if (event.photos.length === 0) {
    return new Response('No photos', { status: 404 })
  }

  // 🔒 Optionaler Schutz
  if (event.photos.length > 5000) {
    return new Response('Too many photos', { status: 413 })
  }

  const zipStream = new PassThrough()
  const archive = archiver('zip', {
    zlib: { level: 0 }, // 🚀 fastest – Bilder sind schon komprimiert
  })

  archive.pipe(zipStream)

  const controller = new AbortController()
  // Geoeffnete S3-Antworten. Wird ein Body nie zu Ende gelesen und nie
  // zerstoert, bleibt seine Socket fuer immer belegt — nach 50 solchen
  // (Pool-Limit des SDK) haengt JEDER weitere S3-Aufruf der App, inkl. des
  // naechtlichen Foto-Cleanups (so passiert bis 03.10.2026).
  let current: Readable | null = null

  const stop = () => {
    controller.abort()
    current?.destroy()
    current = null
    archive.abort()
  }

  req.signal.addEventListener('abort', stop)

  const zipName = `EventShot_${event.name}.zip`

  const response = new Response(zipStream as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(
        zipName,
      )}`,
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  })

  // 🔁 ZIP asynchron füllen (Streaming!)
  // Strikt nacheinander: archiver liest seine Eintraege ohnehin seriell. Wer
  // vorab weitere GetObjects oeffnet (frueher pLimit(6) — das begrenzte nur
  // das Oeffnen, nicht das Lesen), parkt deren Sockets in der Warteschlange.
  // So belegt ein Download hoechstens eine Socket gleichzeitig.
  ;(async () => {
    try {
      for (const photo of event.photos) {
        if (controller.signal.aborted) return

        const obj = await s3.send(
          new GetObjectCommand({
            Bucket: process.env.S3_BUCKET as string,
            Key: photo.objectKey,
          }),
          { abortSignal: controller.signal },
        )
        if (!obj.Body) continue

        const body = obj.Body as Readable
        current = body
        const consumed = new Promise<void>((resolve, reject) => {
          body.once('end', resolve)
          body.once('close', resolve)
          body.once('error', reject)
        })
        archive.append(body, { name: buildFilename(photo) })
        await consumed
        current = null
      }
      await archive.finalize()
    } catch {
      stop()
    }
  })()

  return response
}
