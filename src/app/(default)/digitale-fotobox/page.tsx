import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/digitale-fotobox',
  title: 'Digitale Fotobox – so funktioniert sie',
  description:
    'Digitale Fotobox erklärt: Gäste laden Fotos per QR-Code hoch, alles läuft live als Slideshow und bleibt danach in der Galerie. Ohne App.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot erklärt',
  title: 'Was ist eine digitale Fotobox?',
  intro:
    'Kein Kasten, kein Stativ, kein Aufbau: Eine digitale Fotobox arbeitet mit einem QR-Code und der Handykamera, die deine Gäste ohnehin dabeihaben. Die Bilder erscheinen sofort in der Live-Slideshow auf Leinwand oder TV und bleiben danach in der digitalen Galerie.',
  ablaufTitle: 'So funktioniert die digitale Fotobox',
  ablauf: [
    {
      title: 'Event anlegen',
      copy: 'Du legst dein Event an und erhältst einen QR-Code zum Ausdrucken oder Einblenden.',
    },
    {
      title: 'Gäste knipsen',
      copy: 'Scannen, Bild aus der Kamerarolle wählen, senden. Mehrere Gäste können das gleichzeitig tun.',
    },
    {
      title: 'Galerie danach',
      copy: 'Derselbe Code führt nach dem Fest in die digitale Galerie mit allen Aufnahmen.',
    },
  ],
  featuresTitle: 'Was eine digitale Fotobox kann',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow mit Übergängen und Animationen',
    'Frei wählbare Anzeigedauer je Foto',
    'Digitale Galerie mit allen Aufnahmen',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Für den Einstieg passt Basic: ${photoLimitPhrase('BASIC')}, Live-Slideshow auf einem Screen und 7 Tage digitale Galerie – als Einmalpreis pro Event, kein Abo.`,
  faq: [
    {
      question: 'Müssen unsere Gäste für die digitale Fotobox etwas installieren?',
      answer:
        'Nein. Der QR-Code führt in den Browser des Handys, dort wird das Bild gewählt und hochgeladen – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange bleiben die Aufnahmen abrufbar?',
      answer:
        'Das hängt vom gewählten Paket ab: 7 Tage bei Basic, 30 Tage bei Premium, 90 Tage bei Enterprise. Nach Ablauf werden alle Bilder automatisch und DSG-konform gelöscht.',
    },
    {
      question: 'Was brauchen wir vor Ort für die Anzeige?',
      answer:
        'Ein Gerät mit Browser und Internet: Smart-TV, Laptop am Beamer oder Tablet am Bildschirm. Die Slideshow läuft als Webseite, installiert wird nichts.',
    },
  ],
  ctaTitle: 'Bereit für deine digitale Fotobox?',
  ctaText:
    'Richte dein Event in wenigen Minuten ein – Registrierung kostenlos, du zahlst erst beim Buchen.',
  breadcrumb: { name: 'Digitale Fotobox', path: '/digitale-fotobox' },
}

export default function DigitaleFotoboxPage() {
  return <UseCasePage content={content} />
}
