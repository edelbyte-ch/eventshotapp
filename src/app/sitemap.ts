import type { MetadataRoute } from 'next'

const BASE_URL = 'https://eventshot.ch'

/**
 * Feste Datumskonstanten statt `new Date()`.
 *
 * Unter `cacheComponents` macht ein Aufruf von `new Date()` die Route dynamisch,
 * sodass /sitemap.xml nicht mehr prerendert wird. Und ein `lastmod`, das sich bei
 * jedem Abruf aendert, wird von Google als Signal entwertet. Beim Ueberarbeiten
 * einer Seite hier das Datum nachziehen.
 */
const CONTENT_UPDATED = new Date('2026-08-19')
const LEGAL_UPDATED = new Date('2026-06-29')
/** Startseite und /demo: Demo-Event mit 20 Gratis-Fotos ergaenzt. */
const DEMO_UPDATED = new Date('2026-09-02')
/**
 * Anlass-, Staedte-, Vergleichsseiten und Ratgeber: echtes Produktbild ergaenzt.
 * Loest die frueheren Staende ab (Staedteseiten 2026-10-13, KI-Antwort-Seiten
 * 2026-10-24).
 */
const IMAGES_UPDATED = new Date('2026-10-25')
/** Anbieter-Vergleich neu; /anlaesse und /ratgeber verlinken darauf. */
const COMPARISON_UPDATED = new Date('2026-10-25')

type Entry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  lastModified: Date
}

const ENTRIES: Entry[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: DEMO_UPDATED },
  { path: '/agb', priority: 0.3, changeFrequency: 'yearly', lastModified: LEGAL_UPDATED },
  { path: '/anbieter-vergleich', priority: 0.8, changeFrequency: 'monthly', lastModified: COMPARISON_UPDATED },
  { path: '/anlaesse', priority: 0.9, changeFrequency: 'monthly', lastModified: COMPARISON_UPDATED },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly', lastModified: LEGAL_UPDATED },
  { path: '/demo', priority: 0.7, changeFrequency: 'monthly', lastModified: DEMO_UPDATED },
  { path: '/digitale-fotobox', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/digitales-gaestebuch', priority: 0.8, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/familienfest', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/firmenanlass', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/fotichaschte-alternative', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/fotobox-alternative', priority: 0.9, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/fotobox-kosten-schweiz', priority: 0.8, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/fotobox-ohne-app', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/funktionen', priority: 0.8, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/geburtstag', priority: 0.8, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit', priority: 0.9, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/impressum', priority: 0.2, changeFrequency: 'yearly', lastModified: LEGAL_UPDATED },
  { path: '/jubilaeum', priority: 0.8, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/konfirmation', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/kontakt', priority: 0.6, changeFrequency: 'yearly', lastModified: CONTENT_UPDATED },
  { path: '/live-slideshow', priority: 0.8, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/polterabend', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/preise', priority: 0.9, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/qr-code-fotos-hochzeit', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/qr-code-vorlagen', priority: 0.7, changeFrequency: 'monthly', lastModified: CONTENT_UPDATED },
  { path: '/ratgeber', priority: 0.8, changeFrequency: 'weekly', lastModified: COMPARISON_UPDATED },
  { path: '/taufe', priority: 0.8, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ueber-uns', priority: 0.6, changeFrequency: 'yearly', lastModified: CONTENT_UPDATED },
  { path: '/hochzeit/aarau', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/basel', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/bern', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/luzern', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/st-gallen', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/winterthur', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/zuerich', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/hochzeit/zug', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/beamer-oder-tv-slideshow', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/braucht-man-eine-fotobox', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/datenschutz-hochzeitsfotos', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/einwegkameras-oder-digital', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/gaeste-um-fotos-bitten', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/geburtstagsparty-fotos-sammeln', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/hochzeit-fotoprogramm-planen', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/hochzeitsbudget-fotos', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/hochzeitsfotos-archivieren', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/qr-code-tischkarten-gestalten', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
  { path: '/ratgeber/taufe-fotos-diskret-sammeln', priority: 0.7, changeFrequency: 'monthly', lastModified: IMAGES_UPDATED },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map((entry) => ({
    url: `${BASE_URL}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
