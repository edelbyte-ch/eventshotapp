'use server'

import { requireTenantAction } from '@/lib/auth-guard'
import { formatChf, isPlanId } from '@/lib/pricing'
import { parseEventDate, quotePrice } from '@/lib/promotions'
import { getStripe } from '@/lib/stripe'

/** Metadaten-Schluessel des Preis-Snapshots – gelesen im Webhook. */
export type CheckoutPriceMetadata = {
  regularPrice: string
  discountPercent: string
  discountAmount: string
  finalPrice: string
  promotionId: string
  promotionName: string
  currency: string
}

/** Rueckkehr-URL mit Session-ID, damit die Erfolgsseite die Buchung kennt. */
function withSessionId(url: string) {
  return `${url}${url.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`
}

export async function createEventCheckout(data: {
  name: string
  location?: string
  description?: string
  date: string
  plan: string
  /**
   * Der Betrag, den der Kunde im Dialog gesehen hat. Wird NICHT zum
   * Abrechnen benutzt, nur verglichen: weicht er vom Serverpreis ab, bricht
   * der Checkout ab, statt still einen anderen Betrag zu verlangen.
   */
  expectedTotal?: number
}) {
  // Die tenantId kam bisher vom Client und wanderte unveraendert in die
  // Stripe-Metadaten — der Webhook legt das Event spaeter fuer genau diesen
  // Tenant an. Sie gehoert aus der Session, nicht aus dem Formular.
  const guard = await requireTenantAction()
  if (!guard.ok) {
    return { ok: false as const, message: guard.message }
  }

  // Ein unbekannter Plan ergaebe unit_amount undefined und damit einen
  // Stripe-Fehler mitten im Bezahlvorgang.
  if (!isPlanId(data.plan)) {
    return { ok: false as const, message: 'Unbekanntes Paket.' }
  }

  const name = String(data.name ?? '').trim()
  if (!name) {
    return { ok: false as const, message: 'Bitte gib einen Namen an.' }
  }

  // Reines Kalenderdatum: entscheidet ueber die Aktion und darf deshalb
  // nicht ueber einen Zeitstempel in einen anderen Monat rutschen.
  const eventDate = parseEventDate(data.date)
  if (!eventDate) {
    return { ok: false as const, message: 'Bitte gib ein gültiges Datum an.' }
  }

  // Preis ausschliesslich hier: Paket + Eventdatum + heute buchbare Aktion.
  const quote = quotePrice(data.plan, eventDate)

  if (
    typeof data.expectedTotal === 'number' &&
    data.expectedTotal !== quote.finalPrice
  ) {
    return {
      ok: false as const,
      message: `Der Preis wurde aktualisiert: ${formatChf(quote.finalPrice)}. Bitte prüfe die Zusammenfassung und versuche es erneut.`,
      // Damit der Dialog auf den Serverstand wechselt, statt beim naechsten
      // Versuch wieder denselben veralteten Betrag zu schicken.
      promotionId: quote.promotion?.id ?? null,
    }
  }

  const priceMetadata: CheckoutPriceMetadata = {
    regularPrice: String(quote.regularPrice),
    discountPercent: String(quote.discountPercent),
    discountAmount: String(quote.discountAmount),
    finalPrice: String(quote.finalPrice),
    promotionId: quote.promotion?.id ?? '',
    promotionName: quote.promotion?.name ?? '',
    currency: quote.currency,
  }

  const [y, m, d] = [eventDate.year, eventDate.month, eventDate.day]
  const datumText = `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`

  const stripe = getStripe() // 🔑 Runtime only

  // Aktion als serverseitig berechneter Betrag (price_data) statt Stripe-
  // Coupon: Stripe erlaubt `discounts` nicht zusammen mit
  // `allow_promotion_codes` — ein Coupon haette die bestehenden
  // Gutscheincodes (z. B. EVENTSHOT4FREE) fuer Winter-Events abgeschaltet.
  // Nachvollziehbar bleibt der Rabatt ueber Beschreibung und Metadaten.
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    // payment_method_types: ['card', 'twint', 'klarna'],
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: quote.currency,
          product_data: {
            name: `EventShot – ${data.plan}`,
            description: quote.promotion
              ? `Event am ${datumText} · ${quote.promotion.name} −${quote.discountPercent} % (regulär ${formatChf(quote.regularPrice)}, du sparst ${formatChf(quote.discountAmount)})`
              : `Event am ${datumText}`,
          },
          unit_amount: quote.finalPrice,
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: 'CREATE_EVENT',
      tenantId: String(guard.tenant.id),
      name,
      location: data.location ?? '',
      description: data.description ?? '',
      date: eventDate.iso,
      plan: data.plan,
      ...priceMetadata,
    },
    success_url: withSessionId(process.env.STRIPE_SUCCESS_URL!),
    cancel_url: process.env.STRIPE_CANCEL_URL!,
  })

  return { ok: true as const, url: session.url! }
}
