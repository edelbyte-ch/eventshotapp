// components/subdomain/plan-picker.tsx
'use client'

import { pricingPlans } from '@/lib/constants'
import { formatChf, type PlanId } from '@/lib/pricing'
import { type EventDate, type Promotion, quotePrice } from '@/lib/promotions'
import { Check, CheckCircle2 } from 'lucide-react'

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

/**
 * Paketwahl im Buchungsdialog. Kontrolliert, weil der Dialog Paket und Datum
 * zusammen braucht, um den Preis vor dem Checkout zu zeigen.
 *
 * Mit Eventdatum zeigt jede Karte den Preis, der fuer genau dieses Datum
 * gilt – dieselbe Rechnung, die der Server beim Checkout wiederholt.
 *
 * Die Leistungen stehen direkt auf der Karte, wie in social-wall. Vorher
 * lagen sie hinter einem (i): man sah drei Preise, aber nicht, wofuer man
 * mehr bezahlt — genau der Unterschied, der Premium und Enterprise
 * begruendet (Foto-Limit, Screens, Galerie-Dauer).
 */
export function PlanPicker({
  value,
  onChange,
  eventDate,
  promotion,
}: {
  value: PlanId
  onChange: (plan: PlanId) => void
  eventDate: EventDate | null
  promotion: Promotion | null
}) {
  return (
    <>
      {/* Server Action erhält plan=BASIC|PREMIUM|ENTERPRISE */}
      <input type='hidden' name='plan' value={value} />

      <div
        role='radiogroup'
        aria-label='Paket'
        className='grid grid-cols-1 gap-3 pt-3 md:grid-cols-3'
      >
        {pricingPlans.map((p) => {
          const active = p.plan === value
          const quote = eventDate
            ? quotePrice(p.plan, eventDate, { promotion })
            : null
          const discounted = quote !== null && quote.discountAmount > 0
          return (
            <button
              key={p.name}
              type='button'
              role='radio'
              aria-checked={active}
              onClick={() => onChange(p.plan)}
              className={cn(
                'relative flex flex-col rounded-2xl border p-4 text-left transition-all',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active
                  ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]'
                  : 'border-border opacity-80 hover:border-primary/40 hover:opacity-100',
              )}
            >
              {p.highlighted && (
                <span className='absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground'>
                  Meistgewählt
                </span>
              )}

              {/* Gefuellt = gewaehlt, leerer Ring = waehlbar */}
              <span
                aria-hidden
                className={cn(
                  'absolute right-4 top-4 flex size-5 items-center justify-center rounded-full border-2 transition-colors',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40',
                )}
              >
                {active && <Check className='size-3' strokeWidth={3} />}
              </span>

              <span
                className={cn(
                  'pr-8 text-xs font-bold uppercase tracking-[0.15em]',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {p.name}
              </span>

              <div className='mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                <span className='text-2xl font-black leading-none'>
                  {discounted ? formatChf(quote.finalPrice, 'list') : p.price}
                </span>
                {discounted && (
                  <s className='text-xs text-muted-foreground'>
                    <span className='sr-only'>regulär </span>
                    {p.price}
                  </s>
                )}
              </div>
              <div className='mt-0.5 text-[10px] text-muted-foreground'>
                {p.duration}
              </div>

              <p className='mt-3 text-xs leading-relaxed text-muted-foreground'>
                {p.description}
              </p>

              <ul className='mt-4 flex-1 space-y-1.5'>
                {p.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      'flex gap-2 text-xs',
                      active ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    <CheckCircle2
                      className={cn(
                        'mt-px size-3.5 shrink-0',
                        active ? 'text-primary' : 'text-muted-foreground/60',
                      )}
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
    </>
  )
}
