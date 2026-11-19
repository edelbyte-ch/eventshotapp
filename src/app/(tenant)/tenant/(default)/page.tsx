import { Suspense } from 'react'
import { getKundenForAdmin } from '@/actions/admin-events'
import { AdminNewEventDialog } from '@/components/tenant/admin-new-event-dialog'
import { DemoSection } from '@/components/tenant/demo-section'
import { EventGroups, EventsEmptyState } from '@/components/tenant/event-list'
import { NewEventDialog } from '@/components/tenant/new-event-dialog'
import { getVisibleEvents } from '@/lib/admin-data'
import { isCurrentUserAdmin } from '@/lib/auth-guard'
import { getOrCreateDemoEvent } from '@/lib/demo-event'

/**
 * Dashboard nach dem Vorbild von Social Wall: oben eine Zeile, die sagt, wo
 * man steht, darunter das Demo und die Events nach Zustand gruppiert.
 *
 * Vorher fuehrten vier KPI-Kacheln ("Vergangene Events", "O Fotos / Event"),
 * und die Events kamen erst darunter in einer Liste mit fuenf Knoepfen pro
 * Zeile. Wer ins Dashboard kommt, will fast immer zu einem bestimmten Event.
 */
export default function DashboardPage() {
  return (
    <div className='flex-1'>
      <div className='mx-auto w-full max-w-5xl space-y-10 px-5 py-10 sm:px-8'>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  )
}

async function DashboardContent() {
  const isAdmin = await isCurrentUserAdmin()

  // Der Betreiber sieht alles, inklusive der Demo-Events aller Kunden. Ein
  // Kunde sieht nur seine echten Feiern; sein Demo hat die eigene Karte.
  const { events, tenantId } = await getVisibleEvents(isAdmin)
  const demo = tenantId ? await getOrCreateDemoEvent(tenantId) : null
  const kunden = isAdmin ? await getKundenForAdmin() : []
  const fotos = events.reduce((n, e) => n + e._count.photos, 0)

  const newEvent = tenantId !== null && (
    <NewEventDialog tenantId={tenantId} defaultPlan='PREMIUM' />
  )

  return (
    <>
      <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
        <div className='space-y-2'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            {isAdmin ? 'Betreiber · alle Kunden' : 'Dashboard'}
          </p>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            {isAdmin ? 'Alle Events' : 'Meine Events'}
          </h1>
          {events.length > 0 && (
            <p className='text-sm text-muted-foreground'>
              <span className='font-medium text-foreground tabular-nums'>
                {fotos.toLocaleString('de-CH')}
              </span>{' '}
              Fotos insgesamt über{' '}
              <span className='font-medium text-foreground tabular-nums'>
                {events.length}
              </span>{' '}
              {events.length === 1 ? 'Event' : 'Events'}
            </p>
          )}
        </div>

        <div className='flex flex-wrap gap-2'>
          {isAdmin && <AdminNewEventDialog kunden={kunden} />}
          {newEvent}
        </div>
      </div>

      {demo && <DemoSection demo={demo} />}

      <EventGroups
        events={events}
        showOwner={isAdmin}
        empty={<EventsEmptyState action={newEvent || undefined} />}
      />
    </>
  )
}

function DashboardSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <div className='h-3 w-24 animate-pulse rounded bg-muted/60' />
        <div className='h-9 w-64 animate-pulse rounded bg-muted/60' />
      </div>
      <div className='h-44 animate-pulse rounded-3xl bg-muted/40' />
      <div className='space-y-2'>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className='h-24 animate-pulse rounded-2xl bg-muted/40'
          />
        ))}
      </div>
    </div>
  )
}
