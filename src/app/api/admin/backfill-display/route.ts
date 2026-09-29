import { GetObjectCommand } from '@aws-sdk/client-s3'
import { type NextRequest, NextResponse } from 'next/server'
import pLimit from 'p-limit'
import sharp from 'sharp'
import { orientedSize, storeDisplayImage } from '@/lib/image/process-photo'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'

export const maxDuration = 300

/**
 * Rechnet die Lightbox-Fassung fuer Fotos nach, die vor ihrer Einfuehrung
 * hochgeladen wurden. Bis dahin zeigt die Lightbox fuer sie das Original.
 *
 * Portionsweise (?limit=, Standard 25), damit ein Aufruf nicht in den
 * Timeout laeuft: so oft aufrufen, bis `remaining` 0 ist — oder `done` 0,
 * dann bleiben nur noch Fotos, die jedes Mal scheitern (siehe `failed` und
 * das Log). Nur zwei Bilder
 * gleichzeitig — ein 24-MP-Foto belegt dekodiert rund 100 MB, und derselbe
 * Container bedient nebenher die Gaeste.
 *
 * Korrigiert dabei auch width/height: die standen bisher vor der EXIF-Drehung
 * in der Datenbank, hochkant fotografierte Bilder also quer.
 *
 * Mit Bearer CRON_SECRET aufrufen, wie /api/admin/refresh-urls.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const limitParam = Number(req.nextUrl.searchParams.get('limit'))
  const take = Number.isInteger(limitParam) && limitParam > 0 ? Math.min(limitParam, 200) : 25

  const photos = await prisma.photo.findMany({
    where: { status: 'ready', displayUrl: null },
    select: { id: true, eventId: true, bucket: true, objectKey: true },
    orderBy: { createdAt: 'desc' },
    take,
  })

  const limit = pLimit(2)
  const failed: string[] = []
  let done = 0

  await Promise.all(
    photos.map((photo) =>
      limit(async () => {
        try {
          const original = await s3.send(
            new GetObjectCommand({ Bucket: photo.bucket, Key: photo.objectKey }),
          )
          if (!original.Body) throw new Error('Original not found')
          const buffer = Buffer.from(await original.Body.transformToByteArray())

          const [displayUrl, meta] = await Promise.all([
            storeDisplayImage(photo, buffer),
            sharp(buffer).metadata(),
          ])

          await prisma.photo.update({
            where: { id: photo.id },
            data: { displayUrl, ...orientedSize(meta) },
          })
          done++
        } catch (err) {
          console.error('[backfill-display]', photo.id, err)
          failed.push(photo.id)
        }
      }),
    ),
  )

  const remaining = await prisma.photo.count({
    where: { status: 'ready', displayUrl: null },
  })

  return NextResponse.json({ ok: true, done, failed, remaining })
}
