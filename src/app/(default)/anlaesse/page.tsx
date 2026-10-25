import type { Metadata } from 'next'
import { type HubContent, HubPage } from '@/components/landing/hub-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/anlaesse',
  title: 'Anlässe – Live-Fotowand für jede Feier',
  description:
    'Hochzeit, Geburtstag, Taufe, Jubiläum, Konfirmation oder Polterabend: die passende Live-Fotowand mit digitaler Galerie. Ohne App, DSG-konform.',
})

const content: HubContent = {
  eyebrow: 'Anlässe',
  title: 'Für welchen Anlass suchst du eine Fotowand?',
  intro:
    'Jede Feier bringt andere Bilder hervor – und andere Anforderungen an die Technik. Hier findest du die passende Seite zu deinem Anlass, mit dem empfohlenen Paket, dem typischen Ablauf und den häufigsten Fragen dazu.',
  breadcrumbName: 'Anlässe',
  path: '/anlaesse',
  sections: [
    {
      heading: 'Private Feiern',
      intro:
        'Vom grossen Fest bis zur Feier im engen Kreis: Gäste laden ihre Fotos per QR-Code hoch, alles läuft live als Slideshow und bleibt danach in der digitalen Galerie.',
      entries: [
        {
          title: 'Hochzeit',
          href: '/hochzeit',
          copy: 'Gästefotos vom ersten Tanz bis zum letzten Lied – live im Saal und danach als Erinnerung.',
        },
        {
          title: 'Geburtstag',
          href: '/geburtstag',
          copy: 'Runder Geburtstag oder Party im Freundeskreis: alle Schnappschüsse an einem Ort.',
        },
        {
          title: 'Taufe',
          href: '/taufe',
          copy: 'Feier im kleinen Kreis, bei der die Bilder in der Familie bleiben sollen.',
        },
        {
          title: 'Jubiläum',
          href: '/jubilaeum',
          copy: 'Ob 25 oder 50 Jahre: Gäste sammeln Fotos, die Slideshow läuft den Abend über.',
        },
        {
          title: 'Konfirmation & Firmung',
          href: '/konfirmation',
          copy: 'Konfirmation, Firmung oder Erstkommunion – festgehalten von allen Gästen.',
        },
        {
          title: 'Polterabend',
          href: '/polterabend',
          copy: 'Polterabend und Junggesellenabschied aus allen Perspektiven.',
        },
        {
          title: 'Familienfest',
          href: '/familienfest',
          copy: 'Familienfest, Grillfest oder Geburtstagsbrunch mit Bildern aus allen Blickwinkeln.',
        },
        {
          title: 'Team-Event & Firmenessen',
          href: '/firmenanlass',
          copy: 'Kleiner Firmenanlass, Apéro oder Weihnachtsessen im Team.',
        },
      ],
    },
    {
      heading: 'Vergleich & Alternativen',
      intro:
        'Du bist noch am Abwägen? Diese Seiten ordnen die digitale Fotowand gegenüber der klassischen Mietfotobox ein – inklusive der Fälle, in denen eine Mietbox die bessere Wahl bleibt.',
      entries: [
        {
          title: 'Anbieter im Vergleich',
          href: '/anbieter-vergleich',
          copy: 'Elf digitale Fotowände mit Preisen, Videos, Speicherdauer und Datenstandort, ehrlich gegenübergestellt.',
        },
        {
          title: 'Fotobox-Alternative',
          href: '/fotobox-alternative',
          copy: 'Mietfotobox oder digitale Fotowand? Kosten, Aufbau, Platz und Gästezahl im Vergleich.',
        },
        {
          title: 'Fotobox Kosten Schweiz',
          href: '/fotobox-kosten-schweiz',
          copy: 'Was eine Mietfotobox in der Schweiz kostet und welche Posten dazukommen.',
        },
        {
          title: 'Fotobox ohne App',
          href: '/fotobox-ohne-app',
          copy: 'QR-Code statt Download: warum Gäste nichts installieren müssen.',
        },
        {
          title: 'Digitales Gästebuch',
          href: '/digitales-gaestebuch',
          copy: 'Foto statt Buch und Stift – die digitale Variante des Gästebuchs.',
        },
        {
          title: 'Fotichaschte-Alternative',
          href: '/fotichaschte-alternative',
          copy: 'Fotichaschte, Fotiböxli oder digital? Der Vergleich für Schweizer Feste.',
        },
        {
          title: 'Digitale Fotobox',
          href: '/digitale-fotobox',
          copy: 'Was eine digitale Fotobox ist und wie sie am Fest funktioniert.',
        },
      ],
    },
  ],
  outro:
    'Planst du einen grossen Firmenanlass, eine Konferenz oder einen Grossanlass mit vielen Gästen? Dafür gibt es das Schwesterprodukt social-wall.ch – die Live-Fotowand mit Moderation und mehreren Screens.',
}

export default function AnlaessePage() {
  return <HubPage content={content} />
}
