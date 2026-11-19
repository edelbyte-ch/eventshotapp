import {
  Calendar,
  ExternalLink,
  Layers3,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { AdminDeleteEventButton } from '@/components/tenant/admin-delete-event-button'
import { Button } from '@/components/ui/button'
import type { EventForList } from '@/lib/admin-data'
import {
  EVENT_STATE_LABEL,
  type EventState,
  PLAN_LABEL,
  eventDay,
  formatEventDate,
  getEventState,
  todayInZurich,
} from '@/lib/event-state'
import { formatPhotoCount, isPhotoLimitReached } from '@/lib/photo-limits'

/**
 * Event-Liste nach dem Vorbild von Social Wall: eine Karte pro Event, die
 * ganze Karte fuehrt in die Verwaltung. Vorher standen an jeder Zeile fuenf
 * gleich laute Knoepfe (Einstellungen, Oeffnen, Slideshow, Bearbeiten,
 * Loeschen) — man musste lesen, statt zu klicken. Jetzt waehlt man zuerst das
 * Event; alles Weitere steht dort in Reitern.
 */

type Group = { state: EventState; label: string; events: EventForList[] }

export function EventGroups({
  events,
  showOwner = false,
  empty,
}: {
  events: EventForList[]
  /** Betreiber-Blick: Kunde und bezahlt/gratis anzeigen. */
  showOwner?: boolean
  empty?: ReactNode
}) {
  if (events.length === 0) return <>{empty}</>

  const today = todayInZurich()
  const withState = events.map((e) => ({ e, s: getEventState(e, today) }))
  const pick = (s: EventState) =>
    withState.filter((x) => x.s === s).map((x) => x.e)

  // Geplante aufsteigend: das naechste Fest steht oben. Vergangene
  // absteigend: das zuletzt gefeierte zuerst.
  const byDay = (dir: 1 | -1) => (a: EventForList, b: EventForList) =>
    dir * eventDay(a.date).localeCompare(eventDay(b.date))

  const groups: Group[] = [
    { state: 'live', label: 'Läuft heute', events: pick('live') },
    {
      state: 'scheduled',
      label: 'Geplant',
      events: pick('scheduled').sort(byDay(1)),
    },
    { state: 'ended', label: 'Vorbei', events: pick('ended').sort(byDay(-1)) },
    { state: 'stopped', label: 'Deaktiviert', events: pick('stopped') },
  ]

  return (
    <div className='space-y-10'>
      {groups
        .filter((g) => g.events.length > 0)
        .map((g) => (
          <section key={g.state}>
            <h2 className='mb-3 flex items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
              {g.state === 'live' && <LiveDot />}
              {g.label}
              <span className='tabular-nums'>{g.events.length}</span>
            </h2>
            <div className='space-y-2'>
              {g.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  state={g.state}
                  showOwner={showOwner}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}

export function LiveDot() {
  return (
    <span className='relative flex size-2 shrink-0' aria-hidden='true'>
      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60' />
      <span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
    </span>
  )
}

export function StateDot({ state }: { state: EventState }) {
  if (state === 'live') return <LiveDot />
  const color = state === 'scheduled' ? 'bg-primary' : 'bg-muted-foreground/40'
  return (
    <span
      className={`size-2 shrink-0 rounded-full ${color}`}
      aria-hidden='true'
    />
  )
}

function EventCard({
  event,
  state,
  showOwner,
}: {
  event: EventForList
  state: EventState
  showOwner: boolean
}) {
  const live = state === 'live'
  const href = `/tenant/event/${event.id}`
  const limit = event.uploadLimit
  const voll =
    typeof limit === 'number' && isPhotoLimitReached(event._count.photos, limit)

  return (
    <div className='group relative rounded-2xl border border-border/60 bg-card/60 transition-colors hover:border-border hover:bg-muted/40'>
      {/* Die ganze Karte fuehrt zum Event. Der Link liegt als Flaeche darunter,
          damit die Knoepfe rechts eigenstaendig bedienbar bleiben. */}
      <Link
        href={href}
        className='absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      >
        <span className='sr-only'>{event.name} verwalten</span>
      </Link>

      <div className='pointer-events-none relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5'>
        <div className='min-w-0 flex-1 space-y-1.5'>
          <div className='flex items-center gap-2.5'>
            <StateDot state={state} />
            <h3 className='truncate text-base font-semibold'>{event.name}</h3>
            {event.isDemo && (
              <span className='shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground'>
                Demo
              </span>
            )}
            {showOwner && !event.isDemo && (
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  event.stripeSessionId
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                }`}
              >
                {event.stripeSessionId ? 'bezahlt' : 'gratis'}
              </span>
            )}
          </div>

          {/* Randdaten in einer leisen Zeile statt als Reihe von Abzeichen. */}
          <p className='flex flex-wrap items-center gap-x-2 gap-y-1 pl-[18px] text-xs text-muted-foreground'>
            <span className={live ? 'font-medium text-emerald-500' : undefined}>
              {EVENT_STATE_LABEL[state]}
            </span>
            <span aria-hidden='true'>·</span>
            <span>{PLAN_LABEL[event.plan] ?? event.plan}</span>
            <span aria-hidden='true'>·</span>
            <span className='inline-flex items-center gap-1'>
              <Calendar className='size-3' />
              {formatEventDate(event.date)}
            </span>
            {event.location && (
              <>
                <span aria-hidden='true'>·</span>
                <span className='inline-flex min-w-0 items-center gap-1'>
                  <MapPin className='size-3 shrink-0' />
                  <span className='truncate'>{event.location}</span>
                </span>
              </>
            )}
          </p>

          {showOwner && (
            <p className='truncate pl-[18px] text-xs text-muted-foreground/80'>
              {event.tenant.company
                ? `${event.tenant.name} · ${event.tenant.company}`
                : event.tenant.name}{' '}
              · {event.tenant.email}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between gap-4 pl-[18px] sm:justify-end sm:pl-0'>
          <div className='shrink-0 text-left sm:w-24 sm:text-right'>
            <div
              className={`text-xl font-semibold leading-none tabular-nums ${voll ? 'text-destructive' : ''}`}
            >
              {formatPhotoCount(event._count.photos)}
            </div>
            <div className='mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              {typeof limit === 'number'
                ? `von ${formatPhotoCount(limit)} Fotos`
                : 'Fotos'}
            </div>
          </div>

          <div className='pointer-events-auto flex shrink-0 items-center gap-1'>
            <Button
              asChild
              variant='ghost'
              size='icon'
              className='size-9 text-muted-foreground hover:text-foreground'
            >
              <Link href={`${href}/einstellungen`} title='Einstellungen'>
                <SlidersHorizontal className='size-4' />
                <span className='sr-only'>Einstellungen</span>
              </Link>
            </Button>
            {/* Akzentfarbe nur fuer das Event, das heute laeuft — sonst heisst
                Orange nichts mehr. */}
            <Button
              asChild
              size='sm'
              variant={live ? 'default' : 'outline'}
              className='h-9 px-3.5 text-xs font-semibold'
            >
              <Link href={`${href}/slideshow`} target='_blank'>
                Slideshow
                <ExternalLink className='size-3.5' />
              </Link>
            </Button>
            {showOwner && (
              <AdminDeleteEventButton
                eventId={event.id}
                name={event.name}
                photos={event._count.photos}
                paid={Boolean(event.stripeSessionId)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EventsEmptyState({ action }: { action?: ReactNode }) {
  return (
    <div className='rounded-2xl border border-dashed border-border px-6 py-16 text-center'>
      <Layers3 className='mx-auto size-10 text-muted-foreground/60' />
      <h3 className='mt-5 text-lg font-bold'>Noch kein Event</h3>
      <p className='mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground'>
        Lege dein erstes Event an. Danach bekommst du einen QR-Code für deine
        Gäste und eine Slideshow für den Beamer.
      </p>
      {action && <div className='mt-6'>{action}</div>}
    </div>
  )
}
