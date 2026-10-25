import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/geburtstag',
  title: 'Live-Slideshow mit Gästefotos am Geburtstag',
  description:
    'Gäste scannen einen QR-Code, laden Fotos ohne App hoch und sehen sie Sekunden später als Slideshow auf Beamer oder TV. Ab CHF 49.- pro Party.',
})

const content: UseCaseContent = {
  image: 'leinwand-gruppenfoto',
  eyebrow: 'EventShot für Geburtstage',
  title: 'Live-Slideshow mit Gästefotos für deinen Geburtstag',
  intro:
    'Mit EventShot laufen die Fotos deiner Gäste live als Slideshow auf Beamer oder TV: Gäste scannen einen QR-Code, laden ihre Bilder im Browser hoch – ohne App und ohne Konto – und Sekunden später sind sie auf dem Screen. Ob runder Geburtstag oder Party im Freundeskreis: Nach dem Fest bleibt alles in einer digitalen Galerie.',
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
    {
      question: 'Beamer oder Fernseher – was eignet sich besser?',
      answer:
        'Im hellen Raum oder bei Tageslicht ist ein grosser Fernseher meist besser lesbar. Am Abend und für viele Gäste wirkt ein Beamer auf der Leinwand eindrücklicher. EventShot läuft auf beidem, angeschlossen ist ein Laptop, Tablet oder Smart-TV mit Browser.',
    },
    {
      question: 'Was kostet die Slideshow für einen Geburtstag?',
      answer:
        `Basic kostet CHF 49.- einmalig pro Party, mit ${photoLimitPhrase('BASIC')} und einem Slideshow-Screen. Es gibt kein Abo, und die Gästezahl spielt für den Preis keine Rolle.`,
    },
    {
      question: 'Können Gäste auch nach der Party noch Fotos hochladen?',
      answer:
        'Ja. Solange die Galerie läuft, nimmt derselbe QR-Code weitere Fotos an – im Basic-Paket 7 Tage, mit Premium 30 und mit Enterprise 90 Tage.',
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
