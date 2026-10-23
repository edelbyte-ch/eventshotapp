import { pricingMd } from '@/lib/seo/llms'

// Ohne Laufzeitdaten: wird beim Build prerendert.
export function GET() {
  return new Response(pricingMd(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
