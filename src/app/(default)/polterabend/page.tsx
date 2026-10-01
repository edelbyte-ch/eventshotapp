import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase, photoLimitRange } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/polterabend',
  title: 'Fotowand für den Polterabend',
  description:
    'Polterabend oder Junggesellenabschied: Alle Fotos landen per QR-Code an einem Ort und laufen live. Ohne App, DSG-konform, Schweizer Hosting.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Polterabende',
  title: 'Euer Polterabend, aus allen Perspektiven.',
  intro:
    'Ob Polterabend im Garten, Junggesellenabschied in der Stadt oder Überraschung am Vorabend: Fotografiert wird aus jedem Winkel, und hinterher liegen die Bilder auf lauter verschiedenen Handys. Mit EventShot fliessen sie in eine gemeinsame Sammlung – der QR-Code genügt, und jedes Bild erscheint sofort auf dem Screen. Am Tag danach steht die digitale Galerie bereit.',
  ablaufTitle: 'So läuft euer Polterabend',
  ablauf: [
    {
      title: 'QR-Code weitergeben',
      copy: 'Hängt den Code beim Eingang auf oder schickt ihn vorab herum. Scannen, fertig.',
    },
    {
      title: 'Alle machen mit',
      copy: 'Bild antippen, hochladen – es läuft direkt in der Slideshow mit, ohne Konto und ohne App.',
    },
    {
      title: 'Galerie danach',
      copy: 'Am nächsten Tag findet ihr sämtliche Bilder über denselben Code in der digitalen Galerie.',
    },
  ],
  featuresTitle: 'Was zu eurem Polterabend passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf dem grossen Screen',
    `Je nach Paket ${photoLimitRange()} pro Event`,
    'Event in weniger als 5 Minuten startklar',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Basic reicht für den Polterabend: ${photoLimitPhrase('BASIC')}, ein Slideshow-Screen im Partyraum und 7 Tage digitale Galerie – genug, um die Bilder am Wochenende danach zu sichern.`,
  faq: [
    {
      question: 'Müssen unsere Gäste etwas installieren?',
      answer:
        'Nein. Ein Scan des QR-Codes öffnet die Upload-Seite im Browser – ohne App und ohne Konto, auch für spontan dazugekommene Gäste.',
    },
    {
      question: 'Wie lange können wir die Fotos noch holen?',
      answer:
        'Im Basic-Plan steht die digitale Galerie 7 Tage lang offen. Wer mehr Zeit möchte, wählt Premium mit 30 Tagen oder Enterprise mit 90 Tagen.',
    },
    {
      question: 'Was brauchen wir am Ort der Feier?',
      answer:
        'Einen Bildschirm oder Beamer mit Browser und eine Internetverbindung. Ihr ruft die Slideshow als Webseite auf – mehr Technik ist nicht nötig.',
    },
  ],
  ctaTitle: 'Bereit für eure Polterabend-Fotowand?',
  ctaText:
    'Richtet euer Polterabend-Event in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Polterabend', path: '/polterabend' },
}

export default function PolterabendPage() {
  return <UseCasePage content={content} />
}
