/**
 * Markdown-Fassung jeder Sitemap-Seite fuer KI-Agenten.
 *
 * Laeuft nach `next build` (package.json "build"). Liest die prerenderte
 * Sitemap und das HTML jeder Seite aus .next/server/app, nimmt nur den
 * Seiteninhalt aus <main> (ohne Header, Navigation, Footer, Skripte) und legt
 * das Ergebnis unter public/md/<pfad>.md ab (Startseite: public/md/index.md).
 *
 * Bewusst zur Build-Zeit statt per Selbst-Fetch zur Laufzeit: Im Container
 * bindet Next an den Hostnamen, Anfragen an 127.0.0.1 werden abgelehnt.
 * src/proxy.ts liefert die Dateien bei `Accept: text/markdown` aus.
 */

import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { NodeHtmlMarkdown } from 'node-html-markdown'

const SITE_URL = 'https://eventshot.ch'
const APP_DIR = join(process.cwd(), '.next/server/app')
const OUT_DIR = join(process.cwd(), 'public/md')

/** Seitenpfade aus der prerenderten Sitemap: '' fuer die Startseite. */
async function sitemapPaths() {
  const xml = await readFile(join(APP_DIR, 'sitemap.xml.body'), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE_URL, '').replace(/\/$/, ''),
  )
}

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function metaContent(html, name) {
  const match = html.match(
    new RegExp(`<meta name="${name}" content="([^"]*)"`, 'i'),
  )
  return match ? decodeEntities(match[1]) : ''
}

/** YAML-String in doppelten Anfuehrungszeichen. */
function yamlString(value) {
  return JSON.stringify(value)
}

const nhm = new NodeHtmlMarkdown({
  // Navigation und Technik – kein Inhalt fuer Agenten. <header> bleibt, weil
  // Ratgeber ihren Titel darin tragen; der Seitenkopf wird vorher entfernt.
  ignore: ['nav', 'footer', 'script', 'style', 'noscript', 'svg', 'template'],
  keepDataImages: false,
  useLinkReferenceDefinitions: false,
})

function toMarkdown(mainHtml) {
  const html = mainHtml
    // Fixierter Seitenkopf mit Logo und Menue (siehe landing/header.tsx).
    .replace(/<header class="fixed[\s\S]*?<\/header>/, '')
    // FAQ-Aufklapper: Frage als Zwischentitel, ohne das «+»-Symbol.
    .replace(
      /<summary[^>]*>([\s\S]*?)<span[^>]*>\+<\/span>\s*<\/summary>/g,
      '<h3>$1</h3>',
    )
    // Nebeneinanderliegende Buttons nicht zu einem Link-Wurm verschmelzen.
    .replace(/<\/a><a /g, '</a> · <a ')
  let md = nhm.translate(html)
  // next/image-URLs auf das Originalbild zurueckfuehren.
  md = md.replace(
    /\/_next\/image\?url=([^&)\s]+)[^)\s]*/g,
    (_, url) => decodeURIComponent(url),
  )
  // Dekorative Bilder ohne Alt-Text tragen keine Information.
  md = md.replace(/!\[\]\([^)]*\)/g, '')
  // Relative Links und Bilder absolut machen, damit sie ausserhalb der Seite funktionieren.
  md = md.replace(/\]\(\//g, `](${SITE_URL}/`)
  return `${md.replace(/\n{3,}/g, '\n\n').trim()}\n`
}

async function main() {
  const paths = await sitemapPaths()
  await rm(OUT_DIR, { recursive: true, force: true })

  const missing = []
  for (const path of paths) {
    const htmlFile = join(APP_DIR, `${path || '/index'}.html`)
    if (!existsSync(htmlFile)) {
      missing.push(path || '/')
      continue
    }
    const html = await readFile(htmlFile, 'utf8')
    const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)
    if (!main) {
      missing.push(path || '/')
      continue
    }

    const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
    const frontMatter = [
      '---',
      `title: ${yamlString(title)}`,
      `description: ${yamlString(metaContent(html, 'description'))}`,
      `url: ${SITE_URL}${path || '/'}`,
      '---',
      '',
    ].join('\n')

    const outFile = join(OUT_DIR, `${path || '/index'}.md`)
    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, `${frontMatter}\n${toMarkdown(main[1])}`)
  }

  console.log(
    `[build-markdown] ${paths.length - missing.length}/${paths.length} Seiten nach public/md geschrieben`,
  )
  if (missing.length > 0) {
    // Kein Abbruch: Fehlt eine Datei, liefert der Proxy einfach HTML aus.
    console.warn(`[build-markdown] Kein prerendertes HTML fuer: ${missing.join(', ')}`)
  }
}

await main()
