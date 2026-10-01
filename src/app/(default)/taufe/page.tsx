import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/taufe',
  title: 'Fotowand & Slideshow für die Taufe',
  description:
    'Taufe im kleinen Kreis: Gäste laden Fotos per QR-Code hoch, ihr zeigt sie live und behaltet die digitale Galerie. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Taufen',
  title: 'Eure Taufe, in Bildern der Gäste.',
  intro:
    'Taufe in der Dorfkirche, Apéro davor, Essen im engsten Kreis danach: Die schönsten Aufnahmen entstehen still nebenbei – Gotti mit dem Kind auf dem Arm, der Grossvater beim Zuschauen. Mit EventShot kommen sie an einem Ort zusammen, laufen ruhig über den Bildschirm im Saal und bleiben euch danach als digitale Galerie.',
  ablaufTitle: 'So läuft eure Taufe',
  ablauf: [
    {
      title: 'QR-Code platzieren',
      copy: 'Stellt den Aufsteller neben die Taufkerze oder ans Buffet. Die Gäste scannen ihn im Vorbeigehen.',
    },
    {
      title: 'Gäste steuern Bilder bei',
      copy: 'Ohne Konto und ohne Download: Foto auswählen, senden – und schon gehört es zur laufenden Slideshow.',
    },
    {
      title: 'Galerie danach',
      copy: 'Gotti und Götti öffnen später denselben Code und laden in Ruhe herunter, was ihnen gefällt.',
    },
  ],
  featuresTitle: 'Was zu eurer Taufe passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow im Saal oder im Restaurant',
    'Digitale Galerie für Paten und Grosseltern',
    'Galerie-Zugriff über denselben QR-Code',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Für eine Taufe im kleinen Kreis genügt Basic: ein Slideshow-Screen im Restaurant, ${photoLimitPhrase('BASIC')} und 7 Tage Galerie-Zugriff – wer den Paten mehr Zeit lassen möchte, nimmt Premium mit 30 Tagen.`,
  faq: [
    {
      question: 'Kommen auch die Grosseltern ohne App zurecht?',
      answer:
        'Ja. Es braucht nur die Handykamera: Code scannen, Seite öffnet sich, Foto auswählen – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange bleibt die Galerie nach der Taufe offen?',
      answer:
        'Im Basic-Plan könnt ihr die Bilder 7 Tage lang herunterladen. Nach Ablauf dieser Frist werden sie automatisch und DSG-konform gelöscht; mit Premium habt ihr 30 Tage Zeit.',
    },
    {
      question: 'Welche Technik braucht es beim Taufessen?',
      answer:
        'Ein Laptop oder Tablet am Fernseher oder Beamer, dazu eine Internetverbindung. Den Link zur Slideshow ruft ihr im Browser auf, sonst braucht es nichts.',
    },
  ],
  ctaTitle: 'Bereit für eure Tauf-Fotowand?',
  ctaText:
    'Richtet euer Tauf-Event in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Taufe', path: '/taufe' },
}

export default function TaufePage() {
  return <UseCasePage content={content} />
}
