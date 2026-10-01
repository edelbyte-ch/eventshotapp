'use server'

import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'
import { PLAN } from '@/generated/prisma/enums'
import { notifyAdminEventCreated } from '@/lib/admin-notify'
import { requireAdminAction } from '@/lib/auth-guard'
import { PLAN_PHOTO_LIMITS } from '@/lib/photo-limits'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'

const PLAENE: PLAN[] = ['BASIC', 'PREMIUM', 'ENTERPRISE']

export type AdminKundeOption = {
  /** "tenant:<id>" oder "user:<id>" — ein Konto ohne Kundendatensatz. */
  wert: string
  label: string
  email: string
  art: 'tenant' | 'user'
}

/**
 * Kundenliste fuer die Auswahl beim kostenlosen Anlegen.
 *
 * Konten ohne Kundendatensatz stehen mit drin: sie entstehen, wenn addTenant
 * nach dem Anlegen des Users abbricht, und ohne diesen Weg kaeme so jemand
 * nie zu einem Event. Fuer sie wird der Tenant beim Anlegen nachgezogen.
 */
export async function getKundenForAdmin(): Promise<AdminKundeOption[]> {
  const guard = await requireAdminAction()
  if (!guard.ok) return []

  const [tenants, users] = await Promise.all([
    prisma.tenant.findMany({
      select: { id: true, name: true, company: true, email: true },
      orderBy: { name: 'asc' },
    }),
    prisma.user.findMany({
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    }),
  ])

  const belegt = new Set(tenants.map((t) => t.email.toLowerCase()))

  return [
    ...tenants.map((t) => ({
      wert: `tenant:${t.id}`,
      label: t.company ? `${t.name} · ${t.company}` : t.name,
      email: t.email,
      art: 'tenant' as const,
    })),
    ...users
      .filter((u) => !belegt.has(u.email.toLowerCase()))
      .map((u) => ({
        wert: `user:${u.id}`,
        label: `${u.name || u.email} (ohne Kundendatensatz)`,
        email: u.email,
        art: 'user' as const,
      })),
  ]
}

/** Vorhandenen Tenant finden oder fuer ein verwaistes Konto nachziehen. */
async function tenantAufloesen(auswahl: string): Promise<number | null> {
  if (auswahl.startsWith('tenant:')) {
    const id = Number(auswahl.slice('tenant:'.length))
    if (!Number.isInteger(id)) return null
    const t = await prisma.tenant.findUnique({
      where: { id },
      select: { id: true },
    })
    return t?.id ?? null
  }

  if (auswahl.startsWith('user:')) {
    const userId = auswahl.slice('user:'.length)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })
    if (!user) return null

    // Vielleicht gibt es den Tenant doch schon, nur ohne Verknuepfung.
    const vorhanden = await prisma.tenant.findUnique({
      where: { email: user.email },
      select: { id: true },
    })
    if (vorhanden) return vorhanden.id

    const tenant = await prisma.tenant.create({
      data: { name: user.name || user.email, email: user.email },
    })
    // Die Verknuepfung nachziehen, damit der Kunde das Event auch sieht.
    await prisma.user
      .update({ where: { id: user.id }, data: { tenantId: tenant.id } })
      .catch(() => {})
    return tenant.id
  }

  return null
}

export type AdminEventResult =
  | { ok: true; eventId: string }
  | { ok: false; message: string }

/**
 * Event kostenlos anlegen — der Weg an Stripe vorbei, den nur der Betreiber
 * hat.
 *
 * Das Gegenstueck zu createEvent, das bis zum 02.09.2026 fuer jeden offen
 * stand. Der Unterschied ist nicht die Funktion, sondern der Waechter davor:
 * requireAdminAction ganz oben, bevor irgendein Feld gelesen wird.
 *
 * Die Events tragen keine stripeSessionId. Daran erkennt die Kundenuebersicht
 * spaeter, was Umsatz war und was Kulanz.
 */
