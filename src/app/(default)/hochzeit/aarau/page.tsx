import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase, photoLimitRange } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/aarau',
  title: 'Hochzeits-Fotowand Aarau – Gästefotos live',
  description:
    'Hochzeit im Aargau, von der Altstadt bis zum Schloss: Gästefotos per QR-Code sammeln, live zeigen, Galerie behalten. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Hochzeiten in Aarau',
  title: 'Hochzeits-Fotowand für Aarau',
  intro:
    'Trauung in der Aarauer Altstadt, Apéro im Schlosshof, Fest im Saal am Schlossplatz: Aargauer Hochzeiten spielen sich oft an mehreren Orten eines Tages ab. Mit EventShot kommen die Bilder aller Gäste trotzdem an einem Ort zusammen – per QR-Code hochgeladen, live als Slideshow gezeigt, danach als digitale Galerie behalten.',
  ablaufTitle: 'So läuft eure Hochzeit in Aarau',
  ablauf: [
    {
      title: 'QR-Code aufstellen',
      copy: 'Ein Code für den ganzen Tag: auf der Menükarte, beim Apéro und neben dem Gästebuch im Saal.',
    },
    {
      title: 'Gäste laden hoch',
      copy: 'Handy an den Code halten, Bild wählen, hochladen. Kein Konto, keine Installation, kein Gruppenchat.',
    },
    {
      title: 'Galerie danach',
      copy: 'Nach dem Fest öffnet derselbe Code die digitale Galerie – für euch und für alle Gäste.',
    },
  ],
  featuresTitle: 'Was zu eurer Hochzeit im Aargau passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf Leinwand oder Bildschirm',
    'Ruhige Übergänge und Animationen',
    `Je nach Paket ${photoLimitRange()} pro Event`,
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    `Für eine Hochzeit im Aargau passt Premium: ${photoLimitPhrase('PREMIUM')} über den ganzen Tag, einstellbare Anzeigedauer der Slideshow und 30 Tage digitale Galerie – auch Gäste, die erst später nachschauen, finden alle Bilder noch vor.`,
  faq: [
    {
      question: 'Braucht es für die Fotowand eine App auf dem Handy?',
      answer:
        'Nein. Der QR-Code öffnet eine Webseite im Browser, dort wählen eure Gäste ihr Bild und laden es hoch. Ohne App und ohne Konto – auch für Gäste, die sonst wenig mit dem Handy machen.',
    },
    {
      question: 'Wie lange können unsere Gäste die Fotos noch herunterladen?',
      answer:
        'Mit Premium bleibt die digitale Galerie 30 Tage offen. Weil Aarau verkehrsmässig mittig zwischen Zürich, Basel und Bern liegt, reisen viele Gäste am selben Abend wieder ab – die Galerie gibt ihnen in Ruhe Zeit, ihre Bilder später zu holen. Danach löschen wir alles automatisch.',
    },
    {
      question: 'Was brauchen wir am Fest für die Live-Slideshow?',
      answer:
        'Einen Beamer oder Bildschirm mit Browser und Internet. Ein Hinweis zu den Aargauer Schloss- und Innenhof-Locations: Im Freien ist eine Projektion erst nach Einbruch der Dämmerung wirklich lesbar. Plant die Slideshow deshalb entweder für den Saalteil des Abends oder stellt draussen einen hellen Bildschirm statt einer Leinwand auf.',
    },
    {
      question: 'Welche Arten von Hochzeitslocations gibt es rund um Aarau?',
      answer:
        'Drei Muster prägen die Region: Häuser in der Altstadt, grössere Säle beim Bahnhof und Schlosslocations im Kanton. Das Kultur & Kongresshaus am Schlossplatz nennt sieben multifunktionale Räume für 10 bis 600 Personen, die Alte Reithalle eine flexible Bestuhlung für 120 bis 520 Personen (jeweils Angaben der Häuser). Das Schlössli Aarau mit dem Stadtmuseum steht für die Altstadt-Variante, Schloss Lenzburg rund 14 Kilometer östlich für die Schlosshochzeit mit Rosengarten. Alle Namen stehen nur als Beispiel für die Art von Ort; eine Verbindung zu diesen Häusern besteht nicht.',
    },
    {
      question: 'Wir feiern an zwei Orten – reicht ein einziger QR-Code?',
      answer:
        'Ja. Trauung in der Altstadt, Apéro auf dem Schlossareal und Abendessen in einem Saal ausserhalb bleiben ein einziges Event mit einem Code. Eure Gäste laden vom Vormittag bis zum Dessert in dieselbe Fotowand hoch, und die Slideshow zeigt am Abend auch die Bilder vom Morgen.',
    },
  ],
  ctaTitle: 'Bereit für eure Foto-Wand in Aarau?',
  ctaText:
    'Legt euer Hochzeits-Event in wenigen Minuten an – die Registrierung ist kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Aarau', path: '/hochzeit/aarau' },
}

export default function HochzeitAarauPage() {
  return <UseCasePage content={content} />
}
