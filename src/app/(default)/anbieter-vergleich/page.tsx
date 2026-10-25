import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/components/landing/article-page'
import { ProductImage } from '@/components/landing/product-image'
import { Button } from '@/components/ui/button'
import { pricingPlans } from '@/lib/constants'
import { LANDING_IMAGES } from '@/lib/landing-images'
import { photoLimitPhrase } from '@/lib/photo-limits'
import { PLANS } from '@/lib/pricing'
import { GALLERY_RETENTION_DAYS } from '@/lib/retention'
import { buildMetadata } from '@/lib/seo/metadata'
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  itemListNode,
  SITE,
} from '@/lib/seo/schema'

/**
 * Ehrlicher Anbieter-Vergleich fuer digitale Fotowaende an Hochzeiten.
 *
 * Faktenbasis: Recherche vom 25.10.2026 auf den offiziellen Websites der
 * Anbieter (Preis-, FAQ-, Impressums- und Datenschutzseiten). Unsichere oder
 * nicht belegte Angaben stehen bewusst als «nicht angegeben» da. Beim
 * Aktualisieren: alle Zeilen neu pruefen, STAND und sitemap.ts nachziehen.
 *
 * Die EventShot-Zeile kommt aus den Preis-, Limit- und Galerie-Quellen des
 * Codes, damit sie nie von /preise abweicht.
 */

const PATH = '/anbieter-vergleich'
const STAND = '2026-10-25'
const TITLE = 'Digitale Fotowand für die Hochzeit: Anbieter im Vergleich'
const NA = 'nicht angegeben'

export const metadata: Metadata = buildMetadata({
  path: PATH,
  title: 'Digitale Fotowand Hochzeit: Anbieter-Vergleich',
  description:
    'Elf Anbieter für Gästefotos per QR-Code im Vergleich: Preise, App, Live-Slideshow, Videos, Speicherdauer und Datenstandort. Mit Quellen.',
  type: 'article',
})

type Quelle = { label: string; url: string }

type Anbieter = {
  name: string
  url: string
  sitz: string
  preis: string
  app: string
  slideshow: string
  videos: string
  speicher: string
  daten: string
  quellen: Quelle[]
}

// --- EventShot aus den Quellen im Code -------------------------------------

const screens = pricingPlans
  .map((plan) =>
    plan.maxSlideshows === Infinity ? 'unbegrenzt' : String(plan.maxSlideshows),
  )
  .join(' / ')

const galerieTage = PLANS.map((plan) => GALLERY_RETENTION_DAYS[plan]).join(' / ')

const eventshotPreis = `einmalig pro Event: ${pricingPlans
  .map((plan) => `${plan.name} ${plan.price} (${photoLimitPhrase(plan.plan)})`)
  .join(' · ')}`

const basic = pricingPlans[0]
const enterprise = pricingPlans[pricingPlans.length - 1]

