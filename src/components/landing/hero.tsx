import { ServerIcon, ShieldCheckIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PromoHeroHint } from '../promotion/promo-hero-hint'
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/motion'
import HeroButtons from './hero-buttons'
import HeroContainer from './hero-container'

const TRUST = [
  { icon: ServerIcon, label: 'Schweizer Hosting' },
  { icon: ShieldCheckIcon, label: 'DSG-konform' },
  { icon: Trash2Icon, label: 'Automatische Löschung' },
  { icon: ServerIcon, label: 'Kein Drittanbieter' },
]

export function Hero() {
  return (
        // `min-h` statt `h`: bei fester Hoehe und zentriertem Inhalt schneidet ein
    // kurzes Display oben und unten ab — auf 360x780 stand die H1 schon vorher
    // hinter dem Header. Jetzt waechst der Hero stattdessen mit.
    <section className="relative min-h-[calc(100svh-64px)] pt-28 pb-16 sm:pt-0 sm:pb-0 flex items-center justify-center overflow-hidden">
      <HeroContainer>
        <Image
          src="/hero-bg.jpeg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.3]"
          priority
        />
      </HeroContainer>

      <div className="container relative z-10">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Bewusst NICHT in StaggerItem: das schreibt style="opacity:0"
                ins SSR-HTML und nimmt der H1 die LCP-Kandidatur. */}
            <div>
              {/* Aktionshinweis ueber der H1 statt neben den Knoepfen: so
                  bleibt "Jetzt starten" der primaere Schritt. */}
              <PromoHeroHint />
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-4 sm:mb-6">
                Erlebe <span className="text-primary">Momente</span>,
                <br />
                geteilt in <span className="text-primary">Echtzeit</span>
              </h1>
            </div>
            <div>
              <p className="text-lg md:text-xl text-white/80 mb-5 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Die Live-Fotowand & Slideshow für eure Hochzeit, den Geburtstag
                und private Feiern: Gäste laden Fotos per QR-Code hoch – ganz
                ohne App – und sehen sie live als elegante Slideshow. Danach
                bleibt euch die digitale Galerie als Erinnerung.
              </p>
            </div>
            <StaggerItem>
              <HeroButtons />
            </StaggerItem>
            {/* Der Hinweis steht direkt unter den Knoepfen und nicht bei den
                Preisen: wer hier abspringt, hat den Preisblock nie gesehen. */}
            <StaggerItem>
              <p className="mt-4 text-xs sm:text-sm text-white/70">
                Erst ausprobieren:{' '}
                <Link
                  href="/register"
                  data-umami-event="hero-demo-register"
                  className="font-semibold text-white underline underline-offset-4 decoration-primary"
                >
                  Demo-Event mit 20 Gratis-Fotos
                </Link>
                <span className="hidden sm:inline"> – ohne Zahlungsdaten.</span>
              </p>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-4 sm:mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-white/70">
                {TRUST.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5">
                    <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </div>

          <FadeIn className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/eventshot-hero-hochzeit.jpg"
              alt="EventShot an einer Hochzeit: Das Foto des Brautpaars läuft mit QR-Code als Live-Slideshow auf der Leinwand, die Gäste schauen zu"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </FadeIn>
        </StaggerContainer>
      </div>
    </section>
  )
}
