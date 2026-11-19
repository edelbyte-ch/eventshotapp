'use server'

import { requireOwnedEventAction } from '@/lib/auth-guard'
import prisma from '@/lib/prisma'
import {
  activeScreensWhere,
  describeDevice,
  screenLimit,
} from '@/lib/slideshow-screens'

export type ActiveScreen = {
  id: string
  device: string
  since: string
  lastPing: string
}

/** Belegte Screen-Plaetze eines Events, fuer die Karte "Aktive Screens". */
export async function getActiveScreens(eventId: string) {
  const guard = await requireOwnedEventAction(eventId, { plan: true })
  if (!guard.ok) {
    return { success: false as const, message: guard.message }
  }

  const rows = await prisma.slideshowSession.findMany({
    where: activeScreensWhere(eventId),
    orderBy: { createdAt: 'asc' },
    select: { id: true, userAgent: true, createdAt: true, lastPing: true },
  })

  const limit = screenLimit(guard.event.plan)
  return {
    success: true as const,
    limit: limit === Number.MAX_SAFE_INTEGER ? null : limit,
    screens: rows.map(
      (r): ActiveScreen => ({
        id: r.id,
        device: describeDevice(r.userAgent),
        since: r.createdAt.toISOString(),
        lastPing: r.lastPing.toISOString(),
      }),
    ),
  }
}

/**
 * Beendet einen Screen (sessionId) oder alle Screens des Events. Der Platz ist
 * sofort frei; ein noch laufender Screen bekommt "ended" und zeigt einen
 * Hinweis statt sich den Platz zurueckzuholen.
 */
export async function endScreens(eventId: string, sessionId?: string) {
  const guard = await requireOwnedEventAction(eventId, { id: true })
  if (!guard.ok) {
    return { success: false as const, message: guard.message }
  }

  const { count } = await prisma.slideshowSession.updateMany({
    where: { eventId, endedAt: null, ...(sessionId ? { id: sessionId } : {}) },
    data: { endedAt: new Date() },
  })

  return { success: true as const, count }
}
