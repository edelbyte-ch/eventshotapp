import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { articleNode, breadcrumbNode, graph } from '@/lib/seo/schema'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'note'; text: string }

export type ArticleFaq = { question: string; answer: string }

export type ArticleContent = {
  eyebrow: string
  title: string
  lead: string
  path: string
  /** ISO-Datum, z. B. '2026-08-19'. */
  datePublished: string
  dateModified?: string
  readingMinutes: number
  blocks: ArticleBlock[]
  faq?: ArticleFaq[]
  related?: { title: string; href: string }[]
  ctaTitle: string
  ctaText: string
}

/** '2026-08-19' → '19. August 2026', ohne Zeitzonen-Verschiebung. */
function formatDate(iso: string) {
  return new Intl.DateTimeFormat('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}

/**
 * Ratgeber-Artikel mit Article-, FAQPage- und BreadcrumbList-Markup.
 * Bewusst eine Server-Komponente: Der Fliesstext steht vollstaendig im
 * SSR-HTML und ist ohne JavaScript lesbar.
 */
export function ArticlePage({ content }: { content: ArticleContent }) {
  const updated = content.dateModified ?? content.datePublished
  const jsonLd = graph(
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Ratgeber', path: '/ratgeber' },
      { name: content.title, path: content.path },
    ]),
    articleNode({
      headline: content.title,
      description: content.lead,
      path: content.path,
      datePublished: content.datePublished,
      dateModified: content.dateModified,
    }),
    content.faq && content.faq.length > 0
      ? {
          '@type': 'FAQPage',
          mainEntity: content.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null,
  )

  return (
    <div className='container max-w-3xl py-16'>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label='Brotkrumen' className='mb-6 text-sm text-muted-foreground'>
        <Link href='/' className='hover:text-primary transition-colors'>
          Start
        </Link>
        <span className='mx-2'>/</span>
        <Link href='/ratgeber' className='hover:text-primary transition-colors'>
          Ratgeber
        </Link>
      </nav>

      <article>
        <header className='space-y-4'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            {content.eyebrow} · {content.readingMinutes} Min. Lesezeit
          </p>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {content.title}
          </h1>
          <p className='text-lg text-muted-foreground'>{content.lead}</p>
          {/* Sichtbarer Autor und Stand – dieselben Angaben wie im
              Article-Markup (E-E-A-T, Aktualitaet fuer KI-Suchen). */}
          <p className='text-sm text-muted-foreground'>
            Von{' '}
            <Link
              href='/ueber-uns'
              rel='author'
              className='font-medium text-foreground hover:text-primary transition-colors'
            >
              Endrit Veliji
            </Link>
            , Gründer von EventShot · Aktualisiert am{' '}
            <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        </header>

        <div className='mt-12 space-y-6'>
          {content.blocks.map((block, index) => {
            const key = `${block.type}-${index}`
            if (block.type === 'heading') {
              return (
                <h2 key={key} className='pt-6 text-2xl font-bold'>
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'list') {
              return (
                <ul key={key} className='space-y-2 pl-5'>
                  {block.items.map((item) => (
                    <li key={item} className='list-disc text-muted-foreground'>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            if (block.type === 'ordered') {
              return (
                <ol key={key} className='space-y-2 pl-5'>
                  {block.items.map((item) => (
                    <li key={item} className='list-decimal text-muted-foreground'>
                      {item}
                    </li>
                  ))}
                </ol>
              )
            }
            if (block.type === 'note') {
              return (
                <aside
                  key={key}
                  className='rounded-xl border border-border bg-muted/50 px-6 py-5 text-sm text-muted-foreground'
                >
                  {block.text}
                </aside>
              )
            }
            return (
              <p key={key} className='text-muted-foreground leading-relaxed'>
                {block.text}
              </p>
            )
          })}
        </div>

        {content.faq && content.faq.length > 0 && (
          <section className='mt-16 space-y-4'>
            <h2 className='text-2xl font-bold'>Häufige Fragen</h2>
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
                  <p className='px-6 pb-4 text-muted-foreground'>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {content.related && content.related.length > 0 && (
          <section className='mt-16'>
            <h2 className='text-xl font-bold'>Weiterlesen</h2>
            <ul className='mt-4 space-y-2'>
              {content.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='text-primary underline underline-offset-4 hover:no-underline'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <section className='mt-16 rounded-2xl border border-border bg-card p-8 text-center'>
        <h2 className='text-2xl font-bold mb-3'>{content.ctaTitle}</h2>
        <p className='text-muted-foreground mb-6'>{content.ctaText}</p>
        <Button size='lg' asChild>
          <Link href='/register'>
            Event starten
            <ArrowRight className='ml-2 size-4' />
          </Link>
        </Button>
      </section>
    </div>
  )
}
