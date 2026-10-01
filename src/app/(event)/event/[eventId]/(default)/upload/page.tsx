import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import PhotoUploadPresigned from '@/components/event/photo-upload-presigned'
import { Button } from '@/components/ui/button'
import { COUNTED_PHOTOS } from '@/lib/photo-limits'
import prisma from '@/lib/prisma'

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-6'>
      <div className='text-center max-w-md space-y-2'>
        <h1 className='text-3xl font-semibold'>
          Lade deine <span className='text-primary'>Fotos</span> hoch
        </h1>
        <p className='text-sm text-muted-foreground'>
          Einzeln oder mehrere auf einmal — sie erscheinen live auf der
          Eventwall.
        </p>
      </div>
      <Suspense>
        <PageContent params={params} />
      </Suspense>
    </div>
  )
}

const PageContent = async ({
  params,
}: {
  params: Promise<{ eventId: string }>
}) => {
  const { eventId } = await params

  // Nur damit ein volles Event gleich als voll erscheint, statt erst nach dem
  // ersten vergeblichen Upload. Die Absage selbst kommt vom Server.
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      uploadLimit: true,
      _count: { select: { photos: { where: COUNTED_PHOTOS } } },
    },
  })
  const kontingent = event
    ? { used: event._count.photos, limit: event.uploadLimit }
    : undefined

  return (
    <>
      <PhotoUploadPresigned eventId={eventId} kontingent={kontingent} />
      <Link href={`/event/${eventId}`}>
        <Button variant='ghost' size='sm' className='gap-1'>
          <ArrowLeft className='h-4 w-4' />
          Zurück
        </Button>
      </Link>
    </>
  )
}
