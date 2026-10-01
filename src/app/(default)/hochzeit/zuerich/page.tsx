import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/zuerich',
  title: 'Hochzeits-Fotowand Zürich – Gästefotos live',
  description:
    'Für Hochzeiten in Zürich und am See: Gästefotos per QR-Code, live als Slideshow im Saal, danach digitale Galerie. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Hochzeiten in Zürich',
  title: 'Eure Hochzeits-Fotowand für Zürich.',
  intro:
    'Ob im Kunsthaus, im Papiersaal der alten Sihlpapierfabrik, am Wasser beim Lake Side oder in einem Landgasthof im Zürcher Oberland: Zürcher Hochzeiten verteilen sich über sehr unterschiedliche Häuser – und die Anreise der Gäste über die halbe Deutschschweiz. Die Bilder landen trotzdem an einem Ort. Eure Gäste laden per QR-Code hoch, die Slideshow läuft live auf der Leinwand, und danach bleibt euch die digitale Galerie.',
  ablaufTitle: 'So läuft euer Fest in Zürich',
  ablauf: [
    {
      title: 'QR-Code auf die Tische',
      copy: 'Legt den Code auf die Tischkarten und stellt einen Aufsteller zum Apéro dazu. Gäste scannen ihn mit der Handykamera.',
    },
    {
      title: 'Alle steuern bei',
      copy: 'Ein Bild aussuchen, hochladen, weiterfeiern. Der Beitrag läuft im nächsten Durchgang auf der Leinwand mit.',
    },
    {
      title: 'Galerie danach',
      copy: 'Am Tag darauf öffnet ihr über denselben QR-Code die digitale Galerie – vom Apéro am See bis zum letzten Tanz beisammen.',
    },
  ],
  featuresTitle: 'Was zu einer Zürcher Hochzeit passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf dem Beamer im Festsaal',
    'Bilder vom Apéro am See und aus dem Saal zusammen',
    'Digitale Galerie auch für weit angereiste Gäste',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    `Für eine Zürcher Hochzeit empfehlen wir Premium: ${photoLimitPhrase('PREMIUM')} für einen langen Abend, einstellbare Anzeigedauer für die Slideshow und 30 Tage digitale Galerie – genug Zeit, bis auch die weit angereisten Gäste ihre Bilder in Ruhe geholt haben.`,
  faq: [
    {
      question: 'Müssen unsere Gäste zuerst eine App herunterladen?',
      answer:
        'Nein. Sie scannen den QR-Code auf der Tischkarte, wählen ein Foto und laden es hoch – ohne App und ohne Konto. Das hilft besonders, wenn an einer Zürcher Hochzeit Gäste aus mehreren Ländern am Tisch sitzen und niemand mitten im Fest etwas einrichten möchte.',
    },
    {
      question: 'Bleiben die Fotos nach dem Fest noch eine Weile abrufbar?',
      answer:
        'Ja. Im Premium-Plan bleibt die digitale Galerie 30 Tage offen, erreichbar über denselben QR-Code wie am Fest. Danach werden alle Bilder automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question: 'Reicht die Technik im Saal für die Live-Slideshow?',
      answer:
        'Ja. Es braucht einen Beamer oder grossen Bildschirm mit Browser und eine Internetverbindung. In umgebauten Industriesälen und in Museumsräumen ist die Medientechnik oft fest installiert – klärt früh, wer den Anschluss bedient und ob ihr die Slideshow auf dem Gerät des Hauses öffnen dürft.',
    },
    {
      question:
        'Viele unserer Gäste kommen erst zum Abendteil. Können sie noch Fotos beisteuern?',
      answer:
        'Ja. Der QR-Code gilt über den ganzen Anlass. In der Zürcher Hochzeitssaison von Mai bis September beginnt vieles im Freien und zieht später in den Saal – wer erst zum Dessert aus der Stadt oder vom Zug her dazustösst, lädt genauso hoch und sieht sein Bild im nächsten Durchgang.',
    },
  ],
  ctaTitle: 'Bereit für eure Zürcher Fotowand?',
  ctaText:
    'Legt euer Event für den Hochzeitstag in Zürich in wenigen Minuten an – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Zürich', path: '/hochzeit/zuerich' },
}

export default function HochzeitZuerichPage() {
  return <UseCasePage content={content} />
}
