import { ArrowRight, Check, Minus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PlanPrice } from '@/components/promotion/plan-price'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { pricingPlans } from '@/lib/constants'
import { formatPhotoCount, photoLimitPhrase } from '@/lib/photo-limits'
import { promotionMonthsLabel } from '@/lib/promotions'
import { getDisplayPromotion } from '@/lib/promotions.server'
import { buildMetadata } from '@/lib/seo/metadata'
import {
  breadcrumbNode,
  faqNode,
  graph,
  softwareApplicationNode,
} from '@/lib/seo/schema'

const PREISE = pricingPlans.map((p) => p.price.replace('CHF ', ''))

export const metadata: Metadata = buildMetadata({
  path: '/preise',
  title: `Preise – CHF ${PREISE[0]}, ${PREISE[1]} oder ${PREISE[2]} pro Event`,
  description:
    'Drei Pakete, ein Einmalpreis pro Event: 1 bis unbegrenzt Slideshow-Screens und 7 bis 90 Tage digitale Galerie. Registrierung kostenlos.',
})

/** Vergleichszeilen – alle Werte stammen aus `pricingPlans` in `@/lib/constants`. */
const COMPARISON: { label: string; values: [string, string, string] }[] = [
  {
    label: 'Preis pro Event',
    values: pricingPlans.map((p) => p.price) as [string, string, string],
  },
  {
    label: 'Fotos pro Event',
    values: pricingPlans.map((p) =>
      p.photoLimit === null
        ? 'unbegrenzt'
        : `bis ${formatPhotoCount(p.photoLimit)}`,
    ) as [string, string, string],
  },
  { label: 'Slideshow-Screens', values: ['1', '3', 'unbegrenzt'] },
  { label: 'Digitale Galerie', values: ['7 Tage', '30 Tage', '90 Tage'] },
  {
    label: 'Anzeigedauer der Bilder',
    values: ['–', 'einstellbar', 'erweiterte Einstellungen'],
  },
  {
    label: 'Slideshow-Steuerung',
    values: ['–', 'ein- und ausblendbar', 'konfigurierbar'],
  },
  {
    label: 'EventShot-Wasserzeichen',
    values: ['dezent enthalten', 'dezent enthalten', 'optional deaktivierbar'],
  },
  {
    label: 'Eigenes Branding in der Slideshow',
    values: ['–', '–', 'enthalten'],
  },
  {
    label: 'Support',
    values: ['–', 'Prioritäts-Support', 'Persönlicher Support'],
  },
]

/**
 * Ein Vergleichswert: «–» als dezentes Icon mit Text «nicht enthalten»,
 * kurze Werte ohne Umbruch (z. B. «CHF 149.-», «90 Tage»).
 */
function ComparisonValue({ value }: { value: string }) {
  if (value === '–') {
    return (
      <span className='inline-flex items-center gap-1.5 font-normal text-muted-foreground'>
        <Minus className='size-4 shrink-0' aria-hidden='true' />
        nicht enthalten
      </span>
    )
  }
  return (
    <span className={value.length <= 10 ? 'whitespace-nowrap' : undefined}>
      {value}
    </span>
  )
}

const IMMER_ENTHALTEN = [
  'Foto-Upload per QR-Code, ganz ohne App',
  'Beliebig viele Gäste ohne Aufpreis',
  'Live-Slideshow auf Beamer oder TV',
  'Digitale Galerie über denselben QR-Code',
  'DSG-konform, Schweizer Hosting',
  'Automatische Löschung nach Galerie-Ablauf',
]

const GRUENDE = [
  {
    title: 'Ein Preis, ein Fest',
    copy: 'Der Betrag deckt den ganzen Anlass ab: die Live-Slideshow im Saal, sämtliche Uploads deiner Gäste und den Galerie-Zeitraum danach.',
  },
  {
    title: 'Keine Technikmiete',
    copy: 'Es rückt keine Fotobox an, die aufgebaut und den Abend über betreut werden muss. Du brauchst einen Bildschirm mit Internetzugang, mehr nicht.',
  },
  {
    title: 'Zahlen musst nur du',
    copy: 'Die Gäste scannen den QR-Code und laden im Browser hoch – ohne Konto, ohne Installation und ohne eigene Kosten.',
  },
]