const ANBIETER: Anbieter[] = [
  {
    name: 'EventShot',
    url: SITE.url,
    sitz: 'Schweiz (Turbenthal ZH)',
    preis: eventshotPreis,
    app: 'nein',
    slideshow: `ja, ${screens} Screens`,
    videos: 'nein, nur Fotos',
    speicher: `${galerieTage} Tage`,
    daten: 'Schweiz, eigene Infrastruktur',
    quellen: [{ label: 'eventshot.ch/preise', url: `${SITE.url}/preise` }],
  },
  {
    name: 'SnapGuest',
    url: 'https://snapguest.ch',
    sitz: NA,
    preis:
      'einmalig: CHF 60 (nur App) · CHF 110 (mit 2 Gästekameras) · CHF 170 (mit 5 Gästekameras)',
    app: 'nein',
    slideshow: NA,
    videos: 'ja',
    speicher: 'mindestens 1 Monat, verlängerbar',
    daten: NA,
    quellen: [{ label: 'snapguest.ch (Pakete und FAQ)', url: 'https://snapguest.ch' }],
  },
  {
    name: 'Kululu',
    url: 'https://www.kululu.com',
    sitz: 'USA',
    preis:
      'einmalig, exkl. Steuern: Free CHF 0 (100 Uploads) · Plus CHF 35 (500) · Pro CHF 89 (unbegrenzt); Aktion «50 % auf alle Pakete» angezeigt',
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja',
    speicher: '7 Tage / 3 Monate / 1 Jahr',
    daten: 'USA (Google Cloud)',
    quellen: [
      { label: 'kululu.com/pricing', url: 'https://www.kululu.com/pricing' },
      { label: 'kululu.com/privacy', url: 'https://www.kululu.com/privacy' },
    ],
  },
  {
    name: 'GUESTPIX',
    url: 'https://guestpix.com',
    sitz: 'Australien',
    preis:
      'einmalig: Free (50 Fotos) · Classic USD 49 · Signature USD 89 · Signature Bundle USD 119',
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja (bezahlte Pakete)',
    speicher: '12 Monate (Bundle: 24)',
    daten: 'Australien, USA, UK, Deutschland, Niederlande',
    quellen: [
      {
        label: 'guestpix.com/weddings-pricing',
        url: 'https://guestpix.com/weddings-pricing/',
      },
      {
        label: 'guestpix.com/privacy-policy',
        url: 'https://guestpix.com/privacy-policy/',
      },
    ],
  },
  {
    name: 'weddies',
    url: 'https://weddies.ch',
    sitz: 'Deutschland',
    preis:
      'Basis gratis (30 Fotos) · Premium EUR 59.99 (12 Monate) · Premium EUR 79.99 (24 Monate)',
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja (Premium)',
    speicher: '1 / 12 / 24 Monate',
    daten: 'Deutschland',
    quellen: [
      { label: 'weddies.ch', url: 'https://weddies.ch' },
      { label: 'weddies.ch/impressum', url: 'https://weddies.ch/impressum' },
    ],
  },
  {
    name: 'FridaySnap',
    url: 'https://friday-snap.ch',
    sitz: 'Deutschland',
    preis: 'einmalig: CHF 59.95 (Aktionspreis, statt CHF 85.99)',
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja',
    speicher: '12 Monate, verlängerbar',
    daten: 'Europa',
    quellen: [
      {
        label: 'friday-snap.ch (Produktseite Hochzeit)',
        url: 'https://friday-snap.ch/produkt/qr-code-hochzeit-fotos/',
      },
      {
        label: 'friday-snap.ch/impressum',
        url: 'https://friday-snap.ch/impressum/',
      },
    ],
  },
  {
    name: 'Glenthea',
    url: 'https://glenthea.com',
    sitz: 'Schweiz (Zürich)',
    preis:
      "einmalig: CHF 85 · 140 · 230 · 450 (50 bis 1'000 Gäste), Komplettpaket mit Einladung, RSVP und Sitzplan",
    app: 'nein',
    slideshow: "ja (200 bis 4'000 Gästefotos je Tarif)",
    videos: NA,
    speicher: '«Online, solange ihr möchtet»',
    daten: 'Bilder EU; Hosting und Datenbank USA/EU',
    quellen: [
      { label: 'glenthea.com/de/pricing', url: 'https://glenthea.com/de/pricing' },
      { label: 'glenthea.com/privacy', url: 'https://glenthea.com/privacy' },
    ],
  },
  {
    name: 'memories.camera',
    url: 'https://memories.camera',
    sitz: 'Deutschland',
    preis: "einmalig: EUR 29 (500 Fotos) · EUR 49 (5'000) · EUR 95 (10'000)",
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja (ab Premium)',
    speicher: '6 / 12 / 12 Monate',
    daten: 'Deutschland; Medien je nach Konfiguration auch ausserhalb des EWR',
    quellen: [
      { label: 'memories.camera', url: 'https://memories.camera' },
      {
        label: 'memories.camera/datenschutz',
        url: 'https://memories.camera/datenschutz',
      },
    ],
  },
  {
    name: 'qrFotos',
    url: 'https://www.qrfotos.de',
    sitz: 'Deutschland',
    preis:
      "einmalig: Test gratis (25 Fotos) · EUR 19.90 (1'000) · EUR 39.90 (5'000) · EUR 59.90 (unbegrenzt)",
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja (ab Plus)',
    speicher: '3 / 6 / 12 / 24 Monate',
    daten: 'Deutschland',
    quellen: [
      { label: 'qrfotos.de/preise', url: 'https://www.qrfotos.de/preise' },
      { label: 'qrfotos.de/datenschutz', url: 'https://www.qrfotos.de/datenschutz' },
    ],
  },
  {
    name: 'everlense',
    url: 'https://www.everlense.de',
    sitz: 'Deutschland',
    preis:
      "einmalig: Free (50 Bilder) · EUR 29 (500) · EUR 69 (5'000) · EUR 139 (10'000)",
    app: 'nein',
    slideshow: 'ja',
    videos: 'ja (ab Premium)',
    speicher: '6 bis 24 Monate',
    daten: 'AWS (Luxemburg), Übermittlung in die USA möglich',
    quellen: [
      { label: 'everlense.de/preise', url: 'https://www.everlense.de/preise' },
      {
        label: 'everlense.de/datenschutz',
        url: 'https://www.everlense.de/datenschutz',
      },
    ],
  },
  {
    name: 'Event Photowall',
    url: 'https://event-photowall.com',
    sitz: 'Deutschland',
    preis: "einmalig: EUR 39 (150 Fotos) · EUR 74 (1'500) · EUR 169 (4'000)",
    app: 'nein',
    slideshow: 'ja',
    videos: 'nur im grössten Paket',
    speicher: '10 / 30 / 60 Tage',
    daten: 'Deutschland',
    quellen: [
      { label: 'event-photowall.com', url: 'https://event-photowall.com/' },
      {
        label: 'event-photowall.com/privacy',
        url: 'https://event-photowall.com/privacy.php',
      },
    ],
  },
]

