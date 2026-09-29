import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { displayKey, thumbKey } from '@/lib/image/keys'
import { computeGalleryDeleteAt } from '@/lib/retention'
import { s3 } from '@/lib/s3'

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/**
 * Löscht Event-Fotos automatisch nach Ablauf der plan-abhängigen
 * Galerie-Aufbewahrung (Basic 7 / Premium 30 / Enterprise 90 Tage nach Event).
 * Entfernt Storage-Objekte und Photo-Datensätze. Event und Konto bleiben.
 *
 * Per Dokploy-Schedule (täglich) mit Bearer CRON_SECRET aufrufen.
 */
async function handle(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 500 },
    )
  }
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = Date.now()

  const events = await prisma.event.findMany({
    // Demo-Events bleiben verschont. Ihr Datum ist der Tag der Registrierung,
    // ihr Plan ist ENTERPRISE — nach 90 Tagen wuerde der Aufraeumlauf also
    // genau dem Kunden die Fotos loeschen, der die Demo spaeter ausprobiert,
    // und der Zaehler spraenge stillschweigend auf 0 von 20 zurueck. Die
    // Datenmenge ist durch uploadLimit ohnehin gedeckelt.
    where: { photos: { some: {} }, isDemo: false },
    select: { id: true, plan: true, date: true, createdAt: true },
  })

  const expired = events.filter(
    (e) => computeGalleryDeleteAt(e.plan, e.date, e.createdAt).getTime() < now,
  )

  let eventsCleaned = 0
  let photosDeleted = 0
  let objectsDeleted = 0

  for (const event of expired) {
    const photos = await prisma.photo.findMany({
      where: { eventId: event.id },
      select: { id: true, bucket: true, objectKey: true },
    })
    if (photos.length === 0) continue

    // Nach Bucket gruppieren (in der Regel nur einer)
    const byBucket = new Map<string, string[]>()
    for (const p of photos) {
      if (!p.objectKey) continue
      const list = byBucket.get(p.bucket) ?? []
      // Abgeleitete Fassungen mit: sie liegen nicht in der Datenbank und
      // blieben sonst nach Ablauf der Aufbewahrung im Bucket zurueck.
      list.push(
        p.objectKey,
        thumbKey(event.id, p.id),
        displayKey(event.id, p.id),
      )
      byBucket.set(p.bucket, list)
    }

    for (const [bucket, keys] of byBucket) {
      for (const batch of chunk(keys, 1000)) {
        try {
          await s3.send(
            new DeleteObjectsCommand({
              Bucket: bucket,
              Delete: { Objects: batch.map((Key) => ({ Key })), Quiet: true },
            }),
          )
          objectsDeleted += batch.length
        } catch (err) {
          console.error('[cleanup-photos] S3 delete failed for event', event.id, err)
        }
      }
    }

    const res = await prisma.photo.deleteMany({ where: { eventId: event.id } })
    photosDeleted += res.count
    eventsCleaned += 1
  }

  const summary = {
    ok: true,
    checkedEvents: events.length,
    expiredEvents: expired.length,
    eventsCleaned,
    photosDeleted,
    objectsDeleted,
    at: new Date(now).toISOString(),
  }
  console.log('[cleanup-photos]', JSON.stringify(summary))
  return NextResponse.json(summary)
}

export const POST = handle
export const GET = handle
