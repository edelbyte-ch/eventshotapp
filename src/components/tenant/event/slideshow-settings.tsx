'use client'

import { Check, Loader2, Lock } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { toast } from 'sonner'
import { getSlideshowSettings } from '@/actions/get-slideshow-settings'
import { saveSlideshowSettings } from '@/actions/save-slideshow-settings'
import { Panel } from '@/components/tenant/event/panel'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

type Werte = {
  interval: number
  controls: boolean
  hideWatermark: boolean
  brandLogoUrl: string | null
}

type Status = 'ruhig' | 'speichert' | 'gespeichert'

/**
 * Einstellungen als Optionskarten wie bei Social Wall, mit automatischem
 * Speichern: Schalter sofort, Regler beim Loslassen, Logo beim Verlassen des
 * Feldes. Vorher stand unten ein Speichern-Knopf, der im Ruhezustand als
 * ausgegrautes "Gespeichert" wie ein kaputter Knopf aussah — und wer ihn
 * uebersah, verlor seine Aenderung beim Reiterwechsel.
 */
export default function SlideshowSettings({ eventId }: { eventId: string }) {
  const [werte, setWerte] = useState<Werte | null>(null)
  const [plan, setPlan] = useState<'BASIC' | 'PREMIUM' | 'ENTERPRISE'>('BASIC')
  const [status, setStatus] = useState<Status>('ruhig')
  const gespeichert = useRef<Werte | null>(null)
  const ruheTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    getSlideshowSettings(eventId).then((s) => {
      const w = {
        interval: s.intervalMs / 1000,
        controls: s.showControls,
        hideWatermark: s.hideWatermark,
        brandLogoUrl: s.brandLogoUrl,
      }
      setWerte(w)
      gespeichert.current = w
      setPlan(s.plan)
    })
    return () => {
      if (ruheTimer.current) clearTimeout(ruheTimer.current)
    }
  }, [eventId])

  if (!werte) {
    return (
      <div className='space-y-6'>
        <div className='h-56 animate-pulse rounded-2xl bg-muted/40' />
        <div className='h-48 animate-pulse rounded-2xl bg-muted/40' />
      </div>
    )
  }

  const enterprise = plan === 'ENTERPRISE'

  const speichern = async (neu: Werte) => {
    const vorher = gespeichert.current
    if (vorher && JSON.stringify(vorher) === JSON.stringify(neu)) return
    setStatus('speichert')
    const res = await saveSlideshowSettings({
      eventId,
      intervalMs: neu.interval * 1000,
      showControls: neu.controls,
      hideWatermark: neu.hideWatermark,
      brandLogoUrl: neu.brandLogoUrl,
    })
    if (!res.success) {
      // Zurueck auf den letzten gespeicherten Stand, damit die Anzeige nicht
      // etwas behauptet, das nicht gilt.
      if (vorher) setWerte(vorher)
      setStatus('ruhig')
      toast.error(res.message)
      return
    }
    gespeichert.current = neu
    setStatus('gespeichert')
    if (ruheTimer.current) clearTimeout(ruheTimer.current)
    ruheTimer.current = setTimeout(() => setStatus('ruhig'), 2500)
  }

  const aendern = (teil: Partial<Werte>, sofort = true) => {
    const neu = { ...werte, ...teil }
    setWerte(neu)
    if (sofort) void speichern(neu)
  }

  const logoGueltig =
    !werte.brandLogoUrl || /^https:\/\/\S+$/i.test(werte.brandLogoUrl)

  return (
    <div className='space-y-6'>
      <Panel
        title='Leinwand'
        hint='Wie die Slideshow auf dem Beamer im Saal läuft.'
        action={<SpeicherStatus status={status} />}
      >
        <div className='grid gap-3 lg:grid-cols-2'>
          <Karte>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-medium'>Anzeigedauer pro Foto</p>
                <p className='mt-1 text-xs leading-relaxed text-muted-foreground'>
                  Wie lange ein Foto stehen bleibt, bevor das nächste kommt.
                </p>
              </div>
              <span className='shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold tabular-nums text-primary'>
                {werte.interval} s
              </span>
            </div>
            <Slider
              className='mt-5'
              min={3}
              max={15}
              step={1}
              value={[werte.interval]}
              onValueChange={([v]) => aendern({ interval: v }, false)}
              onValueCommit={([v]) => aendern({ interval: v })}
              aria-label='Anzeigedauer in Sekunden'
            />
            <div className='mt-2 flex justify-between text-[11px] tabular-nums text-muted-foreground'>
              <span>3 s</span>
              <span>15 s</span>
            </div>
          </Karte>

          <Option
            titel='Steuerung anzeigen'
            text='Pfeile und Pause-Knopf unten auf der Leinwand. Ausschalten, wenn niemand am Beamer steht.'
            checked={werte.controls}
            onChange={(v) => aendern({ controls: v })}
          />
        </div>
      </Panel>

      <Panel
        title='Branding'
        hint='Die Slideshow in deinem Auftritt statt in dem von EventShot.'
        action={
          enterprise ? undefined : (
            <span className='inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground'>
              <Lock className='size-3' />
              Enterprise
            </span>
          )
        }
      >
        <div className='grid gap-3 lg:grid-cols-2'>
          <Option
            titel='EventShot-Logo ausblenden'
            text='Entfernt das EventShot-Wasserzeichen aus der Slideshow.'
            checked={enterprise && werte.hideWatermark}
            onChange={(v) => aendern({ hideWatermark: v })}
            disabled={!enterprise}
          />

          <Karte gesperrt={!enterprise}>
            <label htmlFor='brand-logo' className='text-sm font-medium'>
              Eigenes Logo
            </label>
            <p className='mt-1 text-xs leading-relaxed text-muted-foreground'>
              Adresse eines Bildes (PNG oder SVG), unten rechts auf der Leinwand.
            </p>
            <Input
              id='brand-logo'
              type='url'
              inputMode='url'
              className='mt-3'
              placeholder='https://…/logo.png'
              value={werte.brandLogoUrl ?? ''}
              onChange={(e) =>
                aendern({ brandLogoUrl: e.target.value.trim() || null }, false)
              }
              onBlur={() => logoGueltig && void speichern(werte)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && logoGueltig) void speichern(werte)
              }}
              aria-invalid={!logoGueltig}
              disabled={!enterprise}
            />
            {!logoGueltig && (
              <p className='mt-1.5 text-xs text-destructive'>
                Bitte eine vollständige Adresse mit https:// angeben.
              </p>
            )}
          </Karte>
        </div>
      </Panel>
    </div>
  )
}

