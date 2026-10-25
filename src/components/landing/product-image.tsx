import Image from 'next/image'
import { LANDING_IMAGES, type LandingImageKey } from '@/lib/landing-images'
import { cn } from '@/lib/utils'

/**
 * Echtes Produktbild fuer Anlass-Seiten und Ratgeber. Bewusst ohne
 * `priority`: Es steht unter dem Einstieg und wird lazy geladen.
 */
export function ProductImage({
  image,
  sizes,
  className,
}: {
  image: LandingImageKey
  sizes: string
  className?: string
}) {
  const data = LANDING_IMAGES[image]
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card shadow-sm',
        className,
      )}
    >
      <Image
        src={data.src}
        width={data.width}
        height={data.height}
        alt={data.alt}
        sizes={sizes}
        quality={75}
        className='h-auto w-full'
      />
    </figure>
  )
}
