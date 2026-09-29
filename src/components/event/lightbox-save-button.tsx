'use client'

import { Check, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createIcon, useLightboxState } from 'yet-another-react-lightbox'
import type { GallerySlide } from '@/components/event/lightbox-slide'

type Stage = 'idle' | 'busy' | 'ready' | 'done'

// Dasselbe Symbol wie im Download-Plugin, das dieser Knopf ersetzt.
const DownloadIcon = createIcon(
  'DownloadIcon',
  <path d='M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z' />,
)

/** Safari wirft teils keine DOMException, sondern einen einfachen Error. */
function errorName(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'name' in err) {
    return String((err as { name: unknown }).name)
  }
  return ''
}

/** Direkter Download ueber die API-Route (Content-Disposition: attachment). */
function downloadDirect(href: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = ''
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/**
 * Sichern-Knopf der Lightbox: am Handy ueber das Teilen-Menue, damit das Foto
 * mit "Bild sichern" in der Mediathek landet — am PC wie bisher als Download.
 *
 * Vorbild ist der SavePhotoButton aus social-wall, mit einem Unterschied:
 * dort wird das Bild beim Oeffnen vorgeladen, damit die Nutzergeste beim
 * Tippen noch gilt. Hier waere das jeweils das Original mit rund 5 MB — wer
 * durch 41 Fotos blaettert, zoege 200 MB, und der ganze Gewinn der kleinen
 * Lightbox-Fassung ginge im Mobilnetz wieder verloren. Deshalb erst beim
 * Tippen laden. Ist die Geste danach verfallen (iOS erlaubt share() nur kurz
 * nach dem Tippen), liegt die Datei bereit und der zweite Tipp teilt sofort.
 *
 * Handy oder PC wird am Zeigegeraet entschieden, nicht am User-Agent: Chrome
 * und Safari am Desktop koennen inzwischen auch Dateien teilen, dort soll es
 * aber beim gewohnten Download bleiben.
 */
export function LightboxSaveButton() {
  const { currentSlide } = useLightboxState()
  const slide = currentSlide as GallerySlide | undefined
  const [stage, setStage] = useState<Stage>('idle')

  const file = useRef<{ src: string; file: File } | null>(null)
  const pending = useRef<AbortController | null>(null)
  const current = useRef(slide?.original)

  // Weitergeblaettert: laufenden Abruf abbrechen, der kostet sonst weiter
  // Datenvolumen fuer ein Bild, das niemand mehr sichern will.
  useEffect(() => {
    current.current = slide?.original
    setStage('idle')
    return () => {
      pending.current?.abort()
      pending.current = null
    }
  }, [slide?.original])

  useEffect(() => {
    if (stage !== 'done') return
    const timer = setTimeout(() => setStage('idle'), 2500)
    return () => clearTimeout(timer)
  }, [stage])

  async function share(f: File, fallbackHref: string) {
    try {
      await navigator.share({ files: [f] })
      setStage('done')
    } catch (err) {
      const name = errorName(err)
      // Abbruch durch den Benutzer ist ein Ergebnis, kein Fehler.
      if (name === 'AbortError') return setStage('idle')
      // Geste verfallen, waehrend das Original lud: Datei liegt bereit.
      if (name === 'NotAllowedError') return setStage('ready')
      downloadDirect(fallbackHref)
      setStage('idle')
    }
  }

  async function save() {
    if (!slide?.original || !slide.download || stage === 'busy') return
    const { original, download } = slide

    const touch = window.matchMedia('(pointer: coarse)').matches
    if (!touch || typeof navigator.canShare !== 'function') {
      downloadDirect(download)
      return
    }

    if (file.current?.src === original) {
      return share(file.current.file, download)
    }

    setStage('busy')
    const abort = new AbortController()
    pending.current = abort

    let f: File
    try {
      const res = await fetch(original, { signal: abort.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const type = blob.type || 'image/jpeg'
      const ext = type === 'image/png' ? 'png' : 'jpg'
      f = new File([blob], `eventshot-${slide.id}.${ext}`, { type })
    } catch (err) {
      if (errorName(err) === 'AbortError') return
      downloadDirect(download)
      setStage('idle')
      return
    } finally {
      if (pending.current === abort) pending.current = null
    }

    file.current = { src: original, file: f }
    // Waehrend des Ladens weitergeblaettert: nichts ungefragt teilen.
    if (current.current !== original) return

    if (!navigator.canShare({ files: [f] })) {
      downloadDirect(download)
      setStage('idle')
      return
    }
    await share(f, download)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {stage === 'ready' && (
        <button
          type='button'
          onClick={save}
          className='rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white'
        >
          Tippen zum Sichern
        </button>
      )}
      <button
        type='button'
        className='yarl__button'
        title='Foto sichern'
        aria-label='Foto sichern'
        disabled={stage === 'busy'}
        onClick={save}
      >
        {stage === 'busy' ? (
          <Loader2 className='yarl__icon animate-spin' />
        ) : stage === 'done' ? (
          <Check className='yarl__icon' />
        ) : (
          <DownloadIcon className='yarl__icon' />
        )}
      </button>
    </div>
  )
}
