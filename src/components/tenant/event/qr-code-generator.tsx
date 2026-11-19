'use client'

import { Copy, Download } from 'lucide-react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

/**
 * Einlass: der Code, den Gaeste scannen. Steht auf der Uebersicht rechts
 * oben (auf dem Handy zuerst), weil man ihn vor Ort braucht.
 */
export default function QRCodeGenerator({ eventId }: { eventId: string }) {
  const [url, setUrl] = useState('')
  const qrRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setUrl(`${window.location.origin}/event/${eventId}`)
  }, [eventId])

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    toast.success('Link kopiert')
  }

  const download = () => {
    const canvas = qrRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'eventshot-qr-code.png'
    link.click()
  }

  return (
    <div className='space-y-4'>
      <p className='text-xs leading-relaxed text-muted-foreground'>
        Gäste scannen diesen Code und laden Fotos hoch. Kein Konto, keine App.
      </p>

      <div className='flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 py-1 pl-3 pr-1'>
        <span className='min-w-0 flex-1 truncate text-xs text-muted-foreground'>
          {url}
        </span>
        <Button
          variant='ghost'
          size='icon'
          className='size-8 shrink-0'
          onClick={copy}
          title='Link kopieren'
        >
          <Copy className='size-3.5' />
          <span className='sr-only'>Link kopieren</span>
        </Button>
      </div>

      <div className='mx-auto w-fit rounded-2xl bg-white p-4'>
        {/* Hoehere Aufloesung fuer den Download (Druck auf Tischkarten),
            per CSS auf die Panelbreite verkleinert. */}
        <QRCodeCanvas
          value={url || ' '}
          size={600}
          marginSize={0}
          ref={qrRef}
          className='size-48!'
        />
      </div>

      <div className='space-y-2'>
        <Button onClick={download} className='h-9 w-full'>
          <Download className='size-3.5' />
          QR-Code herunterladen
        </Button>
        <Button asChild variant='outline' className='h-9 w-full text-xs'>
          <Link href={`/event/${eventId}`} target='_blank'>
            Gästeseite ansehen
          </Link>
        </Button>
      </div>
    </div>
  )
}
