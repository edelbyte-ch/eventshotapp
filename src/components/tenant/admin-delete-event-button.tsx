'use client'

import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { deleteEventAsAdmin } from '@/actions/admin-events'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

/**
 * Loeschknopf in der Event-Liste, nur im Betreiber-Blick.
 *
 * Die Rueckfrage nennt, was verloren geht — Fotos, und bei bezahlten Events
 * auch den Eintrag in der Umsatzuebersicht —, damit beim Aufraeumen von
 * Testmuell nicht versehentlich eine echte Feier mitgeht.
 */
export function AdminDeleteEventButton({
  eventId,
  name,
  photos,
  paid,
}: {
  eventId: string
  name: string
  photos: number
  paid: boolean
}) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function loeschen() {
    startTransition(async () => {
      const res = await deleteEventAsAdmin(eventId)
      if (!res.ok) {
        toast.error(res.message)
        return
      }
      toast.success(`„${name}“ gelöscht`)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={(o) => !pending && setOpen(o)}>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          aria-label={`${name} löschen`}
          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>„{name}“ endgültig löschen?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='space-y-2'>
              <p>
                Das Event wird mit{' '}
                {photos === 1 ? 'seinem Foto' : `allen ${photos} Fotos`},
                Galerie, QR-Code und Slideshow-Einstellungen gelöscht. Das lässt
                sich nicht rückgängig machen.
              </p>
              {paid && (
                <p className='font-medium text-destructive'>
                  Dieses Event wurde bezahlt. Es verschwindet auch aus der
                  Umsatzübersicht; die Rechnung bleibt gespeichert.
                </p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-700'
            disabled={pending}
            onClick={(e) => {
              // Offen lassen, bis der Server geantwortet hat — sonst
              // verschwindet der Dialog, waehrend noch geloescht wird.
              e.preventDefault()
              loeschen()
            }}
          >
            {pending && <Loader2 className='h-4 w-4 animate-spin' />}
            Endgültig löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
