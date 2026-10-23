/**
 * Inhalte fuer /llms.txt, /llms-full.txt und /pricing.md (siehe llmstxt.org).
 *
 * Preise, Foto-Limits und FAQ kommen aus denselben Quellen wie die Website.
 * Vorher lag llms.txt statisch in public/ und nannte Pakete mit «Eventdauer»,
 * die es auf der Website laengst nicht mehr gab – KI-Suchen haetten das
 * wortwoertlich zitiert.
 */

import { FAQ_GROUPS } from '@/lib/content/faq'
import { pricingPlans } from '@/lib/constants'
import { photoLimitPhrase } from '@/lib/photo-limits'
import { SITE } from '@/lib/seo/schema'

type LinkItem = { title: string; path: string; note?: string }

const ANLAESSE: LinkItem[] = [
  { title: 'Alle Anlässe', path: '/anlaesse', note: 'Übersicht über sämtliche Anlass-Seiten.' },
  { title: 'Hochzeit', path: '/hochzeit', note: 'Hochzeits-Fotowand & Slideshow mit digitaler Galerie als Erinnerung.' },
  { title: 'Geburtstag', path: '/geburtstag', note: 'Live-Fotowand & Slideshow für Geburtstagsfeier und Party.' },
  { title: 'Taufe', path: '/taufe', note: 'Fotos an der Taufe im kleinen Kreis sammeln.' },
  { title: 'Jubiläum', path: '/jubilaeum', note: 'Fotowand & Slideshow für runde Jubiläen.' },
  { title: 'Konfirmation', path: '/konfirmation', note: 'Konfirmation, Firmung und Erstkommunion festhalten.' },
  { title: 'Polterabend', path: '/polterabend', note: 'Polterabend und Junggesellenabschied aus allen Perspektiven.' },
  { title: 'Familienfest', path: '/familienfest', note: 'Familienfest, Grillfest und Geburtstagsbrunch.' },
  { title: 'Team-Event & Firmenessen', path: '/firmenanlass', note: 'kleine Firmenanlässe, Apéro und Weihnachtsessen im Team.' },
]

const VERGLEICH: LinkItem[] = [
  { title: 'Fotobox-Alternative', path: '/fotobox-alternative', note: 'Mietfotobox oder digitale Fotowand: Kosten, Aufbau, Platz und Gästezahl.' },
  { title: 'Fotobox Kosten Schweiz', path: '/fotobox-kosten-schweiz', note: 'was Mietfotoboxen in der Schweiz kosten.' },
  { title: 'Fotobox ohne App', path: '/fotobox-ohne-app', note: 'QR-Code statt Download, kein Konto nötig.' },
  { title: 'Digitales Gästebuch', path: '/digitales-gaestebuch', note: 'Foto statt Buch und Stift.' },
  { title: 'Fotichaschte-Alternative', path: '/fotichaschte-alternative', note: 'Fotichaschte, Fotiböxli oder digital.' },
  { title: 'Digitale Fotobox', path: '/digitale-fotobox', note: 'Definition und Funktionsweise.' },
  { title: 'QR-Code für Hochzeitsfotos', path: '/qr-code-fotos-hochzeit', note: 'Gästefotos der Hochzeit per QR-Code einsammeln.' },
  { title: 'QR-Code-Vorlagen', path: '/qr-code-vorlagen', note: 'Grösse, Platzierung und Begleittext für Tischkarte und Aufsteller.' },
]

const RATGEBER: LinkItem[] = [
  { title: 'Ratgeber-Übersicht', path: '/ratgeber', note: 'Anleitungen zu Gästefotos sammeln, zeigen und archivieren.' },
  { title: 'Gäste um Fotos bitten', path: '/ratgeber/gaeste-um-fotos-bitten', note: 'Formulierungen für Tischkarte, Ansage und Einladung.' },
  { title: 'Hochzeitsfotos sammeln ohne WhatsApp-Gruppe', path: '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp', note: 'Fotos der Gäste in Originalqualität einsammeln, auch nach dem Fest.' },
  { title: 'Datenschutz bei Hochzeitsfotos', path: '/ratgeber/datenschutz-hochzeitsfotos', note: 'Recht am eigenen Bild, Einwilligung, Aufbewahrung (Schweiz).' },
  { title: 'Hochzeitsfotos sichern und archivieren', path: '/ratgeber/hochzeitsfotos-archivieren' },
  { title: 'Braucht man eine Fotobox?', path: '/ratgeber/braucht-man-eine-fotobox', note: 'Entscheidungshilfe, auch gegen das eigene Produkt.' },
  { title: 'Einwegkameras oder digitale Fotowand?', path: '/ratgeber/einwegkameras-oder-digital' },
  { title: 'Beamer oder TV für die Slideshow?', path: '/ratgeber/beamer-oder-tv-slideshow' },
  { title: 'QR-Code-Tischkarten gestalten', path: '/ratgeber/qr-code-tischkarten-gestalten' },
  { title: 'Fotoprogramm der Hochzeit planen', path: '/ratgeber/hochzeit-fotoprogramm-planen' },
  { title: 'Fotos an der Geburtstagsparty sammeln', path: '/ratgeber/geburtstagsparty-fotos-sammeln' },
  { title: 'Fotos an der Taufe diskret sammeln', path: '/ratgeber/taufe-fotos-diskret-sammeln' },
  { title: 'Was Fotos an der Hochzeit kosten', path: '/ratgeber/hochzeitsbudget-fotos' },
]

