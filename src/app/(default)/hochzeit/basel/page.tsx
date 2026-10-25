import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/basel',
  title: 'Fotobox Hochzeit Basel – digitale Alternative',
  description:
    'Digitale Fotobox für die Hochzeit am Rhein oder im Baselbiet: Gästefotos per QR-Code, live auf der Leinwand, danach Galerie. Ohne Miete, ab CHF 49.-.',
})

const content: UseCaseContent = {
  image: 'leinwand-brautpaar',
  eyebrow: 'Digitale Fotobox für Hochzeiten in Basel',
  title: 'Digitale Fotobox für eure Hochzeit in Basel',
  intro:
    'Trauung in der Altstadt, Apéro am Rheinufer, Fest in einer historischen Halle: In Basel verteilt sich ein Hochzeitstag oft über mehrere Orte und zwei Rheinseiten. Eure Gäste laden ihre Fotos unterwegs per QR-Code hoch und sehen sie sofort in der Live-Slideshow. Nach dem Fest bleibt euch die digitale Galerie mit allen Bildern.',
  ablaufTitle: 'So läuft euer Hochzeitstag in Basel',
  ablauf: [
    {
      title: 'QR-Code an beiden Orten',
      copy: 'Legt den Code auf die Tische im Saal und stellt ihn beim Apéro am Rhein auf. Ein Code gilt für den ganzen Tag.',
    },
    {
      title: 'Gäste laden hoch',
      copy: 'Foto auswählen, hochladen – fertig. Ohne App und ohne Konto, direkt im Browser des Handys.',
    },
    {
      title: 'Galerie danach',
      copy: 'Derselbe QR-Code führt nach dem Fest in die digitale Galerie – auch für Gäste, die schon am Sonntag heimreisen.',
    },
  ],
  featuresTitle: 'Was zu eurer Hochzeit in Basel passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Ein QR-Code für Apéro und Abendfest',
    'Slideshow auf dem Beamer in hohen Hallen',
    'Digitale Galerie über denselben Code',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    'Für Hochzeiten in Basel empfehlen wir Premium: einstellbare Anzeigedauer für lange Abende, elegante Übergänge auf der Leinwand und 30 Tage digitale Galerie – genug Zeit, bis auch die letzten Bilder hochgeladen sind.',
  faq: [
    {
      question: 'Lohnt sich das statt einer Fotobox zur Miete in Basel?',
      answer:
        'Kommt darauf an, was ihr euch wünscht. Eine Mietfotobox bringt Kabine, Drucker und Requisiten mit, kostet in der Schweiz je nach Ausstattung aber rund CHF 150.- bis über CHF 1\'000.- pro Anlass, oft zuzüglich Lieferung und Aufbau. EventShot kostet einmalig ab CHF 49.-: Jeder Gast fotografiert mit dem eigenen Handy, und nichts muss geliefert oder aufgebaut werden. Wollt ihr gedruckte Fotostreifen zum Mitnehmen, bleibt die Mietbox die bessere Wahl.',
    },
    {
      question: 'Müssen unsere Hochzeitsgäste eine App installieren?',
      answer:
        'Nein. Der QR-Code öffnet eine Webseite im Browser: Foto auswählen, hochladen – fertig. Das gilt auch für Gäste, die erst zum Abendteil dazustossen.',
    },
    {
      question: 'Wie lange bleiben die Fotos nach der Feier verfügbar?',
      answer:
        'Im Premium-Plan 30 Tage. Danach werden alle Bilder automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      question: 'Was brauchen wir im Saal?',
      answer:
        'Einen Beamer mit Browser, dazu eine stabile Internetverbindung im Saal. Die Basler Bandbreite reicht von der Kuppelhalle der Markthalle mit rund 1’050 m² (Betreiberangabe) über die Säle im Volkshaus für rund 50 bis 1’200 Personen (Betreiberangabe) bis zum Bankettsaal eines Rheinhotels wie dem Grand Hotel Les Trois Rois, dazu Zunftstuben und Landgasthöfe im Baselbiet. Die Häuser stehen als Beispiel für die Art von Raum: In hohen Hallen gehört die Leinwand in die Blickachse der Tanzfläche, im kleinen Saal genügt ein TV.',
    },
    {
      question: 'Wir feiern in Grossbasel und in Kleinbasel – reicht ein Code?',
      answer:
        'Ja. Der QR-Code gehört zum Event und nicht zum Raum. Ob Trauung auf der einen Rheinseite und Fest auf der anderen: Alle Fotos landen in derselben Galerie und in derselben Slideshow.',
    },
    {
      question: 'Unsere Feier fällt in eine Messewoche. Müssen wir etwas beachten?',
      answer:
        'Für die Fotowand nichts – ihr richtet sie in wenigen Minuten selbst ein. Weil Basel Messe- und Kongressstadt mit internationalem Publikum ist, lohnt sich in solchen Wochen aber eine frühe Reservation von Saal und Gästezimmern.',
    },
  ],
  ctaTitle: 'Bereit für eure Foto-Wand am Rhein?',
  ctaText:
    'Richtet euer Hochzeits-Event für Basel in wenigen Minuten ein – Registrierung kostenlos, ihr zahlt erst beim Buchen.',
  breadcrumb: { name: 'Basel', path: '/hochzeit/basel' },
}

export default function HochzeitBaselPage() {
  return <UseCasePage content={content} />
}
