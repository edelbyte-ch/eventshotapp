import {
  ArrowRight,
  Images,
  Palette,
  Projector,
  QrCode,
  ShieldCheck,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbNode, faqNode, graph } from '@/lib/seo/schema'
import { photoLimitRange } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/funktionen',
  title: 'Funktionen – Live-Slideshow, QR-Upload, Galerie',
  description:
    'Foto-Upload per QR-Code, Live-Slideshow mit Übergängen und einstellbarer Anzeigedauer, digitale Galerie und automatische Löschung.',
})

const BAUSTEINE = [
  {
    icon: QrCode,
    title: 'Foto-Upload per QR-Code',
    copy: 'Deine Gäste richten die Handykamera auf den Code, die Upload-Seite öffnet sich im Browser. Bild antippen, absenden – schon ist es unterwegs zur Leinwand.',
    points: [
      'Keine App-Installation und kein Gästekonto',
      'Läuft im Browser jedes gängigen Smartphones',
      `Je nach Paket ${photoLimitRange()} pro Event`,
    ],
  },
  {
    icon: Projector,
    title: 'Live-Slideshow auf Beamer oder TV',
    copy: 'Der Bildschirm im Saal spielt die Bilder in einer Endlosschleife mit weichen Übergängen ab. Ein frisch hochgeladenes Foto reiht sich innert Sekunden ein.',
    points: [
      'Öffnet sich im Browser von Laptop oder Tablet',
      'Übergänge und Animationen zwischen den Bildern',
      'Anzeigedauer ab Premium einstellbar',
      'Slideshow-Steuerung ab Premium ein- und ausblendbar',
    ],
  },
  {
    icon: Images,
    title: 'Digitale Galerie danach',
    copy: 'Nach dem Fest führt derselbe QR-Code in die digitale Galerie. Dort liegen alle Bilder des Abends beieinander, auch die, die im Trubel niemand gesehen hat.',
    points: [
      'Zugriff über denselben QR-Code wie beim Upload',
      '7 Tage in Basic, 30 in Premium, 90 in Enterprise',
      'Alle Bilder des Anlasses an einem Ort',
    ],
  },
  {
    icon: Palette,
    title: 'Wasserzeichen und eigenes Branding',
    copy: 'Basic und Premium zeigen ein dezentes EventShot-Wasserzeichen in der Slideshow. In Enterprise lässt es sich ausschalten und durch dein eigenes Branding ersetzen.',
    points: [
      'Dezentes EventShot-Wasserzeichen in Basic und Premium',
      'Wasserzeichen in Enterprise optional deaktivierbar',
      'Eigenes Branding in der Slideshow ab Enterprise',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Datenschutz und automatische Löschung',
    copy: 'Die Bilder liegen auf unserer eigenen Infrastruktur in der Schweiz. Läuft die Galerie-Frist deines Pakets ab, verschwinden sie ohne dein Zutun wieder.',
    points: [
      'DSG-konform, Schweizer Hosting',
      'Kein Drittanbieter, keine Weitergabe',
      'Automatische Löschung nach Galerie-Ablauf',
    ],
  },
]

const ABLAUF = [
  {
    title: 'QR-Code aufstellen',
    copy: 'Du druckst den Code deines Events aus und legst ihn auf die Tische oder stellst ihn neben die Leinwand.',
  },
  {
    title: 'Gäste laden hoch',
    copy: 'Gescannt wird mit der Kamera-App, hochgeladen im Browser. Das Bild erscheint sofort in der Live-Slideshow.',
  },
  {
    title: 'Galerie danach',
    copy: 'Nach dem Anlass bleibt die digitale Galerie über denselben Code offen, bis die Frist des Pakets abgelaufen ist.',
  },
]

const FAQ = [
  {
    question: 'Setzt der QR-Code-Upload eine App voraus?',
    answer:
      'Nein. Gescannt wird mit der Kamera, die ohnehin auf dem Handy ist, danach läuft alles im Browser – ohne App und ohne Konto.',
  },
  {
    question: 'Wie lange bleibt die Galerie nach dem Event abrufbar?',
    answer:
      'Das hängt vom Paket ab: mit Basic 7 Tage, mit Premium 30 und mit Enterprise 90. Danach löscht das System die Bilder automatisch und DSG-konform.',
  },
  {
    question: 'Welche Technik muss am Veranstaltungsort stehen?',
    answer:
      'Ein Beamer, Fernseher oder Monitor, daran ein Gerät mit Browser und eine stabile Internetverbindung. Weitere Ausrüstung braucht es nicht.',
  },
]

const jsonLd = graph(
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Funktionen', path: '/funktionen' },
  ]),
  faqNode(FAQ),
)

