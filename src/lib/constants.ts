import { formatChf, PLAN_PRICES } from '@/lib/pricing'

export const siteConfig = {
  name: 'EventShot',
  description: 'Live Foto-Sharing Plattform für Veranstaltungen',
  navItems: [
    { label: 'Start', href: '/' },
    { label: 'Anlässe', href: '/anlaesse' },
    { label: 'Funktionen', href: '/funktionen' },
    { label: 'Preise', href: '/preise' },
    { label: 'Ratgeber', href: '/ratgeber' },
    { label: 'FAQ', href: '/faq' },
  ],
  adminNavItems: [
    { label: 'Start', href: '/' },
    { label: 'Einstellungen', href: '/settings' },
  ],
}

export const features = [
  {
    title: 'Sofortiges Teilen',
    description:
      'Gäste scannen einen QR-Code, laden Fotos hoch und sehen sie in Sekunden auf dem Bildschirm.',
    icon: 'Camera',
  },
  {
    title: 'Live Slideshow',
    description:
      'Schöne Übergänge zwischen den Fotos halten deine Event-Wand dynamisch und ansprechend.',
    icon: 'Projector',
  },
  {
    title: 'Digitale Galerie',
    description:
      'Alle Fotos werden in einer digitalen Galerie gespeichert, auf die Gäste nach der Veranstaltung zugreifen können.',
    icon: 'Image',
  },
]

export const howItWorks = [
  {
    title: 'Event einrichten',
    description:
      'Erstelle dein Event in Minuten mit individuellem Branding und Display-Einstellungen.',
    step: 1,
  },
  {
    title: 'QR-Code teilen',
    description:
      'Zeige den einzigartigen QR-Code an deinem Veranstaltungsort zum Scannen an.',
    step: 2,
  },
  {
    title: 'Gäste laden Fotos hoch',
    description:
      'Teilnehmer scannen und laden Fotos von ihren Smartphones hoch - keine App erforderlich.',
    step: 3,
  },
  {
    title: 'Live-Anzeige',
    description:
      'Fotos erscheinen sofort auf der Event-Anzeige mit schönen Animationen.',
    step: 4,
  },
]

export const faqs = [
  {
    question: 'Müssen Gäste eine App herunterladen?',
    answer:
      'Nein! EventShot funktioniert direkt im Browser des Smartphones. Einfach QR-Code scannen, Webseite öffnen und Fotos hochladen - keine App oder Konto erforderlich.',
  },
  {
    question: 'Welche Ausrüstung wird benötigt?',
    answer:
      'Nur ein Bildschirm oder Projektor, der mit einem Gerät verbunden ist, das einen Webbrowser anzeigen kann, wie ein Laptop oder Tablet. Wir empfehlen eine stabile Internetverbindung für das beste Erlebnis.',
  },
  {
    question: 'Wie viele Fotos können hochgeladen werden?',
    answer:
      'Alle Pakete beinhalten unbegrenzte Foto-Uploads während deiner Veranstaltung. Der Galerie-Zugriff danach richtet sich nach dem Plan: 7 Tage (Basic), 30 Tage (Premium) oder 90 Tage (Enterprise).',
  },
  {
    question: 'Können Gäste die Fotos herunterladen?',
    answer:
      'Ja! Alle Fotos werden in einer digitalen Galerie gespeichert, auf die Gäste nach der Veranstaltung über denselben QR-Code oder einen von dir bereitgestellten Link zugreifen können.',
  },
  {
    question: 'Wo werden die Fotos gespeichert?',
    answer:
      'Alle Fotos liegen DSG-konform auf unserer eigenen Infrastruktur in der Schweiz – kein Drittanbieter, keine Weitergabe.',
  },
  {
    question: 'Was passiert mit den Fotos nach Ablauf der Galerie?',
    answer:
      'Nach Ablauf der Galerie-Frist – je nach Plan 7 Tage (Basic), 30 Tage (Premium) oder 90 Tage (Enterprise) nach dem Event – werden alle Fotos automatisch und vollständig von unseren Schweizer Servern gelöscht. Lade dir die Galerie also rechtzeitig herunter.',
  },
  {
    question: 'Gibt es eine Begrenzung der Veranstaltungsdauer?',
    answer:
      'Unsere Pakete sind für Veranstaltungen von wenigen Stunden bis hin zu mehrtägigen Konferenzen verfügbar. Kontaktiere uns für individuelle Pakete für längere Veranstaltungen.',
  },
]

// Preise aus lib/pricing abgeleitet, nie von Hand: sonst verspricht die Karte
// etwas anderes, als Stripe abbucht.
export const pricingPlans = [
  {
    name: 'Basic',
    plan: 'BASIC' as const,
    priceRappen: PLAN_PRICES.BASIC,
    price: formatChf(PLAN_PRICES.BASIC, 'list'),
    duration: 'pro Event',
    description: 'Geburtstage, kleine Familienfeste, private Anlässe',

    // 🔒 Technisches Limit
    maxSlideshows: 1,

    features: [
      'Unbegrenzte Foto-Uploads',
      'Live-Slideshow',
      'Max. 1 Slideshow-Screen',
      'Digitale Galerie für 7 Tage',
      'Inkl. dezentem EventShot-Wasserzeichen',
    ],
    highlighted: false,
  },
  {
    name: 'Premium',
    plan: 'PREMIUM' as const,
    priceRappen: PLAN_PRICES.PREMIUM,
    price: formatChf(PLAN_PRICES.PREMIUM, 'list'),
    duration: 'pro Event',
    description: 'Hochzeiten, runde Geburtstage, Vereinsfeste',

    // 🔒 Technisches Limit
    maxSlideshows: 3,

    features: [
      'Unbegrenzte Foto-Uploads',
      'Live-Slideshow',
      'Max. 3 Slideshow-Screens',
      'Einstellbare Anzeigedauer',
      'Slideshow-Steuerung ein-/ausblendbar',
      'Digitale Galerie für 30 Tage',
      'Inkl. dezentem EventShot-Wasserzeichen',
      'Prioritäts-Support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    plan: 'ENTERPRISE' as const,
    priceRappen: PLAN_PRICES.ENTERPRISE,
    price: formatChf(PLAN_PRICES.ENTERPRISE, 'list'),
    duration: 'pro Event',
    description: 'Firmenanlässe, Konferenzen, Messen, Galas',

    // 🔒 Technisches Limit
    maxSlideshows: Infinity,

    features: [
      'Unbegrenzte Foto-Uploads',
      'Live-Slideshow',
      'Unbegrenzte Slideshow-Screens',
      'Erweiterte Slideshow-Einstellungen',
      'Slideshow-Steuerung konfigurierbar',
      'Digitale Galerie für 90 Tage',
      'Wasserzeichen optional deaktivierbar',
      'Eigenes Branding in der Slideshow',
      'Persönlicher Support',
    ],
    highlighted: false,
  },
]
