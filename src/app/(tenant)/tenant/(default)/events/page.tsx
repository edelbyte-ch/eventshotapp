import { Suspense } from 'react'
import { getKundenForAdmin } from '@/actions/admin-events'
import { AdminNewEventDialog } from '@/components/tenant/admin-new-event-dialog'
import { EventGroups, EventsEmptyState } from '@/components/tenant/event-list'
import { NewEventDialog } from '@/components/tenant/new-event-dialog'
import { getVisibleEvents } from '@/lib/admin-data'
import { getCurrentTenant, isCurrentUserAdmin } from '@/lib/auth-guard'

/**
 * Alle Events ohne Demo-Karte. Dieselbe Liste wie im Dashboard, damit ein
 * Event an beiden Stellen gleich aussieht und gleich bedient wird.
 */
export default function EventsPage() {
  return (
    <div className='flex-1'>
      <div className='mx-auto w-full max-w-5xl space-y-10 px-5 py-10 sm:px-8'>
        <Suspense fallback={<ListSkeleton />}>
          <EventsContent />
        </Suspense>
      </div>
    </div>
  )
}

async function EventsContent() {
  const isAdmin = await isCurrentUserAdmin()
  // Der Betreiber sieht hier alles, auch die Demo-Events. Ein Kunde sieht nur
  // seine echten Feiern; sein Demo steht im Dashboard.
  const { events, tenantId } = await getVisibleEvents(isAdmin)
  const tenant = await getCurrentTenant()
  const kunden = isAdmin ? await getKundenForAdmin() : []

  const newEvent = tenant && (
    <NewEventDialog tenantId={tenant.id} defaultPlan='PREMIUM' />
  )

  return (
    <>
      <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
        <div className='space-y-2'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            {isAdmin ? 'Betreiber · alle Kunden' : 'Übersicht'}
          </p>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            {isAdmin ? `Alle Events (${events.length})` : 'Alle Events'}
          </h1>
        </div>
        <div className='flex flex-wrap gap-2'>
          {isAdmin && <AdminNewEventDialog kunden={kunden} />}
          {newEvent}
        </div>
      </div>

      <EventGroups
        events={events}
        showOwner={isAdmin}
        empty={
          tenantId !== null ? (
            <EventsEmptyState action={newEvent || undefined} />
          ) : null
        }
      />
    </>
  )
}

function ListSkeleton() {
  return (
    <div className='space-y-2'>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className='h-24 animate-pulse rounded-2xl bg-muted/40' />
      ))}
    </div>
  )
}