const FAQ = [
  {
    question: 'Kann ich ein Event anlegen, bevor ich ein Paket wähle?',
    answer:
      'Ja. Du legst den Anlass zuerst an und richtest ihn ein; das Paket bestimmst du, wenn du buchst.',
  },
  {
    question: 'Wie viele Fotos sind im Preis enthalten?',
    answer: `Basic nimmt ${photoLimitPhrase('BASIC')} pro Event an, Premium ${photoLimitPhrase('PREMIUM')} und Enterprise ${photoLimitPhrase('ENTERPRISE')}. Ist die Grenze erreicht, bleiben alle Fotos erhalten – nur neue Uploads werden nicht mehr angenommen. Daneben unterscheiden sich die Pakete bei den Slideshow-Screens, der Dauer der digitalen Galerie und den Slideshow-Einstellungen.`,
  },
  {
    question: 'Zahle ich mehr, wenn mehr Gäste kommen?',
    answer:
      'Nein. Der Paketpreis hängt nicht an der Gästezahl, sondern an der Anzahl Fotos, den Slideshow-Screens, der Galerie-Dauer und den Slideshow-Einstellungen.',
  },
  {
    question: 'Gilt der Preis auch für ein zweites Fest?',
    answer:
      'Nein. Abgerechnet wird pro Anlass – für die nächste Feier wählst du erneut ein Paket.',
  },
]

const jsonLd = graph(
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Preise', path: '/preise' },
  ]),
  // Paketpreise als Offer-Knoten, damit Suchmaschinen und KI-Agenten die
  // Preise direkt auf der Preisseite maschinenlesbar finden.
  softwareApplicationNode(),
  faqNode(FAQ),
)

