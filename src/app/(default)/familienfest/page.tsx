import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/familienfest',
  title: 'Fotowand fürs Familienfest & Grillfest',
  description:
    'Familienfest, Grillfest oder Geburtstagsbrunch: Gäste laden Fotos per QR-Code hoch, alle sehen sie live und behalten sie danach. Ohne App.',
})

const content: UseCaseContent = {
  image: 'leinwand-familie',
  eyebrow: 'EventShot für Familienfeste',
  title: 'Euer Familienfest, aus allen Blickwinkeln.',
  intro:
    'Ob Grillfest im Garten, Geburtstagsbrunch oder das Wiedersehen der ganzen Verwandtschaft: Jede Generation hält andere Dinge fest – die Grosseltern am gedeckten Tisch, die Kinder auf der Wiese. Mit EventShot laufen all diese Blickwinkel auf einem Screen zusammen, und danach bleibt euch die digitale Galerie.',
  ablaufTitle: 'So läuft euer Familienfest',
  ablauf: [
    {
      title: 'QR-Code hinstellen',
      copy: 'Legt den gedruckten Code auf den Gartentisch oder klemmt ihn ans Buffet. Gescannt wird direkt mit der Handykamera.',
    },
    {
      title: 'Alle laden hoch',
      copy: 'Vom Enkel bis zur Grossmutter: Bild antippen, hochladen, ohne Konto. Sekunden später läuft es über den Bildschirm.',
    },
    {
      title: 'Galerie danach',
      copy: 'Wer erst spät heimkommt, öffnet die digitale Galerie später mit demselben Code.',
    },
  ],
  featuresTitle: 'Was zu eurem Familienfest passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf Fernseher oder Leinwand',
    'Digitale Galerie für die ganze Verwandtschaft',
    'Bilder aller Generationen an einem Ort',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Für ein Familienfest empfehlen wir Premium: bis zu 3 Slideshow-Screens für Garten und Stube, einstellbare Anzeigedauer und 30 Tage digitale Galerie – so hat auch die Verwandtschaft aus der Ferne genug Zeit.',
  faq: [
    {
      question: 'Braucht unsere Verwandtschaft dafür eine App?',
      answer:
        'Nein. Der QR-Code öffnet eine Webseite im Handy-Browser, dort wird das Bild ausgewählt und gesendet – ohne App und ohne Konto.',
    },
    {
      question: 'Wie lange können wir die Bilder herunterladen?',
      answer:
        'Im Premium-Plan steht die digitale Galerie 30 Tage offen. Danach löschen wir alle Aufnahmen automatisch und DSG-konform von unseren Schweizer Servern.',
    },
    {
      question: 'Was brauchen wir im Garten oder in der Stube?',
      answer:
        'Ein Gerät mit Browser und Internet genügt: der Fernseher in der Stube, ein Laptop am Beamer oder ein Tablet auf der Anrichte. Die Slideshow läuft als Webseite.',
    },
  ],
  ctaTitle: 'Bereit für eure Familien-Fotowand?',
  ctaText:
    'Richtet euer Familienfest-Event in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Familienfest', path: '/familienfest' },
}

export default function FamilienfestPage() {
  return <UseCasePage content={content} />
}
