import {
  ArrowRight,
  CheckCircle,
  Mail,
  MinusCircle,
  Phone,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { REEL, ReelPlayer } from '@/components/landing/reel-player'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { buildMetadata } from '@/lib/seo/metadata'
import {
  breadcrumbNode,
  faqNode,
  graph,
  SITE,
  videoNode,
} from '@/lib/seo/schema'

export const metadata: Metadata = buildMetadata({
  path: '/demo',
  title: 'Demo-Video ansehen – ohne Registrierung',
  description:
    'Ein 25-Sekunden-Video zeigt den ganzen Ablauf vom QR-Code bis zur Galerie – ohne Registrierung. Mit Konto bekommst du dazu ein eigenes Demo-Event: 20 Fotos gratis, voller Funktionsumfang.',
})

const ablauf = [
  {
    title: 'QR-Code aufstellen',
    copy: 'Der Code deines Events steht auf Tischkarten, Aufstellern und einem Schild neben der Leinwand.',
  },
  {
    title: 'Gäste laden hoch',
    copy: 'Scannen, Bild aus der Handy-Galerie wählen, abschicken. Es erscheint kurz darauf auf dem Screen.',
  },
  {
    title: 'Galerie danach',
    copy: 'Derselbe Code führt nach dem Fest zur digitalen Galerie mit allen Bildern des Abends.',
  },
]

const screen = [
  'Elegante Live-Slideshow auf Beamer oder TV',
  'Neue Uploads erscheinen, ohne die Seite neu zu laden',
  'Einstellbare Anzeigedauer ab Premium',
  'Slideshow-Steuerung ein- und ausblendbar',
  'Dezentes EventShot-Wasserzeichen, ab Enterprise abschaltbar',
  'Slideshow mit eigenem Branding im Enterprise-Paket',
]

const grenzen = [
  {
    title: 'Keine offene Slideshow',
    copy: 'Jede Slideshow hängt an einem angelegten Event und zeigt die Bilder echter Gäste. Eine öffentliche Instanz zum Herumklicken gibt es deshalb nicht – dafür dein eigenes Demo-Event nach der Anmeldung.',
  },
  {
    title: 'Keine fremde Beispielgalerie',
    copy: 'Die Galerie öffnet sich über den QR-Code des jeweiligen Events. Bilder aus Kundenevents stellen wir nirgends zur Ansicht.',
  },
  {
    title: 'Keine Erzählung',
    copy: 'Das Video dauert 25 Sekunden, läuft mit Musik und kommt ohne Sprecher aus. Alles Erklärende steht als Text auf dieser Seite.',
  },
]

const faq = [
  {
    question: 'Müssen wir uns registrieren, um die Demo zu sehen?',
    answer:
      'Für das Video nicht: Es läuft direkt hier im Browser, ohne Konto und ohne Formular. Wer selbst hochladen und die Slideshow bedienen will, legt ein kostenloses Konto an – dazu gehört ein Demo-Event mit 20 Gratis-Fotos, ohne Zahlungsdaten.',
  },
  {
    question: 'Was kostet das Demo-Event?',
    answer:
      'Nichts. Das Demo-Event ist im kostenlosen Konto enthalten, hat den vollen Funktionsumfang und ist auf 20 Fotos begrenzt. Es läuft nicht ab und verlängert sich nicht in ein Abo – für eine echte Feier buchst du danach ein Event ohne Foto-Grenze.',
  },
  {
    question: 'Gibt es eine Beispielgalerie zum Anklicken?',
    answer:
      'Keine fremde. Slideshow und Galerie gehören immer zu einem angelegten Event mit echten Gästefotos, darum steht keine offene Demo-Galerie im Netz. Stattdessen bekommst du nach der Anmeldung ein eigenes Demo-Event mit 20 Gratis-Fotos und siehst Galerie und Slideshow mit deinen eigenen Bildern.',
  },
  {
    question: 'Zeigt das Video ein echtes Kundenevent?',
    answer:
      'Nein. Die Szenen sind gestellt und dienen als Beispieldarstellung des Ablaufs. Fotos aus echten Anlässen unserer Kunden veröffentlichen wir nicht.',
  },
  {
    question: 'Können wir die Slideshow vor dem Fest ausprobieren?',
    answer:
      'Ja. Du öffnest sie vorab auf demselben Weg wie am Abend selbst und lädst ein paar Testbilder hoch. So kennst du Bildwechsel und Bedienung, bevor der erste Gast scannt.',
  },
]

const jsonLd = graph(
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
  ]),
  videoNode({
    name: 'EventShot Demo-Video – vom Foto bis zur Galerie',
    description:
      'Demo-Video von 25 Sekunden: Gäste scannen den QR-Code, laden ein Foto ohne App hoch und sehen es live auf der Leinwand. Danach liegen alle Bilder in der gemeinsamen Galerie. Beispieldarstellung von EventShot.',
    contentUrl: `${SITE.url}${REEL.desktop.src}`,
    thumbnailUrl: `${SITE.url}${REEL.desktop.poster}`,
    uploadDate: REEL.uploadDate,
    duration: REEL.duration,
  }),
  faqNode(faq),
)

