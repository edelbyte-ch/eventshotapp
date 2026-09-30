import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { pricingPlans } from '@/lib/constants'
import { formatChf } from '@/lib/pricing'
import {
  calculateFinalPrice,
  promotionMonthsLabel,
  promotionPercentLabel,
} from '@/lib/promotions'
import { getDisplayPromotion } from '@/lib/promotions.server'

const ANLAESSE = ['Weihnachtsfeier', 'Winterhochzeit', 'Silvester', 'Firmenfeier']

/**
 * Kurze Aktions-Section direkt nach dem Hero. Verschwindet von selbst,
 * sobald keine Aktion mehr buchbar ist.
 */
export async function PromoSection() {
  const promotion = await getDisplayPromotion()
  if (!promotion) return null

  const percent = promotionPercentLabel(promotion)
  const months = promotionMonthsLabel(promotion)

  return (
    <section id='winteraktion' className='scroll-mt-20 py-12 md:py-16'>
      <div className='container'>
        <ScrollReveal>
          <div className='mx-auto grid max-w-5xl gap-8 overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/[0.08] via-card to-card p-6 shadow-sm sm:p-8 md:grid-cols-[1.25fr_1fr] md:gap-10 md:p-10'>
            <div className='space-y-5'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                {promotion.name}
              </p>
              <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
                {percent} auf dein Event im {months}
              </h2>
              <p className='text-lg text-muted-foreground'>
                Ob Weihnachtsfeier, Winterhochzeit oder Jahresabschluss – haltet
                die schönsten Momente gemeinsam mit euren Gästen fest und spart
                dabei {percent}.
              </p>

              <ul className='flex flex-wrap gap-2' aria-label='Passende Anlässe'>
                {ANLAESSE.map((anlass) => (
                  <li
                    key={anlass}
                    className='rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground'
                  >
                    {anlass}
                  </li>
                ))}
              </ul>

              <div className='flex flex-col gap-3 pt-1 sm:flex-row sm:items-center'>
                <Button size='lg' asChild className='text-base'>
                  <Link href='/register' data-umami-event='promo-winter-cta'>
                    Event erstellen
                    <ArrowRight className='ml-1 size-4' />
                  </Link>
                </Button>
                <p className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                  <Check className='size-4 shrink-0 text-primary' aria-hidden />
                  Rabatt wird automatisch angewendet – ohne Code.
                </p>
              </div>
            </div>

            <div className='self-center rounded-xl border border-border bg-background/80 p-5 sm:p-6'>
              <p className='text-sm font-medium text-muted-foreground'>
                Deine Winterpreise
              </p>
              <ul className='mt-3 divide-y divide-border'>
                {pricingPlans.map((plan) => (
                  <li
                    key={plan.plan}
                    className='flex items-baseline justify-between gap-3 py-3'
                  >
                    <span className='font-semibold'>{plan.name}</span>
                    <span className='flex items-baseline gap-2 whitespace-nowrap'>
                      <s className='text-sm text-muted-foreground decoration-muted-foreground/60'>
                        <span className='sr-only'>regulär </span>
                        {formatChf(plan.priceRappen, 'list')}
                      </s>
                      <span className='text-lg font-bold'>
                        {formatChf(
                          calculateFinalPrice(plan.priceRappen, promotion),
                          'list',
                        )}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className='mt-3 text-xs text-muted-foreground'>
                Gilt für alle Events mit Datum im {months}. Einmalpreis pro
                Event, kein Abo.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
