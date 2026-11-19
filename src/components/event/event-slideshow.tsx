/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client'

import { motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getEventPhotosSlideshow } from '@/actions/get-event-photos-slideshow'
import { Button } from '@/components/ui/button'
import { SCREEN_PING_INTERVAL } from '@/lib/slideshow-screens'

type Photo = {
  id: string
  url: string
  createdAt: Date
}

interface Props {
  eventId: string
  /** Schluessel fuer den SSE-Stream — steht nicht auf der Tischkarte. */
  publicCode: string
  interval?: number
  controls?: boolean
  fullscreen?: boolean
  hideWatermark?: boolean
  brandLogoUrl?: string | null
}

/* -----------------------
   Client ID (device)
----------------------- */
function getClientId() {
  let id = localStorage.getItem('eventshot-client-id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('eventshot-client-id', id)
  }
  return id
}

/* -----------------------
   Decode Cache
----------------------- */
const DECODE_CACHE_LIMIT = 6
const decodeCache = new Map<string, HTMLImageElement>()

async function preload(src?: string) {
  if (!src) return
  if (decodeCache.has(src)) return

  const img = new Image()
  img.src = src

  try {
    await img.decode()
    decodeCache.set(src, img)

    if (decodeCache.size > DECODE_CACHE_LIMIT) {
      const firstKey = decodeCache.keys().next().value
      if (firstKey) decodeCache.delete(firstKey)
    }
  } catch {
    // ignore decode errors
  }
}

