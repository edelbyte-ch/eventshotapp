import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/luzern',
  title: 'Fotobox Hochzeit Luzern – digitale Alternative',
  description:
    'Digitale Fotobox für die Hochzeit am Vierwaldstättersee: Gäste laden Fotos per QR-Code hoch, live als Slideshow, danach Galerie. Ohne Miete, ab CHF 49.-.',
})

const content: UseCaseContent = {
  image: 'leinwand-brautpaar',
  eyebrow: 'Digitale Fotobox für Hochzeiten in Luzern',
  title: 'Digitale Fotobox für eure Hochzeit in Luzern',
  intro:
    'Trauung am Wasser, Apéro auf der Terrasse, Fest im Bankettsaal: Eine Hochzeit in Luzern und der Zentralschweiz lebt von der Aussicht – und jeder Gast fotografiert sie anders. Alle Bilder landen per QR-Code an einem Ort und laufen sofort in der Live-Slideshow. Danach bleibt euch die digitale Galerie.',
  ablaufTitle: 'So läuft euer Hochzeitstag am See',
  ablauf: [
    {
      title: 'Code auf Tisch und Terrasse',
      copy: 'Stellt den QR-Code beim Apéro auf der Seeterrasse auf und legt ihn später auf die Tische im Saal.',
    },
    {
      title: 'Ein Scan, ein Bild',
      copy: 'Gäste scannen, wählen ein Foto und laden es hoch. Keine App, kein Konto, keine Wartezeit.',
    },
    {
      title: 'Galerie danach',
      copy: 'Nach dem Fest öffnet derselbe Code die digitale Galerie mit allen Bildern des Tages.',
    },
  ],
  featuresTitle: 'Was zu eurer Hochzeit am Vierwaldstättersee passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf dem TV im Bankettsaal',
    'Einstellbare Anzeigedauer für lange Sommerabende',
    'Digitale Galerie für angereiste Gäste',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Für eine Hochzeit am Vierwaldstättersee empfehlen wir Premium: 30 Tage digitale Galerie, einstellbare Anzeigedauer und ruhige Übergänge – damit auch Gäste, die am Sonntag zurückreisen, alles in Ruhe herunterladen können.',
  faq: [
    {
      question: 'Lohnt sich das statt einer Fotobox zur Miete in Luzern?',
      answer:
        'Kommt darauf an, was ihr euch wünscht. Eine Mietfotobox bringt Kabine, Drucker und Requisiten mit, kostet in der Schweiz je nach Ausstattung aber rund CHF 150.- bis über CHF 1\'000.- pro Anlass, oft zuzüglich Lieferung und Aufbau. EventShot kostet einmalig ab CHF 49.-: Jeder Gast fotografiert mit dem eigenen Handy, und nichts muss geliefert oder aufgebaut werden. Wollt ihr gedruckte Fotostreifen zum Mitnehmen, bleibt die Mietbox die bessere Wahl.',
    },
    {
      question: 'Brauchen unsere Gäste eine App für die Fotos?',
      answer:
        'Nein. Ein Scan mit der Handykamera, dann öffnet sich die Webseite: auswählen, hochladen, fertig. Auch wer nur zum Apéro auf der Terrasse kommt, braucht weder Konto noch Installation.',
    },
    {
      question: 'Wie lange können wir die Bilder herunterladen?',
      answer:
        'Im Premium-Plan bleibt die digitale Galerie 30 Tage geöffnet. Danach werden alle Fotos automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question: 'Was brauchen wir im Bankettsaal?',
      answer:
        'Einen Beamer oder TV mit Browser und eine Internetverbindung. Die Luzerner Bandbreite reicht vom Saal am Vierwaldstättersee im Grand Casino über die Bankett- und Gartenräume des Hotel Schweizerhof bis zum Rittersaal von Schloss Meggenhorn aus dem 19. Jahrhundert, dazu Landgasthöfe am Sempachersee und Häuser Richtung Rigi und Vitznau. Die Häuser stehen als Beispiel für die Art von Raum. Solange es draussen hell ist, wirkt ein TV im Foyer besser als eine Leinwand.',
    },
    {
      question: 'Ein Teil des Fests findet auf dem Schiff statt. Klappt der Upload dort?',
      answer:
        'Auf dem See kann der Empfang schwanken. Was unterwegs nicht durchgeht, laden die Gäste an Land nach – die Slideshow im Saal läuft davon unabhängig weiter.',
    },
    {
      question: 'Viele Gäste reisen von weiter her an. Wann sollten sie hochladen?',
      answer:
        'Am besten noch am Abend, dann sind die Bilder sofort auf der Leinwand zu sehen. Wer es vergisst, lädt sie später nach: Der QR-Code auf der Tischkarte funktioniert bis zum Galerie-Ablauf.',
    },
  ],
  ctaTitle: 'Bereit für eure Foto-Wand am See?',
  ctaText:
    'Legt euer Hochzeits-Event für Luzern in wenigen Minuten an – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Luzern', path: '/hochzeit/luzern' },
}

export default function HochzeitLuzernPage() {
  return <UseCasePage content={content} />
}
