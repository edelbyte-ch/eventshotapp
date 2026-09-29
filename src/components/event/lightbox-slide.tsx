'use client'

import {
  ImageSlide,
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

// Nur den Ladekreis ausblenden — die Vorschau steht an seiner Stelle.
const renderNoSpinner = { iconLoading: () => null }

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
  const width = Math.round(s.width * scale)
  const height = Math.round(s.height * scale)

  return (
    <div style={{ position: 'relative', width, height }}>
      <img
        src={s.thumb}
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
      <ImageSlide
        slide={s}
        offset={offset}
        rect={rect}
        render={renderNoSpinner}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      />
    </div>
  )
}