export default function FunktionenPage() {
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
            Funktionen
          </p>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Alle Funktionen von EventShot
          </h1>
          <p className='text-lg text-muted-foreground'>
            Hochladen, anzeigen, aufbewahren: Darauf läuft EventShot am Fest
            hinaus. Hier steht, was jede einzelne Funktion leistet – vom
            QR-Code auf dem Tisch bis zur digitalen Galerie, die sich nach der
            Frist deines Pakets von selbst leert.
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button size='lg' asChild>
              <Link href='/register'>
                Event starten
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/preise'>Preise ansehen</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Bausteine */}
      <section className='space-y-6'>
        <h2 className='text-2xl md:text-3xl font-bold'>
          Die Funktionen im Einzelnen
        </h2>
        <div className='grid gap-4 md:grid-cols-2'>
          {BAUSTEINE.map((baustein) => (
            <ScrollReveal key={baustein.title}>
              <div className='flex h-full flex-col rounded-2xl border border-border bg-card p-6'>
                <span className='mb-4 w-fit rounded-lg bg-primary/10 p-3'>
                  <baustein.icon className='size-6 text-primary' />
                </span>
                <h3 className='text-lg font-semibold'>{baustein.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {baustein.copy}
                </p>
                <ul className='mt-4 space-y-2 text-sm'>
                  {baustein.points.map((point) => (
                    <li key={point} className='flex items-start gap-2'>
                      <span
                        aria-hidden='true'
                        className='mt-1.5 size-1.5 shrink-0 rounded-full bg-primary'
                      />
                      <span className='text-muted-foreground'>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <ScrollReveal>
        <section className='space-y-8'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>
              So läuft der Abend ab
            </h2>
            <p className='max-w-2xl text-muted-foreground'>
              Zwischen dem ersten Upload und der Galerie danach musst du nichts
              weiter tun.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {ABLAUF.map((schritt, index) => (
              <div
                key={schritt.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <span className='text-sm font-semibold text-muted-foreground'>
                  0{index + 1}
                </span>
                <h3 className='mt-2 font-semibold'>{schritt.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {schritt.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Paketzuordnung */}
      <ScrollReveal>
        <section className='flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-8 md:flex-row md:items-center'>
          <div className='space-y-1'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Funktion und Paket
            </p>
            <h2 className='text-2xl font-bold'>
              Was ab welchem Paket dabei ist
            </h2>
            <p className='max-w-xl text-sm text-muted-foreground'>
              QR-Upload, Live-Slideshow und digitale Galerie stecken in allen
              drei Paketen. Einstellbare Anzeigedauer und Slideshow-Steuerung
              kommen mit Premium dazu, das eigene Branding und das abschaltbare
              Wasserzeichen mit Enterprise.
            </p>
          </div>
          <Button size='lg' asChild className='shrink-0'>
            <Link href='/preise'>Zu den Preisen</Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Fragen zu den Funktionen
          </h2>
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
            Alles gesehen, was du brauchst?
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            Richte dein Event in wenigen Minuten ein – Registrierung kostenlos,
            gezahlt wird erst beim Buchen.
          </p>
          <Button size='lg' asChild>
            <Link href='/register'>
              Event starten
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* Abgrenzung Grossanlass */}
      <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
        Suchst du diese Funktionen für eine Messe, eine Konferenz oder einen
        Anlass mit mehreren hundert Teilnehmenden? Dafür steht unser
        Schwesterprodukt{' '}
        <a
          href='https://social-wall.ch'
          className='font-medium text-primary hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          social-wall.ch
        </a>{' '}
        bereit. Wie sich die Pakete unterscheiden, steht auf der Seite{' '}
        <Link
          href='/preise'
          className='font-medium text-primary hover:underline'
        >
          Preise
        </Link>
        .
      </div>
    </div>
  )
}
