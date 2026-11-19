'use client'

import { MonitorIcon, RefreshCwIcon } from 'lucide-react'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  type ActiveScreen,
  endScreens,
  getActiveScreens,
} from '@/actions/slideshow-screens'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/tenant/event/panel'

const uhrzeit = (iso: string) =>
  new Date(iso).toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
  })

export default function ActiveScreens({ eventId }: { eventId: string }) {
  const [screens, setScreens] = useState<ActiveScreen[] | null>(null)
  const [limit, setLimit] = useState<number | null>(null)
  const [pending, startTransition] = useTransition()

  const laden = useCallback(async () => {
    const res = await getActiveScreens(eventId)
    if (!res.success) {
      toast.error(res.message)
      return
    }
    setScreens(res.screens)
    setLimit(res.limit)
  }, [eventId])

  // Alle 10 s neu laden: so sieht man, wenn ein Screen dazukommt oder geht.
  useEffect(() => {
    laden()
    const t = setInterval(laden, 10_000)
    return () => clearInterval(t)
  }, [laden])

  const beenden = (sessionId?: string) =>
    startTransition(async () => {
      const res = await endScreens(eventId, sessionId)
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(
        sessionId ? 'Screen beendet' : `${res.count} Screen(s) beendet`,
      )
      await laden()
    })

  const belegt = screens?.length ?? 0

  return (
    <Panel
      title='Aktive Screens'
      icon={<MonitorIcon className='size-4' />}
      action={
        <div className='flex items-center gap-1'>
          <span className='rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-primary'>
            {belegt} / {limit === null ? '∞' : limit}
          </span>
          <Button
            variant='ghost'
            size='icon'
            className='size-8 text-muted-foreground'
            disabled={pending}
            onClick={() => laden()}
            title='Aktualisieren'
          >
            <RefreshCwIcon className='size-3.5' />
            <span className='sr-only'>Aktualisieren</span>
          </Button>
        </div>
      }
    >
      {screens === null ? (
        <p className='py-4 text-center text-sm text-muted-foreground'>
          Wird geladen …
        </p>
      ) : screens.length === 0 ? (
        <p className='py-4 text-center text-sm text-muted-foreground'>
          Gerade läuft die Slideshow auf keinem Bildschirm.
        </p>
      ) : (
        <div className='space-y-3'>
          <ul className='divide-y divide-border/60 rounded-xl border border-border/60'>
            {screens.map((s) => (
              <li
                key={s.id}
                className='flex items-center justify-between gap-3 p-3'
              >
                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium'>{s.device}</p>
                  <p className='text-xs text-muted-foreground'>
                    seit {uhrzeit(s.since)} Uhr
                  </p>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  className='h-8 shrink-0'
                  disabled={pending}
                  onClick={() => beenden(s.id)}
                >
                  Beenden
                </Button>
              </li>
            ))}
          </ul>
          {screens.length > 1 && (
            <Button
              variant='destructive'
              size='sm'
              className='w-full'
              disabled={pending}
              onClick={() => beenden()}
            >
              Alle beenden
            </Button>
          )}
        </div>
      )}
      <p className='mt-4 text-xs leading-relaxed text-muted-foreground'>
        Ein geschlossener Screen gibt seinen Platz nach rund 30 Sekunden selbst
        frei. Hier beendest du ihn sofort.
      </p>
    </Panel>
  )
}
