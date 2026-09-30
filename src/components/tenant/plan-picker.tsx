// components/subdomain/plan-picker.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { pricingPlans } from '@/lib/constants'
import { formatChf, type PlanId } from '@/lib/pricing'
import { type EventDate, type Promotion, quotePrice } from '@/lib/promotions'
import { CheckIcon, Info } from 'lucide-react'

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

/**
 * Paketwahl im Buchungsdialog. Kontrolliert, weil der Dialog Paket und Datum
 * zusammen braucht, um den Preis vor dem Checkout zu zeigen.
 *
 * Mit Eventdatum zeigt jede Karte den Preis, der fuer genau dieses Datum
 * gilt – dieselbe Rechnung, die der Server beim Checkout wiederholt.
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

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
        {pricingPlans.map((p) => {
          const active = p.plan === value
          const quote = eventDate
            ? quotePrice(p.plan, eventDate, { promotion })
            : null
          const discounted = quote !== null && quote.discountAmount > 0
          return (
            <div
              key={p.name}
              role='radio'
              aria-checked={active}
              tabIndex={0}
              onClick={() => onChange(p.plan)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange(p.plan)
                }
              }}
              className={cn(
                'relative rounded-lg border p-3 text-left transition-all cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active
                  ? 'border-primary ring-1 ring-primary/30 shadow-sm bg-primary/5'
                  : 'border-border hover:border-primary/40',
              )}
            >
              <div className='space-y-1'>
                <div className='flex items-center gap-2 min-w-0'>
                  <span
                    className={cn(
                      'inline-block size-2 rounded-full shrink-0',
                      active ? 'bg-primary' : 'bg-muted-foreground/40',
                    )}
                    aria-hidden
                  />
                  <div className='flex items-center gap-2 min-w-0 flex-1'>
                    <span className='font-medium text-sm truncate'>
                      {p.name}
                    </span>
                    {p.highlighted && (
                      <Badge
                        variant='secondary'
                        className='rounded-full text-[10px] px-1 py-0.5 shrink-0'
                      >
                        Meistgewählt
                      </Badge>
                    )}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type='button'
                        aria-label={`${p.name}: Leistungen anzeigen`}
                        className='p-2 hover:bg-muted rounded-full transition-colors touch-manipulation shrink-0'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info className='h-4 w-4 sm:h-3 sm:w-3 text-muted-foreground' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-80 sm:w-80 p-4'
                      side='top'
                      sideOffset={8}
                    >
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold text-sm'>
                            {p.name} Features
                          </h4>
                        </div>
                        <ul className='space-y-2'>
                          {p.features.map((feature) => (
                            <li key={feature} className='flex gap-2 text-sm'>
                              <CheckIcon className='h-4 w-4 text-primary shrink-0 mt-0.5' />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='text-xs text-muted-foreground'>
                  {p.description}
                </div>
                <div className='flex flex-wrap items-baseline gap-x-1.5 text-sm font-semibold'>
                  {discounted ? (
                    <>
                      <span className='text-primary'>
                        {formatChf(quote.finalPrice, 'list')}
                      </span>
                      <s className='text-xs font-normal text-muted-foreground'>
                        <span className='sr-only'>regulär </span>
                        {p.price}
                      </s>
                    </>
                  ) : (
                    <span>{p.price}</span>
                  )}
                  <span className='text-xs font-normal text-muted-foreground'>
                    {p.duration}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
