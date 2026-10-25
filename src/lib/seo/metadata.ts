import type { Metadata } from 'next'
import { ogImagePath } from '@/lib/seo/og-pages'
import { SITE } from '@/lib/seo/schema'

/**
 * Markdown-Fassung einer Seite fuer KI-Agenten. Die Dateien erzeugt
 * scripts/build-markdown.mjs nach `next build` unter public/md/.
 */
export function markdownPath(path: string): string {
  return path === '/' ? '/md/index.md' : `/md${path}.md`
}

/**
 * Einheitliche Metadata fuer alle indexierbaren Seiten.
 *
 * Grund: Next.js merged `openGraph` NICHT tief. Sobald eine Seite ein eigenes
 * `openGraph`-Objekt setzt, ersetzt es das des Layouts vollstaendig – og:image,
 * og:type, og:locale und og:site_name fallen ersatzlos weg. Dieser Helper baut
 * das Objekt deshalb jedes Mal vollstaendig auf.
 *
 * `title` wird ohne Marke uebergeben; das Template im Root-Layout haengt sie an.
 */
export function buildMetadata(input: {
  /** Pfad mit fuehrendem Slash, z. B. '/hochzeit'. */
  path: string
  title: string
  description: string
  /** Abweichender Titel fuer Social-Vorschauen (sonst `title`). */
  ogTitle?: string
  /** Abweichende Beschreibung fuer Social-Vorschauen (sonst `description`). */
  ogDescription?: string
  ogImage?: string
  /** Setzt noindex und entfernt den Canonical (nicht indexierbare Seiten). */
  noindex?: boolean
  /**
   * Uebergeht das Marken-Template des Root-Layouts. Fuer die Startseite,
   * deren Titel die Marke bereits enthaelt – sonst stuende sie doppelt drin.
   */
  absoluteTitle?: boolean
  type?: 'website' | 'article'
}): Metadata {
  const url = `${SITE.url}${input.path}`
  // Eigenes Vorschaubild aus src/lib/seo/og-pages.ts, sonst das allgemeine.
  // Bewusst explizit statt file-based opengraph-image: So stehen og:image und
  // twitter:image sicher auf demselben Bild.
  const pageImage = ogImagePath(input.path)
  const image =
    input.ogImage ?? (pageImage ? `${SITE.url}${pageImage}` : SITE.ogImage)
  const ogTitle = input.ogTitle ?? input.title
  const ogDescription = input.ogDescription ?? input.description

  if (input.noindex) {
    return {
      title: input.title,
      description: input.description,
      alternates: { canonical: null },
      robots: { index: false, follow: false },
    }
  }

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: url,
      types: { 'text/markdown': `${SITE.url}${markdownPath(input.path)}` },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: 'EventShot',
      locale: 'de_CH',
      type: input.type ?? 'website',
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  }
}