function SpeicherStatus({ status }: { status: Status }) {
  return (
    <span
      aria-live='polite'
      className={`inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-opacity duration-300 ${
        status === 'ruhig' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {status === 'speichert' ? (
        <>
          <Loader2 className='size-3.5 animate-spin' />
          Wird gespeichert
        </>
      ) : (
        <>
          <Check className='size-3.5 text-emerald-500' />
          Gespeichert
        </>
      )}
    </span>
  )
}

function Karte({
  children,
  gesperrt = false,
}: {
  children: React.ReactNode
  gesperrt?: boolean
}) {
  return (
    <div
      className={`rounded-xl border border-border/60 bg-background/40 p-4 ${
        gesperrt ? 'opacity-55' : ''
      }`}
    >
      {children}
    </div>
  )
}

function Option({
  titel,
  text,
  checked,
  onChange,
  disabled = false,
}: {
  titel: string
  text: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border border-border/60 bg-background/40 p-4 ${
        disabled ? 'opacity-55' : ''
      }`}
    >
      <label
        htmlFor={id}
        className={`min-w-0 flex-1 ${disabled ? '' : 'cursor-pointer'}`}
      >
        <span className='block text-sm font-medium'>{titel}</span>
        <span className='mt-1 block text-xs leading-relaxed text-muted-foreground'>
          {text}
        </span>
      </label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className='mt-0.5 shrink-0'
      />
    </div>
  )
}
