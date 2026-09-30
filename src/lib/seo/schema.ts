/**
 * Zentrale Quelle fuer strukturierte Daten (JSON-LD).
 *
 * Alle Knoten haengen ueber stabile @id-Referenzen zusammen, damit Google sie
 * als einen Graphen liest. Es werden ausschliesslich belegbare Angaben
 * verwendet – keine erfundenen Bewertungen, Referenzen oder Adressen.
 */

import { PLAN_PRICES } from '@/lib/pricing'

export const SITE = {
  url: 'https://eventshot.ch',
  name: 'EventShot',
  locale: 'de-CH',
  ogImage: 'https://eventshot.ch/og-image-1200x630.png',
} as const

export const ORG_ID = 'https://edelbyte.ch/#organization'
export const WEBSITE_ID = `${SITE.url}/#website`
export const SOFTWARE_ID = `${SITE.url}/#software`
export const SERVICE_ID = `${SITE.url}/#service`

type JsonObject = Record<string, unknown>

/** Anbieter EdelByte – Angaben gemaess Impressum. */
export function organizationNode(): JsonObject {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'EdelByte',
    legalName: 'EdelByte Veliji',
    url: 'https://edelbyte.ch',
    logo: 'https://eventshot.ch/EdelByte_Logo_Light_Rect.png',
    // Schweizer Unternehmens-Identifikationsnummer (UID) aus dem Impressum.
    vatID: 'CHE-365.373.264',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zihlackerring 6',
      postalCode: '8488',
      addressLocality: 'Turbenthal',
      addressRegion: 'ZH',
      addressCountry: 'CH',
    },
    founder: { '@type': 'Person', name: 'Endrit Veliji' },
    sameAs: [
      // Jedes hier gelistete Profil muss auf der Seite auch sichtbar
      // verlinkt sein – der Footer verlinkt das EventShot-Profil.
      'https://www.instagram.com/eventshot.ch/',
      'https://www.instagram.com/edelbyte.ch/',
      'https://www.linkedin.com/company/edelbyte',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+41445002504',
      email: 'info@edelbyte.ch',
      contactType: 'sales',
      areaServed: 'CH',
      availableLanguage: ['de', 'en'],
    },
  }
}

export function websiteNode(): JsonObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
  }
}

export function softwareApplicationNode(): JsonObject {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE.name,
    description:
      'Live-Fotowand & Slideshow für private Feiern wie Hochzeit und Geburtstag: Gäste laden Fotos per QR-Code hoch und sehen sie live als elegante Slideshow. Mit digitaler Galerie als Erinnerung, DSG-konform und Schweizer Hosting.',
    url: SITE.url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    image: SITE.ogImage,
    screenshot: SITE.ogImage,
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.locale,
    // Listenpreise aus der Preisquelle; Aktionen gehoeren nicht ins
    // strukturierte Datum, das Suchmaschinen wochenlang zwischenspeichern.
    offers: [
      { name: 'Basic', price: String(PLAN_PRICES.BASIC / 100) },
      { name: 'Premium', price: String(PLAN_PRICES.PREMIUM / 100) },
      { name: 'Enterprise', price: String(PLAN_PRICES.ENTERPRISE / 100) },
    ].map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: 'CHF',
      url: `${SITE.url}/#pricing`,
      availability: 'https://schema.org/InStock',
    })),
    featureList: [
      'Live-Fotowand & elegante Slideshow',
      'QR-Code-Upload ohne App',
      'Digitale Galerie als Erinnerung',
      'Eigenes Branding',
      'Automatische Löschung',
      'DSG-konform, Schweizer Hosting',
    ],
  }
}

/**
 * Lokales Unternehmen mit echter, im Impressum veroeffentlichter Adresse
 * (Zihlackerring 6, 8488 Turbenthal) und Einzugsgebiet Schweiz.
 * `priceRange` entspricht den tatsaechlichen Paketpreisen.
 */
export function serviceNode(): JsonObject {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: 'Live-Fotowand & Foto-Slideshow für Feiern',
    image: SITE.ogImage,
    url: SITE.url,
    telephone: '+41445002504',
    email: 'info@edelbyte.ch',
    priceRange: `CHF ${PLAN_PRICES.BASIC / 100} - ${PLAN_PRICES.ENTERPRISE / 100}`,
    currenciesAccepted: 'CHF',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zihlackerring 6',
      postalCode: '8488',
      addressLocality: 'Turbenthal',
      addressRegion: 'ZH',
      addressCountry: 'CH',
    },

    serviceType: 'Live-Fotowand und Foto-Slideshow für Hochzeiten und Feiern',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Schweiz' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: SITE.url,
      servicePhone: '+41445002504',
    },
  }
}

export function breadcrumbNode(
  items: { name: string; path: string }[],
): JsonObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http')
        ? item.path
        : `${SITE.url}${item.path}`,
    })),
  }
}

export function faqNode(items: { question: string; answer: string }[]): JsonObject {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function videoNode(input: {
  name: string
  description: string
  contentUrl: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
}): JsonObject {
  return {
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    contentUrl: input.contentUrl,
    thumbnailUrl: [input.thumbnailUrl],
    uploadDate: input.uploadDate,
    duration: input.duration,
    inLanguage: SITE.locale,
    isFamilyFriendly: true,
    publisher: { '@id': ORG_ID },
  }
}

export function articleNode(input: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string
}): JsonObject {
  return {
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: `${SITE.url}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ?? SITE.ogImage,
    inLanguage: SITE.locale,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
}

export function itemListNode(
  items: { name: string; path: string }[],
): JsonObject {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${SITE.url}${item.path}`,
    })),
  }
}

/** Bindet mehrere Knoten zu einem @graph zusammen. */
export function graph(...nodes: (JsonObject | null | undefined)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}
