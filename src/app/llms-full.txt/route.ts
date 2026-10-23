import { llmsFullTxt } from '@/lib/seo/llms'

// Ohne Laufzeitdaten: wird beim Build prerendert.
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