const REGIONEN: LinkItem[] = [
  { title: 'Zürich', path: '/hochzeit/zuerich' },
  { title: 'Bern', path: '/hochzeit/bern' },
  { title: 'Basel', path: '/hochzeit/basel' },
  { title: 'Luzern', path: '/hochzeit/luzern' },
  { title: 'St. Gallen', path: '/hochzeit/st-gallen' },
  { title: 'Zug', path: '/hochzeit/zug' },
  { title: 'Winterthur', path: '/hochzeit/winterthur' },
  { title: 'Aarau', path: '/hochzeit/aarau' },
]

const WEITERE: LinkItem[] = [
  { title: 'Preise', path: '/preise', note: 'Pakete im Vergleich.' },
  { title: 'Funktionen', path: '/funktionen' },
  { title: 'Live-Slideshow', path: '/live-slideshow' },
  { title: 'Demo-Video', path: '/demo', note: '25 Sekunden, ohne Registrierung.' },
  { title: 'Häufige Fragen', path: '/faq' },
  { title: 'Kontakt', path: '/kontakt' },
  { title: 'Über uns', path: '/ueber-uns' },
]

const INTRO = `# EventShot (eventshot.ch)

> Die Live-Fotowand & Slideshow für private Feiern: Gäste laden Fotos per QR-Code hoch und sehen sie live als elegante Slideshow.

EventShot ist die Live-Fotowand und Foto-Slideshow für persönliche, private Anlässe – allen voran Hochzeiten, Geburtstage, Taufen und Familienfeste. Gäste scannen einen QR-Code, laden ihre Fotos ganz ohne App hoch und sehen sie sofort als elegante Live-Slideshow auf Beamer oder TV. Nach der Feier bleibt eine digitale Galerie als Erinnerung, aus der alle ihre Bilder herunterladen können. EventShot ist DSG-konform, wird in der Schweiz gehostet und löscht Fotos automatisch nach Ablauf der Galerie. Bezahlt wird einmalig pro Event, es gibt kein Abo.`

const EIGENSCHAFTEN = `## Wichtige Eigenschaften

- Gäste brauchen weder App noch Konto: QR-Code scannen, Foto hochladen, fertig.
- Live-Slideshow auf Beamer oder TV; ab Premium mit einstellbarer Anzeigedauer.
- Digitale Galerie nach dem Fest, Download aller Fotos möglich.
- Alle Daten auf eigener Infrastruktur in der Schweiz, DSG-konform, ohne Drittanbieter.
- Automatische Löschung nach Ablauf der Galerie.
- Nur Fotos, keine Videos.`

const SCHWESTER = `## Schwester-Produkt

Für grosse und geschäftliche Anlässe – Grossanlässe, Konferenzen, Messen und Firmenevents mit vielen Gästen – gibt es das Schwesterprodukt [social-wall.ch](https://social-wall.ch) (ebenfalls von EdelByte): Live-Masonry-Fotowand mit Moderation, eigenem Branding und mehreren Screens parallel.`

const ANBIETER = `## Anbieter

- EdelByte Veliji, Zihlackerring 6, 8488 Turbenthal, Schweiz
- Gründer und Entwickler: Endrit Veliji
- UID: CHE-365.373.264
- E-Mail: info@edelbyte.ch
- Telefon: +41 44 500 25 04`

function links(heading: string, items: LinkItem[]) {
  const lines = items.map(
    (item) =>
      `- [${item.title}](${SITE.url}${item.path})${item.note ? ` – ${item.note}` : ''}`,
  )
  return `## ${heading}\n\n${lines.join('\n')}`
}

