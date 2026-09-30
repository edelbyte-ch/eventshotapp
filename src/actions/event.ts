'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { isCurrentUserAdmin, requireOwnedEventAction } from '@/lib/auth-guard'
import prisma from '@/lib/prisma'
import {
  getPromotionById,
  isPromotionEligible,
  parseEventDate,
  promotionMonthsLabel,
} from '@/lib/promotions'

/**
 * Hier stand bis 02.09.2026 zusaetzlich `createEvent`.
 *
 * Die Funktion nahm tenantId und plan unveraendert aus dem FormData und legte
 * damit ein Event an — ohne Session, ohne Stripe. Server Actions sind
 * HTTP-Endpunkte: dass sie nur von einer geschuetzten Seite aus aufgerufen
 * wird, schuetzt sie nicht. Wer die Action-ID aus dem Bundle las, legte sich
 * beliebig viele ENTERPRISE-Events gratis an, und weil tenantId eine
 * fortlaufende Zahl ist, auch bei fremden Kunden.
 *
 * Entfernt statt bewacht, weil sie keinen Aufrufer hatte: NewEventDialog nahm
 * die Prop `onCreate` entgegen, benutzte sie aber nie — das Formular ruft
 * createEventCheckout auf. Ein Endpunkt, den niemand braucht, wird am besten
 * gar nicht erst ausgeliefert.
 */

// --- Server Action: Event bearbeiten ---
export async function updateEvent(eventId: string, formData: FormData) {
  const guard = await requireOwnedEventAction(eventId, {
    id: true,
    promotionId: true,
  })
  if (!guard.ok) {
    return { ok: false as const, message: guard.message }
  }

  const name = String(formData.get('name') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim() || null
  const location = String(formData.get('location') ?? '').trim() || null
  const date = new Date(String(formData.get('date')))

  if (!name) {
    return { ok: false as const, message: 'Bitte gib einen Namen an.' }
  }
  if (Number.isNaN(date.getTime())) {
    return { ok: false as const, message: 'Bitte gib ein gültiges Datum an.' }
  }

  // Mit Aktion gebucht? Dann bleibt das Datum im Aktionszeitraum – sonst
  // liesse sich rabattiert fuer Dezember buchen und danach auf Juni
  // verschieben. Der Betreiber darf aus Kulanz trotzdem verschieben.
  const promotion = getPromotionById(guard.event.promotionId)
  if (
    promotion &&
    !isPromotionEligible(promotion, parseEventDate(formData.get('date'))) &&
    !(await isCurrentUserAdmin())
  ) {
    return {
      ok: false as const,
      message: `Dieses Event wurde mit der ${promotion.name} gebucht – das Datum muss im ${promotionMonthsLabel(promotion)} bleiben. Für eine Verschiebung melde dich bitte bei info@edelbyte.ch.`,
    }
  }

  try {
    await prisma.event.update({
      where: { id: guard.event.id },
      data: { name, description, location, date },
    })
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return { ok: false as const, message: 'Dieser Name ist schon vergeben.' }
    }
    // Unbekannte Fehler nicht verschlucken — sonst wirkt das Speichern
    // erfolgreich, obwohl nichts geaendert wurde.
    throw err
  }

  revalidatePath('/tenant')
  revalidatePath('/tenant/events')
  revalidatePath(`/tenant/event/${eventId}`)
  // Der Name steht auf der Gaesteseite.
  revalidatePath(`/event/${eventId}`)

  // redirect() wirft NEXT_REDIRECT und steht deshalb ausserhalb jedes try.
  // Vorher stand es IM try: der catch fing die Weiterleitung ab und meldete
  // sie per console.error als Fehler — gespeichert wurde, weitergeleitet nie.
  redirect('?updated=1')
}
