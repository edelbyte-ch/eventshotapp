import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Markdown-Fassung einer Seite fuer KI-Agenten (`Accept: text/markdown`).
 *
 * Die Dateien erzeugt scripts/build-markdown.mjs beim Build unter public/md/.
 * Direkt lesen statt umschreiben: So stehen Content-Type und `Vary: Accept`
 * sicher in der Antwort. Fehlt eine Datei, geht die Anfrage normal als HTML
 * weiter.
 */
async function markdownResponse(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/index'
  // Nur einfache Seitenpfade – schliesst «..» und Sonderzeichen aus.
  if (!/^(\/[a-z0-9-]+)+$/.test(path)) return null

  try {
    const markdown = await readFile(
      join(process.cwd(), 'public/md', `${path}.md`),
      'utf8',
    )
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'public, max-age=3600',
        // Doppelter Inhalt zur HTML-Seite – nicht separat indexieren.
        'X-Robots-Tag': 'noindex',
      },
    })
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bestehende Auth-Pruefung fuer den Tenant-Bereich, unveraendert.
  if (pathname.startsWith('/tenant')) {
    const sessionCookie = getSessionCookie(request, {
      cookiePrefix: 'eventshot',
    })

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }

  const accept = request.headers.get('accept') ?? ''
  if (request.method === 'GET' && accept.includes('text/markdown')) {
    const response = await markdownResponse(pathname)
    if (response) return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/tenant/:path*',
    // Seitenrouten nur bei Markdown-Anfragen; _next, api, og und Dateien
    // mit Endung (statische Assets) laufen nie durch den Proxy.
    {
      source: '/((?!_next|api|og|tenant|.*\\..*).*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
    },
  ],
}
