/**
 * Bildverarbeitung — bewusst KEINE Server Action.
 *
 * Die Datei lag bis 02.09.2026 unter src/actions/ und trug 'use server'.
 * Damit war sie ein oeffentlicher HTTP-Endpunkt, obwohl nur intern gemeint:
 * ein einzelner Aufruf laedt das Original aus S3, laesst sharp Metadaten,
 * BlurHash und Thumbnail rechnen und schreibt zwei S3-Objekte — ein billiger
 * Request wird zu CPU-, RAM- und Storage-Last.
 *
 * Eine Session-Pruefung waere der falsche Weg gewesen: finalizeUpload ruft
 * die Funktion im Gast-Kontext ohne Session auf. Richtig ist, sie gar nicht
 * erst als Endpunkt auszuliefern.
 */

import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { generateBlurHash } from '@/lib/image/blurhash'
import { displayKey, thumbKey } from '@/lib/image/keys'
import { generateDisplayImage, generateThumbnail } from '@/lib/image/resize'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'
import { getSignedViewUrl } from '@/lib/s3-presigned'

const URL_TTL = 60 * 60 * 24 * 7 // 7 days

/**
 * Rechnet die Lightbox-Fassung, legt sie ab und liefert die signierte URL.
 * Eigene Funktion, weil auch der Backfill fuer Bestandsfotos sie braucht.
 */
export async function storeDisplayImage(
  photo: { id: string; eventId: string; bucket: string },
  originalBuffer: Buffer,
) {
  const key = displayKey(photo.eventId, photo.id)

  await s3.send(
    new PutObjectCommand({
      Bucket: photo.bucket,
      Key: key,
      Body: await generateDisplayImage(originalBuffer),
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  return getSignedViewUrl(key, URL_TTL)
}

/**
 * Masse so, wie das Bild angezeigt wird. meta.width/height sind die rohen
 * Pixel vor der EXIF-Drehung — hochkant gehaltene Handyfotos kamen damit
 * quer in die Datenbank (6 von 41 im gemessenen Event).
 */
export function orientedSize(meta: sharp.Metadata) {
  return {
    width: meta.autoOrient?.width ?? meta.width ?? 1,
    height: meta.autoOrient?.height ?? meta.height ?? 1,
  }
}

export async function processPhoto(photoId: string) {
  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
  })

  if (!photo) throw new Error('Photo not found')

  const original = await s3.send(
    new GetObjectCommand({
      Bucket: photo.bucket,
      Key: photo.objectKey,
    }),
  )

  if (!original.Body) throw new Error('Original not found')

  let originalBuffer = Buffer.from(await original.Body.transformToByteArray()) as Buffer

  // 🔄 Convert SVG to PNG if needed
  let finalObjectKey = photo.objectKey
  let finalMimeType = photo.mimeType

  if (photo.mimeType === 'image/svg+xml') {
    console.log('🔄 Converting SVG to PNG...')

    // Convert SVG to PNG with good quality
    const convertedBuffer = await sharp(originalBuffer)
      .png({ quality: 95 })
      .toBuffer()

    // Upload converted PNG
    const newKey = photo.objectKey.replace(/\.svg$/i, '.png')
    await s3.send(
      new PutObjectCommand({
        Bucket: photo.bucket,
        Key: newKey,
        Body: convertedBuffer,
        ContentType: 'image/png',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    )

    originalBuffer = convertedBuffer as Buffer
    finalObjectKey = newKey
    finalMimeType = 'image/png'
  }

  // 🔥 Dimensionen lesen
  const image = sharp(originalBuffer)
  const meta = await image.metadata()

  // Die Lightbox-Fassung laeuft neben BlurHash und Thumbnail her: der Gast
  // wartet beim Upload auf processPhoto, eine Rechnung hintendran waere
  // spuerbar. Ein gemeinsames Promise.all, damit ein Fehler nirgends
  // unbehandelt liegen bleibt.
  const [blurHash, thumbBuffer, displayUrl] = await Promise.all([
    generateBlurHash(originalBuffer),
    generateThumbnail(originalBuffer),
    storeDisplayImage(photo, originalBuffer),
  ])

  const thumbObjectKey = thumbKey(photo.eventId, photo.id)

  await s3.send(
    new PutObjectCommand({
      Bucket: photo.bucket,
      Key: thumbObjectKey,
      Body: thumbBuffer,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  // Generate presigned URLs with 7-day expiration
  const [url, thumbUrl] = await Promise.all([
    getSignedViewUrl(finalObjectKey, URL_TTL),
    getSignedViewUrl(thumbObjectKey, URL_TTL),
  ])

  await prisma.photo.update({
    where: { id: photo.id },
    data: {
      objectKey: finalObjectKey,
      mimeType: finalMimeType,
      url,
      thumbUrl,
      displayUrl,
      blurHash,
      ...orientedSize(meta),
    },
  })
}
