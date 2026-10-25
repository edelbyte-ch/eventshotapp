import type { Metadata } from 'next'
import { type HubContent, HubPage } from '@/components/landing/hub-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber',
  title: 'Ratgeber – Gästefotos sammeln & teilen',
  description:
    'Anleitungen zu Gästefotos: sammeln, live zeigen, herunterladen und archivieren – für Hochzeit, Geburtstag, Taufe und Familienfeste.',
})

const content: HubContent = {
  eyebrow: 'Ratgeber',
  title: 'Ratgeber rund um Gästefotos',
  intro:
    'Wie bittet man Gäste so um Fotos, dass sie es wirklich tun? Was gilt beim Datenschutz? Und lohnt sich eine Fotobox überhaupt? Hier stehen die Antworten – auch dann nützlich, wenn du dich am Ende gegen EventShot entscheidest.',
  breadcrumbName: 'Ratgeber',
  path: '/ratgeber',
  sections: [
    {
      heading: 'Fotos sammeln',
      intro: 'Wie die Bilder deiner Gäste tatsächlich bei dir landen.',
      entries: [
        {
          title: 'Wie ihr eure Gäste um Fotos bittet',
          href: '/ratgeber/gaeste-um-fotos-bitten',
          copy: 'Formulierungen für Tischkarte, Ansage und Einladung – mit Beispieltexten zum Übernehmen.',
        },
        {
          title: 'Hochzeitsfotos teilen – ohne WhatsApp-Gruppe',
          href: '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp',
          copy: 'Warum WhatsApp Bilder komprimiert und wie ihr sie in Originalqualität sammelt.',
        },
        {
          title: 'QR-Code-Tischkarten gestalten',
          href: '/ratgeber/qr-code-tischkarten-gestalten',
          copy: 'Grösse, Platzierung, Kontrast und Text – damit der Code auch gescannt wird.',
        },
        {
          title: 'Fotos an der Geburtstagsparty sammeln',
          href: '/ratgeber/geburtstagsparty-fotos-sammeln',
          copy: 'Alle Bilder an einem Ort – ohne Gruppenchat und ohne Nachfragen am Tag danach.',
        },
        {
          title: 'Fotos an der Taufe diskret sammeln',
          href: '/ratgeber/taufe-fotos-diskret-sammeln',
          copy: 'Kinderfotos im Familienkreis: wer sie sehen darf und wann sie gelöscht werden.',
        },
      ],
    },
    {
      heading: 'Entscheiden & planen',
      intro: 'Bevor ihr bucht: was sich wirklich lohnt und was nicht.',
      entries: [
        {
          title: 'Braucht ihr an eurer Hochzeit eine Fotobox?',
          href: '/ratgeber/braucht-man-eine-fotobox',
          copy: 'Wann sich eine Mietfotobox lohnt – und wann ihr ganz darauf verzichten könnt.',
        },
        {
          title: 'Digitale Fotowand: Anbieter im Vergleich',
          href: '/anbieter-vergleich',
          copy: 'Elf Dienste mit Preisen, Videos, Speicherdauer und Datenstandort, inklusive der Fälle, in denen ein anderer besser passt.',
        },
        {
          title: 'Einwegkameras oder digitale Fotowand?',
          href: '/ratgeber/einwegkameras-oder-digital',
          copy: 'Der Klassiker im Vergleich: Kosten, Entwicklung, Ausschuss und Wartezeit.',
        },
        {
          title: 'Was Fotos an der Hochzeit kosten',
          href: '/ratgeber/hochzeitsbudget-fotos',
          copy: 'Welche Posten im Budget stecken und wo sich sparen lässt.',
        },
        {
          title: 'Das Fotoprogramm eurer Hochzeit planen',
          href: '/ratgeber/hochzeit-fotoprogramm-planen',
          copy: 'Vom Apéro bis zum letzten Tanz – und wie ihr das mit dem Fotografen abstimmt.',
        },
      ],
    },
    {
      heading: 'Technik & danach',
      intro: 'Was am Abend funktionieren muss und was nach dem Fest bleibt.',
      entries: [
        {
          title: 'Beamer oder TV für die Slideshow?',
          href: '/ratgeber/beamer-oder-tv-slideshow',
          copy: 'Auflösung, Helligkeit, Platzierung im Saal und WLAN – inklusive Plan B.',
        },
        {
          title: 'Hochzeitsfotos sichern und archivieren',
          href: '/ratgeber/hochzeitsfotos-archivieren',
          copy: 'Alle Bilder herunterladen, sinnvoll benennen und sicher aufbewahren.',
        },
        {
          title: 'Gästefotos und Datenschutz an der Hochzeit',
          href: '/ratgeber/datenschutz-hochzeitsfotos',
          copy: 'Recht am eigenen Bild, Einwilligung und Aufbewahrung – mit Muster-Hinweistext.',
        },
      ],
    },
  ],
  outro:
    'Plant ihr einen grossen Firmenanlass oder eine Konferenz? Der Ratgeber für geschäftliche Anlässe steht auf social-wall.ch – dem Schwesterprodukt von EdelByte.',
}

export default function RatgeberPage() {
  return <HubPage content={content} />
}