/** `nurLg`: auf mittleren Bildschirmen ausgeblendet, damit die Tabelle ohne
 * horizontales Scrollen passt (Sitz steht dann unter dem Namen, «App nötig?»
 * ist bei allen «nein» und steht im Einleitungstext). */
const SPALTEN: { key: keyof Anbieter; label: string; nurLg?: boolean }[] = [
  { key: 'sitz', label: 'Sitz', nurLg: true },
  { key: 'preis', label: 'Preis / Modell' },
  { key: 'app', label: 'App nötig?', nurLg: true },
  { key: 'slideshow', label: 'Live-Slideshow' },
  { key: 'videos', label: 'Videos' },
  { key: 'speicher', label: 'Speicherdauer' },
  { key: 'daten', label: 'Datenstandort' },
]

// --- Texte ---------------------------------------------------------------

const KURZANTWORT =
  'Wer Videos sammeln und die Galerie zwölf Monate oder länger behalten will, ist bei GUESTPIX, weddies, FridaySnap, qrFotos oder everlense gut aufgehoben. Gratis testen lässt sich bei Kululu, GUESTPIX, weddies, qrFotos und everlense. Echte Gästekameras gibt es bei SnapGuest. Für Schweizer Hosting, Live-Slideshow auf mehreren Screens und einen Einmalpreis passt EventShot.'

