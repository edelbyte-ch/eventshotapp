'use client'

import { deletePhoto } from '@/actions/delete-photo'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import { Trash2, Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  type GallerySlide,
  renderGallerySlide,
} from '@/components/event/lightbox-slide'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

/* --------------------------------
 * Config
 * -------------------------------- */
const BATCH_SIZE = 24

export type GalleryPhoto = {
  id: string
  url: string
  displayUrl?: string | null
  thumbUrl?: string
  width?: number | null
  height?: number | null
  createdAt: Date
}

export default function InteractiveGallery({
  photos,
  eventId,
  admin = false,
}: {
  photos: GalleryPhoto[]
  eventId: string
  admin?: boolean
}) {
  /* --------------------------------
   * State
   * -------------------------------- */
  const [items, setItems] = useState(() => photos)
  const [visible, setVisible] = useState(BATCH_SIZE)
  const [index, setIndex] = useState(-1)
  const [shareUrl, setShareUrl] = useState('')

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  /* --------------------------------
   * Share URL (/gallery)
   * -------------------------------- */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/event/${eventId}/gallery`)
    }
  }, [eventId])

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    toast.success('Galerie-Link kopiert')
  }

  /* --------------------------------
   * Derived
   * -------------------------------- */
  const visiblePhotos = useMemo(() => items.slice(0, visible), [items, visible])

  // 1920er-Fassung statt Original, siehe event-gallery.tsx
  const slides = useMemo<GallerySlide[]>(
    () =>
      items.map((p) => ({
        src: p.displayUrl ?? p.url,
        thumb: p.thumbUrl,
        // Masse nur mit Fassung, siehe event-gallery.tsx
        ...(p.displayUrl && {
          width: p.width ?? undefined,
          height: p.height ?? undefined,
        }),
      })),
    [items],
  )

  /* --------------------------------
   * Infinite Scroll
   * -------------------------------- */
  useEffect(() => {
    if (!sentinelRef.current) return
    if (visible >= items.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible((v) => Math.min(v + BATCH_SIZE, items.length))
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [visible, items.length])

  /* --------------------------------
   * Delete (optimistic)
   * -------------------------------- */
  async function handleDelete(photoId: string) {
    const snapshot = items
    setItems((prev) => prev.filter((p) => p.id !== photoId))

    try {
      // Der Waechter lehnt als Wert ab, nicht als Ausnahme — ohne diese
      // Abfrage bliebe das Foto optimistisch aus der Ansicht verschwunden,
      // obwohl es noch da ist.
      const res = await deletePhoto({ id: photoId, eventId })
      if (!res.success) {
        setItems(snapshot)
        toast.error(res.message ?? 'Löschen fehlgeschlagen')
        return
      }
      toast.success('Foto gelöscht')
    } catch {
      setItems(snapshot)
      toast.error('Löschen fehlgeschlagen')
    }
  }

  /* --------------------------------
   * Render
   * -------------------------------- */
  return (
    <div className='flex flex-col gap-6'>
      {/* --------------------------------
       * Share Link
       * -------------------------------- */}
      <div className='rounded-lg border bg-card p-4 space-y-2'>
        <Label className='flex items-center gap-2'>
          <Share2 className='h-4 w-4 text-primary' />
          Galerie-Link für Gäste
        </Label>

        <div className='flex gap-2'>
          <Input value={shareUrl} readOnly />
          <Button
            variant='outline'
            size='icon'
            onClick={copyShareLink}
            title='Link kopieren'
          >
            <Copy className='h-4 w-4' />
          </Button>
        </div>

        <p className='text-xs text-muted-foreground'>
          Teile diesen Link nach dem Event mit den Gästen, damit sie die
          Galerie sehen können.
        </p>
      </div>

      {/* Stats */}
      <div className='text-sm text-muted-foreground'>
        Fotos insgesamt:{' '}
        <span className='font-semibold text-primary'>{items.length}</span>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {visiblePhotos.map((photo, i) => (
          <div
            key={photo.id}
            className='relative group overflow-hidden rounded-lg border bg-card'
          >
            <AspectRatio ratio={1} onClick={() => setIndex(i)}>
              <Image
                src={photo.thumbUrl || photo.url}
                alt='Event Foto'
                fill
                sizes='(max-width: 768px) 50vw, 25vw'
                quality={25}
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </AspectRatio>

            {admin && (
              <div
                className='absolute top-2 right-2 z-10'
                onClick={(e) => e.stopPropagation()}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className='rounded-full bg-black/60 p-2 text-white hover:bg-red-600 transition'>
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Foto löschen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Dieses Foto wird dauerhaft gelöscht.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-red-600 hover:bg-red-700'
                        onClick={() => handleDelete(photo.id)}
                      >
                        Löschen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sentinel */}
      {visible < items.length && <div ref={sentinelRef} className='h-10' />}

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Counter]}
        render={{ slide: renderGallerySlide }}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </div>
  )
}
