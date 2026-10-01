/**
 * Foto-Obergrenze pro Event, je nach Plan. Die einzige Quelle dafuer:
 * Preiskarten, Buchung und Upload-Pruefung lesen alle von hier.
 *
 * null = unbegrenzt — dieselbe Konvention wie Event.uploadLimit. Kein
 * Infinity und keine 999999: die Spalte kann Infinity nicht speichern, und
 * eine grosse Zahl stuende frueher oder spaeter als "12 von 999999 Fotos"
 * auf einer Karte.
 *
 * Der Wert wird beim Anlegen ins Event geschrieben, wie der Preis-Snapshot.
 * Events von vor der Einfuehrung (01.10.2026) wurden mit "unbegrenzte
 * Foto-Uploads" verkauft und behalten uploadLimit = null. Eine Aenderung
 * hier trifft deshalb nie eine bereits gebuchte Feier, nur kuenftige.
 *
 * Bewusst ohne server-only: die Preiskarten im Browser brauchen die Zahlen.
 */

import { PLANS, type PlanId } from '@/lib/pricing'

export const PLAN_PHOTO_LIMITS: Record<PlanId, number | null> = {
  BASIC: 250,
  PREMIUM: 1000,
  ENTERPRISE: null,
}

/**
 * Was gegen die Grenze zaehlt: alles ausser `failed`. Ein Bild, das die
 * Verarbeitung nicht ueberstanden hat, sieht niemand je — die Galerie zeigt
 * nur `ready`. Es darf keinen Platz belegen.
 *
 * Pruefung und Anzeige muessen genau diesen Filter nehmen, sonst steht im
 * Dashboard eine andere Zahl als die, an der der Upload tatsaechlich stoppt.
 */
export const COUNTED_PHOTOS = { status: { not: 'failed' } }

export function isPhotoLimitReached(
  used: number,
  limit: number | null,
): boolean {
  return limit !== null && used >= limit
}

/** Freie Plaetze; null = unbegrenzt. Nie negativ, auch bei Altbestand drueber. */
export function remainingPhotos(
  used: number,
  limit: number | null,
): number | null {
  return limit === null ? null : Math.max(0, limit - used)
}

/** 1000 → "1'000", wie Zahlen auf der Website seit jeher stehen. */
export function formatPhotoCount(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

/** Zeile fuer Preiskarten und Vergleichstabelle. */
export function photoLimitLabel(plan: PlanId): string {
  const limit = PLAN_PHOTO_LIMITS[plan]
  return limit === null
    ? 'Unbegrenzte Foto-Uploads'
    : `Bis ${formatPhotoCount(limit)} Fotos pro Event`
}

/** Fuer Fliesstext: "bis 250 Fotos" bzw. "unbegrenzt viele Fotos". */
export function photoLimitPhrase(plan: PlanId): string {
  const limit = PLAN_PHOTO_LIMITS[plan]
  return limit === null
    ? 'unbegrenzt viele Fotos'
    : `bis ${formatPhotoCount(limit)} Fotos`
}

/** Alle Pakete in einem Satzteil: "bis 250, bis 1'000 oder unbegrenzt viele Fotos". */
export function photoLimitRange(): string {
  const teile = PLANS.map((plan) => {
    const limit = PLAN_PHOTO_LIMITS[plan]
    return limit === null ? 'unbegrenzt viele' : `bis ${formatPhotoCount(limit)}`
  })
  return `${teile.slice(0, -1).join(', ')} oder ${teile.at(-1)} Fotos`
}

/**
 * Absage, wenn das Event voll ist. Geht an Gaeste — deshalb ohne Hinweis auf
 * Pakete oder Preise; das Upgrade ist Sache des Veranstalters.
 */
export function photoLimitReachedMessage(
  limit: number,
  isDemo: boolean,
): string {
  return `Dieses ${isDemo ? 'Demo-Event' : 'Event'} ist auf ${formatPhotoCount(limit)} Fotos begrenzt und voll.`
}
