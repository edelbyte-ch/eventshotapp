import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'

export const metadata: Metadata = buildMetadata({
  path: '/digitales-gaestebuch',
  title: 'Digitales Gästebuch für die Hochzeit',
  description:
    'Foto und Gruss statt Buch und Stift: Gäste hinterlassen ihre Erinnerung per QR-Code, ihr behaltet alles in der digitalen Galerie. Ohne App.',
})

const content: UseCaseContent = {
  image: 'galerie',
  eyebrow: 'EventShot als digitales Gästebuch',
  title: 'Das digitale Gästebuch für eure Hochzeit',
  intro:
    'Ein Buch, ein Stift, ein paar Einträge am Ende des Abends: So geht das klassische Gästebuch meistens aus. Das digitale Gästebuch dreht die Sache um – jeder Gast hinterlässt seinen Eintrag als Bild, und alle sehen ihn sofort in der Live-Slideshow. Wer etwas schreiben möchte, fotografiert seine Zeilen einfach ab.',
  ablaufTitle: 'So entsteht euer Gästebuch',
  ablauf: [
    {
      title: 'QR-Code hinstellen',
      copy: 'Der Aufsteller kommt dorthin, wo sonst das Gästebuch liegt: an den Eingang oder auf die Tische.',
    },
    {
      title: 'Gäste tragen sich ein',
      copy: 'Ein Selfie, ein Bild vom Apéro oder eine abfotografierte Zeile – auswählen, hochladen, schon steht der Eintrag.',
    },
    {
      title: 'Galerie danach',
      copy: 'Alle Einträge liegen nach dem Fest in der digitalen Galerie und lassen sich über denselben QR-Code abrufen.',
    },
  ],
  featuresTitle: 'Was zu eurem Gästebuch passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Jeder Eintrag sofort in der Live-Slideshow',
    'Unbegrenzt viele Einträge pro Gast',
    'Digitale Galerie als bleibende Erinnerung',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Fürs digitale Gästebuch an einer Hochzeit passt Premium: 30 Tage digitale Galerie, einstellbare Anzeigedauer und bis zu 3 Slideshow-Screens – so bleiben alle Einträge lange genug erreichbar, um sie zu sichern.',
  faq: [
    {
      question: 'Müssen unsere Gäste für den Eintrag eine App laden?',
      answer:
        'Nein. Der QR-Code führt in den Browser, dort wählen die Gäste ihr Bild und laden es hoch – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange bleiben die Einträge für uns abrufbar?',
      answer:
        'Mit Premium 30 Tage nach dem Fest, mit Basic 7 Tage und mit Enterprise 90 Tage. Danach werden alle Bilder automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question: 'Was brauchen wir am Fest für die Anzeige?',
      answer:
        'Einen Fernseher oder Beamer mit Browser und Internetzugang. Die Slideshow läuft als Webseite, ein Laptop oder Tablet als Zuspieler genügt.',
    },
  ],
  ctaTitle: 'Bereit für euer digitales Gästebuch?',
  ctaText:
    'Das Gästebuch steht in wenigen Minuten bereit – Registrierung kostenlos, ihr zahlt erst beim Buchen eines Events.',
  breadcrumb: { name: 'Digitales Gästebuch', path: '/digitales-gaestebuch' },
}

export default function DigitalesGaestebuchPage() {
  return (
    <>
      <UseCasePage content={content} />
      <div className='container max-w-5xl pb-16'>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
          Passt dazu:{' '}
          <Link
            href='/hochzeit'
            className='font-medium text-primary hover:underline'
          >
            Hochzeits-Fotowand für euren Tag
          </Link>{' '}
          und{' '}
          <Link
            href='/fotobox-ohne-app'
            className='font-medium text-primary hover:underline'
          >
            Fotos sammeln ohne App
          </Link>
          .
        </div>
      </div>
    </>
  )
}
