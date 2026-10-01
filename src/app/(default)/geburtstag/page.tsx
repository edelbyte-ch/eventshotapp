import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/geburtstag',
  title: 'Geburtstags-Fotowand & Slideshow für deine Party',
  description:
    'Deine Gäste laden Fotos per QR-Code hoch, alles läuft live auf TV oder Beamer. Danach bleibt die digitale Galerie. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Geburtstage',
  title: 'Deine Party, live auf dem Screen.',
  intro:
    'Ob runder Geburtstag, Party im Freundeskreis oder spontane Feier: Mit EventShot teilen alle Gäste ihre Schnappschüsse in Echtzeit. Foto hochladen, sofort als Slideshow auf der Leinwand sehen – und nach der Party bleibt euch alles in einer digitalen Galerie als Erinnerung.',
  ablaufTitle: 'So läuft deine Party',
  ablauf: [
    {
      title: 'QR-Code teilen',
      copy: 'Stell den QR-Code auf oder zeig ihn auf dem Screen. Gäste scannen ihn mit dem Handy.',
    },
    {
      title: 'Gäste laden hoch',
      copy: 'Ohne App: Foto auswählen, hochladen – es erscheint sofort in der Live-Slideshow.',
    },
    {
      title: 'Galerie danach',
      copy: 'Nach der Party greifst du über denselben QR-Code auf alle Fotos zu.',
    },
  ],
  featuresTitle: 'Was zu deiner Party passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf TV oder Beamer',
    'Digitale Galerie für alle Gäste',
    'In wenigen Minuten eingerichtet',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Für Geburtstage und kleinere Feiern reicht Basic: ${photoLimitPhrase('BASIC')}, Live-Slideshow auf einem Screen und 7 Tage digitale Galerie.`,
  faq: [
    {
      question: 'Brauchen meine Gäste eine App?',
      answer:
        'Nein. QR-Code scannen, Webseite öffnen, Foto hochladen – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange sind die Fotos verfügbar?',
      answer:
        'Im Basic-Plan bleibt die Galerie 7 Tage verfügbar. Danach werden die Fotos automatisch und DSG-konform gelöscht. Längere Aufbewahrung bieten Premium (30 Tage) und Enterprise (90 Tage).',
    },
    {
      question: 'Was brauche ich vor Ort?',
      answer:
        'Einen Bildschirm oder Beamer mit Browser und Internet. Slideshow im Browser öffnen – fertig.',
    },
  ],
  ctaTitle: 'Bereit für deine Foto-Wand?',
  ctaText:
    'Richte dein Geburtstags-Event in wenigen Minuten ein – Registrierung kostenlos, du zahlst erst beim Buchen.',
  breadcrumb: { name: 'Geburtstag', path: '/geburtstag' },
}

export default function GeburtstagPage() {
  return <UseCasePage content={content} />
}
