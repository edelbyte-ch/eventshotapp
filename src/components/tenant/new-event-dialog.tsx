'use client'

import { toast } from 'sonner'
import { createEventCheckout } from '@/actions/create-event-checkout'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { pricingPlans } from '@/lib/constants'
import { formatChf, type PlanId } from '@/lib/pricing'
import {
  type EventDate,
  getActivePromotion,
  getPromotionById,
  type Promotion,
  parseEventDate,
  promotionMonthsLabel,
  promotionPercentLabel,
  quotePrice,
} from '@/lib/promotions'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  Calendar as CalendarIcon,
  CalendarPlus,
  CheckCircle2,
  FileText,
  MapPin,
  Receipt,
  Snowflake,
} from 'lucide-react'
import * as React from 'react'
import { useEffect } from 'react'
import { de } from 'react-day-picker/locale'
import { PlanPicker } from './plan-picker'

/** Kalenderdatum als lokales Date – nur fuer Anzeige und Kalender. */
function toLocalDate(date: EventDate) {
  return new Date(date.year, date.month - 1, date.day)
}

export function NewEventDialog({
  tenantId,
  defaultPlan = 'PREMIUM',
}: {
  tenantId: number
  defaultPlan?: PlanId
}) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    location: '',
    description: '',
    date: '',
  })
  const [loading, setLoading] = React.useState(false)
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [plan, setPlan] = React.useState<PlanId>(defaultPlan)
  // Beim Oeffnen bestimmt, nicht beim Rendern: so haengt die Vorschau nicht
  // an der Uhrzeit des Server-Renderings.
  const [promotion, setPromotion] = React.useState<Promotion | null>(null)

  // Vorschau mit derselben Rechnung wie der Server. Verbindlich ist nur
  // dessen Ergebnis – er rechnet beim Checkout neu und vertraut dem nicht.
  const eventDate = parseEventDate(formData.date)
  const quote = eventDate ? quotePrice(plan, eventDate, { promotion }) : null
  const planName = pricingPlans.find((p) => p.plan === plan)?.name ?? plan

  // Check if form is valid
  const isFormValid = React.useMemo(() => {
    return formData.name.trim() !== '' && formData.date.trim() !== ''
  }, [formData.name, formData.date])

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Disable Lenis smooth scroll when dialog is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lenis = (
        window as { lenis?: { stop: () => void; start: () => void } }
      ).lenis
      if (lenis) {
        if (open) {
          lenis.stop()
        } else {
          lenis.start()
        }
      }
    }
  }, [open])

  // Reset form when dialog closes
  useEffect(() => {
    if (open) {
      setPromotion(getActivePromotion())
      return
    }
    setFormData({
      name: '',
      location: '',
      description: '',
      date: '',
    })
    setPlan(defaultPlan)
    setLoading(false)
  }, [open, defaultPlan])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Neues Event
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Neues Event erstellen
          </DialogTitle>
          <DialogDescription>
            Erstelle ein neues EventShot Event mit allen wichtigen Details. Du
            kannst diese später jederzeit anpassen.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          <form
            action={async (fd) => {
              setLoading(true)
              const res = await createEventCheckout({
                name: fd.get('name') as string,
                location: fd.get('location') as string,
                description: fd.get('description') as string,
                date: fd.get('date') as string,
                plan: fd.get('plan') as PlanId,
                // Nur zum Abgleich: weicht der Serverpreis ab (z. B. weil die
                // Aktion eben endete), wird nicht still anders abgebucht.
                expectedTotal: quote?.finalPrice,
              })

              if (!res.ok) {
                setLoading(false)
                toast.error(res.message)
                // Serverstand uebernehmen (z. B. Aktion eben abgelaufen oder
                // Geraeteuhr falsch): Zusammenfassung und Knopf zeigen dann
                // den verbindlichen Betrag.
                if ('promotionId' in res) {
                  setPromotion(getPromotionById(res.promotionId))
                }
                return
              }

              window.location.href = res.url
            }}
            className="space-y-6"
            id="event-form"
          >
            <Input
              name="tenantId"
              defaultValue={tenantId}
              className="hidden"
              hidden
            />
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <FileText className="h-4 w-4 text-primary" />
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
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="z. B. Hotel Bellevue, Zürich"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange('location', e.target.value)
                      }
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
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

            {/* Date & Time */}
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
                      {eventDate ? (
                        format(toLocalDate(eventDate), 'PPP', { locale: de })
                      ) : (
                        <span>Datum wählen</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      locale={de}
                      selected={eventDate ? toLocalDate(eventDate) : undefined}
                      defaultMonth={
                        eventDate ? toLocalDate(eventDate) : undefined
                      }
                      onSelect={(date) => {
                        setDatePickerOpen(false)
                        if (date) {
                          // Store as yyyy-MM-dd
                          const local = format(date, 'yyyy-MM-dd')
                          handleInputChange('date', local)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {/* Hidden input for form submission */}
                <input
                  type="hidden"
                  name="date"
                  value={formData.date}
                  required
                />
                {promotion && (
                  <PromotionHint
                    promotion={promotion}
                    eligible={quote !== null && quote.discountAmount > 0}
                    hasDate={eventDate !== null}
                  />
                )}
              </div>
            </div>

            {/* Plan Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <CalendarPlus className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Paket auswählen
                </h3>
              </div>

              <div className="space-y-2">
                <PlanPicker
                  value={plan}
                  onChange={setPlan}
                  eventDate={eventDate}
                  promotion={promotion}
                />
              </div>
            </div>

            {/* Preiszusammenfassung vor Stripe: der Endbetrag steht hier und
                auf dem Knopf, nicht erst auf der Zahlungsseite. */}
            {quote && eventDate && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Receipt className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Zusammenfassung
                  </h3>
                </div>
                <dl className="rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-2">
                  <SummaryRow label="Paket" value={planName} />
                  <SummaryRow
                    label="Eventdatum"
                    value={format(toLocalDate(eventDate), 'PPP', { locale: de })}
                  />
                  <div className="border-t border-border/60 !my-3" />
                  <SummaryRow
                    label="Regulärer Preis"
                    value={formatChf(quote.regularPrice)}
                  />
                  {quote.promotion && (
                    <SummaryRow
                      label={`${quote.promotion.name} −${quote.discountPercent}\u00A0%`}
                      value={formatChf(-quote.discountAmount)}
                      className="text-primary"
                    />
                  )}
                  <div className="border-t border-border/60 !my-3" />
                  <SummaryRow
                    label="Total"
                    value={formatChf(quote.finalPrice)}
                    className="text-base font-semibold"
                  />
                </dl>
                <p className="text-xs text-muted-foreground">
                  Einmalpreis für dieses Event. Du wirst zur sicheren Zahlung
                  bei Stripe weitergeleitet.
                </p>
              </div>
            )}
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
            form="event-form"
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
                Weiterleitung zur Zahlung…
              </span>
            ) : quote ? (
              `${formatChf(quote.finalPrice)} bezahlen`
            ) : (
              'Weiter zur Zahlung'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SummaryRow({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <dt>{label}</dt>
      <dd className="tabular-nums whitespace-nowrap">{value}</dd>
    </div>
  )
}

/**
 * Hinweis unter dem Datum. Beantwortet die Frage "wie bekomme ich die
 * Aktion?", bevor sie gestellt wird – und reagiert sofort aufs Datum.
 */
function PromotionHint({
  promotion,
  eligible,
  hasDate,
}: {
  promotion: Promotion
  eligible: boolean
  hasDate: boolean
}) {
  const percent = promotionPercentLabel(promotion)
  const months = promotionMonthsLabel(promotion)

  return (
    <p
      aria-live="polite"
      className={cn(
        'flex items-start gap-2 rounded-md px-3 py-2 text-sm',
        eligible
          ? 'bg-primary/10 text-primary font-medium'
          : 'bg-muted/50 text-muted-foreground',
      )}
    >
      {eligible ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
      ) : (
        <Snowflake className="mt-0.5 size-4 shrink-0" aria-hidden />
      )}
      <span>
        {eligible
          ? `${percent} ${promotion.name} aktiviert`
          : hasDate
            ? `Die ${promotion.name} gilt für Events im ${months}.`
            : `Für Events im ${months} erhältst du automatisch ${percent} ${promotion.name}.`}
      </span>
    </p>
  )
}
