import Stripe from 'stripe'

let stripe: Stripe | null = null

export function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }

    stripe = new Stripe(key, {
      apiVersion: '2026-01-28.clover',
    })
  }

  return stripe
}

// Die Preise selbst stehen in lib/pricing.ts (auch im Browser nutzbar).
export { PLAN_PRICES } from '@/lib/pricing'
