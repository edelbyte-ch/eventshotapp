'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import {
  COUNTED_PHOTOS,
  isPhotoLimitReached,
  photoLimitReachedMessage,
} from '@/lib/photo-limits'
import prisma from '@/lib/prisma'
import { s3 } from '@/lib/s3'

/**
 * Ergebnis als Wert statt als Ausnahme: Next.js schwaerzt in Produktion die
 * Meldung geworfener Fehler ("An error occurred in the Server Components
 * render"). Ein `throw` haette dem Gast also nur "Fehler beim Upload"
 * gezeigt — nicht den Grund, den er wissen muss.
 */
export type CreateUploadUrlResult =
  | { ok: true; uploadUrl: string; objectKey: string }
  | { ok: false; message: string; limitReached?: true }

/**
 * Was ein Handy nach dem QR-Scan hochladen darf. HEIC und HEIF gehoeren
 * ausdruecklich dazu — das ist das Standardformat der iPhone-Kamera, und ohne
 * sie waere die Haelfte der Gaeste ausgesperrt.
 */
const ERLAUBTE_TYPEN: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/pjpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/avif': 'avif',
}

/** 25 MB — grosszuegig fuer ein Handyfoto, eng genug gegen Missbrauch. */
const MAX_BYTES = 25 * 1024 * 1024

export async function createUploadUrl(
  eventId: string,
  mimeType: string,
  size?: number,
): Promise<CreateUploadUrlResult> {
  // Die Endung kam bisher aus dem Client-String (mimeType.split('/')[1]) und
  // der Typ wurde gar nicht geprueft: die signierte URL nahm jede Datei
  // entgegen, in beliebiger Groesse. Beides kostet Speicher und Egress und
  // laesst sich nicht zurueckdrehen, wenn es einmal im Bucket liegt.
  const extension = ERLAUBTE_TYPEN[mimeType.toLowerCase()]
  if (!extension) {
    return {
      ok: false,
      message: 'Dieses Dateiformat können wir nicht annehmen.',
    }
  }
  if (typeof size === 'number' && size > MAX_BYTES) {
    return {
      ok: false,
      message: `Das Bild ist zu gross (maximal ${MAX_BYTES / 1024 / 1024} MB).`,
    }
  }
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { isActive: true, isDemo: true, uploadLimit: true },
  })

  if (!event || !event.isActive) {
    return {
      ok: false,
      message: 'Dieses Event nimmt derzeit keine Fotos entgegen.',
    }
  }

  // Obergrenze hier pruefen, nicht erst beim Speichern: sonst laedt der Gast
  // sein Foto vollstaendig hoch und erfaehrt erst danach, dass es nicht
  // angenommen wird — Datenvolumen und Wartezeit fuer nichts.
  //
  // Das ist nur die fruehe Absage. Bei gleichzeitigen Uploads kommen hier
  // mehrere durch, solange noch ein Platz frei ist; verbindlich zaehlt
  // finalizeUpload unter Sperre und laesst nur so viele Fotos zu, wie Platz
  // ist.
  if (event.uploadLimit !== null) {
    // `failed` zaehlt nicht mit: sonst verbraucht ein Bild, das die
    // Verarbeitung nicht ueberstanden hat, einen Platz, den niemand je zu
    // sehen bekommt — die Galerie zeigt nur `ready`. Zwanzig fehlgeschlagene
    // HEIC-Uploads haetten die Demo sonst beendet, bevor ein einziges Foto
    // erschienen ist.
    const used = await prisma.photo.count({
      where: { eventId, ...COUNTED_PHOTOS },
    })
    if (isPhotoLimitReached(used, event.uploadLimit)) {
      return {
        ok: false,
        limitReached: true,
        message: photoLimitReachedMessage(event.uploadLimit, event.isDemo),
      }
    }
  }

  const objectKey = `events/${eventId}/original/${randomUUID()}.${extension}`

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET as string,
    Key: objectKey,
    ContentType: mimeType,
    CacheControl: 'public, max-age=31536000, immutable',
  })
  // ContentLength bewusst NICHT mitsigniert: das waere die harte Variante —
  // die URL naehme dann nur noch genau diese Bytezahl an —, laesst sich von
  // hier aus aber nicht gegen MinIO durchspielen. Schlaegt sie fehl, faellt
  // jeder Gaeste-Upload aus, und das ist der Weg, an dem am Hochzeitsabend
  // alles haengt. Die Groessenpruefung oben bleibt damit eine Angabe des
  // Clients; zusammen mit der Typ-Whitelist und den 60 Sekunden Gueltigkeit
  // deckelt sie den Missbrauch ausreichend, bis das jemand an einer echten
  // Instanz nachziehen kann.

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

  return { ok: true, uploadUrl, objectKey }
}
