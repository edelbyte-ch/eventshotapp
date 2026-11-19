import type { ReactNode } from 'react'

/**
 * Einheitliche Flaeche der Event-Seiten. Eine leise Ueberschrift statt einer
 * Kopfleiste pro Karte — sieben Kopfleisten untereinander sind mehr Rahmen
 * als Inhalt.
 */
export function Panel({
  title,
  icon,
  hint,
  action,
  children,
}: {
  title: string
  icon?: ReactNode
  hint?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className='rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-6'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <div className='space-y-1'>
          <h2 className='flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            {icon}
            {title}
          </h2>
          {hint && <p className='text-xs text-muted-foreground'>{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
