import { getEventPhotos } from '@/actions/get-event-photos'
import InteractiveGallery from '@/components/tenant/event/interactive-gallery'
import PhotoUploadPresigned from '@/components/event/photo-upload-presigned'
import { PhotoQuota } from '@/components/tenant/event/photo-quota'
import QRCodeGenerator from '@/components/tenant/event/qr-code-generator'
import SlideshowSettings from '@/components/tenant/event/slideshow-settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { requireOwnedEventPage } from '@/lib/auth-guard'
import { pricingPlans } from '@/lib/constants'
import { COUNTED_PHOTOS } from '@/lib/photo-limits'
import { Suspense } from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense>
      <PageContent params={params} />
    </Suspense>
  )
}

const PageContent = async ({
  params,
}: {
  params: Promise<{ eventId: string }>
}) => {
  const { eventId } = await params

  // Vorher wurde hier nur geprueft, DASS jemand angemeldet ist — das Event
  // dann per findUnique ohne jeden Tenant-Bezug geladen. Jedes selbst
  // angelegte Gratis-Konto oeffnete damit die Verwaltung einer fremden
  // Feier: Fotos, QR-Code, Slideshow-Einstellungen, und ueber die
  // eingebettete Galerie mit admin={true} auch den Loeschknopf.
  const event = await requireOwnedEventPage(eventId, {
    id: true,
    name: true,
    isActive: true,
    plan: true,
    isDemo: true,
    uploadLimit: true,
    _count: { select: { photos: { where: COUNTED_PHOTOS } } },
  })
  const kontingent = {
    used: event._count.photos,
    limit: event.uploadLimit,
    isDemo: event.isDemo,
  }

  // Fetch photos with presigned URLs
  const photos = await getEventPhotos(eventId)

  return (
    <main className='container mx-auto py-8 px-4 md:px-6'>
      <div className='mb-6 space-y-3'>
        <h1 className='text-2xl font-bold'>
          Event: <span className='text-primary'>{event.name}</span>
        </h1>
        <PhotoQuota
          used={kontingent.used}
          limit={kontingent.limit}
          planName={
            pricingPlans.find((p) => p.plan === event.plan)?.name ?? event.plan
          }
          isDemo={event.isDemo}
        />
      </div>

      <Tabs defaultValue='photos' className='w-full'>
        <TabsList className='grid grid-cols-4 w-full'>
          <TabsTrigger value='photos'>Fotos</TabsTrigger>
          <TabsTrigger value='upload'>Hochladen</TabsTrigger>
          <TabsTrigger value='qrcode'>QR-Code</TabsTrigger>
          <TabsTrigger value='settings'>Einstellungen</TabsTrigger>
        </TabsList>

        <div className='mt-6'>
          {/* ---------------- Fotos ---------------- */}
          <TabsContent value='photos'>
            <InteractiveGallery
              admin={true}
              photos={photos}
              eventId={eventId}
            />
          </TabsContent>

          {/* ---------------- Hochladen ----------------
              Der Veranstalter bereitet Fotos am Rechner vor, bevor der erste
              Gast scannt. Ueber den QR-Code ginge das auch, aber dann muesste
              er sich die Gaeste-URL erst heraussuchen. */}
          <TabsContent value='upload'>
            <div className='mx-auto flex max-w-xl flex-col items-center gap-4'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold'>Fotos vorbereiten</h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Lade eigene Bilder hoch, bevor das Fest beginnt. Sie laufen
                  in der Slideshow wie Gästefotos mit.
                </p>
              </div>
              <PhotoUploadPresigned
                eventId={eventId}
                galerieHref={`/tenant/event/${eventId}`}
                kontingent={kontingent}
              />
            </div>
          </TabsContent>

          {/* ---------------- QR ---------------- */}
          <TabsContent value='qrcode' className='max-w-md mx-auto'>
            <QRCodeGenerator eventId={eventId} />
          </TabsContent>

          {/* ---------------- Settings ---------------- */}
          <TabsContent value='settings' className='max-w-md mx-auto'>
            <SlideshowSettings eventId={eventId} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}
