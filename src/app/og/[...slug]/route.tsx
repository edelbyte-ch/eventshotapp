import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { OG_PAGES, ogSlug } from '@/lib/seo/og-pages'

/**
 * Vorschaubild pro Seite unter /og/<pfad>.png (Startseite: /og/start.png).
 *
 * Alle Pfade aus OG_PAGES werden ueber generateStaticParams beim Build als
 * PNG prerendert – zur Laufzeit wird nichts gerendert. Unbekannte Pfade
 * liefern 404 (dynamicParams ist unter cacheComponents nicht erlaubt).
 *
 * Schriften auf Modulebene lesen: Asynchrones Dateisystem im Handler selbst
 * wuerde das Prerendering abbrechen. Poppins ist die Schrift der Website und
 * enthaelt die Umlaute.
 */
const fontDir = join(process.cwd(), 'src/assets/fonts')
const poppinsBold = await readFile(join(fontDir, 'Poppins-Bold.ttf'))
const poppinsMedium = await readFile(join(fontDir, 'Poppins-Medium.ttf'))

// Farben aus globals.css (--primary, Dunkelflaeche wie im Hero).
const PRIMARY = '#ff6900'
const BACKGROUND = '#0b0b0b'

/** Pfad aus den Segmenten zuruecklesen: ['hochzeit', 'basel.png'] → '/hochzeit/basel'. */
function pathFromSlug(slug: string[]): string | null {
  const last = slug.at(-1)
  if (!last?.endsWith('.png')) return null
  const parts = [...slug.slice(0, -1), last.slice(0, -'.png'.length)]
  return parts.length === 1 && parts[0] === 'start' ? '/' : `/${parts.join('/')}`
}

export function generateStaticParams() {
  return Object.keys(OG_PAGES).map((path) => {
    const slug = ogSlug(path)
    return { slug: [...slug.slice(0, -1), `${slug.at(-1)}.png`] }
  })
}

/** Lange Titel kleiner setzen, damit sie in hoechstens drei Zeilen passen. */
function titleSize(title: string) {
  if (title.length <= 28) return 76
  if (title.length <= 40) return 68
  return 60
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params
  const path = pathFromSlug(slug)
  const page = path ? OG_PAGES[path] : undefined
  if (!page) return new Response('Not Found', { status: 404 })

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px',
        backgroundColor: BACKGROUND,
        backgroundImage:
          'radial-gradient(circle at 88% 12%, rgba(255,105,0,0.32), rgba(11,11,11,0) 55%)',
        color: '#ffffff',
        fontFamily: 'Poppins',
      }}
    >
      {/* Marke wie im Header: Kamera-Symbol in Primaerfarbe + Schriftzug */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg
          width='52'
          height='52'
          viewBox='0 0 24 24'
          fill='none'
          stroke={PRIMARY}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          role='img'
          aria-label='EventShot'
        >
          <path d='M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z' />
          <circle cx='12' cy='13' r='3' />
        </svg>
        <span style={{ fontSize: 40, fontWeight: 700 }}>EventShot</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: PRIMARY,
            textTransform: 'uppercase',
            letterSpacing: 5,
          }}
        >
          {page.eyebrow}
        </span>
        <span
          style={{
            fontSize: titleSize(page.title),
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {page.title}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 24,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <span>Ohne App · DSG-konform · Schweizer Hosting</span>
        <span style={{ color: '#ffffff' }}>eventshot.ch</span>
      </div>
      {/* Akzentlinie unten in Primaerfarbe */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: 10,
          backgroundColor: PRIMARY,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Poppins', data: poppinsBold, weight: 700, style: 'normal' },
        { name: 'Poppins', data: poppinsMedium, weight: 500, style: 'normal' },
      ],
    },
  )
}
