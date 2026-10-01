'use client'

import {
  AlertCircle,
  Ban,
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  UploadCloud,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'
import { createUploadUrl } from '@/actions/create-upload-url'
import { finalizeUpload } from '@/actions/finalize-upload'
import { Button } from '@/components/ui/button'
import { formatPhotoCount, isPhotoLimitReached } from '@/lib/photo-limits'

/**
 * Wie viele Bilder gleichzeitig laufen.
 *
 * Nicht mehr: finalizeUpload laesst pro Foto sharp Metadaten, BlurHash und
 * Thumbnail rechnen und schreibt zwei Objekte in den Speicher. Bei einem
 * Stapel von hundert Bildern wuerde eine hoehere Zahl den Container genau
 * dann in die Knie zwingen, wenn parallel eine Feier laeuft.
 *
 * Nicht weniger: die Kundin bereitet Fotos am PC vor. Einzeln nacheinander
 * waeren hundert Bilder eine Viertelstunde Wartezeit.
 */
const PARALLEL = 3

/** Muss zur Whitelist in createUploadUrl passen. */
const ERLAUBT = new Set([
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/avif',
])

/** Muss zu MAX_BYTES in createUploadUrl passen. */
const MAX_BYTES = 25 * 1024 * 1024

type Status = 'wartet' | 'laeuft' | 'fertig' | 'fehler'

type Eintrag = {
  name: string
  status: Status
  fortschritt: number
  meldung?: string
}

function mb(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function PhotoUploadPresigned({
  eventId,
  /** Im Veranstalter-Bereich fuehrt "fertig" zurueck zur Verwaltung. */
  galerieHref,
  kontingent,
}: {
  eventId: string
  galerieHref?: string
  /**
   * Stand beim Laden der Seite. Nur fuer die Anzeige: ob ein Foto
   * angenommen wird, entscheidet allein der Server.
   */
  kontingent?: { used: number; limit: number | null; isDemo?: boolean }
}) {
  const [eintraege, setEintraege] = useState<Eintrag[]>([])
  const [laeuft, setLaeuft] = useState(false)
  const [ueberZone, setUeberZone] = useState(false)
  const auswahl = useRef<HTMLInputElement>(null)
  const kamera = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const setzeEintrag = useCallback((i: number, patch: Partial<Eintrag>) => {
    setEintraege((prev) =>
      prev.map((e, j) => (j === i ? { ...e, ...patch } : e)),
    )
  }, [])

  /** Ein einzelnes Bild: URL holen, hochladen, in der Datenbank festschreiben. */
  const ladeEines = useCallback(
    async (
      datei: File,
      i: number,
    ): Promise<{ photoId?: string; vollGeworden?: boolean }> => {
      setzeEintrag(i, { status: 'laeuft', fortschritt: 0 })

      const presigned = await createUploadUrl(eventId, datei.type, datei.size)
      if (!presigned.ok) {
        setzeEintrag(i, { status: 'fehler', meldung: presigned.message })
        // Ist das Kontingent erschoepft, sind auch alle weiteren Bilder
        // vergeblich — der Aufrufer bricht den Stapel dann ab, statt
        // dieselbe Absage vierzigmal einzusammeln.
        return { vollGeworden: presigned.limitReached === true }
      }

      const { uploadUrl, objectKey } = presigned

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', datei.type)
        xhr.setRequestHeader(
          'Cache-Control',
          'public, max-age=31536000, immutable',
        )
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setzeEintrag(i, {
              fortschritt: Math.round((e.loaded / e.total) * 100),
            })
          }
        }
        xhr.onload = () =>
          xhr.status >= 200 && xhr.status < 300
            ? resolve()
            : reject(new Error(`Speicher antwortete mit ${xhr.status}`))
        xhr.onerror = () => reject(new Error('Verbindung abgebrochen'))
        xhr.send(datei)
      })

      const gespeichert = await finalizeUpload({
        eventId,
        objectKey,
        mimeType: datei.type,
        size: datei.size,
      })

      if (!gespeichert.ok) {
        setzeEintrag(i, { status: 'fehler', meldung: gespeichert.message })
        return { vollGeworden: gespeichert.limitReached === true }
      }

      setzeEintrag(i, { status: 'fertig', fortschritt: 100 })
      return { photoId: gespeichert.photoId }
    },
    [eventId, setzeEintrag],
  )

  const starte = useCallback(
    async (dateiliste: FileList | File[]) => {
      const alle = Array.from(dateiliste)
      if (alle.length === 0) return

      // Vorsortieren im Browser: was der Server ohnehin ablehnt, muss nicht
      // erst hochgeladen werden. Der Grund steht dann direkt an der Zeile.
      const geprueft = alle.map((datei) => {
        if (!ERLAUBT.has(datei.type.toLowerCase())) {
          return {
            datei,
            fehler: datei.type
              ? `${datei.type} können wir nicht annehmen`
              : 'Unbekanntes Dateiformat',
          }
        }
        if (datei.size > MAX_BYTES) {
          return { datei, fehler: `${mb(datei.size)} — maximal 25 MB` }
        }
        return { datei, fehler: null as string | null }
      })

      setEintraege(
        geprueft.map(({ datei, fehler }) => ({
          name: datei.name || 'Foto',
          status: fehler ? ('fehler' as Status) : ('wartet' as Status),
          fortschritt: 0,
          meldung: fehler ?? undefined,
        })),
      )
      setLaeuft(true)

      const offen = geprueft
        .map((g, i) => ({ ...g, i }))
        .filter((g) => !g.fehler)

      let naechster = 0
      let abgebrochen = false
      let letztePhotoId: string | undefined

      // Kleiner Arbeiterpool statt Promise.all ueber alles: sonst stehen bei
      // hundert Bildern hundert Verbindungen gleichzeitig offen.
      await Promise.all(
        Array.from({ length: Math.min(PARALLEL, offen.length) }, async () => {
          while (!abgebrochen) {
            const platz = naechster++
            if (platz >= offen.length) return
            const { datei, i } = offen[platz]
            try {
              const res = await ladeEines(datei, i)
              if (res.photoId) letztePhotoId = res.photoId
              if (res.vollGeworden) abgebrochen = true
            } catch (err) {
              setzeEintrag(i, {
                status: 'fehler',
                meldung:
                  err instanceof Error ? err.message : 'Upload fehlgeschlagen',
              })
            }
          }
        }),
      )

      setLaeuft(false)

      if (abgebrochen) {
        // Was noch in der Schlange stand, kommt nicht mehr dran. Ohne
        // Vermerk stuende es fuer immer auf "wartet".
        setEintraege((prev) =>
          prev.map((e) =>
            e.status === 'wartet'
              ? { ...e, status: 'fehler', meldung: 'Foto-Limit erreicht' }
              : e,
          ),
        )
        // Neu laden lassen, damit die Sperre unten greift, statt dass der
        // naechste Stapel erst am Server abprallt.
        router.refresh()
      }

      // Zaehlen am Ende aus dem Zustand, nicht mitzaehlen waehrenddessen:
      // die Arbeiter laufen nebeneinander, ein gemeinsamer Zaehler waere die
      // eine Stelle, an der sie sich in die Quere kaemen.
      setEintraege((prev) => {
        const fertig = prev.filter((e) => e.status === 'fertig').length
        const fehler = prev.filter((e) => e.status === 'fehler').length

        if (fertig > 0 && fehler === 0) {
          toast.success(
            fertig === 1 ? 'Foto hochgeladen' : `${fertig} Fotos hochgeladen`,
          )
        } else if (fertig > 0) {
          toast.warning(`${fertig} hochgeladen, ${fehler} nicht`)
        } else {
          toast.error('Kein Foto konnte hochgeladen werden')
        }

        // Ein einzelnes Bild fuehrt weiter zur Bestaetigungsseite — das ist
        // der Weg, den Gaeste kennen. Bei einem Stapel bleibt die Ansicht
        // stehen, damit man sieht, was durchging und was nicht.
        if (prev.length === 1 && fertig === 1 && letztePhotoId && !galerieHref) {
          router.push(`/event/${eventId}/upload/success?photo=${letztePhotoId}`)
        }
        return prev
      })
    },
    [eventId, galerieHref, ladeEines, router, setzeEintrag],
  )

  const fertigeAnzahl = eintraege.filter((e) => e.status === 'fertig').length
  const fehlerAnzahl = eintraege.filter((e) => e.status === 'fehler').length
  const gesamt = eintraege.length
  const gesamtFortschritt = gesamt
    ? Math.round(
        eintraege.reduce(
          (n, e) => n + (e.status === 'fertig' ? 100 : e.fortschritt),
          0,
        ) / gesamt,
      )
    : 0

  const voll =
    kontingent !== undefined &&
    isPhotoLimitReached(kontingent.used, kontingent.limit)

  // Steht anstelle des Ablegefelds. Die Zeilen eines eben abgebrochenen
  // Stapels bleiben darunter sichtbar.
  const sperrHinweis = voll && kontingent?.limit != null && (
    <div className='rounded-2xl border-2 border-dashed border-muted p-8 text-center'>
      <Ban className='mx-auto mb-3 h-12 w-12 text-muted-foreground' />
      <p className='font-medium'>
        Alle {formatPhotoCount(kontingent.limit)} Fotos sind hochgeladen
      </p>
      <p className='mt-1 text-sm text-muted-foreground'>
        {!galerieHref ? (
          'Dieses Event nimmt keine weiteren Fotos mehr an. In der Galerie siehst du alle Bilder.'
        ) : kontingent.isDemo ? (
          'Alle Demo-Fotos sind aufgebraucht. Für eine echte Feier legst du im Dashboard ein eigenes Event an.'
        ) : (
          <>
            Dein Paket ist voll, neue Fotos werden nicht mehr angenommen. Die
            vorhandenen bleiben erhalten. Für mehr Fotos schreib uns an{' '}
            <a
              href='mailto:info@edelbyte.ch'
              className='text-primary underline underline-offset-4'
            >
              info@edelbyte.ch
            </a>{' '}
            – wir stellen dein Event auf ein grösseres Paket um.
          </>
        )}
      </p>
      {!galerieHref && (
        <Button asChild variant='secondary' className='mt-5'>
          <Link href={`/event/${eventId}/gallery`}>Zur Galerie</Link>
        </Button>
      )}
    </div>
  )

  return (
    <div className='w-full max-w-xl space-y-4'>
      {sperrHinweis}

      {/* Ablegefeld. Auf dem Handy ist es einfach eine grosse Schaltflaeche —
          dort gibt es kein Ziehen und Fallenlassen. */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: die Schaltflaechen darunter sind der bedienbare Weg; das Feld nimmt nur zusaetzlich Dateien an */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setUeberZone(true)
        }}
        onDragLeave={() => setUeberZone(false)}
        onDrop={(e) => {
          e.preventDefault()
          setUeberZone(false)
          if (!laeuft && e.dataTransfer.files.length) {
            starte(e.dataTransfer.files)
          }
        }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
          voll ? 'hidden' : ''
        } ${
          ueberZone
            ? 'border-primary bg-primary/5'
            : 'border-muted hover:border-primary/50'
        }`}
      >
        <UploadCloud className='mx-auto mb-3 h-12 w-12 text-primary' />

        <p className='font-medium'>
          <span className='hidden sm:inline'>
            Fotos hierher ziehen oder auswählen
          </span>
          {/* Nicht dieselbe Beschriftung wie der Knopf darunter — sonst
              steht zweimal dasselbe uebereinander. */}
          <span className='sm:hidden'>Fotos hochladen</span>
        </p>
        <p className='mt-1 text-sm text-muted-foreground'>
          Mehrere gleichzeitig möglich · JPG, PNG, HEIC, WebP · bis 25 MB
        </p>

        <div className='mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center'>
          <Button
            type='button'
            disabled={laeuft}
            onClick={() => auswahl.current?.click()}
            className='gap-2'
          >
            <ImagePlus className='h-4 w-4' />
            Fotos auswählen
          </Button>

          {/* Nur auf dem Handy: ein Tipp weniger als über den Systemdialog.
              capture ohne Wert statt 'user' — 'user' erzwang die Frontkamera
              und schloss die Galerie ganz aus, genau die Beschwerde. */}
          <Button
            type='button'
            variant='outline'
            disabled={laeuft}
            onClick={() => kamera.current?.click()}
            className='gap-2 sm:hidden'
          >
            <Camera className='h-4 w-4' />
            Kamera
          </Button>
        </div>

        <input
          ref={auswahl}
          type='file'
          accept='image/*,.heic,.heif'
          multiple
          className='hidden'
          onChange={(e) => {
            if (e.target.files?.length) starte(e.target.files)
            e.target.value = ''
          }}
        />
        <input
          ref={kamera}
          type='file'
          accept='image/*'
          capture='environment'
          className='hidden'
          onChange={(e) => {
            if (e.target.files?.length) starte(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {gesamt > 0 && (
        <div className='space-y-3 rounded-2xl border bg-card/50 p-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-medium'>
              {laeuft ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin text-primary' />
                  {fertigeAnzahl} von {gesamt} hochgeladen
                </span>
              ) : (
                `${fertigeAnzahl} von ${gesamt} hochgeladen${
                  fehlerAnzahl ? ` · ${fehlerAnzahl} fehlgeschlagen` : ''
                }`
              )}
            </span>
            <span className='tabular-nums text-muted-foreground'>
              {gesamtFortschritt}%
            </span>
          </div>

          <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
            <div
              className='h-full rounded-full bg-primary transition-[width] duration-300'
              style={{ width: `${gesamtFortschritt}%` }}
            />
          </div>

          <ul className='max-h-64 space-y-1 overflow-y-auto text-sm'>
            {eintraege.map((e, i) => (
              <li
                key={`${e.name}-${i}`}
                className='flex items-center gap-2 py-1'
              >
                {e.status === 'fertig' && (
                  <CheckCircle2 className='h-4 w-4 shrink-0 text-primary' />
                )}
                {e.status === 'fehler' && (
                  <AlertCircle className='h-4 w-4 shrink-0 text-destructive' />
                )}
                {e.status === 'laeuft' && (
                  <Loader2 className='h-4 w-4 shrink-0 animate-spin text-muted-foreground' />
                )}
                {e.status === 'wartet' && (
                  <span className='h-4 w-4 shrink-0 rounded-full border border-muted' />
                )}

                <span className='min-w-0 flex-1 truncate' title={e.name}>
                  {e.name}
                </span>

                {e.status === 'laeuft' && (
                  <span className='tabular-nums text-xs text-muted-foreground'>
                    {e.fortschritt}%
                  </span>
                )}
                {e.meldung && (
                  <span className='shrink-0 text-xs text-destructive'>
                    {e.meldung}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {!laeuft && fertigeAnzahl > 0 && (
            <Button asChild variant='secondary' className='w-full'>
              <Link href={galerieHref ?? `/event/${eventId}/gallery`}>
                {galerieHref ? 'Zur Verwaltung' : 'Zur Galerie'}
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
