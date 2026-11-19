import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * Lebenszeichen des Screens. Nur dieser Aufruf haelt einen Platz besetzt:
 * kommt er nicht mehr an (Tab zu, Geraet aus, Firewall dazwischen), ist der
 * Platz nach SESSION_TIMEOUT frei — egal, ob der Server die SSE-Verbindung
 * noch fuer offen haelt.
 */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await context.params
  const code = req.nextUrl.searchParams.get('code')
  const clientId = req.nextUrl.searchParams.get('clientId')
  if (!code || !clientId) {
    return new Response('Bad request', { status: 400 })
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { publicCode: true, isActive: true },
  })
  if (!event || !event.isActive || code !== event.publicCode) {
    return new Response('Not found', { status: 404 })
  }

  const { count } = await prisma.slideshowSession.updateMany({
    where: { eventId, clientId, endedAt: null },
    data: { lastPing: new Date() },
  })

  return Response.json(
    { ok: count > 0 },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
