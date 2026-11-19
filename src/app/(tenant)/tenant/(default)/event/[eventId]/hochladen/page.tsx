import { Suspense } from 'react'
import PhotoUploadPresigned from '@/components/event/photo-upload-presigned'
import { requireOwnedEventPage } from '@/lib/auth-guard'
import { COUNTED_PHOTOS } from '@/lib/photo-limits'

/**
 * Der Veranstalter bereitet Fotos am Rechner vor, bevor der erste Gast
 * scannt. Ueber den QR-Code ginge das auch, aber dann muesste er sich die
 * Gaeste-URL erst heraussuchen.
 */
export default function EventUploadPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense fallback={<div className='h-72 animate-pulse rounded-2xl bg-muted/40' />}>
      <Upload params={params} />
    </Suspense>
  )
}

async function Upload({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  const event = await requireOwnedEventPage(eventId, {
    id: true,
    isDemo: true,
    uploadLimit: true,
    _count: { select: { photos: { where: COUNTED_PHOTOS } } },
  })

  return (
    <div className='mx-auto flex max-w-xl flex-col items-center gap-4'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>Fotos vorbereiten</h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Lade eigene Bilder hoch, bevor das Fest beginnt. Sie laufen in der
          Slideshow wie Gästefotos mit.
        </p>
      </div>
      <PhotoUploadPresigned
        eventId={eventId}
        galerieHref={`/tenant/event/${eventId}/fotos`}
        kontingent={{
          used: event._count.photos,
          limit: event.uploadLimit,
          isDemo: event.isDemo,
        }}
      />
    </div>
  )
}
