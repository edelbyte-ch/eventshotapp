import { Suspense } from 'react'
import { getEventPhotos } from '@/actions/get-event-photos'
import InteractiveGallery from '@/components/tenant/event/interactive-gallery'
import { requireOwnedEventPage } from '@/lib/auth-guard'

export default function EventPhotosPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <Photos params={params} />
    </Suspense>
  )
}

async function Photos({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  await requireOwnedEventPage(eventId, { id: true })
  const photos = await getEventPhotos(eventId)
  return <InteractiveGallery admin={true} photos={photos} eventId={eventId} />
}

function GallerySkeleton() {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`s-${i.toString()}`}
          className='aspect-square animate-pulse rounded-xl bg-muted/40'
        />
      ))}
    </div>
  )
}
