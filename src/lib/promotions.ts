import { CURRENCY, PLAN_PRICES, type PlanId } from '@/lib/pricing'

/**
 * Saisonale Aktionen – zentral definiert, von Website, Buchungsdialog,
 * Checkout und Webhook gleichermassen benutzt.
 *
 * Massgeblich ist immer das EVENTDATUM, nicht das Buchungsdatum: Wer im
 * Oktober fuer den 19. Dezember bucht, bekommt die Winteraktion; wer im
 * Dezember fuer Februar bucht, nicht.
 *
 * Das Eventdatum ist ein reines Kalenderdatum ohne Uhrzeit ("2027-01-01").
 * Es wird deshalb nie ueber `new Date()` gedreht: ein UTC-Zeitstempel wird
 * je nach Zeitzone zum 31.12. und kostete den Kunden den Rabatt.
 *
 * Die Datei ist bewusst frei von Server-Abhaengigkeiten: der Browser rechnet
 * damit die Vorschau, der Server rechnet denselben Code noch einmal nach und
 * vertraut der Vorschau nicht.
 */

export type Promotion = {
  id: string
  name: string
  /** Weitere Arten (z. B. Fixbetrag) erst einfuehren, wenn eine Aktion sie braucht. */
  discountType: 'percentage'
  /** Prozent, ganzzahlig. */
  discountValue: number
  /** 1 = Januar … 12 = Dezember */
  eligibleEventMonths: readonly number[]
  /** Optionaler Eventzeitraum, inklusiv, "yyyy-MM-dd". */
  eventDateFrom?: string
  eventDateTo?: string
  /** Optionaler Buchungszeitraum (Datum in Europe/Zurich), inklusiv. */
  bookingFrom?: string
  bookingTo?: string
  enabled: boolean
}

export const PROMOTIONS: readonly Promotion[] = [
  {
    id: 'winter-2026',
    name: 'Winteraktion',
    discountType: 'percentage',
    discountValue: 20,
    eligibleEventMonths: [12, 1],
    // Auf die Saison 2026/27 begrenzt: ohne Jahresgrenze bekaeme auch ein
    // Event im Dezember 2027 die Aktion, das im Januar 2027 gebucht wird.
    eventDateFrom: '2026-12-01',
    eventDateTo: '2027-01-31',
    // Gebucht werden kann bis zum letzten Aktionstag. Danach verschwinden
    // Hinweise und Preise auf der Website automatisch.
    bookingTo: '2027-01-31',
    enabled: true,
  },
]

// ---------------------------------------------------------------------------
// Datum
// ---------------------------------------------------------------------------

export type EventDate = { year: number; month: number; day: number; iso: string }

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * "yyyy-MM-dd" → Kalenderdatum. Alles andere (Zeitstempel, "2026-02-30")
 * ergibt null. Absichtlich streng: der Server bekommt das Datum als Text aus
 * dem Formular und soll nicht raten.
 */