const PASST: { title: string; copy: string }[] = [
  {
    title: 'Du willst auch Videos sammeln',
    copy: 'Kululu, GUESTPIX, FridaySnap und SnapGuest nehmen Videos in allen oder allen bezahlten Paketen an, bei weddies, qrFotos, memories.camera und everlense in den grösseren Paketen, bei Event Photowall nur im grössten. EventShot kann nur Fotos.',
  },
  {
    title: 'Die Fotos sollen lange online bleiben',
    copy: 'Zwölf Monate bieten GUESTPIX, FridaySnap, Kululu Pro und die grösseren Pakete von weddies, qrFotos, memories.camera und everlense. 24 Monate gibt es bei weddies, qrFotos, everlense und im GUESTPIX-Bundle. Glenthea lässt die Galerie laut eigener Angabe online, solange ihr möchtet.',
  },
  {
    title: 'Kleines Budget oder erst einmal testen',
    copy: 'Gratis-Stufen mit wenigen Fotos haben Kululu, GUESTPIX, weddies, qrFotos und everlense. Die günstigsten Bezahlpakete beginnen bei qrFotos mit EUR 19.90, bei memories.camera und everlense mit EUR 29.',
  },
  {
    title: 'Ihr wollt echte Kameras auf den Tischen',
    copy: 'SnapGuest liefert je nach Paket zwei oder fünf physische Gästekameras mit, dazu den Upload per Handy. Physische Kameras nennt sonst keiner der verglichenen Anbieter.',
  },
  {
    title: 'Fotos sollen vor der Anzeige geprüft werden',
    copy: 'Eine Freigabe oder automatische Filter nennen qrFotos (optionaler Moderations-Modus), Kululu Pro, GUESTPIX und Event Photowall. Bei EventShot erscheinen Fotos sofort; du kannst sie aber jederzeit nachträglich löschen.',
  },
  {
    title: 'Einladung, RSVP und Fotowand aus einer Hand',
    copy: 'Glenthea bündelt Einladung, RSVP, Sitzplan, Gästebuch und Live-Fotowand. Auch GUESTPIX und Event Photowall bieten Einladung oder RSVP an. Ein Fotobuch zum Bestellen haben weddies und FridaySnap.',
  },
  {
    title: 'Schweizer Hosting und mehrere Screens',
    copy: `EventShot speichert alle Fotos auf eigener Infrastruktur in der Schweiz und löscht sie nach Ablauf der Galerie automatisch. Die Slideshow läuft je nach Paket auf ${screens} Screens gleichzeitig, bezahlt wird einmalig pro Event in CHF. Unter den verglichenen Anbietern nennt nur EventShot einen Datenstandort in der Schweiz.`,
  },
]

const NICHT_BESTE_WAHL = [
  'Videos: EventShot nimmt nur Fotos an. Wer die Rede oder den Eröffnungstanz als Clip sammeln will, braucht einen anderen Anbieter.',
  `Speicherdauer: Die Galerie bleibt ${galerieTage} Tage online, je nach Paket. Viele andere bieten 12 bis 24 Monate. Bei EventShot lädst du die Fotos rechtzeitig herunter.`,
  `Branding: Eigenes Branding in der Slideshow und das Abschalten des EventShot-Wasserzeichens gibt es erst im ${enterprise.name}-Paket (${enterprise.price}). Kululu bietet Branding ab CHF 35.`,
  `Preis: EventShot hat kein Gratis-Paket und beginnt bei ${basic.price}. qrFotos, memories.camera, everlense, Kululu und Event Photowall sind im Einstieg günstiger.`,
  `Grosse Mengen: Unbegrenzt viele Fotos gibt es bei EventShot erst mit ${enterprise.name}. Kululu Pro und qrFotos Premium bieten unbegrenzte Uploads inklusive Videos günstiger.`,
  'Freigabe: Eine Moderation vor der Anzeige gibt es bei EventShot nicht. Fotos erscheinen sofort, du kannst sie nachträglich löschen.',
]

const WORAUF_ACHTEN = [
  'Währung und Steuern: Viele Preise stehen in EUR oder USD, bei Kululu exklusive Steuern. Rechne für den Vergleich in CHF um.',
  'Aktionen: Zum Stichtag zeigten Kululu und FridaySnap Rabatte. Prüfe den Preis direkt vor der Buchung.',
  'Speicherdauer: Manche zählen ab dem Fest, andere ab der ersten Nutzung. Plane den Download der Galerie fest ein.',
  'Datenstandort: Er steht meist in der Datenschutzerklärung, nicht auf der Preisseite. Für Fotos von Gästen und Kindern lohnt sich der Blick.',
]

