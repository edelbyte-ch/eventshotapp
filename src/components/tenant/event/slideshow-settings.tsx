'use client'

import { useEffect, useId, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { getSlideshowSettings } from '@/actions/get-slideshow-settings'
import { saveSlideshowSettings } from '@/actions/save-slideshow-settings'
import { Panel } from '@/components/tenant/event/panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

type Werte = {
  interval: number
  controls: boolean
  hideWatermark: boolean
  brandLogoUrl: string | null
}

/**
 * Einstellungen als Optionskarten wie bei Social Wall: jede Option erklaert
 * in einem Satz, was sie auf der Leinwand bewirkt. Vorher standen nur
 * "Anzeigedauer" und "Steuerung anzeigen" ohne jede Erklaerung.
 */
export default function SlideshowSettings({ eventId }: { eventId: string }) {
  const [werte, setWerte] = useState<Werte | null>(null)
  const [gespeichert, setGespeichert] = useState<Werte | null>(null)
  const [plan, setPlan] = useState<'BASIC' | 'PREMIUM' | 'ENTERPRISE'>('BASIC')
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    getSlideshowSettings(eventId).then((s) => {
      const w = {
        interval: s.intervalMs / 1000,
        controls: s.showControls,
        hideWatermark: s.hideWatermark,
        brandLogoUrl: s.brandLogoUrl,
      }
      setWerte(w)
      setGespeichert(w)
      setPlan(s.plan)
    })
  }, [eventId])

  if (!werte) {
    return <div className='h-72 animate-pulse rounded-2xl bg-muted/40' />
  }

  const enterprise = plan === 'ENTERPRISE'
  const geaendert = JSON.stringify(werte) !== JSON.stringify(gespeichert)
  const setze = (teil: Partial<Werte>) => setWerte({ ...werte, ...teil })

  const speichern = () =>
    startTransition(async () => {
      const res = await saveSlideshowSettings({
        eventId,
        intervalMs: werte.interval * 1000,
        showControls: werte.controls,
        hideWatermark: werte.hideWatermark,
        brandLogoUrl: werte.brandLogoUrl,
      })
      if (!res.success) {
        toast.error(res.message)
        return
      }
      setGespeichert(werte)
      toast.success('Einstellungen gespeichert')
    })

  return (
    <div className='space-y-6'>
      <Panel
        title='Leinwand'
        hint='Wie die Slideshow auf dem Beamer im Saal läuft.'
      >
        <div className='space-y-3'>
          <div className='rounded-xl border border-border/60 bg-background/40 p-4'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-medium'>Anzeigedauer pro Foto</p>
                <p className='mt-0.5 text-xs leading-relaxed text-muted-foreground'>
                  Wie lange ein Foto stehen bleibt, bevor das nächste kommt.
                </p>
              </div>
              <span className='shrink-0 text-lg font-semibold tabular-nums'>
                {werte.interval}s
              </span>
            </div>
            <Slider
              className='mt-5'
              min={3}
              max={15}
              step={1}
              value={[werte.interval]}
              onValueChange={([v]) => setze({ interval: v })}
              aria-label='Anzeigedauer in Sekunden'
            />
            <div className='mt-2 flex justify-between text-[11px] tabular-nums text-muted-foreground'>
              <span>3s</span>
              <span>9s</span>
              <span>15s</span>
            </div>
          </div>

          <Option
            titel='Steuerung anzeigen'
            text='Pfeile und Pause-Knopf unten auf der Leinwand. Aus, wenn niemand am Beamer steht.'
            checked={werte.controls}
            onChange={(v) => setze({ controls: v })}
          />
        </div>
      </Panel>

      <Panel
        title='Branding'
        hint={enterprise ? undefined : 'Nur im Enterprise-Paket verfügbar.'}
      >
        <div className='space-y-3'>
          <Option
            titel='EventShot-Wasserzeichen ausblenden'
            text='Entfernt das EventShot-Logo aus der Slideshow.'
            checked={enterprise && werte.hideWatermark}
            onChange={(v) => setze({ hideWatermark: v })}
            disabled={!enterprise}
          />
          <div
            className={`rounded-xl border border-border/60 bg-background/40 p-4 ${enterprise ? '' : 'opacity-60'}`}
          >
            <p className='text-sm font-medium'>Eigenes Logo</p>
            <p className='mt-0.5 text-xs leading-relaxed text-muted-foreground'>
              Adresse eines Bildes (PNG oder SVG). Steht unten rechts auf der
              Leinwand.
            </p>
            <Input
              type='url'
              className='mt-3'
              placeholder='https://example.com/logo.png'
              value={werte.brandLogoUrl ?? ''}
              onChange={(e) => setze({ brandLogoUrl: e.target.value || null })}
              disabled={!enterprise}
            />
          </div>
        </div>
      </Panel>

      {/* Bleibt unten am Bildschirm, solange etwas ungespeichert ist. */}
      <div className='sticky bottom-4 z-10 flex justify-end'>
        <Button
          onClick={speichern}
          disabled={!geaendert || pending}
          className='h-10 px-6 font-semibold shadow-lg'
        >
          {pending
            ? 'Wird gespeichert …'
            : geaendert
              ? 'Änderungen speichern'
              : 'Gespeichert'}
        </Button>
      </div>
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
      className={`flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/40 p-4 ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <label htmlFor={id} className={disabled ? '' : 'cursor-pointer'}>
        <span className='block text-sm font-medium'>{titel}</span>
        <span className='mt-0.5 block text-xs leading-relaxed text-muted-foreground'>
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
