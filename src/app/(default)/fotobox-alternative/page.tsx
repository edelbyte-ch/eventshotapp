import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/fotobox-alternative',
  title: 'Fotobox-Alternative für die Hochzeit',
  description:
    'Mietfotobox oder digitale Fotowand? Vergleich zu Kosten, Aufbau, Platz und Gästezahl – und wann eine Mietbox trotzdem die bessere Wahl ist.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot statt Mietfotobox',
  title: 'Die Alternative zur Mietfotobox',
  intro:
    'Kabine, Drucker, Requisitenkiste und eine Betreuung, die den ganzen Abend danebensteht: Eine Mietfotobox bringt viel Technik in euren Saal und bindet einen spürbaren Teil des Budgets. Bei der digitalen Fotowand fotografiert jeder Gast mit dem eigenen Handy und lädt per QR-Code hoch – die Bilder laufen sofort als Slideshow. Was bleibt, ist eine digitale Galerie, in der jede Aufnahme des Abends versammelt ist.',
  ablaufTitle: 'So ersetzt ihr die Mietfotobox',
  ablauf: [
    {
      title: 'Code auf den Tisch',
      copy: 'Der QR-Code steht auf den Tischkarten oder beim Apéro bereit. Es braucht dafür weder einen reservierten Quadratmeter noch eine Steckdose.',
    },
    {
      title: 'Handy statt Warteschlange',
      copy: 'Eure Gäste laden aus der eigenen Kamerarolle hoch, viele davon gleichzeitig. Vor einer Mietbox geht das nur nacheinander.',
    },
    {
      title: 'Galerie danach',
      copy: 'Nach dem Fest führt derselbe Code in die digitale Galerie – ohne Wartezeit auf ein Album vom Vermieter.',
    },
  ],
  featuresTitle: 'Was die digitale Fotowand anders macht',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Kein Aufbau, kein Platz für Kabine und Drucker',
    'Alle Gäste gleichzeitig statt Warteschlange',
    'Live-Slideshow auf Beamer oder TV',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    `Wer die Mietbox an der Hochzeit ersetzt, nimmt Premium: bis zu 3 Slideshow-Screens, ${photoLimitPhrase('PREMIUM')} und 30 Tage digitale Galerie – Zeit genug, um nach dem Fest alles zu sichern.`,
  faq: [
    {
      question: 'Müssen unsere Gäste dafür etwas herunterladen?',
      answer:
        'Nein. Gescannt wird mit der normalen Handykamera, danach folgt eine gewöhnliche Webseite zum Auswählen des Bildes – ohne App und ohne Konto.',
    },
    {
      question: 'Ist eine Mietfotobox damit überflüssig?',
      answer:
        'Nein. Wenn ihr gedruckte Fotostreifen zum Mitnehmen möchtet oder Kabine und Requisiten als eigenen Programmpunkt plant, bleibt die Mietbox die bessere Wahl. Geht es euch um alle Bilder des Abends und um die Erinnerung danach, reicht die digitale Fotowand.',
    },
    {
      question: 'Brauchen wir dafür eigene Technik?',
      answer:
        'Nein. Es reicht ein Gerät im Saal, das eine Webseite anzeigen kann, plus Internet – in vielen Locations steht dafür ohnehin ein Bildschirm bereit.',
    },
  ],
  ctaTitle: 'Bereit für eure Fotowand ohne Kabine?',
  ctaText:
    'Richtet das Event selbst ein, in wenigen Minuten – die Registrierung kostet nichts, der Einmalpreis fällt erst beim Buchen an.',
  breadcrumb: { name: 'Fotobox-Alternative', path: '/fotobox-alternative' },
}

export default function FotoboxAlternativePage() {
  return (
    <>
      <UseCasePage content={content} />
      <div className='container max-w-5xl pb-16 space-y-4'>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground space-y-2'>
          <p className='font-medium text-foreground'>Weiter im Vergleich</p>
          <ul className='space-y-1'>
            <li>
              <Link
                href='/fotobox-kosten-schweiz'
                className='font-medium text-primary hover:underline'
              >
                was eine Fotobox in der Schweiz kostet
              </Link>{' '}
              – inklusive der Posten, die in einer Offerte oft fehlen
            </li>
            <li>
              <Link
                href='/fotobox-ohne-app'
                className='font-medium text-primary hover:underline'
              >
                ohne App
              </Link>{' '}
              – wie der Upload im Browser der Gäste abläuft
            </li>
            <li>
              <Link
                href='/fotichaschte-alternative'
                className='font-medium text-primary hover:underline'
              >
                Fotichaschte-Alternative
              </Link>{' '}
              – dieselbe Frage in Schweizer Mundart gestellt
            </li>
            <li>
              <Link
                href='/digitale-fotobox'
                className='font-medium text-primary hover:underline'
              >
                digitale Fotobox
              </Link>{' '}
              – die Funktionsweise Schritt für Schritt erklärt
            </li>
          </ul>
        </div>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
          Sucht ihr die Lösung für einen grossen Firmenevent oder eine Messe?
          Dafür gibt es unser Schwesterprodukt:{' '}
          <a
            href='https://social-wall.ch/fotobox-alternative-firmenevent'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-primary hover:underline'
          >
            Fotobox-Alternative für Firmenevents → social-wall.ch
          </a>
        </div>
      </div>
    </>
  )
}
