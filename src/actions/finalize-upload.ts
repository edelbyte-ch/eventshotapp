'use server'

import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { processPhoto } from '@/lib/image/process-photo'
import {
  COUNTED_PHOTOS,
  isPhotoLimitReached,
  photoLimitReachedMessage,
} from '@/lib/photo-limits'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'
import { getSignedViewUrl } from '@/lib/s3-presigned'

export async function finalizeUpload({
  eventId,
  objectKey,
  mimeType,
  size,
}: {
  eventId: string
  objectKey: string
  mimeType: string
  size: number
}) {
  // Bewusst OHNE Session: das ist Schritt 3 des Gaesteweges nach dem
  // QR-Scan. Der objectKey kommt aber vom Client, und ihm zu glauben war der
  // Fehler — ein Gast konnte den Key eines fremden Events eintragen und sich
  // das Bild ueber die eigene Galerie ausliefern lassen. createUploadUrl
  // erzeugt Keys ausschliesslich in dieser Form, also wird sie erzwungen.
  if (
    !objectKey.startsWith(`events/${eventId}/original/`) ||
    objectKey.includes('..')
  ) {
    return { ok: false as const, message: 'Ungültiger Upload.' }
  }

  // Zweitens umging dieser Weg createUploadUrl komplett: weder die Pruefung
  // auf isActive noch die Foto-Obergrenze griffen hier. Wer die Action direkt
  // aufrief, schrieb an beiden vorbei.
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { isActive: true, isDemo: true, uploadLimit: true },
  })
  if (!event?.isActive) {
    return {
      ok: false as const,
      message: 'Dieses Event nimmt derzeit keine Fotos entgegen.',
    }
  }

  // Generate presigned URL with 7-day expiration
  const url = await getSignedViewUrl(objectKey, 60 * 60 * 24 * 7) // 7 days

  const data = {
    bucket: process.env.S3_BUCKET as string,
    objectKey,
    url,
    thumbUrl: url, // temporary, will be updated in processPhoto
    originalName: '',
    mimeType,
    size,
    eventId,
    status: 'processing',
    approved: true,
  }

  // 1️⃣ Foto sofort anlegen — bei begrenzten Events unter Sperre.
  //
  // Zaehlen und Anlegen muessen eine Einheit sein. Getrennt kamen die drei
  // Arbeiter eines Stapel-Uploads (oder zwei Gaeste im selben Augenblick)
  // alle mit "249 von 250" durch und legten alle an. FOR UPDATE auf der
  // Event-Zeile reiht die Uploads desselben Events hintereinander; gehalten
  // wird die Sperre nur fuer count + insert, nicht fuer die Bildverarbeitung
  // danach. Die Grenze wird unter der Sperre neu gelesen, nicht von oben
  // uebernommen. Unbegrenzte Events gehen ohne Sperre durch — dort gibt es
  // nichts abzuzaehlen, und eine Feier mit 800 Gaesten soll nicht anstehen.
  const angelegt =
    event.uploadLimit === null
      ? { photo: await prisma.photo.create({ data }), limit: null }
      : await prisma.$transaction(async (tx) => {
          const [locked] = await tx.$queryRaw<{ uploadLimit: number | null }[]>`
            SELECT "uploadLimit" FROM "Event" WHERE id = ${eventId} FOR UPDATE
          `
          const limit = locked?.uploadLimit ?? null
          const used = await tx.photo.count({
            where: { eventId, ...COUNTED_PHOTOS },
          })
          if (limit !== null && isPhotoLimitReached(used, limit)) {
            return { photo: null, limit }
          }
          return { photo: await tx.photo.create({ data }), limit }
        })

  if (angelegt.photo === null) {
    // Das Original liegt schon im Speicher, gehoert aber zu keinem Foto
    // mehr — ohne Datensatz raeumt es auch der Ablauf-Job nie ab.
    await s3
      .send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET as string,
          Key: objectKey,
        }),
      )
      .catch((err) => {
        console.error('[finalize-upload] Original nicht geloescht:', err)
      })

    return {
      ok: false as const,
      limitReached: true as const,
      message: photoLimitReachedMessage(angelegt.limit, event.isDemo),
    }
  }
  const { photo } = angelegt

  // 🔔 WICHTIG: Event „anfassen“
  await prisma.event.update({
    where: { id: eventId },
    data: { photosUpdatedAt: new Date() },
  })

  try {
    // 2️⃣ Bild verarbeiten
    await processPhoto(photo.id)

    // 3️⃣ Status final
    await prisma.photo.update({
      where: { id: photo.id },
      data: { status: 'ready' },
    })

    // 🔔 NOCHMALS Event anfassen (ready!)
    await prisma.event.update({
      where: { id: eventId },
      data: { photosUpdatedAt: new Date() },
    })
  } catch (err) {
    await prisma.photo.update({
      where: { id: photo.id },
      data: { status: 'failed' },
    })

    // 🔔 auch Fehler sind relevant
    await prisma.event.update({
      where: { id: eventId },
      data: { photosUpdatedAt: new Date() },
    })

    throw err
  }

  return { ok: true as const, photoId: photo.id }
}
