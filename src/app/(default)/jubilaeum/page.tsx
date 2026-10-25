import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/jubilaeum',
  title: 'Fotowand & Slideshow fürs Jubiläum',
  description:
    'Ob 25 oder 50 Jahre: Gäste sammeln Fotos per QR-Code, die Slideshow läuft live, die digitale Galerie bleibt danach. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  image: 'leinwand-familie',
  eyebrow: 'EventShot für Jubiläen',
  title: 'Euer Jubiläum, live auf dem Screen.',
  intro:
    'Silberhochzeit, goldene Hochzeit oder 25 Jahre im selben Freundeskreis: An so einem Abend liegen Bilder von damals und von heute nebeneinander. Eure Gäste laden beides per QR-Code hoch, die Slideshow bringt es sofort auf die Leinwand – und die digitale Galerie hält alles fest, wenn der Saal längst leer ist.',
  ablaufTitle: 'So läuft euer Jubiläum',
  ablauf: [
    {
      title: 'QR-Code drucken',
      copy: 'Setzt den Code auf die Menükarte oder auf einen Aufsteller am Eingang. Wer mitmachen will, hält kurz die Handykamera davor.',
    },
    {
      title: 'Jeder steuert etwas bei',
      copy: 'Vom vergilbten Hochzeitsfoto bis zum Schnappschuss vom Tisch: hochladen, und es läuft im nächsten Durchgang mit.',
    },
    {
      title: 'Galerie danach',
      copy: 'Kinder und Enkel öffnen die digitale Galerie noch Wochen später und nehmen mit, was sie möchten.',
    },
  ],
  featuresTitle: 'Was zu eurem Jubiläum passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf der Leinwand im Saal',
    'Slideshow-Steuerung ein- und ausblendbar',
    'Bis zu 3 Slideshow-Screens im Premium-Plan',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Zum Jubiläum gehört Premium: bis zu 3 Slideshow-Screens für Saal, Foyer und Bar, eine ein- und ausblendbare Slideshow-Steuerung und 30 Tage digitale Galerie.',
  faq: [
    {
      question: 'Muss vorher jemand etwas installieren?',
      answer:
        'Nein. Die Gäste scannen, wählen ihr Bild und schicken es ab – ohne App und ohne Konto, direkt im mobilen Browser.',
    },
    {
      question: 'Bis wann können wir die Fotos speichern?',
      answer:
        'Premium hält die digitale Galerie 30 Tage offen, Enterprise 90 Tage. Nach Ablauf der Frist werden alle Bilder automatisch und DSG-konform gelöscht.',
    },
    {
      question: 'Reicht ein Fernseher im Saal?',
      answer:
        'Ja. Ein Gerät mit Browser, das am Fernseher oder Beamer hängt, plus Internet vor Ort genügt. Die Slideshow läuft danach ohne weiteres Zutun.',
    },
  ],
  ctaTitle: 'Bereit für eure Jubiläums-Fotowand?',
  ctaText:
    'Richtet euer Jubiläums-Event in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Jubiläum', path: '/jubilaeum' },
}

export default function JubilaeumPage() {
  return <UseCasePage content={content} />
}
