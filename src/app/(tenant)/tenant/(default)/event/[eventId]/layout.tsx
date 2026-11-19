import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { StateDot } from '@/components/tenant/event-list'
import { EventTabs } from '@/components/tenant/event/event-tabs'
import { Button } from '@/components/ui/button'
import { requireOwnedEventPage } from '@/lib/auth-guard'
import {
  EVENT_STATE_LABEL,
  PLAN_LABEL,
  formatEventDate,
  getEventState,
} from '@/lib/event-state'

/**
 * Gemeinsamer Rahmen aller Event-Unterseiten: Zurueck, Name, Zustand, der
 * Knopf zur Slideshow und die Reiter. Next behaelt das Layout beim
 * Reiterwechsel bei, es tauscht nur der Inhalt darunter.
 */
export default function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ eventId: string }>
}) {
  return (
    <div className='mx-auto w-full max-w-5xl space-y-8 px-5 py-8 sm:px-8 sm:py-10'>
      <Suspense fallback={<HeaderFallback />}>
        <EventHeader params={params} />
      </Suspense>
      {children}
    </div>
  )
}

async function EventHeader({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params
  const event = await requireOwnedEventPage(eventId, {
    id: true,
    name: true,
    plan: true,
    date: true,
    location: true,
    isActive: true,
    isDemo: true,
  })
  const state = getEventState(event)

  return (
    <div className='space-y-5'>
      <Link
        href='/tenant'
        className='inline-flex h-8 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground'
      >
        <ArrowLeft className='size-3.5' />
        Alle Events
      </Link>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='min-w-0 space-y-2'>
          <div className='flex items-center gap-2.5'>
            <StateDot state={state} />
            <h1 className='truncate text-2xl font-bold tracking-tight sm:text-3xl'>
              {event.name}
            </h1>
          </div>
          <p className='flex flex-wrap items-center gap-x-2 gap-y-1 pl-[18px] text-xs text-muted-foreground'>
            <span
              className={
                state === 'live' ? 'font-medium text-emerald-500' : undefined
              }
            >
              {EVENT_STATE_LABEL[state]}
            </span>
            <span aria-hidden='true'>·</span>
            <span>
              {PLAN_LABEL[event.plan] ?? event.plan}
              {event.isDemo && ' · Demo'}
            </span>
            <span aria-hidden='true'>·</span>
            <span>{formatEventDate(event.date)}</span>
            {event.location && (
              <>
                <span aria-hidden='true'>·</span>
                <span>{event.location}</span>
              </>
            )}
          </p>
        </div>

        <Button asChild className='h-9 shrink-0 px-4 font-semibold'>
          <Link href={`/tenant/event/${event.id}/slideshow`} target='_blank'>
            Slideshow öffnen
            <ExternalLink className='size-3.5' />
          </Link>
        </Button>
      </div>

      <EventTabs eventId={event.id} />
    </div>
  )
}

function HeaderFallback() {
  return (
    <div className='space-y-5'>
      <div className='h-8 w-24 animate-pulse rounded bg-muted/60' />
      <div className='h-9 w-64 animate-pulse rounded bg-muted/60' />
      <div className='h-11 border-b border-border' />
    </div>
  )
}