export default function EventSlideshow({
  eventId,
  publicCode,
  interval = 5000,
  controls = true,
  fullscreen,
  hideWatermark,
  brandLogoUrl,
}: Props) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const [ended, setEnded] = useState(false)

  const startTimeRef = useRef<number>(performance.now())
  const rafRef = useRef<number | null>(null)
  const clientIdRef = useRef<string | null>(null)

  /* -----------------------
     Initial load
  ----------------------- */
  useEffect(() => {
    let alive = true

    getEventPhotosSlideshow(eventId).then((data) => {
      if (!alive) return
      setPhotos(data)
      setIndex(0)
      setProgress(0)
      startTimeRef.current = performance.now()
    })

    return () => {
      alive = false
    }
  }, [eventId, publicCode])

  /* -----------------------
     SSE (SCREEN LIMIT!)
  ----------------------- */
  useEffect(() => {
    clientIdRef.current = getClientId()

    // Der Beamer laeuft stundenlang in einem Festsaal-WLAN. Vorher gab ein
    // einziger Wackler ihn endgueltig auf: onerror rief per fetch denselben
    // SSE-Endpunkt noch einmal auf — was serverseitig eine zweite Sitzung
    // samt Heartbeat und Poll-Schleife anlegte, deren Antwort niemand las —
    // und schloss danach die EventSource. es.close() schaltet aber deren
    // eingebaute Wiederverbindung ab. Ab da kam kein neues Foto mehr auf die
    // Leinwand; auffallen tat es erst, wenn dieselben Bilder zum dritten Mal
    // durchliefen.
    let stopped = false
    let es: EventSource | null = null
    let retry: ReturnType<typeof setTimeout> | null = null
    let versuche = 0

    const url = `/api/slideshow/stream/${eventId}?clientId=${clientIdRef.current}&code=${publicCode}`

    // Lebenszeichen: nur solange dieser Browser pingt, belegt er einen Platz.
    // Schliesst jemand den Tab oder haelt eine Firewall die Verbindung
    // kuenstlich offen, ist der Platz nach 30 s wieder frei.
    const pingen = () => {
      if (stopped) return
      fetch(
        `/api/slideshow/ping/${eventId}?clientId=${clientIdRef.current}&code=${publicCode}`,
        { method: 'POST', cache: 'no-store', keepalive: true },
      ).catch(() => {})
    }
    const pingTimer = setInterval(pingen, SCREEN_PING_INTERVAL)

    const spaeterNeuVerbinden = () => {
      if (stopped || retry) return
      // 3s, 6s, 12s, 24s, dann alle 30s. Ein belegter Platz wird irgendwann
      // frei; die Wand soll sich dann von selbst erholen, ohne dass jemand
      // im Saal die Fernbedienung sucht.
      const wartezeit = Math.min(3000 * 2 ** versuche, 30_000)
      versuche += 1
      retry = setTimeout(() => {
        retry = null
        verbinden()
      }, wartezeit)
    }

    function verbinden() {
      if (stopped) return
      es?.close()
      es = new EventSource(url)

      es.onopen = () => {
        versuche = 0
        pingen()
        // Beides zuruecksetzen: setPlaying(false) kam von der Sperre, nicht
        // vom Menschen. Ohne das bliebe die Wand nach dem Wiederverbinden auf
        // dem letzten Bild stehen.
        setBlocked(false)
        setPlaying(true)
      }

      es.onmessage = async (e) => {
        versuche = 0
        const msg = JSON.parse(e.data)
        if (msg.type === 'ended') {
          // In den Event-Einstellungen beendet: nicht neu verbinden, sonst
          // holte sich der Screen den eben freigegebenen Platz zurueck.
          stopped = true
          es?.close()
          if (retry) clearTimeout(retry)
          clearInterval(pingTimer)
          setEnded(true)
          setPlaying(false)
          return
        }
        if (msg.type === 'photos-updated') {
          const data = await getEventPhotosSlideshow(eventId)
          setPhotos(data)
        }
      }

      es.onerror = async () => {
        es?.close()
        if (stopped) return

        // Getrennte, billige Auskunft statt eines zweiten Streams.
        let belegt = false
        try {
          const res = await fetch(
            `/api/slideshow/limit/${eventId}?clientId=${clientIdRef.current}&code=${publicCode}`,
            { signal: AbortSignal.timeout(3000), cache: 'no-store' },
          )
          if (res.ok) belegt = (await res.json()).blocked === true
        } catch {
          // Keine Auskunft heisst Netzproblem, nicht Platzmangel.
        }

        if (belegt) {
          setBlocked(true)
          setPlaying(false)
        }
        spaeterNeuVerbinden()
      }
    }

    verbinden()

    return () => {
      stopped = true
      if (retry) clearTimeout(retry)
      clearInterval(pingTimer)
      es?.close()
    }
  }, [eventId, publicCode])

  const current = photos[index]

  /* -----------------------
     Decode current
  ----------------------- */
  useEffect(() => {
    if (!current) return
    setReady(false)
    preload(current.url).then(() => setReady(true))
  }, [current?.url])

  /* -----------------------
     Preload ahead
  ----------------------- */
  useEffect(() => {
    if (photos.length > 1) {
      preload(photos[(index + 1) % photos.length].url)
      preload(photos[(index + 2) % photos.length].url)
    }
  }, [index, photos.length])

  /* -----------------------
     Drift-free autoplay
  ----------------------- */
  useEffect(() => {
    if (!playing || photos.length <= 1) return

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current
      const slideIndex = Math.floor(elapsed / interval) % photos.length
      const slideProgress = (elapsed % interval) / interval

      setIndex(slideIndex)
      setProgress(slideProgress)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [playing, interval, photos.length])

  /* -----------------------
     Controls
  ----------------------- */
  const jumpRelative = (delta: number) => {
    const next = (index + delta + photos.length) % photos.length
    startTimeRef.current = performance.now() - next * interval
    setIndex(next)
    setProgress(0)
  }

  /* -----------------------
     BLOCKED OVERLAY
  ----------------------- */
  if (ended) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black text-white'>
        <div className='text-center space-y-4'>
          <p className='text-xl font-semibold'>Dieser Screen wurde beendet</p>
          <p className='text-sm opacity-70'>
            Er wurde in den Event-Einstellungen unter «Aktive Screens»
            geschlossen.
          </p>
          <Button variant='secondary' onClick={() => window.location.reload()}>
            Slideshow wieder starten
          </Button>
        </div>
      </div>
    )
  }

  if (blocked) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black text-white'>
        <div className='text-center space-y-3'>
          <p className='text-xl font-semibold'>
            Maximale Anzahl Screens erreicht
          </p>
          <p className='text-sm opacity-70'>
            Diese Slideshow läuft bereits auf einem anderen Bildschirm.
          </p>
          <p className='mx-auto max-w-md text-sm opacity-70'>
            Läuft dort nichts mehr? In den Event-Einstellungen unter «Aktive
            Screens» kannst du ihn beenden. Diese Seite verbindet sich danach
            von selbst.
          </p>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className='flex h-full items-center justify-center text-white'>
        <p className='text-xl font-semibold'>Noch keine Fotos</p>
      </div>
    )
  }

  return (
    <div
      className={`relative h-full w-full bg-black ${fullscreen ? 'fixed inset-0' : ''}`}
    >
      <motion.div
        key={current.id}
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <img
          src={current.url}
          alt='slideshowimg'
          className='absolute inset-0 h-full w-full object-contain'
          draggable={false}
        />
      </motion.div>

      {/* Progress */}
      {playing && photos.length > 1 && (
        <div className='absolute bottom-0 left-0 h-1 w-full bg-white/10'>
          <div
            className='h-full bg-primary'
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Branding */}
      {!hideWatermark && !brandLogoUrl && (
        <div className='absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg text-white'>
          <Camera className='h-5 w-5 text-primary' />
          EventShot
        </div>
      )}

      {brandLogoUrl && (
        <div className='absolute bottom-4 right-4 bg-black/60 p-2 rounded-lg'>
          <img src={brandLogoUrl} alt='brandlogo' className='h-8 w-auto' />
        </div>
      )}

      {/* Photo Counter */}
      <div className='absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-lg text-white text-sm font-medium'>
        {index + 1} / {photos.length}
      </div>

      {controls && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 p-1 rounded-full'>
          <Button size='icon' variant='ghost' onClick={() => jumpRelative(-1)}>
            <ChevronLeft />
          </Button>

          <Button
            size='icon'
            variant='ghost'
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause /> : <Play />}
          </Button>

          <Button size='icon' variant='ghost' onClick={() => jumpRelative(1)}>
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
