/**
 * Betriebszustand eines Events fuer Dashboard und Event-Kopf.
 *
 * - `live`      — aktiv, der Eventtag ist heute
 * - `scheduled` — aktiv, der Eventtag liegt in der Zukunft
 * - `ended`     — der Eventtag ist vorbei
 * - `stopped`   — vom Betreiber deaktiviert
 *
 * Das Eventdatum ist ein reines Kalenderdatum (@db.Date, Mitternacht UTC).
 * Verglichen wird deshalb als Text "JJJJ-MM-TT" gegen den heutigen Tag in
 * Zuerich — nicht ueber Date-Objekte, sonst kippt der Status um Mitternacht
 * je nach Server-Zeitzone einen Tag zu frueh oder zu spaet.
 *
 * Wird auf dem Server berechnet und als Wert weitergereicht, damit Server und
 * Browser nie verschiedene Zustaende anzeigen.
 */
export type EventState = 'live' | 'scheduled' | 'ended' | 'stopped'

export const EVENT_STATE_LABEL: Record<EventState, string> = {
  live: 'Läuft heute',
  scheduled: 'Geplant',
  ended: 'Vorbei',
  stopped: 'Deaktiviert',
}

export const PLAN_LABEL: Record<string, string> = {
  BASIC: 'Basic',
  PREMIUM: 'Premium',
  ENTERPRISE: 'Enterprise',
}

export function todayInZurich(now = new Date()): string {
  // en-CA formatiert als JJJJ-MM-TT.
  return now.toLocaleDateString('en-CA', { timeZone: 'Europe/Zurich' })
}

export function eventDay(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function getEventState(
  event: { isActive: boolean; date: Date },
  today = todayInZurich(),
): EventState {
  if (!event.isActive) return 'stopped'
  const day = eventDay(event.date)
  if (day === today) return 'live'
  return day > today ? 'scheduled' : 'ended'
}

/** Kalenderdatum ohne Zeitzonen-Verschiebung, z. B. "20.11.2026". */
export function formatEventDate(date: Date): string {
  const [y, m, d] = eventDay(date).split('-')
  return `${Number(d)}.${Number(m)}.${y}`
}
