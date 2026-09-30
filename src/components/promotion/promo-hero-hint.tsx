import { ArrowRight } from 'lucide-react'
import { getDisplayPromotion } from '@/lib/promotions.server'
import { promotionMonthsLabel, promotionPercentLabel } from '@/lib/promotions'

/**
 * Dezenter Aktionshinweis ueber der H1. Ergaenzt den Hero, statt ihn zu
 * uebernehmen: die primaeren Knoepfe bleiben, wo sie sind.
 */
export async function PromoHeroHint() {
  const promotion = await getDisplayPromotion()
  if (!promotion) return null

  return (
    <a
      href='#winteraktion'
      data-umami-event='hero-promo-winter'
      className='group mb-5 sm:mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3 text-xs sm:text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
    >
      <span className='shrink-0 rounded-full bg-primary px-2.5 py-0.5 font-semibold text-primary-foreground'>
        {promotionPercentLabel(promotion)} {promotion.name}
      </span>
      <span className='truncate sm:hidden'>
        Events im {promotionMonthsLabel(promotion, 'short')}
      </span>
      <span className='hidden sm:inline truncate'>
        Für Events im {promotionMonthsLabel(promotion)}
      </span>
      <span className='hidden sm:inline shrink-0 font-semibold text-white'>
        Aktion sichern
      </span>
      <ArrowRight
        className='size-3.5 shrink-0 text-white transition-transform group-hover:translate-x-0.5'
        aria-hidden
      />
    </a>
  )
}
