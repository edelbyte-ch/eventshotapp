/**
 * Vorschaubilder (og:image / twitter:image) pro indexierbarer Seite.
 *
 * Die Route src/app/og/[...slug]/route.tsx erzeugt aus diesen Eintraegen beim
 * Build je ein statisches 1200×630-PNG unter /og/<pfad>.png. buildMetadata
 * setzt die URL automatisch, sobald der Pfad hier steht – Seiten ohne Eintrag
 * behalten das allgemeine Vorschaubild. Neue indexierbare Seite: hier und in
 * der Sitemap eintragen.
 *
 * `title` ist bewusst kurz gehalten (Bildzeile, keine Meta-Angabe) und darf
 * vom SEO-Titel abweichen; `eyebrow` ist die Kategorie ueber dem Titel.
 */

export type OgPage = { title: string; eyebrow: string }

const ANLASS = 'Anlass'
const RATGEBER = 'Ratgeber'
const VERGLEICH = 'Vergleich'
const RECHTLICHES = 'Rechtliches'

export const OG_PAGES: Record<string, OgPage> = {
  '/': {
    title: 'Live-Fotowand & Slideshow für Hochzeit & Fest',
    eyebrow: 'Gästefotos per QR-Code, ohne App',
  },
  '/agb': { title: 'Allgemeine Geschäftsbedingungen', eyebrow: RECHTLICHES },
  '/anlaesse': { title: 'Live-Fotowand für jede Feier', eyebrow: 'Anlässe' },
  '/datenschutz': { title: 'Datenschutzerklärung', eyebrow: RECHTLICHES },
  '/demo': { title: 'Demo-Video ansehen – ohne Registrierung', eyebrow: 'Demo' },
  '/digitale-fotobox': {
    title: 'Digitale Fotobox – so funktioniert sie',
    eyebrow: 'EventShot erklärt',
  },
  '/digitales-gaestebuch': {
    title: 'Digitales Gästebuch für die Hochzeit',
    eyebrow: ANLASS,
  },
  '/familienfest': {
    title: 'Fotowand fürs Familienfest & Grillfest',
    eyebrow: ANLASS,
  },
  '/faq': { title: 'Häufige Fragen zur Live-Fotowand', eyebrow: 'FAQ' },
  '/firmenanlass': {
    title: 'Fotowand für Team-Event & Firmenessen',
    eyebrow: ANLASS,
  },
  '/fotichaschte-alternative': {
    title: 'Fotichaschte-Alternative für Hochzeit & Fest',
    eyebrow: VERGLEICH,
  },
  '/fotobox-alternative': {
    title: 'Fotobox-Alternative für die Hochzeit',
    eyebrow: VERGLEICH,
  },
  '/fotobox-kosten-schweiz': {
    title: 'Fotobox Kosten Schweiz – Preise im Vergleich',
    eyebrow: VERGLEICH,
  },
  '/fotobox-ohne-app': {
    title: 'Fotos sammeln ohne App – Fotobox per QR-Code',
    eyebrow: 'Ohne App-Download',
  },
  '/funktionen': {
    title: 'Live-Slideshow, QR-Upload und Galerie',
    eyebrow: 'Funktionen',
  },
  '/geburtstag': {
    title: 'Live-Slideshow mit Gästefotos am Geburtstag',
    eyebrow: ANLASS,
  },
  '/hochzeit': {
    title: 'Hochzeits-Fotowand & Slideshow für Gästefotos',
    eyebrow: ANLASS,
  },
  '/impressum': { title: 'Impressum', eyebrow: RECHTLICHES },
  '/jubilaeum': { title: 'Fotowand & Slideshow fürs Jubiläum', eyebrow: ANLASS },
  '/konfirmation': {
    title: 'Fotowand für Konfirmation & Firmung',
    eyebrow: ANLASS,
  },
  '/kontakt': {
    title: 'Kontakt – Support aus der Schweiz',
    eyebrow: 'Kontakt',
  },
  '/live-slideshow': {
    title: 'Live-Slideshow für Beamer & TV am Fest',
    eyebrow: 'Funktion',
  },
  '/polterabend': { title: 'Fotowand für den Polterabend', eyebrow: ANLASS },
  // Ohne Betraege: Preise aendern sich, das Bild wird nur beim Build erzeugt.
  '/preise': {
    title: 'Drei Pakete, ein Einmalpreis pro Event',
    eyebrow: 'Preise',
  },
  '/qr-code-fotos-hochzeit': {
    title: 'Hochzeitsfotos per QR-Code sammeln',
    eyebrow: ANLASS,
  },
  '/qr-code-vorlagen': {
    title: 'QR-Code auf Tischkarte & Schild gestalten',
    eyebrow: 'Vorlagen',
  },
  '/ratgeber': {
    title: 'Gästefotos sammeln & teilen',
    eyebrow: RATGEBER,
  },
  '/taufe': { title: 'Fotowand & Slideshow für die Taufe', eyebrow: ANLASS },
  '/ueber-uns': { title: 'EventShot von EdelByte', eyebrow: 'Über uns' },
  '/hochzeit/aarau': {
    title: 'Fotobox Hochzeit Aarau – digitale Alternative',
    eyebrow: 'Hochzeit in Aarau',
  },
  '/hochzeit/basel': {
    title: 'Fotobox Hochzeit Basel – digitale Alternative',
    eyebrow: 'Hochzeit in Basel',
  },
  '/hochzeit/bern': {
    title: 'Fotobox Hochzeit Bern – digitale Alternative',
    eyebrow: 'Hochzeit in Bern',
  },
  '/hochzeit/luzern': {
    title: 'Fotobox Hochzeit Luzern – digitale Alternative',
    eyebrow: 'Hochzeit in Luzern',
  },
  '/hochzeit/st-gallen': {
    title: 'Fotobox Hochzeit St. Gallen – digitale Variante',
    eyebrow: 'Hochzeit in St. Gallen',
  },
  '/hochzeit/winterthur': {
    title: 'Fotobox Hochzeit Winterthur – digitale Variante',
    eyebrow: 'Hochzeit in Winterthur',
  },
  '/hochzeit/zuerich': {
    title: 'Fotobox Hochzeit Zürich – digitale Alternative',
    eyebrow: 'Hochzeit in Zürich',
  },
  '/hochzeit/zug': {
    title: 'Fotobox Hochzeit Zug – digitale Alternative',
    eyebrow: 'Hochzeit in Zug',
  },
  '/ratgeber/beamer-oder-tv-slideshow': {
    title: 'Beamer oder TV für die Foto-Slideshow?',
    eyebrow: RATGEBER,
  },
  '/ratgeber/braucht-man-eine-fotobox': {
    title: 'Braucht man an der Hochzeit eine Fotobox?',
    eyebrow: RATGEBER,
  },
  '/ratgeber/datenschutz-hochzeitsfotos': {
    title: 'Datenschutz bei Hochzeitsfotos – DSG in Kürze',
    eyebrow: RATGEBER,
  },
  '/ratgeber/einwegkameras-oder-digital': {
    title: 'Einwegkameras an der Hochzeit – oder digital?',
    eyebrow: RATGEBER,
  },
  '/ratgeber/gaeste-um-fotos-bitten': {
    title: 'Gäste um Fotos bitten – Texte und Beispiele',
    eyebrow: RATGEBER,
  },
  '/ratgeber/geburtstagsparty-fotos-sammeln': {
    title: 'Fotos an der Geburtstagsparty sammeln',
    eyebrow: RATGEBER,
  },
  '/ratgeber/hochzeit-fotoprogramm-planen': {
    title: 'Fotoprogramm der Hochzeit planen – Ablauf',
    eyebrow: RATGEBER,
  },
  '/ratgeber/hochzeitsbudget-fotos': {
    title: 'Hochzeitsbudget für Fotos – die Posten',
    eyebrow: RATGEBER,
  },
  '/ratgeber/hochzeitsfotos-archivieren': {
    title: 'Hochzeitsfotos herunterladen und archivieren',
    eyebrow: RATGEBER,
  },
  '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp': {
    title: 'Hochzeitsfotos sammeln ohne WhatsApp-Gruppe',
    eyebrow: RATGEBER,
  },
  '/ratgeber/qr-code-tischkarten-gestalten': {
    title: 'QR-Code-Tischkarten für Gästefotos gestalten',
    eyebrow: RATGEBER,
  },
  '/ratgeber/taufe-fotos-diskret-sammeln': {
    title: 'Fotos an der Taufe sammeln – diskret & sicher',
    eyebrow: RATGEBER,
  },
}

/** Startseite '/' liegt unter /og/start.png, alle anderen unter /og/<pfad>.png. */
export function ogSlug(path: string): string[] {
  return path === '/' ? ['start'] : path.slice(1).split('/')
}

/** Bildpfad (ohne Domain) zu einem Seitenpfad oder null ohne Eintrag. */
export function ogImagePath(path: string): string | null {
  if (!OG_PAGES[path]) return null
  return `/og/${ogSlug(path).join('/')}.png`
}
