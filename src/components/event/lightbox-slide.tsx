'use client'

import { useEffect, useRef, useState } from 'react'
import {
  isImageSlide,
  type RenderSlideProps,
  type SlideImage,
} from 'yet-another-react-lightbox'

export type GallerySlide = SlideImage & {
  thumb?: string
  id?: string
  /** Original fuer "Sichern" am Handy */
  original?: string
  /** API-Route mit Content-Disposition: attachment */
  download?: string
}

/**
 * Wie lange ein Nachbar-Slide ruhig stehen muss, bevor sein grosses Bild
 * geladen wird. Wer schneller weiterwischt, braucht es nie.
 */
const NEIGHBOUR_DELAY = 200

/**
 * Lightbox-Slide mit dem Thumbnail als Sofortbild.
 *
 * Ohne das stand beim Blaettern erst ein schwarzes Feld mit Ladekreis, bis
 * das grosse Bild da war. Das Thumbnail liegt aus dem Raster schon im Cache
 * und steht damit im selben Frame.
 *
 * Das Thumbnail ist ein quadratischer Mittelausschnitt. Mit object-fit:
 * contain in der Box des fertigen Bildes liegt es pixelgenau dort, wo dieser
 * Ausschnitt spaeter auch im grossen Bild sitzt — nur die Raender fehlen
 * noch. Mit cover waere es vergroessert und das Bild spraenge beim Laden.
 *
 * Dafuer braucht es die Masse vorab; fehlen sie, rendert YARL wie gehabt.
 */
export function renderGallerySlide({ slide, offset, rect }: RenderSlideProps) {
  const s = slide as GallerySlide
  if (!isImageSlide(s) || !s.thumb || !s.width || !s.height) return undefined

  // Nicht ueber die Originalgroesse hinaus, wie YARL selbst auch.
  const scale = Math.min(1, rect.width / s.width, rect.height / s.height)

  return (
    <ProgressiveSlide
      src={s.src}
      thumb={s.thumb}
      alt={s.alt ?? ''}
      offset={offset}
      width={Math.round(s.width * scale)}
      height={Math.round(s.height * scale)}
    />
  )
}

/**
 * Das grosse Bild laedt nur, wenn es gezeigt wird — oder als Nachbar, der
 * einen Moment ruhig steht. Und ein unfertiger Download wird abgebrochen,
 * sobald der Slide nicht mehr dran ist.
 *
 * Mit YARLs eigenem ImageSlide lief jedes Bild, an dem man vorbeiwischte,
 * zu Ende: ein <img> aus dem DOM zu nehmen bricht den Abruf nicht ab. Nach
 * acht schnellen Wischern stand das gesuchte Bild hinter einem Stau halb
 * geladener Vorgaenger — in Produktion gemessen 2 s bis scharf bei 9 Mbit/s,
 * obwohl es selbst nur 440 kB wiegt.
 */
function ProgressiveSlide({
  src,
  thumb,
  alt,
  offset,
  width,
  height,
}: {
  src: string
  thumb: string
  alt: string
  offset: number
  width: number
  height: number
}) {
  const current = offset === 0
  const [armed, setArmed] = useState(current)
  const [loaded, setLoaded] = useState(false)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (current) {
      setArmed(true)
      return
    }
    setArmed(false)
    const timer = setTimeout(() => setArmed(true), NEIGHBOUR_DELAY)
    return () => clearTimeout(timer)
  }, [current])

  // Beim Aushaengen den laufenden Abruf abbrechen: erst ein leeres src
  // stoppt ihn, das Entfernen des Elements allein nicht.
  useEffect(() => {
    const el = img.current
    return () => {
      if (el && !el.complete) el.src = ''
    }
  }, [armed])

  return (
    <div style={{ position: 'relative', width, height }}>
      <img
        src={thumb}
        alt=''
        aria-hidden
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      {(armed || loaded) && (
        <img
          ref={img}
          src={src}
          alt={alt}
          draggable={false}
          decoding='async'
          fetchPriority={current ? 'high' : 'low'}
          onLoad={() => setLoaded(true)}
          // YARL-Klassen: touch-action, keine Textauswahl, und _loading
          // haelt das Bild unsichtbar, bis es fertig ist.
          className={
            loaded
              ? 'yarl__slide_image'
              : 'yarl__slide_image yarl__slide_image_loading'
          }
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            maxHeight: 'none',
          }}
        />
      )}
    </div>
  )
}
