/**
 * Produktbilder fuer Anlass-Seiten und Ratgeber.
 *
 * Ausschliesslich echtes Material: Standbilder aus dem Produktvideo
 * (public/eventshot-reel-desktop.mp4) und Zuschnitte der vorhandenen
 * Hero-Bilder. Keine generierten oder erfundenen Fotos. Die Dateien liegen
 * optimiert unter public/images/produkt/; width/height sind die echten
 * Pixelmasse und verhindern Layout-Shift.
 */

export type LandingImage = {
  src: string
  width: number
  height: number
  /** Beschreibt, was zu sehen ist – nicht, wofuer die Seite wirbt. */
  alt: string
}

export const LANDING_IMAGES = {
  'leinwand-festsaal': {
    src: '/images/produkt/leinwand-festsaal.webp',
    width: 1024,
    height: 576,
    alt: 'Live-Slideshow mit einem Gästefoto des Brautpaars auf einer Leinwand im Festsaal, daneben ein Aufsteller mit QR-Code',
  },
  'leinwand-brautpaar': {
    src: '/images/produkt/leinwand-brautpaar.webp',
    width: 1024,
    height: 576,
    alt: 'Gästefoto des Brautpaars auf der Leinwand im abgedunkelten Saal, mit eingeblendetem QR-Code zum Hochladen',
  },
  'qr-code-scannen': {
    src: '/images/produkt/qr-code-scannen.webp',
    width: 1280,
    height: 720,
    alt: 'QR-Code zum Scannen mit dem Hinweis «Keine App. Kein Konto.» aus dem EventShot-Produktvideo',
  },
  'foto-hochladen': {
    src: '/images/produkt/foto-hochladen.webp',
    width: 1280,
    height: 720,
    alt: 'Handy mit der EventShot-Upload-Seite einer Hochzeit: Ein Gästefoto wurde gerade hochgeladen',
  },
  'leinwand-gruppenfoto': {
    src: '/images/produkt/leinwand-gruppenfoto.webp',
    width: 1280,
    height: 720,
    alt: 'Gruppen-Selfie von Freunden live auf der Leinwand, mit QR-Code in der Ecke',
  },
  'leinwand-familie': {
    src: '/images/produkt/leinwand-familie.webp',
    width: 1280,
    height: 720,
    alt: 'Grosseltern mit Täufling im Taufkleid als Gästefoto live auf der Leinwand',
  },
  galerie: {
    src: '/images/produkt/galerie.webp',
    width: 1280,
    height: 720,
    alt: 'Digitale Galerie mit allen Gästefotos im Raster und Knopf «Alle herunterladen»',
  },
} as const satisfies Record<string, LandingImage>

export type LandingImageKey = keyof typeof LANDING_IMAGES