export async function createEventAsAdmin(data: {
  kunde: string
  name: string
  plan: PLAN
  date: string
  location?: string
  description?: string
}): Promise<AdminEventResult> {
  const guard = await requireAdminAction()
  if (!guard.ok) return { ok: false, message: guard.message }

  const name = data.name.trim()
  if (!name) return { ok: false, message: 'Bitte gib einen Namen an.' }
  if (!PLAENE.includes(data.plan)) {
    return { ok: false, message: 'Unbekanntes Paket.' }
  }

  const date = new Date(`${data.date}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return { ok: false, message: 'Bitte gib ein gültiges Datum an.' }
  }

  const tenantId = await tenantAufloesen(data.kunde)
  if (!tenantId) {
    return { ok: false, message: 'Diesen Kunden gibt es nicht (mehr).' }
  }

  const event = await prisma.event.create({
    data: {
      name,
      plan: data.plan,
      // Gratis heisst nicht unbegrenzt: Kulanz-Events bekommen dasselbe
      // Paket wie gekaufte, inklusive Foto-Grenze.
      uploadLimit: PLAN_PHOTO_LIMITS[data.plan],
      date,
      location: data.location?.trim() || null,
      description: data.description?.trim() || null,
      isActive: true,
      tenantId,
    },
  })

  await notifyAdminEventCreated({
    eventId: event.id,
    name: event.name,
    plan: event.plan,
    date: event.date,
    location: event.location,
    description: event.description,
    tenantId: event.tenantId,
    source: 'Admin-Bereich',
  })

  revalidatePath('/tenant')
  revalidatePath('/tenant/events')
  revalidatePath('/tenant/kunden')

  return { ok: true, eventId: event.id }
}

/**
 * Event endgueltig loeschen — nur der Betreiber. Gedacht fuer Testmuell und
 * Altlasten; Kunden haben diesen Weg bewusst nicht.
 *
 * Erst der Speicher, dann die Datenbank. Umgekehrt bliebe bei einem
 * Speicherfehler alles im Bucket liegen, worauf keine Zeile mehr zeigt —
 * und nichts raeumt es je wieder ab. So bricht der Vorgang ab, das Event
 * steht noch da, und ein zweiter Klick versucht es erneut.
 *
 * Geloescht wird alles unter events/<id>/ (Originale, Thumbnails,
 * Lightbox-Fassungen, auch verwaiste) und das Galerie-ZIP. Rechnungen
 * liegen unter invoices/ und bleiben: sie sind Buchhaltung, nicht Event.
 * Ein geloeschtes Demo-Event legt getOrCreateDemoEvent beim naechsten
 * Dashboard-Besuch des Kunden frisch an.
 */
export async function deleteEventAsAdmin(
  eventId: string,
): Promise<AdminEventResult> {
  const guard = await requireAdminAction()
  if (!guard.ok) return { ok: false, message: guard.message }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true, zipKey: true },
  })
  if (!event) return { ok: false, message: 'Dieses Event gibt es nicht (mehr).' }

  const bucket = process.env.S3_BUCKET as string
  try {
    const keys: string[] = []
    let token: string | undefined
    do {
      const page = await s3.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: `events/${event.id}/`,
          ContinuationToken: token,
        }),
      )
      for (const o of page.Contents ?? []) if (o.Key) keys.push(o.Key)
      token = page.IsTruncated ? page.NextContinuationToken : undefined
    } while (token)
    keys.push(event.zipKey ?? `zips/event-${event.id}.zip`)

    // DeleteObjects nimmt hoechstens 1000 Schluessel pro Aufruf.
    for (let i = 0; i < keys.length; i += 1000) {
      const res = await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: keys.slice(i, i + 1000).map((Key) => ({ Key })),
            Quiet: true,
          },
        }),
      )
      if (res.Errors?.length) {
        throw new Error(`${res.Errors.length} Objekte nicht geloescht`)
      }
    }
  } catch (err) {
    console.error('[delete-event] Speicher nicht geleert:', err)
    return {
      ok: false,
      message: 'Die Fotos konnten nicht gelöscht werden. Bitte nochmals versuchen.',
    }
  }

  // SlideshowSession haengt ohne Cascade am Event und muss zuerst weg;
  // Fotos und Slideshow-Einstellungen loescht die Datenbank mit.
  await prisma.$transaction([
    prisma.slideshowSession.deleteMany({ where: { eventId: event.id } }),
    prisma.event.delete({ where: { id: event.id } }),
  ])

  revalidatePath('/tenant')
  revalidatePath('/tenant/events')
  revalidatePath('/tenant/kunden')

  return { ok: true, eventId: event.id }
}
