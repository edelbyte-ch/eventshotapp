import { Camera } from 'lucide-react'
import {
  formatPhotoCount,
  isPhotoLimitReached,
  remainingPhotos,
} from '@/lib/photo-limits'

/**
 * Verbrauch des Foto-Kontingents, oben in der Event-Verwaltung.
 *
 * Gleiche Darstellung wie der Demo-Streifen im Dashboard: ein Balken, der
 * den Stand zeigt, ohne dass man rechnen muss. Die Zahlen kommen vom Event
 * selbst (uploadLimit), nicht aus dem Plan — angezeigt wird damit derselbe
 * Wert, gegen den beim Hochladen geprueft wird.
 */
export function PhotoQuota({
  used,
  limit,
  planName,
  isDemo,
}: {
  used: number
  limit: number | null
  planName: string
  isDemo: boolean
}) {
  if (limit === null) {
    return (
      <p className='flex items-center gap-2 text-sm text-muted-foreground tabular-nums'>
        <Camera className='h-4 w-4' />
        {formatPhotoCount(used)} Fotos · unbegrenzt
      </p>
    )
  }

  const full = isPhotoLimitReached(used, limit)
  const left = remainingPhotos(used, limit) ?? 0
  const pct = Math.min(100, (used / limit) * 100)

  return (
    <div className='max-w-sm space-y-1.5'>
      <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            full ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className='text-xs text-muted-foreground tabular-nums'>
        {formatPhotoCount(used)} von {formatPhotoCount(limit)} Fotos ·{' '}
        {isDemo ? 'Demo' : planName}
        {full
          ? ' · Limit erreicht'
          : ` · noch ${formatPhotoCount(left)} frei`}
      </p>
      {full &&
        (isDemo ? (
          <p className='text-xs text-muted-foreground'>
            Alle Demo-Fotos sind aufgebraucht. Für eine echte Feier legst du
            im Dashboard ein eigenes Event an.
          </p>
        ) : (
          <p className='text-xs text-muted-foreground'>
            Gäste können keine Fotos mehr hochladen. Für mehr Fotos schreib uns
            an{' '}
            <a
              href='mailto:info@edelbyte.ch'
              className='text-primary underline underline-offset-4'
            >
              info@edelbyte.ch
            </a>{' '}
            – wir stellen dein Event auf ein grösseres Paket um.
          </p>
        ))}
    </div>
  )
}
