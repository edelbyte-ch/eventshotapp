import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { activeScreensWhere, screenLimit } from '@/lib/slideshow-screens'

/**
 * Billige Auskunft: ist noch ein Screen-Platz frei?
 *
 * Der Beamer fragte das bisher, indem er den SSE-Endpunkt selbst noch einmal
 * per fetch aufrief — und legte damit bei jedem Netzwackler eine zweite
 * Sitzung samt Heartbeat und Poll-Schleife an, deren Antwortkoerper niemand
 * je las. Diese Route legt nichts an und streamt nichts; sie zaehlt nur.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await context.params
  const code = req.nextUrl.searchParams.get('code')
  const clientId = req.nextUrl.searchParams.get('clientId')

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { plan: true, publicCode: true, isActive: true },
  })

  if (!event || !event.isActive || !code || code !== event.publicCode) {
    return new Response('Not found', { status: 404 })
  }

  const limit = screenLimit(event.plan)

  // Die eigene, vielleicht noch nicht abgeraeumte Sitzung nicht mitzaehlen —
  // sonst meldet der Beamer sich selbst als Blockierer.
  const active = await prisma.slideshowSession.count({
    where: {
      ...activeScreensWhere(eventId),
      ...(clientId ? { clientId: { not: clientId } } : {}),
    },
  })

  return Response.json({ blocked: active >= limit }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
