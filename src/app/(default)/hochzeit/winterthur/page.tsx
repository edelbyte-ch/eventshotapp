import type { Metadata } from 'next'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/hochzeit/winterthur',
  title: 'Fotowand Hochzeit Winterthur – Gästefotos live',
  description:
    'Hochzeit in Industriehallen und Backsteinlofts: Gästefotos per QR-Code, live als Slideshow, danach in der Galerie. Ohne App, DSG-konform.',
})

const content: UseCaseContent = {
  eyebrow: 'EventShot für Hochzeiten in Winterthur',
  title: 'Hochzeits-Fotowand für Winterthur',
  intro:
    'Backsteinhalle auf dem Sulzer-Areal, Bankettsaal im Casinotheater oder Landgasthof im Umland: In Winterthur wird oft zwischen Stahlträgern und hohen Fensterfronten gefeiert. Eure Gäste laden ihre Fotos per QR-Code hoch, ihr seht sie sofort in der Live-Slideshow. Danach bleibt euch die digitale Galerie mit allen Bildern.',
  ablaufTitle: 'So läuft eure Hochzeit in Winterthur',
  ablauf: [
    {
      title: 'QR-Code aufstellen',
      copy: 'Ein Aufsteller pro Tisch, einer beim Apéro. In hohen Hallen wirkt der Code auf Augenhöhe besser als an der Wand.',
    },
    {
      title: 'Gäste laden hoch',
      copy: 'Ohne App und ohne Konto: Bild antippen, hochladen – fertig. Sekunden später läuft es über die Leinwand.',
    },
    {
      title: 'Galerie danach',
      copy: 'Derselbe QR-Code führt nach dem Fest in die digitale Galerie mit allen Fotos des Abends.',
    },
  ],
  featuresTitle: 'Was zu eurer Hochzeit in Winterthur passt',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    'Live-Slideshow auf Beamer oder Saal-TV',
    'Einstellbare Anzeigedauer für lange Festabende',
    'Digitale Galerie über denselben QR-Code',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Premium',
  planPrice: 'CHF 99.-',
  planReason:
    `Für eine Hochzeit in Winterthur empfehlen wir Premium: einstellbare Anzeigedauer für lange Abende in der Halle, ${photoLimitPhrase('PREMIUM')} und 30 Tage digitale Galerie – Zeit genug, bis auch der letzte Gast seine Bilder gesichert hat.`,
  faq: [
    {
      question: 'Müssen unsere Hochzeitsgäste in Winterthur eine App laden?',
      answer:
        'Nein. Wer den QR-Code scannt, landet direkt im Browser und lädt sein Foto hoch – ohne App, ohne Konto, ohne Registrierung. Das gilt für die Grosstante genauso wie für die Trauzeugen.',
    },
    {
      question: 'Wie lange bleiben die Fotos nach der Hochzeit verfügbar?',
      answer:
        'Im Premium-Plan bleibt die digitale Galerie 30 Tage nach eurem Fest offen. Danach werden alle Bilder automatisch von unseren Schweizer Servern gelöscht – ihr müsst nichts kündigen und nichts aufräumen.',
    },
    {
      question: 'Was brauchen wir in einer Winterthurer Halle vor Ort?',
      answer:
        'Einen Beamer oder einen grossen Bildschirm mit Browser und eine stabile Internetverbindung. In umgenutzten Industriebauten mit dicken Backsteinmauern ist das Mobilnetz im Inneren nicht überall gleich gut: Fragt bei der Besichtigung nach dem Gäste-WLAN und testet den Empfang dort, wo später die Tische stehen.',
    },
    {
      question: 'Welche Orte in Winterthur passen zu einer Hochzeits-Fotowand?',
      answer:
        'Winterthur bietet vor allem drei Arten von Orten: umgenutzte Industriebauten rund um das Sulzer-Areal, städtische Kulturhäuser und Landgasthöfe im Umland. Das Casinotheater nennt Bankettsäle für bis zu rund 120 Personen (Angabe des Hauses), die Alte Kaserne rund zehn vermietbare Räume; beide führt die Stadt Winterthur als Trauungslokale. Salzhaus und Gaswerk stehen für die Konzert- und Kulturhäuser in ehemaligen Industriegebäuden. Diese Namen dienen hier nur als Beispiel für die Art von Ort – eine Zusammenarbeit mit diesen Häusern besteht nicht.',
    },
    {
      question: 'Passt eine Foto-Slideshow optisch in eine Industriehalle?',
      answer:
        'Ja. Rohe Betonwände und Backstein sind eine ungewohnte, aber dankbare Projektionsfläche, wenn die Fläche hell genug und einigermassen glatt ist. Zwei Punkte lohnen sich vorab: Grosse Fensterfronten machen den Saal bis in den späten Abend hell, also plant einen kräftigen Beamer oder einen grossen Bildschirm ein. Und legt die Slideshow-Fläche so, dass sie vom Tanzboden und von den Tischen aus sichtbar bleibt.',
    },
  ],
  ctaTitle: 'Bereit für eure Foto-Wand in Winterthur?',
  ctaText:
    'Euer Hochzeits-Event ist in wenigen Minuten eingerichtet – die Registrierung kostet nichts, bezahlt wird erst beim Buchen.',
  breadcrumb: { name: 'Winterthur', path: '/hochzeit/winterthur' },
}

export default function HochzeitWinterthurPage() {
  return <UseCasePage content={content} />
}
