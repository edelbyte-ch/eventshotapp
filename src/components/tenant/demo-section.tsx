import { ArrowRight, ScanLine } from 'lucide-react'
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
    <Card className='gap-0 rounded-2xl border border-primary/25 py-0 bg-linear-to-br from-primary/10 via-card/60 to-card/60 shadow-none'>
      <CardContent className='flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6'>
        <div className='min-w-0 flex-1 space-y-2'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-primary'>
            Zum Ausprobieren
          </p>
          <h2 className='text-xl font-bold'>Dein Demo-Event</h2>
          <p className='max-w-lg text-sm leading-relaxed text-muted-foreground'>
            {full ? (
              <>
                Alle {limit} Demo-Fotos sind aufgebraucht. Für eine echte Feier
                legst du ein eigenes Event an.
              </>
            ) : (
              <>
                Voller Funktionsumfang, begrenzt auf {limit} Fotos. QR-Code
                scannen, hochladen, Slideshow öffnen — genau wie am Fest.
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
            <p className='text-xs tabular-nums text-muted-foreground'>
              {demo.used} von {limit} Fotos
              {!full && ` · noch ${left} frei`}
            </p>
          </div>
        </div>

        {/* Zwei Wege: verwalten oder als Gast erleben. Die Slideshow steht
            im Demo-Event selbst oben rechts. */}
        <div className='flex shrink-0 flex-col gap-2 sm:w-52'>
          <Button asChild className='h-10 w-full font-semibold'>
            <Link href={`/tenant/event/${demo.id}`}>
              Demo öffnen
              <ArrowRight className='size-4' />
            </Link>
          </Button>
          <Button asChild variant='outline' className='h-10 w-full'>
            <Link href={`/event/${demo.id}`} target='_blank'>
              <ScanLine className='size-4' />
              Als Gast testen
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
