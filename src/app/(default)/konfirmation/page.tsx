import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/konfirmation',
  title: 'Fotowand für Konfirmation & Firmung',
  description:
    'Konfirmation, Firmung oder Erstkommunion: Gästefotos per QR-Code sammeln, live zeigen und danach behalten. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  image: 'leinwand-familie',
  eyebrow: 'EventShot für Konfirmationen',
  title: 'Eure Konfirmation, festgehalten von allen.',
  intro:
    'Ob Konfirmation, Firmung oder Erstkommunion: Der Tag beginnt in der Kirche und endet am langen Familientisch – fotografiert wird an jeder Station. EventShot bringt diese Bilder zusammen: Gäste laden ihre Fotos per QR-Code hoch, und die Slideshow zeigt sie noch im selben Moment. Danach bleibt euch die digitale Galerie als ruhige Erinnerung an diesen Tag.',
  ablaufTitle: 'So läuft euer Konfirmationstag',
  ablauf: [
    {
      title: 'QR-Code auslegen',
      copy: 'Legt den gedruckten Code beim Apéro aus und verteilt ihn auf die Tische. Mehr Vorbereitung braucht es nicht.',
    },
    {
      title: 'Gäste teilen Fotos',
      copy: 'Kein Konto, keine App: Bild auswählen, hochladen – es läuft sofort über die Leinwand.',
    },
    {
      title: 'Galerie danach',
      copy: 'Über denselben QR-Code öffnen alle später die digitale Galerie und sichern ihre Lieblingsbilder.',
    },
  ],
  featuresTitle: 'Was zu eurer Konfirmation passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Elegante Slideshow mit ruhigen Übergängen',
    'Einstellbare Anzeigedauer pro Bild',
    'Digitale Galerie für Gotte, Götti und Verwandte',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Premium passt zur Konfirmation: 30 Tage digitale Galerie, damit auch die weiter entfernte Verwandtschaft ihre Bilder in Ruhe holt, dazu einstellbare Anzeigedauer und bis zu 3 Slideshow-Screens.',
  faq: [
    {
      question: 'Brauchen unsere Gäste eine App für den Upload?',
      answer:
        'Nein. Es genügt der Browser auf dem Handy: QR-Code scannen, Foto wählen, senden – kein Download, kein Login.',
    },
    {
      question: 'Wie lange bleiben die Bilder der Konfirmation abrufbar?',
      answer:
        'Mit Premium bleiben alle Aufnahmen 30 Tage in der digitalen Galerie. Anschliessend löschen unsere Schweizer Server sie automatisch und DSG-konform.',
    },
    {
      question: 'Was brauchen wir im Saal oder im Restaurant?',
      answer:
        'Ein Fernseher oder Beamer mit Browser und eine Internetverbindung reichen aus. Die Slideshow läuft als Webseite, zusätzliche Technik braucht ihr nicht.',
    },
  ],
  ctaTitle: 'Bereit für eure Konfirmations-Fotowand?',
  ctaText:
    'Richtet euer Konfirmations-Event in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Konfirmation', path: '/konfirmation' },
}

export default function KonfirmationPage() {
  return <UseCasePage content={content} />
}
