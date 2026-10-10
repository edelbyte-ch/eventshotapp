import { Images, MonitorPlay, QrCode, ShieldCheck, Upload } from 'lucide-react'
import { REEL, ReelPlayer } from '@/components/landing/reel-player'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/motion'
import { SITE, videoNode } from '@/lib/seo/schema'

const jsonLd = {
  '@context': 'https://schema.org',
  ...videoNode({
    name: 'EventShot in 25 Sekunden – vom Foto bis zur Galerie',
    description:
      'Gäste scannen den QR-Code, laden ihre Fotos ohne App hoch und sehen sie sofort live auf der Leinwand. Danach liegen alle Bilder in einer gemeinsamen Galerie – DSG-konform und auf Schweizer Servern gehostet.',
    contentUrl: `${SITE.url}${REEL.desktop.src}`,
    thumbnailUrl: `${SITE.url}${REEL.desktop.poster}`,
    uploadDate: REEL.uploadDate,
    duration: REEL.duration,
  }),
}

const steps = [
  {
    icon: QrCode,
    title: 'QR-Code scannen',
    copy: 'Keine App, kein Konto – die Handykamera genügt.',
  },
  {
    icon: Upload,
    title: 'Foto hochladen',
    copy: 'Bild auswählen, abschicken. In Sekunden erledigt.',
  },
  {
    icon: MonitorPlay,
    title: 'Live auf der Leinwand',
    copy: 'Neue Fotos erscheinen sofort in der Slideshow.',
  },
  {
    icon: Images,
    title: 'Danach: eure Galerie',
    copy: 'Alle Bilder an einem Ort, mit einem Klick herunterladen.',
  },
]

export function Video() {
  return (
    <section id='gallery' className='py-16 md:py-24 bg-muted/50'>
      <div className='container'>
        <ScrollReveal>
          <div className='text-center max-w-3xl mx-auto mb-10 md:mb-12'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3'>
              EventShot in 25 Sekunden
            </p>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Die schönsten Fotos? Verstreut auf allen Handys.
            </h2>
            <p className='text-muted-foreground text-lg'>
              Mit EventShot landen sie dort, wo alle sie sehen: live auf der
              Leinwand – und nach dem Fest gesammelt in einer Galerie.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <ReelPlayer className='max-w-5xl mx-auto' />
        </ScrollReveal>

        <StaggerContainer className='max-w-5xl mx-auto mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className='flex gap-4 lg:flex-col lg:gap-3'>
                <div className='shrink-0 size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center'>
                  <step.icon className='size-5' aria-hidden />
                </div>
                <div>
                  <h3 className='font-semibold mb-1'>
                    <span className='text-primary mr-1.5'>{i + 1}.</span>
                    {step.title}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{step.copy}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className='mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground'>
          <ShieldCheck className='size-4 text-primary' aria-hidden />
          DSG-konform · Gehostet auf Schweizer Servern
        </p>
      </div>

      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