function regionen() {
  const lines = REGIONEN.map((r) => `- [Hochzeit ${r.title}](${SITE.url}${r.path})`)
  return `## Regionen\n\nDigitale Fotobox für Hochzeiten nach Region, als Alternative zur Mietfotobox (kein physischer Standort, Schweiz-weit digital):\n\n${lines.join('\n')}`
}

/** Paketliste, abgeleitet aus `pricingPlans` – Ueberschrift-Ebene waehlbar. */
function pakete(level: '##' | '###') {
  return pricingPlans
    .map((plan) => {
      const features = plan.features.map((f) => `- ${f}`).join('\n')
      return `${level} ${plan.name}: ${plan.price} ${plan.duration}\n\nGeeignet für: ${plan.description}\n\n${features}`
    })
    .join('\n\n')
}

const PREISE_HINWEIS =
  'Einmalpreis pro Event, kein Abo. Registrierung und Einrichtung sind kostenlos; bezahlt wird erst beim Buchen des Pakets. Der Preis hängt nicht an der Gästezahl.'

function preiseKurz() {
  const lines = pricingPlans.map(
    (plan) =>
      `- ${plan.name}: ${plan.price} – ${photoLimitPhrase(plan.plan)} pro Event, ${plan.features.filter((f) => /Screen|Galerie/.test(f)).join(', ')}`,
  )
  return `## Preise\n\n${PREISE_HINWEIS}\n\n${lines.join('\n')}\n\nDetails: [Preise](${SITE.url}/preise) · maschinenlesbar: [pricing.md](${SITE.url}/pricing.md)`
}

function faq() {
  return `## Häufige Fragen\n\n${FAQ_GROUPS.map(
    (group) =>
      `### ${group.heading}\n\n${group.items
        .map((item) => `**${item.question}**\n${item.answer}`)
        .join('\n\n')}`,
  ).join('\n\n')}`
}

/** Kurzfassung mit Links (llmstxt.org). */
export function llmsTxt() {
  return [
    INTRO,
    preiseKurz(),
    links('Anlass-Seiten', ANLAESSE),
    links('Vergleich & Alternativen', VERGLEICH),
    EIGENSCHAFTEN,
    links('Ratgeber', RATGEBER),
    regionen(),
    links('Weitere Seiten', WEITERE),
    `## Optional\n\n- [Vollständige Fassung mit allen Paketdetails und FAQ](${SITE.url}/llms-full.txt)\n- [Preise als Markdown](${SITE.url}/pricing.md)`,
    SCHWESTER,
    ANBIETER,
  ].join('\n\n')
}

/** Ausfuehrliche Fassung: alles Wesentliche ohne weiteren Seitenabruf. */
export function llmsFullTxt() {
  return [
    INTRO,
    `## So funktioniert es\n\n1. Event anlegen und Paket wählen – dauert wenige Minuten.\n2. QR-Code herunterladen und auf Tischkarten, Aufsteller oder Plakat drucken.\n3. Slideshow im Browser eines Laptops, Tablets oder Smart-TVs öffnen und auf Beamer oder TV zeigen.\n4. Gäste scannen den Code und laden Fotos im Browser hoch; die Bilder erscheinen in Sekunden in der Slideshow.\n5. Nach dem Fest führt derselbe QR-Code in die digitale Galerie zum Ansehen und Herunterladen.`,
    `## Preise\n\n${PREISE_HINWEIS}\n\n${pakete('###')}`,
    EIGENSCHAFTEN,
    faq(),
    links('Anlass-Seiten', ANLAESSE),
    links('Vergleich & Alternativen', VERGLEICH),
    links('Ratgeber', RATGEBER),
    regionen(),
    links('Weitere Seiten', WEITERE),
    SCHWESTER,
    ANBIETER,
  ].join('\n\n')
}

/** Strukturierte Preisdatei fuer KI-Agenten. */
export function pricingMd() {
  return [
    '# Preise – EventShot',
    `${PREISE_HINWEIS} Alle Preise in Schweizer Franken (CHF), inkl. aller Gäste.`,
    pakete('##'),
    `## Immer enthalten\n\n- Foto-Upload per QR-Code, ganz ohne App\n- Beliebig viele Gäste ohne Aufpreis\n- Live-Slideshow auf Beamer oder TV\n- Digitale Galerie über denselben QR-Code\n- DSG-konform, Schweizer Hosting\n- Automatische Löschung nach Galerie-Ablauf`,
    `Mehr: ${SITE.url}/preise · Kontakt: info@edelbyte.ch, +41 44 500 25 04`,
  ].join('\n\n')
}
