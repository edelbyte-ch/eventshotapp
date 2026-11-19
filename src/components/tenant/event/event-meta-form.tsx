'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateEvent } from '@/actions/event'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

/**
 * Name, Ort, Datum und Beschreibung direkt auf der Uebersicht. Vorher lag das
 * hinter einem Stift-Symbol in der Event-Liste, in einem Dialog.
 *
 * Das Datum geht als "JJJJ-MM-TT" an den Server, wie bisher im Dialog: ueber
 * die Browser-Zeitzone formatiert, verschob es sich westlich von UTC still um
 * einen Tag.
 */
export function EventMetaForm({
  eventId,
  initial,
}: {
  eventId: string
  initial: {
    name: string
    location: string | null
    description: string | null
    date: string
  }
}) {
  const [werte, setWerte] = useState({
    name: initial.name,
    location: initial.location ?? '',
    description: initial.description ?? '',
    date: initial.date,
  })
  const [pending, startTransition] = useTransition()

  const geaendert =
    werte.name !== initial.name ||
    werte.location !== (initial.location ?? '') ||
    werte.description !== (initial.description ?? '') ||
    werte.date !== initial.date
  const gueltig = werte.name.trim() !== '' && werte.date !== ''

  const setze = (feld: keyof typeof werte) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setWerte((w) => ({ ...w, [feld]: e.target.value }))

  const speichern = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    for (const [k, v] of Object.entries(werte)) fd.set(k, v)
    startTransition(async () => {
      // Bei Erfolg leitet die Action auf "?updated=1" um und wirft dabei —
      // ein Rueckgabewert kommt nur im Fehlerfall an.
      const res = await updateEvent(eventId, fd)
      if (res && !res.ok) toast.error(res.message)
      else toast.success('Gespeichert')
    })
  }

  return (
    <form onSubmit={speichern} className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          value={werte.name}
          onChange={setze('name')}
          disabled={pending}
          required
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='date'>Datum</Label>
          <Input
            id='date'
            type='date'
            value={werte.date}
            onChange={setze('date')}
            disabled={pending}
            required
          />
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='location'>Ort</Label>
          <Input
            id='location'
            value={werte.location}
            onChange={setze('location')}
            placeholder='z. B. Hotel Bären, Niederbipp'
            disabled={pending}
          />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='description'>Beschreibung</Label>
        <Textarea
          id='description'
          value={werte.description}
          onChange={setze('description')}
          rows={3}
          placeholder='Notiz für dich, z. B. Ablauf oder Ansprechperson.'
          disabled={pending}
        />
      </div>

      {/* Knoepfe erst, wenn es etwas zu speichern gibt. Ein ausgegrauter
          Speichern-Knopf sah im Ruhezustand wie ein Fehler aus. */}
      {geaendert && (
        <div className='flex flex-wrap items-center gap-2 border-t border-border/60 pt-4'>
          <Button type='submit' disabled={!gueltig || pending}>
            {pending ? 'Wird gespeichert …' : 'Speichern'}
          </Button>
          <Button
            type='button'
            variant='ghost'
            disabled={pending}
            onClick={() =>
              setWerte({
                name: initial.name,
                location: initial.location ?? '',
                description: initial.description ?? '',
                date: initial.date,
              })
            }
          >
            Verwerfen
          </Button>
          <span className='text-xs text-muted-foreground'>
            Ungespeicherte Änderungen
          </span>
        </div>
      )}
    </form>
  )
}
