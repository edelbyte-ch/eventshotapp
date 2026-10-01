import { ArrowRight, MonitorPlay, ScanLine } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { DemoEventInfo } from '@/lib/demo-event'

/**
 * Demo-Streifen ueber der Event-Liste.
 *
 * Steht bewusst oben und nicht unten: er richtet sich an Leute, die noch kein
 * eigenes Event gebucht haben, und die scrollen nicht bis ans Ende einer
 * leeren Uebersicht. Wer schon Events betreibt, liest die eine Zeile und ist
 * darunter sofort bei seinen echten Feiern.
 */
export function DemoSection({ demo }: { demo: DemoEventInfo }) {
  // Die Grenze kommt vom Event selbst, nicht aus der Konstante — angezeigt
  // wird damit derselbe Wert, gegen den beim Hochladen geprueft wird.
  const limit = demo.limit
  const left = Math.max(0, limit - demo.used)
  const full = left === 0
  const pct = Math.min(100, (demo.used / limit) * 100)

  return (
    <Card className='rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card/50 to-card/50 shadow-xl backdrop-blur-sm'>
      <CardContent className='flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8'>
        <div className='min-w-0 flex-1 space-y-3'>
          <span className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
            Gratis zum Ausprobieren
          </span>

          <h2 className='text-2xl font-bold'>Dein Demo-Event</h2>

          <p className='max-w-md text-sm leading-relaxed text-muted-foreground'>
            {full ? (
              <>
                Alle {limit} Demo-Fotos sind aufgebraucht. Für eine
                echte Feier legst du ein eigenes Event an.
              </>
            ) : (
              <>
                Voller Funktionsumfang, begrenzt auf {limit} Fotos.
                QR-Code scannen, hochladen, Slideshow öffnen — genau wie am Fest.
              </>
            )}
          </p>

          {/* Der Balken zeigt den Verbrauch, ohne dass man rechnen muss. */}
          <div className='max-w-xs space-y-1.5 pt-1'>
            <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
              <div
                className='h-full rounded-full bg-primary transition-[width] duration-500'
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className='text-xs text-muted-foreground tabular-nums'>
              {demo.used} von {limit} Fotos
              {!full && ` · noch ${left} frei`}
            </p>
          </div>
        </div>

        <div className='flex shrink-0 flex-col gap-2 sm:w-56'>
          <Button asChild className='h-10 w-full font-semibold'>
            <Link href={`/tenant/event/${demo.id}`}>
              Demo verwalten
              <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
          <Button asChild variant='outline' className='h-10 w-full text-xs'>
            <Link href={`/event/${demo.id}`} target='_blank'>
              <ScanLine className='h-3.5 w-3.5' />
              Als Gast testen
            </Link>
          </Button>
          <Button asChild variant='ghost' className='h-10 w-full text-xs'>
            <Link href={`/tenant/event/${demo.id}/slideshow`} target='_blank'>
              <MonitorPlay className='h-3.5 w-3.5' />
              Slideshow öffnen
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
