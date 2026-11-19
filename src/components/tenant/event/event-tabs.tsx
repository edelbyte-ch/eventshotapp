'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Reiter innerhalb eines Events — wie bei Social Wall als eigene Adressen.
 * Vorher waren es Tabs auf einer einzigen Seite: ein Neuladen fuehrte immer
 * zurueck zu "Fotos", und einen Link direkt auf die Einstellungen gab es nicht.
 *
 * Die Unterstreichung liegt innerhalb der Leiste (bottom-0) und die Leiste
 * scrollt nur waagrecht: ragte sie 1 px heraus, zeigte Windows bei 125 %
 * Skalierung rechts einen senkrechten Scrollbalken mit Pfeilen.
 */
export function EventTabs({ eventId }: { eventId: string }) {
  const pathname = usePathname()
  const base = `/tenant/event/${eventId}`

  const tabs = [
    { href: base, label: 'Übersicht' },
    { href: `${base}/fotos`, label: 'Fotos' },
    { href: `${base}/hochladen`, label: 'Hochladen' },
    { href: `${base}/einstellungen`, label: 'Einstellungen' },
  ]

  return (
    <nav
      aria-label='Event-Bereiche'
      className='-mx-5 border-b border-border sm:mx-0'
    >
      <ul className='flex gap-1 overflow-x-auto overflow-y-hidden px-3 [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden'>
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <li key={tab.href} className='shrink-0'>
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-11 items-center whitespace-nowrap px-2 text-sm outline-none transition-colors focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/70 sm:px-3 ${
                  active
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                <span
                  className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full transition-colors sm:inset-x-3 ${
                    active ? 'bg-primary' : 'bg-transparent'
                  }`}
                  aria-hidden='true'
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
