import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
import { getStripe } from '@/lib/stripe'
import { sendMail } from '@/lib/mailer'
import { generateInvoicePdf } from '@/lib/invoice-pdf'
import { saveInvoiceToMinio } from '@/lib/invoice-storage'
import { getNextInvoiceNumber } from '@/lib/invoice-number'
import { PLAN_PHOTO_LIMITS } from '@/lib/photo-limits'
import { CURRENCY, formatChf, isPlanId } from '@/lib/pricing'
import { getPromotionById, parseEventDate, quotePrice } from '@/lib/promotions'
import { notifyAdminEventCreated, notifyAdminPayment } from '@/lib/admin-notify'

/**
 * `completed` kommt bei sofortigen Zahlarten bereits bezahlt an. Bei
 * verzoegerten Zahlarten ist die Session dann noch `unpaid`; das Event wird
 * erst mit `async_payment_succeeded` angelegt (sofern der Endpunkt in Stripe
 * dafuer abonniert ist).
 */
/** Ganzzahl aus einem Metadaten-Text, sonst null. */
function metaInt(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') return null
  const n = Number(value)
  return Number.isInteger(n) ? n : null
}

const HANDLED_EVENTS = new Set<Stripe.Event.Type>([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
])

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return new NextResponse('Missing signature', { status: 400 })
  }

  const stripe = getStripe()

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('❌ Invalid Stripe signature', err)
    return new NextResponse('Invalid signature', { status: 400 })
  }

  if (!HANDLED_EVENTS.has(stripeEvent.type)) {
    return NextResponse.json({ received: true })
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session
  const meta = session.metadata ?? {}

  if (meta.type !== 'CREATE_EVENT') {
    return NextResponse.json({ received: true })
  }

  // 💳 Nur bezahlte Sessions (bzw. 0 CHF per Gutschein) schalten ein Event frei.
  if (
    session.payment_status !== 'paid' &&
    session.payment_status !== 'no_payment_required'
  ) {
    // Sichtbar statt still: kommt das bei einer verzoegerten Zahlart vor und
    // ist async_payment_succeeded in Stripe nicht abonniert, entstuende sonst
    // nie ein Event.
    console.warn('⏳ Checkout abgeschlossen, aber noch nicht bezahlt', {
      session: session.id,
      event: stripeEvent.type,
      paymentStatus: session.payment_status,
    })
    return NextResponse.json({ received: true })
  }

  // 🔒 Idempotenz: Event schon erstellt?
  const existing = await prisma.event.findUnique({
    where: { stripeSessionId: session.id },
  })

  if (existing) {
    return NextResponse.json({ received: true })
  }

  // Die Metadaten stammen von createEventCheckout (serverseitig gesetzt,
  // von Stripe signiert). Geprueft wird trotzdem: ein kaputter Wert soll
  // hier sichtbar scheitern und nicht als Event mit Datum "Invalid Date"
  // landen. Stripe wiederholt dann, und der Fehler steht im Log.
  const plan = meta.plan
  const eventDate = parseEventDate(meta.date)
  const tenantId = Number(meta.tenantId)
  if (!isPlanId(plan) || !eventDate || !Number.isInteger(tenantId)) {
    console.error('❌ Checkout-Metadaten unvollstaendig', session.id, meta)
    return new NextResponse('Invalid metadata', { status: 400 })
  }

  // 🧮 Preis unabhaengig nachrechnen: Paket + Eventdatum + die Aktion, mit
  // der die Session eroeffnet wurde (per ID – auch wenn sie inzwischen
  // abgelaufen ist). Verglichen mit dem, was Stripe tatsaechlich abgerechnet
  // hat: amount_subtotal ist der Positionsbetrag vor Gutscheincodes.
  const quote = quotePrice(plan, eventDate, {
    promotion: getPromotionById(meta.promotionId),
  })
  const amountPaid = session.amount_total ?? 0

  // Gespeichert und auf die Rechnung geschrieben wird, was beim Checkout
  // berechnet und abgerechnet wurde (Metadaten, von Stripe signiert) – nicht
  // die heutige Konfiguration. Aendern sich Preise oder Aktionen, waehrend
  // eine Session noch offen ist, ginge die Rechnung sonst nicht auf.
  // Sessions von vor dem Preis-Snapshot haben keine Metadaten → Nachrechnung.
  const charged =
    metaInt(meta.finalPrice) !== null
      ? {
          regularPrice: metaInt(meta.regularPrice) ?? quote.regularPrice,
          discountPercent: metaInt(meta.discountPercent) ?? 0,
          discountAmount: metaInt(meta.discountAmount) ?? 0,
          promotionId: meta.promotionId || null,
          promotionName: meta.promotionName || null,
        }
      : {
          regularPrice: quote.regularPrice,
          discountPercent: quote.discountPercent,
          discountAmount: quote.discountAmount,
          promotionId: quote.promotion?.id ?? null,
          promotionName: quote.promotion?.name ?? null,
        }

  // Die Nachrechnung entscheidet nur, ob der Betreiber gewarnt wird.
  const priceMismatch =
    session.amount_subtotal !== quote.finalPrice ||
    session.currency !== CURRENCY
  if (priceMismatch) {
    // Bezahlt ist bezahlt – das Event wird trotzdem angelegt, der Betreiber
    // aber gewarnt. Gespeichert wird, was Stripe wirklich abgerechnet hat.
    console.error('⚠️ Preisabweichung im Checkout', {
      session: session.id,
      expected: quote.finalPrice,
      subtotal: session.amount_subtotal,
      currency: session.currency,
    })
  }

  // 🎉 Event erstellen
  const createdEvent = await prisma.event
    .create({
      data: {
        tenantId,
        name: meta.name,
        location: meta.location || null,
        description: meta.description || null,
        // Mitternacht UTC; @db.Date speichert genau diesen Kalendertag.
        date: new Date(`${eventDate.iso}T00:00:00.000Z`),
        plan,
        // Snapshot wie beim Preis: was beim Kauf galt, gilt fuer dieses Event.
        uploadLimit: PLAN_PHOTO_LIMITS[plan],
        stripeSessionId: session.id,
        currency: session.currency ?? quote.currency,
        ...charged,
        finalPrice: session.amount_subtotal ?? quote.finalPrice,
        amountPaid,
      },
    })
    .catch((err) => {
      // Zwei Zustellungen gleichzeitig: die andere hat gewonnen.
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        return null
      }
      throw err
    })

  if (!createdEvent) {
    return NextResponse.json({ received: true })
  }

  const promoCodeDiscount = Math.max(
    0,
    (session.amount_subtotal ?? amountPaid) - amountPaid,
  )

  // 🧾 Fortlaufende Rechnungsnummer (EventShot)
  const invoiceNumber = await getNextInvoiceNumber()

  // 📄 PDF erzeugen
  const pdf = await generateInvoicePdf({
    invoiceNumber,
    customerEmail: session.customer_details!.email!,
    eventName: createdEvent.name,
    plan: createdEvent.plan,
    amountCHF: amountPaid / 100,
    date: new Date(),
    regularPrice: charged.regularPrice,
    promotion:
      charged.promotionName && charged.discountAmount > 0
        ? {
            name: charged.promotionName,
            percent: charged.discountPercent,
            amount: charged.discountAmount,
          }
        : null,
    voucherDiscount: promoCodeDiscount,
  })

  // ☁️ PDF in MinIO speichern
  const s3Key = `invoices/${invoiceNumber}.pdf`
  await saveInvoiceToMinio(pdf, s3Key)

  // ✉️ Kunden-Mail mit PDF
  await sendMail({
    to: session.customer_details!.email!,
    subject: 'Deine Rechnung – EventShot',
    html: `
      <p>Vielen Dank für deine Bestellung.</p>
      <p>Deine Rechnung ist beigefügt.</p>
      <p><strong>Rechnungsnummer:</strong> ${invoiceNumber}</p>
      ${
        charged.promotionName && charged.discountAmount > 0
          ? `<p>${charged.promotionName} angewendet – du sparst ${formatChf(charged.discountAmount)}.</p>`
          : ''
      }
    `,
    attachments: [
      {
        filename: `${invoiceNumber}.pdf`,
        content: Buffer.from(pdf),
        contentType: 'application/pdf',
      },
    ],
  })

  // 📩 Betreiber-Benachrichtigungen (werfen nie – der Webhook darf dadurch
  // nicht fehlschlagen, sonst wiederholt Stripe und die Idempotenz-Sperre
  // verhindert den erneuten Rechnungsversand an den Kunden).
  await notifyAdminEventCreated({
    eventId: createdEvent.id,
    name: createdEvent.name,
    plan: createdEvent.plan,
    date: createdEvent.date,
    location: createdEvent.location,
    description: createdEvent.description,
    tenantId: createdEvent.tenantId,
    customerEmail: session.customer_details?.email,
    source: 'Self-Service (bezahlt)',
  })

  await notifyAdminPayment({
    amountCHF: amountPaid / 100,
    plan: createdEvent.plan,
    eventName: createdEvent.name,
    customerEmail: session.customer_details?.email,
    customerName: session.customer_details?.name,
    invoiceNumber,
    stripeSessionId: session.id,
    regularPrice: charged.regularPrice,
    promotion:
      charged.promotionName && charged.discountAmount > 0
        ? `${charged.promotionName} −${charged.discountPercent} % (${formatChf(-charged.discountAmount)})`
        : null,
    voucherDiscount: promoCodeDiscount,
    warning: priceMismatch
      ? `Preisabweichung: erwartet ${formatChf(quote.finalPrice)}, Stripe-Zwischensumme ${formatChf(session.amount_subtotal ?? 0)} ${session.currency?.toUpperCase() ?? ''}`
      : null,
  })

  return NextResponse.json({ received: true })
}
