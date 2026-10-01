import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type UseCaseContent,
  UseCasePage,
} from '@/components/landing/use-case-page'
import { photoLimitPhrase, photoLimitRange } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/fotobox-kosten-schweiz',
  title: 'Fotobox Kosten Schweiz – Preise im Vergleich',
  description:
    'Was Mietfotoboxen in der Schweiz kosten, welche Zusatzkosten dazukommen und wie die digitale Fotowand für CHF 49.- pro Event dagegen steht.',
})

const content: UseCaseContent = {
  eyebrow: 'Kosten im Vergleich',
  title: 'Was kostet eine Fotobox in der Schweiz?',
  intro:
    "Tagesmiete, Anfahrt, Betreuung, Drucke und Requisiten: Bei einer Mietfotobox setzt sich der Preis aus mehreren Posten zusammen, und die Zahl im Grundpaket ist selten der Endbetrag. Schweizer Anbieter bewegen sich je nach Ausstattung und Dauer von rund CHF 150.- bis über CHF 1'000.- pro Anlass. EventShot kostet einmalig CHF 49.-, CHF 99.- oder CHF 149.- pro Event.",
  ablaufTitle: 'So setzt sich der Preis zusammen',
  ablauf: [
    {
      title: 'Grundpaket und Dauer',
      copy: 'Eine Offerte deckt eine feste Stundenzahl ab. Zieht sich der Abend länger, wird jede weitere Stunde separat verrechnet.',
    },
    {
      title: 'Zusatzposten prüfen',
      copy: 'Anfahrt, Auf- und Abbau, Betreuung vor Ort, Papier und Toner, Requisiten und der Versand der Bilder stehen oft ausserhalb des Grundpreises.',
    },
    {
      title: 'Galerie danach',
      copy: 'Bei EventShot ist die digitale Galerie im Einmalpreis enthalten – ohne Aufpreis für Bilderversand oder Datenträger.',
    },
  ],
  featuresTitle: 'Was im Einmalpreis enthalten ist',
  features: [
    'Foto-Upload per QR-Code, ganz ohne App',
    `Je nach Paket ${photoLimitRange()} pro Event`,
    'Live-Slideshow auf Beamer oder TV',
    'Einmalpreis pro Event, kein Abo',
    'DSG-konform, Schweizer Hosting',
    'Automatische Löschung nach Galerie-Ablauf',
  ],
  planName: 'Basic',
  planPrice: 'CHF 49.-',
  planReason:
    `Wer vor allem auf den Preis schaut, startet mit Basic: 7 Tage Zugriff auf die digitale Galerie, ${photoLimitPhrase('BASIC')} und ein Screen für die Slideshow – einmalig, ohne Anfahrts- und ohne Betreuungspauschale.`,
  faq: [
    {
      question: 'Kommen für meine Gäste noch Kosten dazu?',
      answer:
        'Nein. Für die Gäste entstehen keine Kosten: Sie brauchen weder ein Konto noch eine App, der Upload läuft im Browser ihres Handys.',
    },
    {
      question: 'Ist die digitale Galerie im Preis inbegriffen?',
      answer:
        'Ja. Der Zugriff ist im Paketpreis inbegriffen: 7 Tage bei Basic, 30 bei Premium und 90 bei Enterprise – ohne Zuschlag für Speicher oder Versand.',
    },
    {
      question: 'Muss ich Geräte dazumieten?',
      answer:
        'Nein. Ein Bildschirm oder Beamer mit Internetzugang genügt – Kabine, Drucker und Verbrauchsmaterial fallen weg.',
    },
  ],
  ctaTitle: 'Bereit für deine digitale Fotowand?',
  ctaText:
    'Registriere dich kostenlos, richte dein Event ein und zahle den Einmalpreis erst, wenn du buchst.',
  breadcrumb: { name: 'Fotobox-Kosten', path: '/fotobox-kosten-schweiz' },
}

export default function FotoboxKostenSchweizPage() {
  return (
    <>
      <UseCasePage content={content} />
      <div className='container max-w-5xl pb-16'>
        <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
          Nicht nur der Preis zählt: Der direkte Vergleich zu Aufbau, Platz und
          Gästezahl steht auf der Seite{' '}
          <Link
            href='/fotobox-alternative'
            className='font-medium text-primary hover:underline'
          >
            Alternative zur Mietfotobox
          </Link>
          .
        </div>
      </div>
    </>
  )
}
