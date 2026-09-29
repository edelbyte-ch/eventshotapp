'use client'

import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'

import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/styles.css'
import { LightboxSaveButton } from './lightbox-save-button'
import { type GallerySlide, renderGallerySlide } from './lightbox-slide'
import { EventGalleryItem } from './EventGalleryItem'

type Photo = {
  id: string
  url: string
  displayUrl: string | null
  thumbUrl: string
  blurHash: string | null
  width: number | null
  height: number | null
}

export default function EventGallery({
  photos,
  eventId,
}: {
  photos: Photo[]
  eventId: string
}) {
  const [index, setIndex] = useState(-1)

  // Die Lightbox zeigt die 1920er-Fassung statt des Originals (im Schnitt
  // 5 MB). Das Original bleibt fuer den Knopf "Sichern" — und fuer Fotos,
  // die der Backfill noch nicht erreicht hat.
  //
  // Nachbarn laedt YARL selbst vor (carousel.preload, unten) und haengt
  // weggeblaetterte Slides wieder aus. Das fruehere eigene new Image() pro
  // Ansicht kam obendrauf und liess sich nicht abbrechen: beim schnellen
  // Wischen stauten sich die Originale, und das gerade gezeigte Bild musste
  // hinter ihnen anstehen.
  const slides = useMemo<GallerySlide[]>(
    () =>
      photos.map((p) => ({
        src: p.displayUrl ?? p.url,
        thumb: p.thumbUrl,
        // Masse erst mit der Fassung: davor standen sie teils vor der
        // EXIF-Drehung in der DB, der Backfill korrigiert beides zusammen.
        ...(p.displayUrl && {
          width: p.width ?? undefined,
          height: p.height ?? undefined,
        }),
        id: p.id,
        original: p.url,
        download: `/api/photo/${p.id}/download?event=${eventId}`,
      })),
    [photos, eventId],
  )

  if (photos.length === 0) {
    return (
      <div className='py-20 text-center text-muted-foreground'>
        Noch keine Fotos – lade das erste hoch
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {photos.map((photo, i) => (
          <EventGalleryItem
            key={i.toString()}
            photo={photo}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Counter]}
        render={{ slide: renderGallerySlide }}
        // Ein Nachbar je Seite reicht, das Thumbnail steht ohnehin sofort.
        // Mit zweien teilten sich beim schnellen Wischen fuenf Bilder die
        // Leitung: 5 x 440 kB bei 9 Mbit/s sind die gemessenen 1.9 s.
        carousel={{ preload: 1 }}
        toolbar={{ buttons: [<LightboxSaveButton key='save' />, 'close'] }}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  )
}
