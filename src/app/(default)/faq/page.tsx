import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbNode, faqNode, graph } from '@/lib/seo/schema'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/faq',
  title: 'Häufige Fragen zur Live-Fotowand',
  description:
    'Antworten zu App, QR-Code, Technik vor Ort, Galerie-Dauer, Datenschutz und Preisen – kompakt auf einer Seite. DSG-konform, Schweizer Hosting.',
})

type FaqItem = { question: string; answer: string }

type FaqGroup = {
  id: string
  heading: string
  lead: string
  items: FaqItem[]
}

/**
 * Zentrale Frageliste der Domain. Sie ist zugleich die Quelle fuer das
 * FAQPage-Markup – deshalb enthaelt kein Antworttext Links, Aufzaehlungen
 * oder Formatierung.
 */
const groups: FaqGroup[] = [
  {
    id: 'upload',
    heading: 'Upload und QR-Code',
    lead: 'Was auf dem Handy der Gäste passiert – und was eben nicht.',
    items: [
      {
        question: 'Wie kommen die Gäste zum Foto-Upload?',
        answer:
          'Über den QR-Code. Ein Scan mit der Handykamera öffnet die Upload-Seite direkt im Browser – ohne App und ohne Konto.',
      },
      {
        question: 'Funktioniert das auf jedem Smartphone gleich?',
        answer:
          'Ja. iPhone und Android brauchen nur die eingebaute Kamera und einen aktuellen Browser, ein bestimmtes Modell ist nicht nötig.',
      },
      {
        question: 'Wie viele Fotos darf eine einzelne Person beisteuern?',
        answer:
          `So viele, wie sie möchte – eine Obergrenze pro Gast gibt es nicht. Begrenzt ist nur die Gesamtzahl pro Event: Basic nimmt ${photoLimitPhrase('BASIC')} an, Premium ${photoLimitPhrase('PREMIUM')} und Enterprise ${photoLimitPhrase('ENTERPRISE')}.`,
      },
      {
        question: 'Lassen sich auch Videos hochladen?',
        answer:
          'Nein. Die Upload-Seite nimmt ausschliesslich Bilder entgegen, EventShot ist auf Fotos ausgelegt.',
      },
      {
        question: 'Steht bei den Bildern, wer sie beigesteuert hat?',
        answer:
          'Nein. Slideshow und Galerie zeigen allein das Foto, weder Namen noch Nachrichten erscheinen dazu.',
      },
    ],
  },
  {
    id: 'einrichten',
    heading: 'Event einrichten',
    lead: 'Der Teil, den du vor dem Anlass einmal erledigst.',
    items: [
      {
        question: 'Wie lange dauert das Aufsetzen eines Events?',
        answer:
          'Wenige Minuten. Du legst das Event an, wählst das Paket und hast danach den QR-Code und die Event-Adresse zur Hand.',
      },
      {
        question: 'Kann ich den QR-Code ausdrucken lassen?',
        answer:
          'Ja. Du lädst ihn als Bilddatei herunter und setzt ihn auf Tischkarten, Aufsteller oder ein Plakat im Eingang.',
      },
      {
        question: 'Wie früh soll ich das Event anlegen?',
        answer:
          'Sobald Datum und Location feststehen. Dann bleibt Zeit, den Code drucken zu lassen und die Anzeige einmal in Ruhe durchzuspielen.',
      },
      {
        question: 'Muss vor Ort etwas installiert werden?',
        answer:
          'Nein. Die Anzeige läuft im Browser des Geräts, das am Bildschirm hängt. Zusätzliche Software oder Hardware braucht es nicht.',
      },
    ],
  },
  {
    id: 'technik',
    heading: 'Slideshow und Technik',
    lead: 'Was im Saal steht und wie die Bilder dorthin kommen.',
    items: [
      {
        question: 'Welches Gerät hängt am Beamer oder Fernseher?',
        answer:
          'Ein Laptop, ein Tablet oder ein Smart-TV mit Browser. Darauf rufst du die Slideshow auf und gibst sie auf Leinwand, Beamer oder TV aus.',
      },
      {
        question: 'Wie schnell erscheint ein Foto auf dem Screen?',
        answer:
          'In Sekunden. Ist der Upload durch, nimmt die laufende Slideshow das neue Bild in die Rotation auf.',
      },
      {
        question: 'Wie viele Slideshow-Screens sind möglich?',
        answer:
          'Basic zeigt 1 Slideshow-Screen, Premium bis zu 3 und Enterprise unbegrenzt viele. Alle Screens zeigen dieselben Fotos.',
      },
      {
        question: 'Kann ich das Tempo der Slideshow beeinflussen?',
        answer:
          'Ja, ab Premium. Die Anzeigedauer je Foto ist dort einstellbar, und die Slideshow-Steuerung lässt sich bei Bedarf ausblenden.',
      },
      {
        question: 'Wie gut muss das Internet am Veranstaltungsort sein?',
        answer:
          'Eine stabile Verbindung genügt. Uploads und Anzeige laufen über das Netz, für das Anzeigegerät lohnt sich deshalb ein zuverlässiges WLAN oder ein Kabel.',
      },
      {
        question: 'Ist ein Wasserzeichen zu sehen?',
        answer:
          'In Basic und Premium läuft ein dezentes EventShot-Wasserzeichen mit. Mit Enterprise lässt es sich deaktivieren und durch eigenes Branding in der Slideshow ersetzen.',
      },
    ],
  },
  {
    id: 'galerie',
    heading: 'Galerie und Datenschutz',
    lead: 'Was nach dem Fest bleibt und wie lange.',
    items: [
      {
        question: 'Wie lange habe ich Zugriff auf die Galerie?',
        answer:
          'Im Basic-Paket eine Woche, mit Premium einen Monat und mit Enterprise ein Vierteljahr – konkret 7, 30 oder 90 Tage nach dem Anlass.',
      },
      {
        question: 'Wie kommen die Gäste später an die Bilder?',
        answer:
          'Über denselben QR-Code oder über den Event-Link. Beides führt nach dem Fest in die digitale Galerie, wo sich die Fotos ansehen und speichern lassen.',
      },
      {
        question: 'Was geschieht nach Ablauf der Galerie?',
        answer:
          'Alle Aufnahmen werden automatisch und DSG-konform von unseren Schweizer Servern gelöscht. Was du behalten möchtest, sicherst du also vorher.',
      },
      {
        question: 'Wo liegen die Fotos während des Anlasses?',
        answer:
          'Auf unserer eigenen Infrastruktur in der Schweiz. Es ist kein Drittanbieter beteiligt und es gibt keine Weitergabe.',
      },
      {
        question: 'Nach welchem Datenschutzrecht arbeitet EventShot?',
        answer:
          'Nach dem Schweizer Datenschutzgesetz. Speicherung, Zugriff und Löschung sind DSG-konform geregelt, die Einzelheiten stehen in der Datenschutzerklärung.',
      },
      {
        question: 'Was gilt für Fotos, auf denen andere Gäste zu sehen sind?',
        answer:
          'Es gilt das Recht am eigenen Bild. Meist reicht ein kurzer Hinweis auf dem Aufsteller: Hochgeladene Fotos erscheinen auf der Leinwand und in der Galerie.',
      },
    ],
  },
  {
    id: 'preise',
    heading: 'Preise und Buchung',
    lead: 'Ein Preis pro Anlass, keine laufenden Kosten.',
    items: [
      {
        question: 'Was kostet EventShot?',
        answer:
          'Basic CHF 49.-, Premium CHF 99.- und Enterprise CHF 149.-, jeweils pro Event. Bezahlt wird einmalig für den Anlass, kein Abo.',
      },
      {
        question: 'Fallen Kosten an, bevor ich buche?',
        answer:
          'Nein. Registrierung und Einrichtung sind kostenlos, verrechnet wird erst das gewählte Paket beim Buchen.',
      },
      {
        question: 'Welches Paket passt zu meinem Anlass?',
        answer:
          'Für einen Geburtstag reicht Basic. Für eine Hochzeit oder ein Firmenessen empfehlen wir Premium: bis zu 3 Slideshow-Screens, einstellbare Anzeigedauer und 30 Tage digitale Galerie.',
      },
      {
        question: 'Passt EventShot auch zu einem Grossanlass?',
        answer:
          'Gedacht ist es für private Feiern und kleinere Firmenanlässe. Planst du eine Konferenz oder ein Fest mit mehreren hundert Gästen, passt unser Schwesterprodukt social-wall.ch besser.',
      },
      {
        question: 'An wen wende ich mich bei offenen Punkten?',
        answer:
          'Am direktesten per Mail an info@edelbyte.ch oder telefonisch unter 044 500 25 04. Wir sitzen in der Schweiz und schauen uns dein Anliegen persönlich an.',
      },
    ],
  },
]

const allItems: FaqItem[] = groups.flatMap((group) => group.items)

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
        {groups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className='rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary/50 hover:text-primary'
          >
            {group.heading}
          </a>
        ))}
      </nav>

      {groups.map((group) => (
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
