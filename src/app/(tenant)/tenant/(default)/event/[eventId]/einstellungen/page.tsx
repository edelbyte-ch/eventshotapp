import { Suspense } from 'react'
import SlideshowSettings from '@/components/tenant/event/slideshow-settings'
import { requireOwnedEventPage } from '@/lib/auth-guard'

export default function EventSettingsPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense fallback={<div className='h-72 animate-pulse rounded-2xl bg-muted/40' />}>
      <Settings params={params} />
    </Suspense>
  )
}

async function Settings({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  await requireOwnedEventPage(eventId, { id: true })
  return <SlideshowSettings eventId={eventId} />
}
