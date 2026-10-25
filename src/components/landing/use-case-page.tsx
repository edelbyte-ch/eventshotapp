import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/landing/product-image'
import { ScrollReveal } from '@/components/ui/motion'
import type { LandingImageKey } from '@/lib/landing-images'

export type UseCaseFaq = { question: string; answer: string }

export type UseCaseContent = {
  eyebrow: string
  title: string
  intro: string
  ablaufTitle: string
  ablauf: { title: string; copy: string }[]
  featuresTitle: string
  features: string[]
  planName: string
  planPrice: string
  planReason: string
  faq: UseCaseFaq[]
  ctaTitle: string
  ctaText: string
  breadcrumb?: { name: string; path: string }
  /** Produktbild unter dem Einstieg; ohne Angabe die Leinwand im Festsaal. */
  image?: LandingImageKey
}

export function UseCasePage({ content }: { content: UseCaseContent }) {
  return (
    <div className='container max-w-5xl py-16 space-y-20'>
      {/* Hero */}
      <ScrollReveal>
        <div className='max-w-2xl space-y-5'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            {content.eyebrow}
          </p>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            {content.title}
          </h1>
          <p className='text-lg text-muted-foreground'>{content.intro}</p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button size='lg' asChild>
              <Link href='/register'>
                Event starten
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/#how-it-works'>So funktioniert's</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Produktbild – echtes Standbild, lazy unter dem Einstieg */}
      <ScrollReveal>
        <ProductImage
          image={content.image ?? 'leinwand-festsaal'}
          sizes='(min-width: 1024px) 976px, 100vw'
        />
      </ScrollReveal>

      {/* Ablauf */}
      <ScrollReveal>
        <section className='space-y-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            {content.ablaufTitle}
          </h2>
          <div className='grid gap-4 md:grid-cols-3'>
            {content.ablauf.map((step, i) => (
              <div
                key={step.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <span className='text-sm font-semibold text-muted-foreground'>
                  0{i + 1}
                </span>
                <h3 className='mt-2 font-semibold'>{step.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Passende Features */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            {content.featuresTitle}
          </h2>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {content.features.map((feature) => (
              <li
                key={feature}
                className='flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm'
              >
                <CheckCircle className='size-4 shrink-0 text-primary' />
                {feature}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* Passender Plan */}
      <ScrollReveal>
        <section className='flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-8 md:flex-row md:items-center'>
          <div className='space-y-1'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Passender Plan
            </p>
            <h2 className='text-2xl font-bold'>
              {content.planName} · {content.planPrice}
            </h2>
            <p className='max-w-lg text-sm text-muted-foreground'>
              {content.planReason}
            </p>
          </div>
          <Button size='lg' asChild className='shrink-0'>
            <Link href='/#pricing'>Preise ansehen</Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-bold'>Häufige Fragen</h2>
          <div className='space-y-3'>
            {content.faq.map((item) => (
              <details
                key={item.question}
                className='group rounded-lg border border-border shadow-sm'
              >
                <summary className='flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden'>
                  {item.question}
                  <span className='shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='px-6 pb-4 text-muted-foreground'>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className='rounded-2xl border border-border bg-card p-8 md:p-12 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>
            {content.ctaTitle}
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            {content.ctaText}
          </p>
          <Button size='lg' asChild>
            <Link href='/register'>
              Event starten
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* FAQPage JSON-LD */}
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      {content.breadcrumb && (
        <script
          type='application/ld+json'
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://eventshot.ch',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Anlässe',
                  // Echte Hub-Seite statt eines Ankers, den es nie gab.
                  item: 'https://eventshot.ch/anlaesse',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: content.breadcrumb.name,
                  item: content.breadcrumb.path.startsWith('http')
                    ? content.breadcrumb.path
                    : `https://eventshot.ch${content.breadcrumb.path}`,
                },
              ],
            }),
          }}
        />
      )}
    </div>
  )
}
