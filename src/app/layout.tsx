import { graph, organizationNode, websiteNode } from '@/lib/seo/schema'
import '@/styles/globals.css'
import 'moment/locale/de'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default:
      'EventShot – Live-Fotowand & Slideshow für Hochzeit & Geburtstag',
    // Unterseiten setzen nur ihren eigenen Titel; die Marke haengt das
    // Template an. Ohne das erben Seiten ohne eigenen Export 1:1 den
    // Startseiten-Titel (Duplicate Titles).
    template: '%s | EventShot',
  },
  description:
    'Die Live-Fotowand & Slideshow für Hochzeit, Geburtstag und private Feiern: Gäste laden Fotos per QR-Code hoch – ganz ohne App – und sehen sie live als elegante Slideshow. Inklusive digitaler Galerie als Erinnerung. DSG-konform, Schweizer Hosting.',
  authors: [
    { name: 'EdelByte', url: 'https://edelbyte.ch' },
    { name: 'Endrit Veliji' },
  ],
  creator: 'Endrit Veliji',
  publisher: 'EdelByte',
  openGraph: {
    title:
      'EventShot – Live-Fotowand & Slideshow für Hochzeit, Geburtstag & private Feiern',
    description:
      'Gäste laden Fotos per QR-Code hoch – ganz ohne App – und sehen sie live als elegante Slideshow. Inklusive digitaler Galerie als Erinnerung. Für Hochzeit, Geburtstag & private Feiern. DSG-konform, Schweizer Hosting.',
    url: 'https://eventshot.ch',
    siteName: 'EventShot',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://eventshot.ch/og-image-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'EventShot – Fotos live am Event',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EventShot – Fotos live am Event',
    description:
      'QR-Code scannen, Foto hochladen, direkt auf der Leinwand sehen – EventShot macht Events interaktiver! Entwickelt von EdelByte.',
    creator: '@edelbyte',
    images: ['https://eventshot.ch/og-image-1200x630.png'],
  },
  metadataBase: new URL('https://eventshot.ch'),
  // KEIN canonical im Root-Layout: Next vererbt Metadata-Felder an jede
  // Route, die sie nicht selbst setzt – jede Unterseite haette sonst die
  // Startseite als Canonical deklariert. Jede Seite setzt ihn selbst.
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}


// Ohne diesen Export fehlt <meta name="theme-color">, obwohl das
// Manifest eine theme_color deklariert.
export const viewport: Viewport = {
  themeColor: '#0b0b0b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${poppins.className} min-h-svh flex flex-col relative antialiased`}
      >
        <main className="flex-1 flex flex-col">{children}</main>
        <Toaster />
        <Script
          defer
          src="https://umami.edelbyte.ch/script.js"
          data-website-id="81d33849-a760-41dd-9426-f32636c2d3ed"
        />
        {/* EdelDesk-Chat (KI-Assistent + Team), lädt erst nach dem Seitenaufbau */}
        <Script
          src="https://desk.edelbyte.ch/embed/v1.js"
          data-site="pk_CL0n952jiyfsvh_m"
          strategy="lazyOnload"
        />
        {/* Natives <script>: JSON-LD landet so im SSR-HTML (next/script wuerde
            es erst clientseitig injizieren). FAQPage liegt bei der FAQ-Sektion. */}
        <script
          type='application/ld+json'
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph(organizationNode(), websiteNode())),
          }}
        />
      </body>
    </html>
  )
}
