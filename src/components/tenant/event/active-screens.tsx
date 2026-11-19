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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <Card>
      <CardHeader>
        <CardTitle>Aktive Screens</CardTitle>
        <CardDescription>
          {limit === null
            ? `${belegt} Screen(s) aktiv, unbegrenzt in deinem Paket.`
            : `${belegt} von ${limit} Screen${limit === 1 ? '' : 's'} belegt.`}{' '}
          Ein Screen, der nicht mehr läuft, gibt seinen Platz nach rund 30
          Sekunden selbst frei. Hier kannst du ihn sofort beenden.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-3'>
        {screens === null ? (
          <p className='text-sm text-muted-foreground'>Wird geladen …</p>
        ) : screens.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            Gerade läuft die Slideshow auf keinem Bildschirm.
          </p>
        ) : (
          <ul className='divide-y rounded-md border'>
            {screens.map((s) => (
              <li
                key={s.id}
                className='flex items-center justify-between gap-3 p-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <MonitorIcon className='h-4 w-4 shrink-0 text-muted-foreground' />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-medium'>{s.device}</p>
                    <p className='text-xs text-muted-foreground'>
                      seit {uhrzeit(s.since)} Uhr
                    </p>
                  </div>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  disabled={pending}
                  onClick={() => beenden(s.id)}
                >
                  Beenden
                </Button>
              </li>
            ))}
          </ul>
        )}

        <div className='flex gap-2'>
          {screens && screens.length > 1 && (
            <Button
              variant='destructive'
              size='sm'
              disabled={pending}
              onClick={() => beenden()}
            >
              Alle beenden
            </Button>
          )}
          <Button
            variant='ghost'
            size='sm'
            disabled={pending}
            onClick={() => laden()}
          >
            <RefreshCwIcon className='mr-1 h-4 w-4' />
            Aktualisieren
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
