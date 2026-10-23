import { llmsTxt } from '@/lib/seo/llms'

// Ohne Laufzeitdaten: wird beim Build prerendert.
export function GET() {
  return new Response(llmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
