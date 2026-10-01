import 'server-only'

import type { Prisma } from '@/generated/prisma/client'
import { getCurrentTenant, isCurrentUserAdmin } from '@/lib/auth-guard'
import { COUNTED_PHOTOS } from '@/lib/photo-limits'
import prisma from '@/lib/prisma'
import { PLAN_PRICES } from '@/lib/stripe'

/** Auswahl der Event-Felder, die Dashboard und Liste brauchen. */
const EVENT_SELECT = {
  id: true,
  name: true,
  date: true,
  location: true,
  description: true,
  plan: true,
  isActive: true,
  isDemo: true,
  uploadLimit: true,
  stripeSessionId: true,
  tenant: { select: { id: true, name: true, company: true, email: true } },
  // Gezaehlt wie bei der Upload-Grenze, sonst steht neben "von 250" eine
  // andere Zahl als die, an der der Upload tatsaechlich stoppt.
  _count: { select: { photos: { where: COUNTED_PHOTOS } } },
} as const

export type EventForList = Prisma.EventGetPayload<{ select: typeof EVENT_SELECT }>

export type EventScope = {
  isAdmin: boolean
  /** null, wenn der Betreiber selbst keinen eigenen Kundendatensatz hat. */
  tenantId: number | null
  events: EventForList[]
}

/**
 * Welche Events darf der Anfragende sehen?
 *
 * Eine einzige Stelle statt einer Verzweigung in jeder Seite — genau daran
 * ist die Berechtigungspruefung hier schon einmal gescheitert.
 *
 * @param withDemos false blendet Demo-Events aus. Der Kunde sieht sein Demo
 *   in einer eigenen Sektion, nicht in der Liste seiner echten Feiern; der
 *   Betreiber will sie dagegen ausdruecklich mitsehen.
 */
export async function getVisibleEvents(
  withDemos: boolean,
): Promise<EventScope> {
  const isAdmin = await isCurrentUserAdmin()
  const tenant = await getCurrentTenant()

  if (!isAdmin && !tenant) {
    return { isAdmin: false, tenantId: null, events: [] }
  }

  const where: Prisma.EventWhereInput = isAdmin
    ? {}
    : { tenantId: tenant?.id }
  if (!withDemos) where.isDemo = false

  const events = await prisma.event.findMany({
    where,
    select: EVENT_SELECT,
    orderBy: { date: 'desc' },
  })

  return { isAdmin, tenantId: tenant?.id ?? null, events }
}

export type CustomerRow = {
  tenantId: number
  name: string
  company: string | null
  email: string
  seit: Date
  /** Hat sich der Kunde je angemeldet? Bei kaputter Registrierung fehlt der User. */
  hatKonto: boolean
  events: number
  bezahlteEvents: number
  gratisEvents: number
  fotos: number
  umsatzRappen: number
  demoFotos: number | null
  demoGrenze: number | null
  letztesEvent: Date | null
}

export type CustomerOverview = {
  kunden: CustomerRow[]
  /** Konten ohne Kundendatensatz — Registrierung ist auf halbem Weg stehengeblieben. */
  konnteNichtZugeordnet: { id: string; name: string; email: string; seit: Date }[]
  summe: {
    kunden: number
    events: number
    bezahlteEvents: number
    fotos: number
    umsatzRappen: number
  }
}

/**
 * Kundenuebersicht fuer den Betreiber.
 *
 * "Gekauft" heisst: das Event traegt eine stripeSessionId. Kostenlos vom
 * Betreiber angelegte und Demo-Events tragen keine — daran, und nicht am
 * Plan, laesst sich Umsatz von Kulanz unterscheiden.
 *
 * Umsatz: seit dem Preis-Snapshot (30.09.2026) der tatsaechlich bezahlte
 * Betrag (amountPaid, inkl. Aktionen und Gutscheincodes). Aeltere Events
 * haben keinen Snapshot und zaehlen weiter mit dem Listenpreis aus
 * PLAN_PRICES — wer damals einen Rabattcode einloeste, erscheint dort zu
 * hoch. Fuer eine Buchhaltung taugt die Summe deshalb nicht, fuer einen
 * Ueberblick schon — sie ist entsprechend beschriftet.
 */
export async function getCustomerOverview(): Promise<CustomerOverview> {
  const [tenants, verwaisteUser] = await Promise.all([
    prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        company: true,
        email: true,
        createdAt: true,
        users: { select: { id: true }, take: 1 },
        events: {
          select: {
            plan: true,
            date: true,
            isDemo: true,
            uploadLimit: true,
            stripeSessionId: true,
            amountPaid: true,
            _count: { select: { photos: true } },
          },
        },
      },
    }),
    // Konten, zu denen kein Tenant mit derselben E-Mail existiert. Das
    // entsteht, wenn addTenant nach dem Anlegen des Users abbricht — der
    // Kunde kommt dann nirgends mehr hin und meldet sich vermutlich nie.
    prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const tenantMails = new Set(tenants.map((t) => t.email.toLowerCase()))

  const kunden: CustomerRow[] = tenants.map((t) => {
    const echte = t.events.filter((e) => !e.isDemo)
    const bezahlt = echte.filter((e) => e.stripeSessionId !== null)
    const demo = t.events.find((e) => e.isDemo)

    return {
      tenantId: t.id,
      name: t.name,
      company: t.company,
      email: t.email,
      seit: t.createdAt,
      hatKonto: t.users.length > 0,
      events: echte.length,
      bezahlteEvents: bezahlt.length,
      gratisEvents: echte.length - bezahlt.length,
      fotos: t.events.reduce((n, e) => n + e._count.photos, 0),
      umsatzRappen: bezahlt.reduce(
        (n, e) => n + (e.amountPaid ?? PLAN_PRICES[e.plan] ?? 0),
        0,
      ),
      demoFotos: demo ? demo._count.photos : null,
      demoGrenze: demo ? (demo.uploadLimit ?? null) : null,
      letztesEvent: echte.reduce<Date | null>(
        (neuestes, e) =>
          !neuestes || e.date > neuestes ? e.date : neuestes,
        null,
      ),
    }
  })

  return {
    kunden,
    konnteNichtZugeordnet: verwaisteUser
      .filter((u) => !tenantMails.has(u.email.toLowerCase()))
      .map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        seit: u.createdAt,
      })),
    summe: {
      kunden: kunden.length,
      events: kunden.reduce((n, k) => n + k.events, 0),
      bezahlteEvents: kunden.reduce((n, k) => n + k.bezahlteEvents, 0),
      fotos: kunden.reduce((n, k) => n + k.fotos, 0),
      umsatzRappen: kunden.reduce((n, k) => n + k.umsatzRappen, 0),
    },
  }
}