export function parseEventDate(value: unknown): EventDate | null {
  if (typeof value !== 'string') return null
  const match = ISO_DATE.exec(value.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  if (month < 1 || month > 12 || day < 1) return null
  // Tage im Monat ueber UTC, damit keine lokale Zeitzone hineinspielt.
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  if (day > daysInMonth) return null
  return { year, month, day, iso: `${match[1]}-${match[2]}-${match[3]}` }
}

/** Heutiges Datum in der Schweiz als "yyyy-MM-dd" – fuer den Buchungszeitraum. */
export function todayInZurich(now: Date = new Date()): string {
  // en-CA liefert von sich aus yyyy-MM-dd.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

// ---------------------------------------------------------------------------
// Aktionen
// ---------------------------------------------------------------------------

function isBookable(promotion: Promotion, today: string): boolean {
  if (!promotion.enabled) return false
  if (promotion.bookingFrom && today < promotion.bookingFrom) return false
  if (promotion.bookingTo && today > promotion.bookingTo) return false
  return true
}

/** Die Aktion, die heute gebucht werden kann – oder null. */
export function getActivePromotion(now: Date = new Date()): Promotion | null {
  const today = todayInZurich(now)
  return PROMOTIONS.find((p) => isBookable(p, today)) ?? null
}

/**
 * Nach ID, ohne Buchungszeitraum. Fuer den Webhook: eine Session, die am
 * letzten Aktionstag um 23:55 eroeffnet und um 00:05 bezahlt wurde, hat die
 * Aktion zu Recht.
 */
export function getPromotionById(id: string | null | undefined): Promotion | null {
  if (!id) return null
  return PROMOTIONS.find((p) => p.id === id) ?? null
}

/** Faellt das Eventdatum in die Aktion? Rein kalendarisch, ohne Zeitzone. */
export function isPromotionEligible(
  promotion: Promotion | null,
  eventDate: EventDate | null,
): boolean {
  if (!promotion || !eventDate) return false
  if (!promotion.eligibleEventMonths.includes(eventDate.month)) return false
  if (promotion.eventDateFrom && eventDate.iso < promotion.eventDateFrom) return false
  if (promotion.eventDateTo && eventDate.iso > promotion.eventDateTo) return false
  return true
}

/** Rabatt in Rappen, auf den Rappen gerundet. Ganzzahlig, ohne Fliesskomma-Rest. */
export function calculateDiscount(regularPrice: number, promotion: Promotion): number {
  return Math.round((regularPrice * promotion.discountValue) / 100)
}

export function calculateFinalPrice(regularPrice: number, promotion: Promotion | null): number {
  return promotion ? regularPrice - calculateDiscount(regularPrice, promotion) : regularPrice
}

// ---------------------------------------------------------------------------
// Preisberechnung
// ---------------------------------------------------------------------------

export type PriceQuote = {
  plan: PlanId
  eventDate: string
  currency: typeof CURRENCY
  regularPrice: number
  discountPercent: number
  discountAmount: number
  finalPrice: number
  promotion: { id: string; name: string } | null
}

/**
 * Der Preis fuer ein Paket an einem Eventdatum.
 *
 * `promotion` steuert, welche Aktion in Frage kommt:
 * - weggelassen → die heute buchbare (`getActivePromotion(now)`)
 * - explizit    → genau diese (Webhook: die Aktion aus der Session)
 */
export function quotePrice(
  plan: PlanId,
  eventDate: EventDate,
  options: { now?: Date; promotion?: Promotion | null } = {},
): PriceQuote {
  const candidate =
    options.promotion !== undefined ? options.promotion : getActivePromotion(options.now)
  const promotion = isPromotionEligible(candidate, eventDate) ? candidate : null
  const regularPrice = PLAN_PRICES[plan]
  const discountAmount = promotion ? calculateDiscount(regularPrice, promotion) : 0

  return {
    plan,
    eventDate: eventDate.iso,
    currency: CURRENCY,
    regularPrice,
    discountPercent: promotion ? promotion.discountValue : 0,
    discountAmount,
    finalPrice: regularPrice - discountAmount,
    promotion: promotion ? { id: promotion.id, name: promotion.name } : null,
  }
}

// ---------------------------------------------------------------------------
// Texte
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

const MONTH_SHORT = [
  'Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni',
  'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.',
]

/** "Dezember & Januar" (bzw. "Dez. & Jan.") – in der Reihenfolge der Definition. */
export function promotionMonthsLabel(
  promotion: Promotion,
  style: 'long' | 'short' = 'long',
): string {
  const list = style === 'short' ? MONTH_SHORT : MONTH_NAMES
  const names = promotion.eligibleEventMonths.map((m) => list[m - 1])
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
}

/** "20 %" mit geschuetztem Leerzeichen, damit es nie umbricht. */
export function promotionPercentLabel(promotion: Promotion): string {
  return `${promotion.discountValue} %`
}
