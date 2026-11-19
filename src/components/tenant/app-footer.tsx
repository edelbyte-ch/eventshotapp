import Link from 'next/link'

/**
 * Schlanke Fusszeile fuer den Kundenbereich. Vorher hing hier der komplette
 * Marketing-Footer mit rund sechzig Links — auf dem Handy dreimal so lang wie
 * die Einstellungen darueber. /tenant ist noindex, die Links brachten dort
 * also auch der Suche nichts. Was ein Kunde hier braucht: Hilfe und das
 * Rechtliche.
 */
export function AppFooter() {
  return (
    <footer className='border-t border-border/60'>
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8'>
        <p>
          Fragen zu deinem Event?{' '}
          <a
            href='mailto:info@edelbyte.ch'
            className='font-medium text-foreground hover:text-primary'
          >
            info@edelbyte.ch
          </a>{' '}
          ·{' '}
          <a
            href='tel:+41445002504'
            className='font-medium text-foreground hover:text-primary'
          >
            044 500 25 04
          </a>
        </p>
        <nav aria-label='Rechtliches' className='flex gap-4'>
          <Link href='/agb' className='hover:text-foreground'>
            AGB
          </Link>
          <Link href='/datenschutz' className='hover:text-foreground'>
            Datenschutz
          </Link>
          <Link href='/impressum' className='hover:text-foreground'>
            Impressum
          </Link>
        </nav>
      </div>
    </footer>
  )
}
