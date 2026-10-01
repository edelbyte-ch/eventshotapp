import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitRange } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/fotichaschte-alternative',
  title: 'Fotichaschte-Alternative für Hochzeit & Fest',
  description:
    'Fotichaschte, Fotiböxli oder Fotokasten mieten? Die digitale Fotowand im Vergleich: Kosten, Aufbau, Platzbedarf und Anzahl Fotos.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot im Vergleich',
  title: 'Fotichaschte, Fotiböxli oder digital?',
  intro:
    'Fotichaschte, Fotiböxli oder Fotokasten: In der Schweiz meinen alle drei Ausdrücke dasselbe – eine gemietete Box mit Kamera, die an einem Ort im Saal steht. EventShot ersetzt die Box durch das Handy deiner Gäste, die ihre Bilder per QR-Code hochladen und sofort als elegante Slideshow sehen. Danach bleibt dir die digitale Galerie als Erinnerung.',
  ablaufTitle: 'So läuft dein Fest ohne Mietbox',
  ablauf: [
    {
      title: 'Code statt Kabine',
      copy: 'Druck den QR-Code auf Karten oder Aufsteller und verteil ihn im Raum. Kein Aufbau, keine Anfahrt, kein Stellplatz.',
    },
    {
      title: 'Alle fotografieren mit',
      copy: 'Deine Gäste knipsen mit dem eigenen Handy und laden hoch – gleichzeitig statt nacheinander vor einer einzelnen Box.',
    },
    {
      title: 'Galerie danach',
      copy: 'Über denselben QR-Code öffnest du die digitale Galerie und lädst jedes Bild in Ruhe herunter.',
    },
  ],
  featuresTitle: 'Was du statt einer Mietbox bekommst',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    `Je nach Paket ${photoLimitRange()} pro Event`,
    'Live-Slideshow auf Leinwand oder Bildschirm',
    'Ohne Aufbau, Anfahrt und Rückgabe',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Für Hochzeiten und grössere Feste passt Premium: 3 Slideshow-Screens, 30 Tage digitale Galerie und ein Einmalpreis pro Event statt Miete pro Tag.',
  faq: [
    {
      question: 'Müssen meine Gäste etwas installieren, um Fotos beizusteuern?',
      answer:
        'Nein. Es genügt ein Handy mit Kamera und Internet: QR-Code scannen, Bild auswählen, fertig – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange bleiben die Fotos nach dem Fest verfügbar?',
      answer:
        'Je nach Plan 7, 30 oder 90 Tage. In dieser Zeit lädst du alles herunter, danach werden die Bilder automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question: 'Was brauche ich am Fest an Technik?',
      answer:
        'Einen Beamer, TV oder Bildschirm mit Browser und Internet. Damit läuft die Slideshow – eine Box, ein Stativ oder ein eigener Stellplatz sind nicht nötig.',
    },
  ],
  ctaTitle: 'Bereit für deine digitale Fotowand?',
  ctaText:
    'Leg dein Event in wenigen Minuten an – Registrierung kostenlos, du zahlst erst beim Buchen.',
  breadcrumb: {
    name: 'Fotichaschte-Alternative',
    path: '/fotichaschte-alternative',
  },
}

export default function FotichaschteAlternativePage() {
  return (
    <>
      <UseCasePage content={content} />
      <div className='container max-w-5xl pb-16'>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
          Gedruckte Sofortbilder zum Mitnehmen gibt es nur bei der gemieteten
          Box – EventShot sammelt alle Bilder digital. Den ganzen Vergleich
          findest du unter{' '}
          <Link
            href='/fotobox-alternative'
            className='font-medium text-primary hover:underline'
          >
            Alternative zur Mietfotobox
          </Link>
          , den häufigsten Anlass dazu unter{' '}
          <Link
            href='/hochzeit'
            className='font-medium text-primary hover:underline'
          >
            Live-Fotowand für die Hochzeit
          </Link>
          .
        </div>
      </div>
    </>
  )
}
