import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/fotobox-ohne-app',
  title: 'Fotobox ohne App – QR-Code statt Download',
  description:
    'Gäste scannen den QR-Code und laden Fotos direkt im Browser hoch: keine App, kein Konto, kein Login. DSG-konform, Schweizer Hosting.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot ohne App-Download',
  title: 'Fotos sammeln – ohne App und ohne Konto',
  intro:
    'Ob Hochzeit, Taufe oder Geburtstag: Der Schritt, an dem das Fotosammeln meistens scheitert, heisst Installation. Bei EventShot fällt er weg – der QR-Code öffnet eine Webseite im Browser, dein Gast wählt sein Bild aus und schickt es ab. Kein Download, kein Passwort, keine Anmeldung.',
  ablaufTitle: 'So läuft der Upload ohne App',
  ablauf: [
    {
      title: 'QR-Code scannen',
      copy: 'Dein Gast richtet die Handykamera auf den Code. Die Upload-Seite öffnet sich direkt im Browser.',
    },
    {
      title: 'Bild abschicken',
      copy: 'Foto aus der Handy-Galerie wählen oder neu aufnehmen und hochladen. Dazwischen liegt kein Login.',
    },
    {
      title: 'Galerie danach',
      copy: 'Derselbe Code führt später zur digitalen Galerie – am Handy wie am Laptop, weiterhin ohne Installation.',
    },
  ],
  featuresTitle: 'Was den Upload ohne App ausmacht',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Upload direkt im Handy-Browser, ohne Konto',
    'Elegante Live-Slideshow auf Leinwand oder TV',
    'Digitale Galerie über denselben QR-Code',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Für eine Feier im Familien- oder Freundeskreis genügt Basic: ein Slideshow-Screen, ${photoLimitPhrase('BASIC')} und 7 Tage digitale Galerie – ohne dass ein einziger Gast etwas einrichten muss.`,
  faq: [
    {
      question: 'Müssen meine Gäste wirklich nichts installieren?',
      answer:
        'Nein. Der QR-Code führt auf eine gewöhnliche Webseite im Handy-Browser. Dort wird das Foto ausgewählt und hochgeladen – heruntergeladen oder eingerichtet wird nichts.',
    },
    {
      question: 'Wie lange bleibt die Galerie ohne App erreichbar?',
      answer:
        'Je nach Plan 7 Tage (Basic), 30 Tage (Premium) oder 90 Tage (Enterprise). In dieser Zeit genügt der QR-Code oder der Link, danach werden alle Fotos automatisch und DSG-konform gelöscht.',
    },
    {
      question: 'Was brauche ich im Saal für die Slideshow?',
      answer:
        'Einen Beamer oder Fernseher mit Browser und Internetzugang. Du öffnest die Slideshow als Webseite – zusätzliche Software ist dafür nicht nötig.',
    },
  ],
  ctaTitle: 'Bereit für deine Foto-Wand?',
  ctaText:
    'Leg dein Event in wenigen Minuten an – Registrierung kostenlos, du zahlst erst beim Buchen eines Events.',
  breadcrumb: { name: 'Fotobox ohne App', path: '/fotobox-ohne-app' },
}

export default function FotoboxOhneAppPage() {
  return (
    <>
      <UseCasePage content={content} />
      <div className='container max-w-5xl pb-16'>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
          Weiterlesen:{' '}
          <Link
            href='/digitales-gaestebuch'
            className='font-medium text-primary hover:underline'
          >
            digitales Gästebuch für die Hochzeit
          </Link>{' '}
          oder{' '}
          <Link
            href='/hochzeit'
            className='font-medium text-primary hover:underline'
          >
            Hochzeits-Fotowand mit Live-Slideshow
          </Link>
          .
        </div>
      </div>
    </>
  )
}
