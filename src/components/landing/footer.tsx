'use client'

import {
  Camera,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/motion'
import FooterNav from './footer-nav'


const ANLAESSE = [
  { label: 'Alle Anlässe', href: '/anlaesse' },
  { label: 'Hochzeit', href: '/hochzeit' },
  { label: 'Geburtstag', href: '/geburtstag' },
  { label: 'Taufe', href: '/taufe' },
  { label: 'Jubiläum', href: '/jubilaeum' },
  { label: 'Konfirmation', href: '/konfirmation' },
  { label: 'Polterabend', href: '/polterabend' },
  { label: 'Familienfest', href: '/familienfest' },
  { label: 'Team-Event', href: '/firmenanlass' },
]

const SERVICE = [
  { label: 'Preise', href: '/preise' },
  { label: 'Funktionen', href: '/funktionen' },
  { label: 'Live-Slideshow', href: '/live-slideshow' },
  { label: 'Ratgeber', href: '/ratgeber' },
  { label: 'Häufige Fragen', href: '/faq' },
  { label: 'Demo ansehen', href: '/demo' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Über uns', href: '/ueber-uns' },
]

const REGIONEN = [
  { label: 'Zürich', href: '/hochzeit/zuerich' },
  { label: 'Bern', href: '/hochzeit/bern' },
  { label: 'Basel', href: '/hochzeit/basel' },
  { label: 'Luzern', href: '/hochzeit/luzern' },
  { label: 'St. Gallen', href: '/hochzeit/st-gallen' },
  { label: 'Zug', href: '/hochzeit/zug' },
  { label: 'Winterthur', href: '/hochzeit/winterthur' },
  { label: 'Aarau', href: '/hochzeit/aarau' },
]

const VERGLEICH = [
  { label: 'Anbieter-Vergleich', href: '/anbieter-vergleich' },
  { label: 'Fotobox-Alternative', href: '/fotobox-alternative' },
  { label: 'Fotobox Kosten Schweiz', href: '/fotobox-kosten-schweiz' },
  { label: 'Fotobox ohne App', href: '/fotobox-ohne-app' },
  { label: 'Digitales Gästebuch', href: '/digitales-gaestebuch' },
  { label: 'Fotichaschte-Alternative', href: '/fotichaschte-alternative' },
  { label: 'Digitale Fotobox', href: '/digitale-fotobox' },
]

export function Footer() {
  // Statisch halten: new Date() würde den Footer unter cacheComponents
  // dynamisch machen und aus dem server-gerenderten HTML drängen (SEO).
  const currentYear = 2026

  return (
    <footer className='bg-muted/80 pt-16 pb-8'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-12'>
          <div>
            <Link href='/' className='flex items-center gap-2 mb-4'>
              <Camera className='w-6 h-6 text-primary' />
              <span className='font-bold text-xl'>EventShot</span>
            </Link>
            <p className='text-muted-foreground mb-4'>
              Live-Fotowand & Slideshow für Hochzeiten, Geburtstage und private
              Feste.
            </p>
            <p className='text-sm text-muted-foreground mb-4'>
              Grossanlass, Konferenz oder Firmenevent mit vielen Gästen?{' '}
              <a
                href='https://social-wall.ch'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Grossanlass / Firmenevent-Fotowand → social-wall.ch
              </a>{' '}
              – ebenfalls von EdelByte.
            </p>
            <div className='flex gap-4'>
              <a
                href='https://instagram.com/eventshot.ch'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='EventShot auf Instagram'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Instagram className='h-5 w-5' />
                <span className='sr-only'>EventShot auf Instagram</span>
              </a>
              {/* <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Navigation</h3>
            <FooterNav />
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Anlässe</h3>
            <ul className='space-y-2 text-muted-foreground'>
              {ANLAESSE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Vergleich</h3>
            <ul className='space-y-2 text-muted-foreground'>
              {VERGLEICH.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Service</h3>
            <ul className='space-y-2 text-muted-foreground'>
              {SERVICE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Hochzeit nach Region</h3>
            <ul className='space-y-2 text-muted-foreground'>
              {REGIONEN.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Kontakt</h3>
            <div className='space-y-2 mb-4'>
              <p className='text-muted-foreground flex items-center gap-2'>
                <Mail className='h-4 w-4' /> info@edelbyte.ch
              </p>
              <p className='text-muted-foreground'>
                Tel:{' '}
                <a
                  href='tel:+41445002504'
                  className='hover:text-primary transition-colors'
                >
                  044 500 25 04
                </a>
              </p>
            </div>
            <Link
              href='mailto:info@edelbyte.ch'
              className='text-primary font-medium hover:underline'
            >
              Kontaktiere uns
            </Link>
          </div>
        </div>

        <FadeIn>
          <div className='border-t border-border pt-8 text-center text-sm text-muted-foreground space-y-2'>
            <p>&copy; {currentYear} EventShot. Alle Rechte vorbehalten.</p>

            <p>
              EventShot ist ein Produkt von{' '}
              <a
                href='https://edelbyte.ch'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                EdelByte – IT mit Leidenschaft
              </a>
            </p>

            <div className='flex justify-center gap-4'>
              <Link href='/agb' className='hover:underline text-primary'>
                AGB
              </Link>
              <Link
                href='/datenschutz'
                className='hover:underline text-primary'
              >
                Datenschutz
              </Link>
              <Link href='/impressum' className='hover:underline text-primary'>
                Impressum
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
