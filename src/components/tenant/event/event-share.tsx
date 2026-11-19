'use client'

import { Copy, Eye, Images } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

/**
 * Die zwei Adressen, die ein Veranstalter weitergibt: die Gaesteseite (zum
 * Hochladen, steht hinter dem QR-Code) und die Galerie (nach dem Fest).
 */
export function EventShare({ eventId }: { eventId: string }) {
  const kopieren = async (pfad: string, was: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}${pfad}`)
    toast.success(`${was} kopiert`)
  }

  const zeilen = [
    {
      titel: 'Gästeseite',
      text: 'Hier laden Gäste ihre Fotos hoch.',
      pfad: `/event/${eventId}`,
      icon: Eye,
    },
    {
      titel: 'Galerie',
      text: 'Für nach dem Fest: alle Fotos ansehen und herunterladen.',
      pfad: `/event/${eventId}/gallery`,
      icon: Images,
    },
  ]

  return (
    <div className='space-y-3'>
      {zeilen.map((z) => (
        <div
          key={z.pfad}
          className='flex flex-col gap-3 rounded-xl border border-border/60 bg-background/40 p-3 sm:flex-row sm:items-center'
        >
          <div className='min-w-0 flex-1'>
            <p className='text-sm font-medium'>{z.titel}</p>
            <p className='text-xs text-muted-foreground'>{z.text}</p>
          </div>
          <div className='flex shrink-0 gap-2'>
            <Button asChild variant='ghost' size='sm' className='h-9 flex-1 text-muted-foreground hover:text-foreground'>
              <Link href={z.pfad} target='_blank'>
                <z.icon className='size-3.5' />
                Öffnen
              </Link>
            </Button>
            <Button
              size='sm'
              variant='secondary'
              className='h-9 flex-1'
              onClick={() => kopieren(z.pfad, `Link zur ${z.titel}`)}
            >
              <Copy className='size-3.5' />
              Link kopieren
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
