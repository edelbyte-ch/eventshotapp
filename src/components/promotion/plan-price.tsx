import { Snowflake } from 'lucide-react'
import { formatChf } from '@/lib/pricing'
import {
  calculateFinalPrice,
  type Promotion,
  promotionMonthsLabel,
  promotionPercentLabel,
} from '@/lib/promotions'
import { cn } from '@/lib/utils'

/** Kleines Aktions-Label ("−20 % Winteraktion"), ueberall gleich. */
export function PromotionBadge({
  promotion,
  className,
}: {
  promotion: Promotion
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20',
        className,
      )}
    >
      <Snowflake className='size-3.5 shrink-0' strokeWidth={2} aria-hidden />
      −{promotionPercentLabel(promotion)} {promotion.name}
    </span>
  )
}

/**
 * Preisblock einer Paketkarte.
 *
 * Mit Aktion in der Reihenfolge, in der sie gelesen werden soll: der
 * Aktionspreis gross, darueber das Label, darunter klein der regulaere Preis
 * und fuer welche Events er gilt. Ohne Aktion genau wie bisher.
 */
export function PlanPrice({
  regularPrice,
  duration,
  promotion,
  className,
}: {
  regularPrice: number
  duration: string
  promotion: Promotion | null
  className?: string
}) {
  if (!promotion) {
    return (
      <p className={cn('flex items-baseline', className)}>
        <span className='text-3xl font-bold'>{formatChf(regularPrice, 'list')}</span>
        <span className='ml-1 text-muted-foreground'>{duration}</span>
      </p>
    )
  }

  const finalPrice = calculateFinalPrice(regularPrice, promotion)

  return (
    <div className={cn('space-y-2', className)}>
      <PromotionBadge promotion={promotion} />
      <p className='flex flex-wrap items-baseline gap-x-1'>
        <span className='text-3xl font-bold'>{formatChf(finalPrice, 'list')}</span>
        <span className='text-muted-foreground'>{duration}</span>
      </p>
      <p className='text-sm text-muted-foreground'>
        <span className='sr-only'>Regulär </span>
        <s className='decoration-muted-foreground/60'>
          {formatChf(regularPrice, 'list')}
        </s>
        <span aria-hidden> · </span>
        <span className='sr-only'>, </span>
        <span className='whitespace-nowrap'>
          für Events im {promotionMonthsLabel(promotion)}
        </span>
      </p>
    </div>
  )
}
