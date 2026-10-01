import {
  Calendar,
  Camera,
  Clock,
  Layers3,
  MapPin,
  MonitorPlayIcon,
  SettingsIcon,
  ShareIcon,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { EditEventDialog } from '@/components/tenant/edit-event-dialog'
import { DemoSection } from '@/components/tenant/demo-section'
import { NewEventDialog } from '@/components/tenant/new-event-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getKundenForAdmin } from '@/actions/admin-events'
import { AdminNewEventDialog } from '@/components/tenant/admin-new-event-dialog'
import { getVisibleEvents } from '@/lib/admin-data'
import { isCurrentUserAdmin } from '@/lib/auth-guard'
import { getOrCreateDemoEvent } from '@/lib/demo-event'
import { formatPhotoCount, isPhotoLimitReached } from '@/lib/photo-limits'
import prisma from '@/lib/prisma'
import type { EventForList } from '@/lib/admin-data'
import type { EventWithCount } from '@/types/EventWithCount'

/* --------------------------------------------
 * PAGE
 * -------------------------------------------- */

export default async function AdminEventsPage() {
  return (
    <div className='flex-1 bg-linear-to-br from-background via-muted/20 to-background'>
      <div className='container py-12 space-y-12'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
            <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
            <span className='text-sm font-medium text-primary'>
              <Suspense fallback='Dashboard'>
                <RollenHinweis />
              </Suspense>
            </span>
          </div>

          <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            EventShot Dashboard
          </h1>

          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Verwalte deine Events und verfolge deine Statistiken auf einen Blick
          </p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  )
}

/**
 * Steht in der Kopfzeile, damit der Betreiber auf einen Blick sieht, dass er
 * gerade fremde Daten vor sich hat und nicht die eigenen.
 */
async function RollenHinweis() {
  return (await isCurrentUserAdmin()) ? 'Betreiber · alle Kunden' : 'Live Dashboard'
}

/* --------------------------------------------
 * DATA + LOGIC
 * -------------------------------------------- */

async function DashboardContent() {
  const isAdmin = await isCurrentUserAdmin()

  // Der Betreiber sieht alles, inklusive der Demo-Events aller Kunden — genau
  // dafuer ist der Bereich da. Ein Kunde sieht nur seine eigenen Feiern; sein
  // Demo steht in einer eigenen Sektion und wuerde sonst die Kennzahlen
  // verzerren ("Fotos pro Event").
  const { events, tenantId } = await getVisibleEvents(isAdmin)

  // Der Betreiber braucht keinen eigenen Kundendatensatz, um hier
  // hereinzukommen — hat er aber einen, bekommt auch er sein Demo.
  const demo = tenantId ? await getOrCreateDemoEvent(tenantId) : null
  const kunden = isAdmin ? await getKundenForAdmin() : []
  const stats = getDashboardStats(events)

  const sortedEvents = [...events].sort((a, b) => {
    if (!a.date || !b.date) return 0
    const now = new Date()

    const aPast = a.date < now
    const bPast = b.date < now

    if (aPast !== bPast) return aPast ? 1 : -1
    return a.date.getTime() - b.date.getTime()
  })

  return (
    <>
      {demo && <DemoSection demo={demo} />}

      {/* KPI */}
      {stats.totalEvents > 0 && (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            label='Vergangene Events'
            value={stats.past}
            icon={Clock}
            color='blue'
            footer='Abgeschlossen'
          />
          <StatCard
            label='Bevorstehende Events'
            value={stats.upcoming}
            icon={Calendar}
            color='green'
            footer='Geplant'
          />
          <StatCard
            label='Fotos insgesamt'
            value={stats.totalPhotos.toLocaleString()}
            icon={Camera}
            color='purple'
            footer='Hochgeladen'
          />
          <StatCard
            label='Ø Fotos / Event'
            value={stats.avgPhotos}
            icon={TrendingUp}
            color='orange'
            footer='Durchschnitt'
          />
        </div>
      )}

      {/* EVENTS */}
      <div className='space-y-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h2 className='text-3xl font-bold'>
              {isAdmin ? 'Alle Events' : 'Events verwalten'}
            </h2>
            <p className='text-muted-foreground'>
              {isAdmin
                ? 'Alle Kunden, inklusive Demo-Events'
                : 'Erstelle und verwalte deine EventShot Events'}
            </p>
          </div>

          <div className='flex flex-wrap gap-2'>
            {isAdmin && <AdminNewEventDialog kunden={kunden} />}
            {tenantId !== null && (
              <NewEventDialog tenantId={tenantId} defaultPlan='PREMIUM' />
            )}
          </div>
        </div>

        <Card className='rounded-3xl border-0 shadow-xl bg-card/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-xl flex items-center gap-2'>
              <Layers3 className='h-5 w-5 text-primary' />
              {isAdmin ? `Events (${sortedEvents.length})` : 'Bevorstehende Events'}
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-4'>
            {sortedEvents.length === 0 && tenantId !== null && (
              <EmptyState tenantId={tenantId} />
            )}

            {sortedEvents.map((ev) => (
              <EventRow key={ev.id} event={ev} showOwner={isAdmin} />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

/* --------------------------------------------
 * HELPERS
 * -------------------------------------------- */

function getDashboardStats(events: EventWithCount[]) {
  const now = new Date()

  const past = events.filter((e) => e.date && e.date < now).length
  const upcoming = events.filter((e) => e.date && e.date > now).length
  const totalPhotos = events.reduce((s, e) => s + e._count.photos, 0)

  return {
    totalEvents: events.length,
    past,
    upcoming,
    totalPhotos,
    avgPhotos: events.length > 0 ? Math.round(totalPhotos / events.length) : 0,
  }
}

/* --------------------------------------------
 * COMPONENTS
 * -------------------------------------------- */

export function EventRow({
  event,
  showOwner = false,
}: {
  event: EventForList | EventWithCount
  /** Nur im Betreiber-Blick: wem gehoert das, und war es bezahlt? */
  showOwner?: boolean
}) {
  // EventWithCount kennt diese Felder nicht — die Kundenansicht braucht sie
  // auch nicht, deshalb hier nachsichtig statt zwei getrennte Komponenten.
  const voll = event as Partial<EventForList>

  return (
    <div className='p-6 rounded-2xl border border-border/50 hover:bg-muted/30 transition'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-3'>
            <h3 className='font-semibold text-lg'>{event.name}</h3>

            <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20'>
              {event.plan}
            </span>

            {voll.isDemo && (
              <span className='rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground'>
                Demo
              </span>
            )}

            {showOwner && !voll.isDemo && (
              <span
                className={
                  voll.stripeSessionId
                    ? 'rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600'
                    : 'rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600'
                }
              >
                {voll.stripeSessionId ? 'bezahlt' : 'gratis'}
              </span>
            )}

            {!event.isActive && (
              <span className='rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground'>
                inaktiv
              </span>
            )}
          </div>

          {showOwner && voll.tenant && (
            <p className='text-sm font-medium text-muted-foreground'>
              {voll.tenant.company
                ? `${voll.tenant.name} · ${voll.tenant.company}`
                : voll.tenant.name}{' '}
              <span className='font-normal'>({voll.tenant.email})</span>
            </p>
          )}

          <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
            {event.date && (
              <span className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                {event.date.toLocaleDateString('de-DE')}
              </span>
            )}
            {event.location && (
              <span className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' />
                {event.location}
              </span>
            )}
            {typeof voll.uploadLimit === 'number' ? (
              <span
                className={`flex items-center gap-1 tabular-nums ${
                  isPhotoLimitReached(event._count.photos, voll.uploadLimit)
                    ? 'text-destructive'
                    : ''
                }`}
              >
                <Camera className='h-4 w-4' />
                {formatPhotoCount(event._count.photos)} /{' '}
                {formatPhotoCount(voll.uploadLimit)} Fotos
              </span>
            ) : (
              event._count.photos > 0 && (
                <span className='flex items-center gap-1'>
                  <Camera className='h-4 w-4' />
                  {event._count.photos} Fotos
                </span>
              )
            )}
          </div>

          {event.description && (
            <p className='text-sm text-muted-foreground line-clamp-2'>
              {event.description}
            </p>
          )}
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Button variant={'secondary'} asChild>
            <Link href={`/tenant/event/${event.id}`}>
              <SettingsIcon />
              Einstellungen
            </Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link target='_blank' href={`/event/${event.id}`}>
              <ShareIcon />
              Öffnen
            </Link>
          </Button>
          <Button variant={'default'} asChild>
            <Link href={`/tenant/event/${event.id}/slideshow`} target='_blank'>
              <MonitorPlayIcon />
              Slideshow
            </Link>
          </Button>
          <EditEventDialog event={event} />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ tenantId }: { tenantId: number }) {
  return (
    <div className='text-center py-16'>
      <Layers3 className='h-12 w-12 mx-auto mb-4 text-muted-foreground' />
      <h3 className='text-lg font-semibold mb-2'>
        Noch keine Events vorhanden
      </h3>
      <p className='text-muted-foreground mb-6'>
        Erstelle dein erstes Event und starte mit dem Sammeln von Fotos.
      </p>
      <NewEventDialog
        tenantId={tenantId}
        defaultPlan='PREMIUM'
      />
    </div>
  )
}

const STAT_COLORS = {
  blue: {
    icon: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  green: {
    icon: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10',
  },
  purple: {
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10',
  },
  orange: {
    icon: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10',
  },
} as const

type StatColor = keyof typeof STAT_COLORS

function StatCard({
  label,
  value,
  color = 'blue',
  icon: Icon,
  footer,
}: {
  label: string
  value: number | string
  color?: StatColor
  icon: React.ElementType
  footer: string
}) {
  const styles = STAT_COLORS[color]

  return (
    <Card className='group relative overflow-hidden rounded-3xl border-0 shadow-lg p-8'>
      {/* background tint */}
      <div
        className={`absolute inset-0 ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      <div className='relative'>
        <div className='flex justify-between items-center mb-4'>
          <div className={`p-3 rounded-2xl ${styles.bg}`}>
            <Icon className={`h-6 w-6 ${styles.icon}`} />
          </div>
          <span className='text-sm text-muted-foreground'>{label}</span>
        </div>

        <div className='text-4xl font-bold mb-1'>{value}</div>
        <div className='text-sm text-muted-foreground'>{footer}</div>
      </div>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className='space-y-8'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i.toString()} className='h-40 animate-pulse bg-muted/40' />
        ))}
      </div>
      <Card className='h-96 animate-pulse bg-muted/40' />
    </div>
  )
}