export default function DemoPage() {
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
            Demo
          </p>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            EventShot im Demo-Video ansehen
          </h1>
          <p className='text-lg text-muted-foreground'>
            QR-Code, Upload, Leinwand, Galerie: Das Video zeigt in 25
            Sekunden den ganzen Ablauf eines Fests mit EventShot. Darunter steht,
            was davor passiert, was danach bleibt und wie du die Oberfläche
            gemeinsam mit uns anschaust.
          </p>

          {/* Der Unterschied zum Video darunter: hier bekommt man ein eigenes
              Event mit eigenen Fotos. Das gehoert vor den Player und nicht ans
              Seitenende — sonst schaut jemand 25 Sekunden zu und geht wieder,
              ohne je erfahren zu haben, dass er es selbst ausprobieren kann. */}
          <div className='rounded-2xl border border-primary/25 bg-primary/[0.07] p-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
              Neu · Dein eigenes Demo-Event
            </p>
            <p className='mt-3 text-base leading-relaxed'>
              Statt nur zuzuschauen: Nach der Anmeldung wartet ein fertiges
              Event auf dich – mit QR-Code, Galerie und Slideshow im vollen
              Funktionsumfang, für <strong>20 Fotos gratis</strong>.
            </p>
            <p className='mt-2 text-sm text-muted-foreground'>
              Keine Zahlungsdaten, keine Frist zum Kündigen. Du lädst mit dem
              Handy ein paar Bilder hoch und siehst sie auf der Leinwand – genau
              wie deine Gäste am Fest.
            </p>
            <Button className='mt-5' asChild>
              <Link href='/register' data-umami-event='demo-register'>
                Demo-Event holen
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Video */}
      <ScrollReveal>
        <section className='space-y-4'>
          <ReelPlayer />
          <p className='text-sm text-muted-foreground'>
            Beispieldarstellung, 25 Sekunden, mit Musik. Die Szenen sind
            gestellt und zeigen kein echtes Kundenevent.
          </p>
        </section>
      </ScrollReveal>

      {/* Ablauf */}
      <ScrollReveal>
        <section className='space-y-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            So läuft es an deinem Fest
          </h2>
          <div className='grid gap-4 md:grid-cols-3'>
            {ablauf.map((step, i) => (
              <div
                key={step.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <span className='text-sm font-semibold text-muted-foreground'>
                  0{i + 1}
                </span>
                <h3 className='mt-2 font-semibold'>{step.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Was auf dem Screen laeuft */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Was auf dem Screen läuft
          </h2>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {screen.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm'
              >
                <CheckCircle className='mt-0.5 size-4 shrink-0 text-primary' />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* Grenzen der Demo */}
      <ScrollReveal>
        <section className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>
              Was die Demo nicht zeigt
            </h2>
            <p className='max-w-2xl text-muted-foreground'>
              Lieber vorher gesagt als hinterher gesucht: Diese drei Dinge
              findest du auf dieser Seite bewusst nicht.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {grenzen.map((item) => (
              <div
                key={item.title}
                className='rounded-2xl border border-border bg-muted/50 p-6'
              >
                <MinusCircle className='size-4 text-muted-foreground' />
                <h3 className='mt-2 font-semibold'>{item.title}</h3>
                <p className='mt-1.5 text-sm text-muted-foreground'>
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Begleitete Demo */}
      <ScrollReveal>
        <section className='flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-8 md:flex-row md:items-center'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Begleitete Demo
            </p>
            <h2 className='text-2xl font-bold'>Wir zeigen es dir persönlich</h2>
            <p className='max-w-lg text-sm text-muted-foreground'>
              Melde dich mit deinem Anlass und dem ungefähren Datum. Wir gehen
              Slideshow, Galerie und den passenden Plan mit dir durch, bevor du
              etwas buchst.
            </p>
          </div>
          <div className='flex flex-col gap-3 shrink-0'>
            <Button size='lg' asChild>
              <a href='mailto:info@edelbyte.ch'>
                <Mail className='mr-2 size-4' />
                info@edelbyte.ch
              </a>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <a href='tel:+41445002504'>
                <Phone className='mr-2 size-4' />
                044 500 25 04
              </a>
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-bold'>Häufige Fragen</h2>
          <div className='space-y-3'>
            {faq.map((item) => (
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
            Vom Video zum eigenen Event
          </h2>
          <p className='text-muted-foreground mb-2 max-w-2xl mx-auto'>
            Anlegen dauert wenige Minuten, danach hältst du den QR-Code für die
            Tischkarten in der Hand.
          </p>
          <p className='text-sm text-muted-foreground mb-6'>
            Registrierung kostenlos • Einmalpreis pro Event • Kein Abo
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
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
        </section>
      </ScrollReveal>

      {/* Weiterlesen */}
      <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
        Weiterlesen:{' '}
        <Link
          href='/qr-code-vorlagen'
          className='font-medium text-primary hover:underline'
        >
          QR-Code auf Tischkarten und Schildern gestalten
        </Link>{' '}
        oder{' '}
        <Link
          href='/anlaesse'
          className='font-medium text-primary hover:underline'
        >
          Fotowand für jeden Anlass
        </Link>
        . Für Grossanlässe mit mehreren Bildschirmen empfehlen wir das
        Schwesterprodukt{' '}
        <a
          href='https://social-wall.ch'
          className='font-medium text-primary hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          social-wall.ch
        </a>{' '}
        von EdelByte.
      </div>
    </div>
  )
}
