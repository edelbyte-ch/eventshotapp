import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/bern',
  title: 'Hochzeits-Fotowand Bern – Gästefotos live',
  description:
    'Vom Altstadtgewölbe bis zum Landgasthof: Gästefotos per QR-Code sammeln, live zeigen, digitale Galerie behalten. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Hochzeiten im Raum Bern',
  title: 'Hochzeits-Fotowand für Bern und das Umland.',
  intro:
    'Barockes Gewölbe in der Altstadt, ein Bankettsaal mit Blick über die Dächer, ein Landgasthof im Emmental: Berner Hochzeiten spielen zwischen Sandstein und Land – ob im Kornhauskeller, im Kursaal, im Bellevue Palace oder auf einem Schloss im Seeland. Eure Gäste sammeln die Bilder per QR-Code, die Live-Slideshow zeigt sie sofort. Die digitale Galerie hält den Tag fest, wenn längst alle wieder zu Hause sind.',
  ablaufTitle: 'So läuft eure Berner Hochzeit',
  ablauf: [
    {
      title: 'Code auf die Menükarte',
      copy: 'Druckt den QR-Code auf Menükarte oder Tischnummer. Im Gewölbe genügt ein kleiner Aufsteller neben den Kerzen.',
    },
    {
      title: 'Fotos landen sofort',
      copy: 'Gäste laden ihr Bild in ein paar Sekunden hoch. Es erscheint direkt in der Slideshow an der Wand.',
    },
    {
      title: 'Galerie danach',
      copy: 'Nach der Heimfahrt ins Emmental oder ins Oberland liegt alles beisammen: ein Link, alle Bilder des Tages.',
    },
  ],
  featuresTitle: 'Was an einer Berner Hochzeit zählt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow im Gewölbekeller oder Bankettsaal',
    'Ein QR-Code für Altstadt und Landgasthof',
    'Digitale Galerie mit allen Bildern des Tages',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    `Für eine Berner Hochzeit empfehlen wir Premium: einstellbare Anzeigedauer, damit jedes Bild lange genug an der Gewölbewand steht, ${photoLimitPhrase('PREMIUM')} vom Apéro bis zur Schlussrunde und 30 Tage digitale Galerie – genug Zeit für alle, die erst am Sonntag ans Nachschauen denken.`,
  faq: [
    {
      question: 'Braucht es für den Upload eine App auf dem Handy?',
      answer:
        'Nein. Der QR-Code öffnet direkt eine Webseite im Browser: Foto auswählen, hochladen, fertig. Weder App noch Konto – das schafft auch die Grossmutter am Ehrentisch ohne Hilfe.',
    },
    {
      question: 'Bleibt die Galerie nach der Hochzeit noch offen?',
      answer:
        'Ja. Mit Premium bleiben alle Bilder 30 Tage in der digitalen Galerie, erreichbar über denselben QR-Code wie am Fest. Danach werden sie automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question:
        'Funktioniert das auch im Gewölbekeller, wo der Handyempfang schwach ist?',
      answer:
        'Ja, sofern eine Internetverbindung vorhanden ist. Hinter den dicken Sandsteinmauern der Berner Altstadt trägt das Mobilfunknetz oft schlecht – klärt darum früh, ob eure Gäste ins WLAN des Hauses dürfen, und schreibt das Passwort neben den QR-Code.',
    },
    {
      question:
        'Wir starten in der Altstadt und feiern danach auf dem Land weiter. Brauchen wir zwei Events?',
      answer:
        'Nein. Ein Event, ein QR-Code, der ganze Tag. Ob die Trauung in der Altstadt liegt und das Fest im Emmental, im Seeland oder im Berner Oberland: Alle Bilder laufen in dieselbe Slideshow und danach in dieselbe Galerie.',
    },
  ],
  ctaTitle: 'Bereit für eure Fotowand in Bern?',
  ctaText:
    'Euer Event für den Berner Hochzeitstag steht in wenigen Minuten – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Bern', path: '/hochzeit/bern' },
}

export default function HochzeitBernPage() {
  return <UseCasePage content={content} />
}