const FAQ = [
  {
    question: 'Welche App eignet sich, um die Hochzeitsfotos der Gäste zu sammeln?',
    answer:
      'Eine App brauchen die Gäste bei keinem der verglichenen Anbieter. Alle arbeiten mit einem QR-Code, der Upload läuft im Browser des Handys. Entscheidend sind andere Punkte: ob Videos möglich sind, wie lange die Galerie online bleibt, ob es eine Live-Slideshow gibt und wo die Fotos gespeichert werden.',
  },
  {
    question: 'Was kostet eine digitale Fotowand für die Hochzeit?',
    answer: `Bezahlpakete beginnen bei rund EUR 20 (qrFotos Lite) und reichen bis CHF 450 für ein Komplettpaket mit Einladung und RSVP (Glenthea). Mehrere Anbieter haben Gratis-Stufen mit 25 bis 100 Fotos. EventShot kostet einmalig ${pricingPlans.map((plan) => plan.price).join(', ')} pro Event, je nach Paket.`,
  },
  {
    question: 'Welcher Anbieter speichert die Fotos in der Schweiz?',
    answer:
      'Unter den verglichenen Anbietern nennt nur EventShot einen Datenstandort in der Schweiz, auf eigener Infrastruktur. Glenthea hat den Sitz in Zürich, nutzt für Bilder, Hosting und Datenbank aber Dienstleister in der EU und den USA. Die übrigen speichern laut eigenen Angaben in Deutschland, der EU, den USA oder Australien; bei SnapGuest ist der Standort nicht angegeben.',
  },
  {
    question: 'Kann ich mit EventShot auch Videos sammeln?',
    answer:
      'Nein. EventShot nimmt nur Fotos an. Wenn dir Videos wichtig sind, schau dir Kululu, GUESTPIX, FridaySnap, weddies, qrFotos, memories.camera oder everlense an.',
  },
  {
    question: 'Können Gäste nach dem Fest noch Fotos hochladen?',
    answer: `Bei EventShot ja: Uploads bleiben offen, solange die Galerie läuft, also ${galerieTage} Tage je nach Paket. Danach werden alle Fotos automatisch gelöscht. Bei anderen Anbietern ist das Upload-Fenster teils separat geregelt, bei Kululu etwa 24 Stunden bis 3 Monate.`,
  },
  {
    question: 'Kann ich Fotos vor der Anzeige auf der Leinwand freigeben?',
    answer:
      'Bei EventShot nicht: Fotos erscheinen sofort in der Slideshow, du kannst sie aber jederzeit löschen. Eine Freigabe oder automatische Filter nennen qrFotos, Kululu Pro, GUESTPIX und Event Photowall.',
  },
]

const RELATED = [
  { title: 'Mietfotobox oder digitale Fotowand?', href: '/fotobox-alternative' },
  { title: 'Fotos sammeln ohne App', href: '/fotobox-ohne-app' },
  { title: 'Was eine digitale Fotobox ist', href: '/digitale-fotobox' },
  { title: 'Preise von EventShot', href: '/preise' },
]

// --- Seite ---------------------------------------------------------------

const IMAGE = 'leinwand-brautpaar' as const

function QuellenLinks({ index }: { index: number }) {
  return (
    <sup className='ml-0.5'>
      <a
        href={`#quelle-${index + 1}`}
        className='text-primary hover:underline'
        aria-label={`Quelle ${index + 1}`}
      >
        [{index + 1}]
      </a>
    </sup>
  )
}

