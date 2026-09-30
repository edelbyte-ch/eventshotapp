'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Edit, Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { de } from 'react-day-picker/locale'
import { Event } from '@/generated/prisma/client'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { updateEvent } from '@/actions/event'
import { EventWithCount } from '@/types/EventWithCount'

/**
 * Das Eventdatum ist ein reines Kalenderdatum (@db.Date, Mitternacht UTC).
 * Ueber die Browser-Zeitzone formatiert, wurde westlich von UTC aus dem
 * 01.12. der 30.11. – und beim Speichern still verschoben.
 */
function toLocalDate(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function EditEventDialog({ event }: { event: EventWithCount }) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: event.name,
    location: event.location || '',
    description: event.description || '',
    date: event.date.toISOString().slice(0, 10),
  })
  const [loading, setLoading] = React.useState(false)
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)

  // Check if form is valid
  const isFormValid = React.useMemo(() => {
    return formData.name.trim() !== '' && formData.date.trim() !== ''
  }, [formData.name, formData.date])

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: event.name,
        location: event.location || '',
        description: event.description || '',
        date: event.date.toISOString().slice(0, 10),
      })
      setLoading(false)
    }
  }, [open, event])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Event bearbeiten
          </DialogTitle>
          <DialogDescription>
            Bearbeite die Details deines EventShot Events.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          <form
            action={async (fd) => {
              setLoading(true)
              // Der Waechter meldet Ablehnung als Wert. Ohne diese Auswertung
              // schloesse der Dialog sich auch dann, wenn nichts gespeichert
              // wurde — der Kunde haelte die Aenderung fuer uebernommen.
              const res = await updateEvent(event.id, fd)
              if (res && !res.ok) {
                setLoading(false)
                toast.error(res.message)
                return
              }
              setOpen(false)
            }}
            className="space-y-6"
            id="edit-event-form"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <Edit className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Grundinformationen
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Event-Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="z. B. Firmenfeier 2025"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Veranstaltungsort</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="z. B. Hotel Bellevue, Zürich"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Beschreibe dein Event... (optional)"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={3}
                  className="resize-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Datum
                </h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Datum *</Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !formData.date && 'text-muted-foreground'
                      )}
                      type="button"
                      id="date"
                      aria-required="true"
                      disabled={loading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(toLocalDate(formData.date), 'PPP', { locale: de })
                      ) : (
                        <span>Datum wählen</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      locale={de}
                      selected={
                        formData.date ? toLocalDate(formData.date) : undefined
                      }
                      onSelect={(date) => {
                        setDatePickerOpen(false)
                        if (date) {
                          const local = format(date, 'yyyy-MM-dd')
                          handleInputChange('date', local)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  name="date"
                  value={formData.date}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            form="edit-event-form"
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Wird gespeichert...
              </span>
            ) : (
              'Änderungen speichern'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