export default async function PreisePage() {
  const promotion = await getDisplayPromotion()

  return (
    <div className='container max-w-5xl py-16 space-y-20'>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <ScrollReveal>
        <div className='max-w-2xl space-y-5'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            Preise
          </p>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Preise – Einmalpreis pro Event
          </h1>
          <p className='text-lg text-muted-foreground'>
            Ob Familienfest im Garten, Hochzeit im Saal oder Firmenessen im
            Team: Du buchst einmal, für genau dieses eine Fest. Welches der drei
            Pakete passt, entscheiden zwei Fragen – wie viele Slideshow-Screens
            im Raum stehen und wie lange die digitale Galerie danach offen
            bleiben soll.
          </p>
          <p className='text-sm text-muted-foreground'>
            Registrierung kostenlos • Einmalpreis pro Event • Kein Abo
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button size='lg' asChild>
              <Link href='/register'>
                Event starten
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/funktionen'>Funktionen ansehen</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Pakete */}
      <ScrollReveal>
        <section className='space-y-8'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>Die drei Pakete</h2>
            <p className='max-w-2xl text-muted-foreground'>
              Alle Angaben gelten pro Event und in Schweizer Franken. Gebucht
              wird das Paket erst, wenn dein Datum feststeht.
            </p>
            {promotion && (
              <p className='max-w-2xl text-sm text-muted-foreground'>
                <span className='font-semibold text-primary'>
                  {promotion.name}:
                </span>{' '}
                Liegt dein Event im {promotionMonthsLabel(promotion)}, wird der
                Rabatt beim Buchen automatisch abgezogen – ganz ohne Code.
              </p>
            )}
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 ${
                  plan.highlighted
                    ? 'border-primary shadow-lg'
                    : 'border-border shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <span className='absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg bg-primary px-4 py-1 text-sm font-medium text-primary-foreground'>
                    Meistgewählt
                  </span>
                )}
                <div className={plan.highlighted ? 'pt-6' : ''}>
                  <h3 className='text-xl font-bold'>{plan.name}</h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {plan.description}
                  </p>
                  <PlanPrice
                    regularPrice={plan.priceRappen}
                    duration={plan.duration}
                    promotion={promotion}
                    className='mt-4'
                  />
                </div>
                <ul className='mt-6 space-y-3 text-sm'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-2'>
                      <Check className='mt-0.5 size-4 shrink-0 text-primary' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Vergleich */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Pakete im Vergleich
          </h2>
          {/* Eine Datenquelle, zwei Darstellungen: bis md eine Karte pro
              Paket, ab md die Tabelle in fester Breite ohne Scrollen. Die
              Karten tragen data-md-skip, damit die Markdown-Fassung die
              Angaben nur einmal (als Tabelle) enthaelt. */}
          <ul data-md-skip className='grid gap-4 md:hidden'>
            {pricingPlans.map((plan, index) => (
              <li
                key={plan.name}
                className={`relative rounded-2xl border bg-card p-6 ${
                  plan.highlighted
                    ? 'border-primary shadow-lg'
                    : 'border-border shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <span className='absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg bg-primary px-4 py-1 text-sm font-medium text-primary-foreground'>
                    Meistgewählt
                  </span>
                )}
                <div className={plan.highlighted ? 'pt-6' : ''}>
                  <h3 className='text-xl font-bold'>{plan.name}</h3>
                  <p className='mt-2'>
                    <span className='text-3xl font-bold'>{plan.price}</span>{' '}
                    <span className='text-sm text-muted-foreground'>
                      {plan.duration}
                    </span>
                  </p>
                </div>
                <dl className='mt-5 grid grid-cols-[minmax(0,9rem)_1fr] gap-x-4 gap-y-3 border-t border-border pt-5 text-sm'>
                  {COMPARISON.filter((row) => row.label !== 'Preis pro Event').map(
                    (row) => [
                      <dt
                        key={`${row.label}-dt`}
                        className='text-muted-foreground'
                      >
                        {row.label}
                      </dt>,
                      <dd key={`${row.label}-dd`} className='font-medium'>
                        <ComparisonValue value={row.values[index]} />
                      </dd>,
                    ],
                  )}
                </dl>
              </li>
            ))}
          </ul>

          <div className='hidden overflow-hidden rounded-2xl border border-border shadow-sm md:block'>
            <table className='w-full table-fixed border-collapse text-sm'>
              <colgroup>
                <col className='w-[30%]' />
                {pricingPlans.map((plan) => (
                  <col key={plan.name} />
                ))}
              </colgroup>
              <thead>
                <tr className='bg-muted/50 text-left'>
                  <th scope='col' className='px-4 py-3 font-semibold'>
                    Leistung
                  </th>
                  {pricingPlans.map((plan) => (
                    <th
                      key={plan.name}
                      scope='col'
                      className={`px-4 py-3 font-semibold ${
                        plan.highlighted ? 'bg-primary/10' : ''
                      }`}
                    >
                      {plan.name}
                      {plan.highlighted && (
                        <span className='ml-2 whitespace-nowrap text-xs font-medium text-primary'>
                          Meistgewählt
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className='border-t border-border'>
                    <th
                      scope='row'
                      className='px-4 py-3 text-left font-medium text-muted-foreground'
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${pricingPlans[index].name}`}
                        className={`px-4 py-3 ${
                          pricingPlans[index].highlighted ? 'bg-primary/5' : ''
                        }`}
                      >
                        <ComparisonValue value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      {/* Immer enthalten */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            In jedem Paket enthalten
          </h2>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {IMMER_ENTHALTEN.map((item) => (
              <li
                key={item}
                className='flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm'
              >
                <Check className='size-4 shrink-0 text-primary' />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* Warum Einmalpreis */}
      <ScrollReveal>
        <section className='space-y-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Warum ein Einmalpreis
          </h2>
          <div className='grid gap-4 md:grid-cols-3'>
            {GRUENDE.map((grund, index) => (
              <div
                key={grund.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <span className='text-sm font-semibold text-muted-foreground'>
                  0{index + 1}
                </span>
                <h3 className='mt-2 font-semibold'>{grund.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {grund.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Welches Paket */}
      <ScrollReveal>
        <section className='flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-8 md:flex-row md:items-center'>
          <div className='space-y-1'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Kurz zugeordnet
            </p>
            <h2 className='text-2xl font-bold'>Welches Paket zu was passt</h2>
            <p className='max-w-xl text-sm text-muted-foreground'>
              Basic reicht für Geburtstage und Feiern im kleinen Kreis. Premium
              ist der Normalfall für Hochzeiten und Vereinsfeste, weil die
              Galerie 30 Tage offen bleibt. Enterprise lohnt sich, sobald du
              eigenes Branding in der Slideshow zeigen willst.
            </p>
          </div>
          <Button size='lg' variant='outline' asChild className='shrink-0'>
            <Link href='/anlaesse'>Anlässe ansehen</Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-bold'>Fragen zum Preis</h2>
          <div className='space-y-3'>
            {FAQ.map((item) => (
              <details
                key={item.question}
                className='group rounded-lg border border-border shadow-sm'
              >
                <summary className='flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden'>
                  {item.question}
                  <span className='shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='px-6 pb-4 text-muted-foreground'>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className='rounded-2xl border border-border bg-card p-8 md:p-12 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>
            Paket gewählt?
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            Leg dein Event an, hinterlege die Details in Ruhe und buche das
            Paket, sobald alles sitzt.
          </p>
          <Button size='lg' asChild>
            <Link href='/register'>
              Event starten
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
          <p className='mt-6 text-sm text-muted-foreground'>
            Passt keines der drei Pakete zu deinem Anlass? Schreib an{' '}
            <a
              href='mailto:info@edelbyte.ch'
              className='text-primary underline underline-offset-4'
            >
              info@edelbyte.ch
            </a>{' '}
            oder ruf an unter{' '}
            <a
              href='tel:+41445002504'
              className='text-primary underline underline-offset-4'
            >
              044 500 25 04
            </a>
            .
          </p>
        </section>
      </ScrollReveal>

      {/* Abgrenzung Grossanlass */}
      <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
        Rechnest du mit mehreren hundert Gästen, etwa an einer Konferenz oder
        Messe? Für diese Grössenordnung ist unser Schwesterprodukt{' '}
        <a
          href='https://social-wall.ch'
          className='font-medium text-primary hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          social-wall.ch
        </a>{' '}
        gebaut.
      </div>
    </div>
  )
}
