import {
  graph,
  serviceNode,
  softwareApplicationNode,
} from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { Application } from '@/components/landing/application'
import { CTA } from '@/components/landing/cta'
import { FAQ } from '@/components/landing/faq'
import { Features } from '@/components/landing/features'
import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { PromoSection } from '@/components/promotion/promo-section'
import { Video } from '@/components/landing/video'

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'EventShot – Live-Fotowand & Slideshow für Hochzeit & Fest',
  absoluteTitle: true,
  description:
    'Die Live-Fotowand & Slideshow für Hochzeit, Geburtstag und private Feiern: Gäste laden Fotos per QR-Code hoch – ohne App – und sehen sie live. Mit digitaler Galerie.',
})

export default async function HomePage() {
  return (
    <div>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(softwareApplicationNode(), serviceNode()),
          ),
        }}
      />

      <Hero />
      <PromoSection />
      <Features />
      <HowItWorks />
      <Video />
      <Pricing />
      <Application />
      <FAQ />
      <CTA />
    </div>
  )
}
