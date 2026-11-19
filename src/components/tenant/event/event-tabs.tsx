'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Reiter innerhalb eines Events — wie bei Social Wall als eigene Adressen.
 * Vorher waren es Tabs auf einer einzigen Seite: ein Neuladen fuehrte immer
 * zurueck zu "Fotos", und einen Link direkt auf die Einstellungen gab es nicht.
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
      className='-mx-5 overflow-x-auto border-b border-border px-5 sm:mx-0 sm:px-0'
    >
      <ul className='flex min-w-max gap-1'>
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-11 items-center px-2 text-sm transition-colors sm:px-3 ${
                  active
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {active && (
                  <span
                    className='absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary'
                    aria-hidden='true'
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
