import { PlanPrice } from '@/components/promotion/plan-price'
import { ScrollReveal } from '@/components/ui/motion'
import { pricingPlans } from '@/lib/constants'
import { promotionMonthsLabel } from '@/lib/promotions'
import { getDisplayPromotion } from '@/lib/promotions.server'
import { Check } from 'lucide-react'
import Link from 'next/link'
export async function Pricing() {
  const promotion = await getDisplayPromotion()

  return (
    <section id="pricing" className="py-16 bg-muted/30">
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Einfach & transparent
            </h2>
            <p className="text-muted-foreground text-lg">
              Wähle das passende Paket für dein Event – ohne versteckte Kosten
              oder Überraschungen.
            </p>

            {/* Vor den Preisen, nicht danach: die Frage "was kostet mich das
                Ausprobieren" beantwortet sich sonst erst, wenn man schon
                dreimal CHF gelesen hat. */}
            <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full border border-primary/25 bg-primary/[0.07] px-5 py-2.5 text-sm">
              <span className="font-semibold text-primary">Gratis testen</span>
              <span className="text-muted-foreground">
                Zu jedem Konto gehört ein Demo-Event für 20 Fotos.
              </span>
              <Link
                href="/register"
                data-umami-event="pricing-demo-register"
                className="font-medium text-primary underline underline-offset-4"
              >
                Konto anlegen
              </Link>
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl overflow-hidden h-full border ${
                plan.highlighted
                  ? 'border-primary shadow-lg relative'
                  : 'border-border shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-b-lg font-medium text-sm">
                  Meistgewählt
                </div>
              )}

              <div
                className={`p-6 flex flex-col h-full ${
                  plan.highlighted ? 'pt-10' : ''
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {plan.description}
                  </p>

                  <PlanPrice
                    regularPrice={plan.priceRappen}
                    duration={plan.duration}
                    promotion={promotion}
                    className="mb-6"
                  />

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {promotion && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            {promotion.name}: Wähle beim Buchen ein Datum im{' '}
            {promotionMonthsLabel(promotion)} – der Rabatt wird automatisch
            abgezogen, ganz ohne Code.
          </p>
        )}

        <div className="text-center mt-12 text-muted-foreground">
          <p>
            Du brauchst eine individuelle Lösung?{' '}
            <a
              href="mailto:info@edelbyte.ch"
              className="text-primary underline underline-offset-4"
            >
              Kontaktiere uns
            </a>{' '}
            für ein massgeschneidertes Angebot.
          </p>
        </div>
      </div>
    </section>
  )
}
