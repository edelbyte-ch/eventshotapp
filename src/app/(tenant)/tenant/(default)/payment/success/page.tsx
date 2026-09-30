import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { getCurrentTenant } from '@/lib/auth-guard'
import { formatChf } from '@/lib/pricing'
import prisma from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'

type SearchParams = Promise<{ session_id?: string | string[] }>

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="flex-1 flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>

        <Suspense fallback={<SuccessContent />}>
          <SuccessWithBooking searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

type Booking = {
  eventId: string | null
  promotionName: string | null
  discountAmount: number
}

/**
 * Liest die Buchung zur Session – nur, wenn sie dem angemeldeten Kunden
 * gehoert. Ob das Event schon existiert, haengt am Webhook; der kann ein
 * paar Sekunden nach der Rueckkehr eintreffen.
 */
async function loadBooking(sessionId: string): Promise<Booking | null> {
  if (!sessionId.startsWith('cs_')) return null
  const tenant = await getCurrentTenant()
  if (!tenant) return null

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    const meta = session.metadata ?? {}
    if (meta.type !== 'CREATE_EVENT' || meta.tenantId !== String(tenant.id)) {
      return null
    }

    const event = await prisma.event.findFirst({
      where: { stripeSessionId: session.id, tenantId: tenant.id },
      select: { id: true, promotionName: true, discountAmount: true },
    })

    return {
      eventId: event?.id ?? null,
      promotionName: event?.promotionName ?? (meta.promotionName || null),
      discountAmount: event?.discountAmount ?? (Number(meta.discountAmount) || 0),
    }
  } catch (err) {
    // Die Erfolgsseite soll nie an Stripe scheitern – dann eben ohne Details.
    console.error('[payment/success] Session nicht lesbar', err)
    return null
  }
}

async function SuccessWithBooking({ searchParams }: { searchParams: SearchParams }) {
  const { session_id } = await searchParams
  const sessionId = Array.isArray(session_id) ? session_id[0] : session_id
  const booking = sessionId ? await loadBooking(sessionId) : null
  return <SuccessContent booking={booking} />
}

function SuccessContent({ booking = null }: { booking?: Booking | null }) {
  const created = Boolean(booking?.eventId)

  return (
    <>
      <h1 className="text-2xl font-bold">
        {created ? 'Event erfolgreich erstellt' : 'Zahlung erfolgreich'}
      </h1>

      <p className="text-muted-foreground">
        {created
          ? 'Vielen Dank! Dein Event ist bezahlt und freigeschaltet. Die Rechnung kommt per E-Mail.'
          : 'Vielen Dank! Deine Zahlung war erfolgreich. Dein Event wird jetzt automatisch erstellt und freigeschaltet.'}
      </p>

      {booking?.promotionName && booking.discountAmount > 0 && (
        <p className="text-sm text-primary">
          {booking.promotionName} angewendet – {formatChf(booking.discountAmount)}{' '}
          gespart.
        </p>
      )}

      {!created && (
        <p className="text-sm text-muted-foreground">
          Dies kann einen kurzen Moment dauern. Du wirst gleich im Dashboard
          dein neues Event sehen.
        </p>
      )}

      <div className="flex flex-col gap-2 pt-4">
        {created && booking?.eventId && (
          <Button asChild size="lg" className="w-full">
            <Link href={`/tenant/event/${booking.eventId}`}>Event einrichten</Link>
          </Button>
        )}
        <Button
          asChild
          size="lg"
          variant={created ? 'outline' : 'default'}
          className="w-full"
        >
          <Link href="/tenant">Zum Dashboard</Link>
        </Button>
      </div>
    </>
  )
}
