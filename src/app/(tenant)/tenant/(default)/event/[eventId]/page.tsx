import { ScanLine } from 'lucide-react'
import { Suspense } from 'react'
import ActiveScreens from '@/components/tenant/event/active-screens'
import { EventMetaForm } from '@/components/tenant/event/event-meta-form'
import { EventShare } from '@/components/tenant/event/event-share'
import { Panel } from '@/components/tenant/event/panel'
import QRCodeGenerator from '@/components/tenant/event/qr-code-generator'
import { requireOwnedEventPage } from '@/lib/auth-guard'
import { eventDay, formatEventDate } from '@/lib/event-state'
import { COUNTED_PHOTOS, formatPhotoCount } from '@/lib/photo-limits'
import { computeGalleryDeleteAt, GALLERY_RETENTION_LABEL } from '@/lib/retention'

export default function EventOverviewPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <Overview params={params} />
    </Suspense>
  )
}

async function Overview({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  // Vorher wurde hier nur geprueft, DASS jemand angemeldet ist. Jedes
  // Gratis-Konto oeffnete damit die Verwaltung einer fremden Feier.
  const event = await requireOwnedEventPage(eventId, {
    id: true,
    name: true,
    plan: true,
    date: true,
    location: true,
    description: true,
    uploadLimit: true,
    _count: { select: { photos: { where: COUNTED_PHOTOS } } },
  })

  const used = event._count.photos
  const limit = event.uploadLimit
  const frei = typeof limit === 'number' ? Math.max(0, limit - used) : null
  const loeschtAm = computeGalleryDeleteAt(event.plan, event.date)

  return (
    <div className='space-y-6'>
      {/* Kennzahlen als schmale Leiste: die Fotozahl fuehrt, weil sie die
          einzige ist, nach der jemand fragt. */}
      <div className='flex flex-wrap items-end gap-x-10 gap-y-4 rounded-2xl border border-border/60 bg-card/60 px-6 py-5'>
        <Kennzahl gross wert={formatPhotoCount(used)} label='Fotos' />
        {frei !== null && (
          <Kennzahl
            wert={formatPhotoCount(frei)}
            label={`frei von ${formatPhotoCount(limit as number)}`}
            warnung={frei === 0}
          />
        )}
        <Kennzahl
          wert={GALLERY_RETENTION_LABEL[event.plan] ?? '–'}
          label={`Galerie bis ${formatEventDate(loeschtAm)}`}
        />
      </div>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]'>
        <div className='order-2 space-y-5 lg:order-1'>
          <Panel title='Teilen'>
            <EventShare eventId={event.id} />
          </Panel>

          <Panel title='Event-Daten'>
            <EventMetaForm
              eventId={event.id}
              initial={{
                name: event.name,
                location: event.location,
                description: event.description,
                date: eventDay(event.date),
              }}
            />
          </Panel>
        </div>

        {/* Einlass und Screens zuerst auf schmalen Schirmen: das braucht man
            vor Ort. */}
        <div className='order-1 space-y-5 lg:order-2'>
          <Panel title='Einlass' icon={<ScanLine className='size-4' />}>
            <QRCodeGenerator eventId={event.id} />
          </Panel>
          <ActiveScreens eventId={event.id} />
        </div>
      </div>
    </div>
  )
}

function Kennzahl({
  wert,
  label,
  gross = false,
  warnung = false,
}: {
  wert: string
  label: string
  gross?: boolean
  warnung?: boolean
}) {
  return (
    <div>
      <div
        className={`font-semibold leading-none tabular-nums ${
          gross ? 'text-3xl' : 'text-lg text-muted-foreground'
        } ${warnung ? 'text-destructive' : ''}`}
      >
        {wert}
      </div>
      <div className='mt-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
        {label}
      </div>
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='h-20 animate-pulse rounded-2xl bg-muted/40' />
      <div className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]'>
        <div className='h-96 animate-pulse rounded-2xl bg-muted/40' />
        <div className='h-96 animate-pulse rounded-2xl bg-muted/40' />
      </div>
    </div>
  )
}
