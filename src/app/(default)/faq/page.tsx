import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbNode, faqNode, graph } from '@/lib/seo/schema'
import { FAQ_GROUPS, type FaqItem } from '@/lib/content/faq'

export const metadata: Metadata = buildMetadata({
  path: '/faq',
  title: 'Häufige Fragen zur Live-Fotowand',
  description:
    'Antworten zu App, QR-Code, Technik vor Ort, Galerie-Dauer, Datenschutz und Preisen – kompakt auf einer Seite. DSG-konform, Schweizer Hosting.',
})

const allItems: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items)

const jsonLd = graph(
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Häufige Fragen', path: '/faq' },
  ]),
  faqNode(allItems),
)

export default function FaqPage() {
  return (
    <div className='container max-w-4xl py-16 space-y-16'>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label='Brotkrumen'
        className='text-sm text-muted-foreground'
      >
        <Link href='/' className='hover:text-primary transition-colors'>
          Start
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-foreground'>Häufige Fragen</span>
      </nav>

      <header className='max-w-2xl space-y-5'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
          FAQ
        </p>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
          Häufige Fragen zu EventShot
        </h1>
        <p className='text-lg text-muted-foreground'>
          Vor der Buchung, beim Einrichten und am Abend selbst tauchen immer
          dieselben Punkte auf: Hier stehen die Antworten gesammelt an einem
          Ort. Von der ersten Frage der Gäste bis zur automatischen Löschung
          nach dem Fest.
        </p>
      </header>

      <nav aria-label='Themen' className='flex flex-wrap gap-2'>
        {FAQ_GROUPS.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className='rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary/50 hover:text-primary'
          >
            {group.heading}
          </a>
        ))}
      </nav>

      {FAQ_GROUPS.map((group) => (
        <section key={group.id} id={group.id} className='scroll-mt-24 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>{group.heading}</h2>
            <p className='text-muted-foreground'>{group.lead}</p>
          </div>

          {/* Native <details>: Antworten stehen immer im HTML, auch zugeklappt */}
          <div className='space-y-3'>
            {group.items.map((item) => (
              <details
                key={item.question}
                className='group rounded-lg border border-border bg-card shadow-sm'
              >
                <summary className='flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left font-medium [&::-webkit-details-marker]:hidden'>
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
      ))}

      <ScrollReveal>
        <section className='space-y-4 border-t border-border pt-10'>
          <h2 className='text-2xl font-bold'>Hier geht es weiter</h2>
          <ul className='space-y-2 text-muted-foreground'>
            <li>
              <Link
                href='/preise'
                className='text-primary underline underline-offset-4 hover:no-underline'
              >
                Preise
              </Link>{' '}
              – die drei Pakete mit Screens, Galerie-Dauer und Wasserzeichen im
              Überblick.
            </li>
            <li>
              <Link
                href='/funktionen'
                className='text-primary underline underline-offset-4 hover:no-underline'
              >
                Funktionen
              </Link>{' '}
              – vom QR-Upload über die Live-Slideshow bis zur digitalen Galerie.
            </li>
            <li>
              <Link
                href='/anlaesse'
                className='text-primary underline underline-offset-4 hover:no-underline'
              >
                Anlässe
              </Link>{' '}
              – die passende Seite zu Hochzeit, Geburtstag, Taufe und mehr.
            </li>
            <li>
              <Link
                href='/kontakt'
                className='text-primary underline underline-offset-4 hover:no-underline'
              >
                Kontakt
              </Link>{' '}
              – wenn deine Frage hier noch nicht beantwortet ist.
            </li>
          </ul>
          <p className='text-sm text-muted-foreground'>
            Direkt erreichbar sind wir unter{' '}
            <a
              href='mailto:info@edelbyte.ch'
              className='text-primary underline underline-offset-4 hover:no-underline'
            >
              info@edelbyte.ch
            </a>{' '}
            und{' '}
            <a
              href='tel:+41445002504'
              className='text-primary underline underline-offset-4 hover:no-underline'
            >
              044 500 25 04
            </a>
            .
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className='rounded-2xl border border-border bg-card p-8 md:p-12 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>
            Frage geklärt, Fest geplant?
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            Leg dein Event in wenigen Minuten an – die Registrierung ist
            kostenlos, bezahlt wird erst beim Buchen.
          </p>
          <Button size='lg' asChild>
            <Link href='/register'>
              Event starten
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
        </section>
      </ScrollReveal>
    </div>
  )
}