export default function AnbieterVergleichPage() {
  const jsonLd = graph(
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Anlässe', path: '/anlaesse' },
      { name: 'Anbieter-Vergleich', path: PATH },
    ]),
    articleNode({
      headline: TITLE,
      description: KURZANTWORT,
      path: PATH,
      datePublished: STAND,
      dateModified: STAND,
      image: `${SITE.url}${LANDING_IMAGES[IMAGE].src}`,
    }),
    faqNode(FAQ),
    {
      ...itemListNode(ANBIETER.map((a) => ({ name: a.name, path: a.url }))),
      name: 'Anbieter für digitale Fotowände an Hochzeiten',
    },
  )

  return (
    <div className='container max-w-6xl py-16'>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label='Brotkrumen' className='mb-6 text-sm text-muted-foreground'>
        <Link href='/' className='hover:text-primary transition-colors'>
          Start
        </Link>
        <span className='mx-2'>/</span>
        <Link href='/anlaesse' className='hover:text-primary transition-colors'>
          Anlässe
        </Link>
      </nav>

      <article>
        <header className='max-w-3xl space-y-4'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            Vergleich
          </p>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {TITLE}
          </h1>
          <p className='text-lg text-muted-foreground'>{KURZANTWORT}</p>
          <p className='text-sm text-muted-foreground'>
            Von{' '}
            <Link
              href='/ueber-uns'
              rel='author'
              className='font-medium text-foreground hover:text-primary transition-colors'
            >
              Endrit Veliji
            </Link>
            , Gründer von EventShot · Aktualisiert am{' '}
            <time dateTime={STAND}>{formatDate(STAND)}</time>
          </p>
          <p className='text-sm text-muted-foreground'>
            In eigener Sache: EventShot ist unser Produkt. Deshalb steht hier
            auch, wo andere Anbieter besser passen.
          </p>
        </header>

        <ProductImage
          image={IMAGE}
          sizes='(min-width: 768px) 720px, 100vw'
          className='mt-10 max-w-3xl'
        />

        {/* Vergleichstabelle */}
        <section className='mt-16 space-y-4' aria-labelledby='tabelle'>
          <h2 id='tabelle' className='text-2xl font-bold'>
            Die Anbieter im Überblick
          </h2>
          <p className='max-w-3xl text-muted-foreground'>
            Elf Dienste, bei denen Gäste Fotos per QR-Code hochladen. Alle
            rechnen einmalig pro Anlass ab, keiner mit Abo. Bei mehreren
            Paketen stehen die Werte in der Reihenfolge der Pakete. Eine App
            müssen die Gäste bei keinem der Anbieter installieren.
          </p>
          {/* Eine Datenquelle, zwei Darstellungen: Karten bis md, ab md eine
              echte Tabelle ohne horizontales Scrollen. Die Karten tragen
              data-md-skip, damit die Markdown-Fassung die Angaben nur einmal
              (als Tabelle) enthaelt. */}
          <ul data-md-skip className='grid gap-4 md:hidden'>
            {ANBIETER.map((anbieter, index) => (
              <li
                key={anbieter.name}
                className={`rounded-2xl border bg-card p-5 ${
                  index === 0 ? 'border-primary shadow-lg' : 'border-border shadow-sm'
                }`}
              >
                <h3 className='text-lg font-bold'>
                  {anbieter.name}
                  <QuellenLinks index={index} />
                </h3>
                <dl className='mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm'>
                  {SPALTEN.map((spalte) => {
                    const wert = anbieter[spalte.key] as string
                    return [
                      <dt key={`${spalte.key}-dt`} className='font-medium'>
                        {spalte.label}
                      </dt>,
                      <dd
                        key={`${spalte.key}-dd`}
                        className={
                          wert === NA
                            ? 'italic text-muted-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {wert}
                      </dd>,
                    ]
                  })}
                </dl>
              </li>
            ))}
          </ul>

          <div className='hidden rounded-2xl border border-border md:block'>
            <table className='w-full border-collapse text-left text-[13px] hyphens-auto lg:text-sm lg:hyphens-manual'>
              <caption className='sr-only'>
                Anbieter für digitale Fotowände an Hochzeiten im Vergleich,
                Stand {formatDate(STAND)}
              </caption>
              <thead className='bg-muted/50'>
                <tr>
                  <th scope='col' className='rounded-tl-2xl px-2 py-3 font-semibold lg:px-3'>
                    Anbieter
                  </th>
                  {SPALTEN.map((spalte) => (
                    <th
                      key={spalte.key}
                      scope='col'
                      className={`px-2 py-3 font-semibold last:rounded-tr-2xl lg:px-3 ${
                        spalte.nurLg ? 'hidden lg:table-cell' : ''
                      }`}
                    >
                      {spalte.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ANBIETER.map((anbieter, index) => (
                  <tr
                    key={anbieter.name}
                    className={
                      index === 0
                        ? 'border-t border-border bg-primary/5'
                        : 'border-t border-border'
                    }
                  >
                    <th scope='row' className='px-2 py-3 align-top font-semibold lg:px-3'>
                      {anbieter.name}
                      <QuellenLinks index={index} />
                      {/* Auf md ohne Sitz-Spalte: Sitz unter dem Namen. */}
                      <span className='mt-1 block text-xs font-normal text-muted-foreground lg:hidden'>
                        Sitz: {anbieter.sitz}
                      </span>
                    </th>
                    {SPALTEN.map((spalte) => {
                      const wert = anbieter[spalte.key] as string
                      return (
                        <td
                          key={spalte.key}
                          className={`px-2 py-3 align-top text-muted-foreground lg:px-3 ${
                            wert === NA ? 'italic' : ''
                          } ${spalte.nurLg ? 'hidden lg:table-cell' : ''}`}
                        >
                          {wert}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-xs text-muted-foreground'>
            Stand: {formatDate(STAND)}, Angaben laut Websites der Anbieter, ohne
            Gewähr. Preise wie am Stichtag angezeigt, teils mit Rabattaktion.
            «nicht angegeben» heisst: auf den geprüften Seiten nicht gefunden.
            Quellen in eckigen Klammern, Liste am Seitenende.
          </p>
        </section>

        <div className='mt-16 max-w-3xl space-y-16'>
          <section className='space-y-6'>
            <h2 className='text-2xl font-bold'>Wann welcher Anbieter passt</h2>
            <div className='grid gap-4'>
              {PASST.map((item) => (
                <div
                  key={item.title}
                  className='rounded-2xl border border-border bg-card p-6'
                >
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p className='mt-1 text-muted-foreground'>{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-bold'>
              Wo EventShot nicht die beste Wahl ist
            </h2>
            <ul className='space-y-2 pl-5'>
              {NICHT_BESTE_WAHL.map((item) => (
                <li key={item} className='list-disc text-muted-foreground'>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-bold'>
              Worauf du beim Vergleich achten solltest
            </h2>
            <ul className='space-y-2 pl-5'>
              {WORAUF_ACHTEN.map((item) => (
                <li key={item} className='list-disc text-muted-foreground'>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-bold'>Häufige Fragen</h2>
            <div className='space-y-3'>
              {FAQ.map((item) => (
                <details
                  key={item.question}
                  className='group rounded-lg border border-border shadow-sm'
                >
                  <summary className='flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden'>
                    {item.question}
                    <span className='shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'>
                      +
                    </span>
                  </summary>
                  <p className='px-6 pb-4 text-muted-foreground'>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>Quellen</h2>
            <p className='text-sm text-muted-foreground'>
              Alle Seiten abgerufen am {formatDate(STAND)}.
            </p>
            <ol className='space-y-2 pl-5 text-sm'>
              {ANBIETER.map((anbieter, index) => (
                <li
                  key={anbieter.name}
                  id={`quelle-${index + 1}`}
                  className='list-decimal scroll-mt-24 text-muted-foreground'
                >
                  <span className='font-medium text-foreground'>
                    {anbieter.name}:
                  </span>{' '}
                  {anbieter.quellen.map((quelle, i) => (
                    <span key={quelle.url}>
                      {i > 0 && ' · '}
                      <a
                        href={quelle.url}
                        target='_blank'
                        rel='noopener noreferrer nofollow'
                        className='text-primary underline underline-offset-4 hover:no-underline'
                      >
                        {quelle.label}
                      </a>
                    </span>
                  ))}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className='text-xl font-bold'>Weiterlesen</h2>
            <ul className='mt-4 space-y-2'>
              {RELATED.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='text-primary underline underline-offset-4 hover:no-underline'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <section className='mt-16 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center'>
        <h2 className='text-2xl font-bold mb-3'>
          Passt EventShot zu eurem Fest?
        </h2>
        <p className='text-muted-foreground mb-6'>
          Die Registrierung ist kostenlos. Du richtest das Event selbst ein und
          zahlst erst, wenn du ein Paket buchst.
        </p>
        <Button size='lg' asChild>
          <Link href='/register'>
            Event starten
            <ArrowRight className='ml-2 size-4' />
          </Link>
        </Button>
      </section>
    </div>
  )
}
