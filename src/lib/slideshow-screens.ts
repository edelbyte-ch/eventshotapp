import type { PLAN } from '@/generated/prisma/client'

/**
 * Ein Screen zaehlt nur, solange sein Browser sich meldet. Der Beamer pingt
 * alle SCREEN_PING_INTERVAL; nach SESSION_TIMEOUT ohne Ping ist der Platz frei.
 *
 * Vorher frischte der Server lastPing selbst auf, solange er die Verbindung
 * fuer offen hielt. Eine Firmen-Firewall oder ein Proxy haelt die Verbindung
 * aber offen, obwohl beim Kunden nichts ankommt — der Platz blieb dann
 * besetzt, bis der Container neu startete ("Screen bereits aktiv").
 */
export const SESSION_TIMEOUT = 30_000
export const SCREEN_PING_INTERVAL = 10_000

export function screenLimit(plan: PLAN): number {
  return plan === 'ENTERPRISE'
    ? Number.MAX_SAFE_INTEGER
    : plan === 'PREMIUM'
      ? 3
      : 1
}

/** Filter fuer belegte Plaetze eines Events. */
export function activeScreensWhere(eventId: string) {
  return {
    eventId,
    endedAt: null,
    lastPing: { gt: new Date(Date.now() - SESSION_TIMEOUT) },
  }
}

/** "Chrome auf Windows", "Safari auf iPhone" — genug, um den Screen zu erkennen. */
export function describeDevice(ua: string | null | undefined): string {
  if (!ua) return 'Unbekanntes Gerät'
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Windows/.test(ua)
          ? 'Windows'
          : /Mac OS X|Macintosh/.test(ua)
            ? 'Mac'
            : /CrOS/.test(ua)
              ? 'ChromeOS'
              : /Linux/.test(ua)
                ? 'Linux'
                : null
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\//.test(ua)
      ? 'Opera'
      : /Firefox\/|FxiOS/.test(ua)
        ? 'Firefox'
        : /SamsungBrowser/.test(ua)
          ? 'Samsung Internet'
          : /Chrome\/|CriOS/.test(ua)
            ? 'Chrome'
            : /Safari\//.test(ua)
              ? 'Safari'
              : null
  if (browser && os) return `${browser} auf ${os}`
  return browser ?? os ?? 'Unbekanntes Gerät'
}
