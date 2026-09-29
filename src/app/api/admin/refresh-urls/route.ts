import { displayKey, thumbKey } from '@/lib/image/keys'
import { getSignedViewUrl } from '@/lib/s3-presigned'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const secret = process.env.CRON_SECRET

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const photos = await prisma.photo.findMany({
    where: { status: 'ready' },
    select: { id: true, objectKey: true, eventId: true, displayUrl: true },
  })

  let updated = 0
  const batchSize = 50

  for (let i = 0; i < photos.length; i += batchSize) {
    const batch = photos.slice(i, i + batchSize)

    await Promise.all(
      batch.map(async (photo) => {
        const [url, thumbUrl, displayUrl] = await Promise.all([
          getSignedViewUrl(photo.objectKey, 60 * 60 * 24 * 7),
          getSignedViewUrl(thumbKey(photo.eventId, photo.id), 60 * 60 * 24 * 7),
          // Bestandsfotos ohne Lightbox-Fassung bleiben ohne, bis der Backfill lief.
          photo.displayUrl
            ? getSignedViewUrl(displayKey(photo.eventId, photo.id), 60 * 60 * 24 * 7)
            : null,
        ])

        await prisma.photo.update({
          where: { id: photo.id },
          // Ohne Fassung nichts schreiben: ein parallel laufender Backfill
          // haette sonst seine frische URL gleich wieder mit null ueberschrieben.
          data: { url, thumbUrl, ...(displayUrl && { displayUrl }) },
        })

        updated++
      }),
    )
  }

  return NextResponse.json({ ok: true, updated, total: photos.length })
}
