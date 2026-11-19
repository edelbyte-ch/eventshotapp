import type { Metadata } from 'next'

// Nicht-oeffentlicher bzw. ephemerer Bereich: gehoert nicht in den Suchindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

import { AppFooter } from '@/components/tenant/app-footer'
import Header from '@/components/tenant/header'
import { Suspense, type ReactNode } from 'react'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-1 flex flex-col">{children}</main>
      <AppFooter />
    </div>
  )
}
