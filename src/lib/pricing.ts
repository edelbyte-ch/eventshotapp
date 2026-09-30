/**
 * Die einzige Preisquelle von EventShot.
 *
 * Alle Betraege in Rappen (ganze Zahlen). Vorher standen die Preise doppelt:
 * als Zahl in lib/stripe.ts (fuer den Checkout) und als fertiger Text
 * ("CHF 49.-") in lib/constants.ts (fuer die Karten). Eine Preisaenderung an
 * nur einer Stelle haette die Website etwas anderes versprechen lassen, als
 * Stripe abbucht.
 *
 * Bewusst ohne Import von `stripe`: die Datei wird auch im Browser gebraucht
 * (Preiskarten, Vorschau im Buchungsdialog).
 */

export const PLANS = ['BASIC', 'PREMIUM', 'ENTERPRISE'] as const
export type PlanId = (typeof PLANS)[number]

export const PLAN_PRICES: Record<PlanId, number> = {
  BASIC: 4900,
  PREMIUM: 9900,
  ENTERPRISE: 14900,
}

export const CURRENCY = 'chf'

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === 'string' && (PLANS as readonly string[]).includes(value)
}

/**
 * Rappen als CHF-Text, ohne Umweg ueber Fliesskommazahlen.
 *
 * - `exact`  → "CHF 39.20", "CHF 99.00" (Zusammenfassung, Rechnung)
 * - `list`   → "CHF 49.-" bei glatten Betraegen, sonst wie `exact`
 *              (so stehen die Preise seit jeher auf der Website)
 */
export function formatChf(
  rappen: number,
  style: 'exact' | 'list' = 'exact',
): string {
  const negative = rappen < 0
  const abs = Math.abs(Math.round(rappen))
  const franken = Math.floor(abs / 100)
  const rest = abs % 100
  const body =
    style === 'list' && rest === 0
      ? `${franken}.-`
      : `${franken}.${String(rest).padStart(2, '0')}`
  return `${negative ? '− ' : ''}CHF ${body}`
}
