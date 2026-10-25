import { ArrowRight, CheckCircle, Info, ScanLine, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/motion'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbNode, faqNode, graph } from '@/lib/seo/schema'

export const metadata: Metadata = buildMetadata({
  path: '/qr-code-vorlagen',
  title: 'QR-Code auf Tischkarte & Schild gestalten',
  description:
    'Welche Grösse der QR-Code auf Tischkarte und Aufsteller braucht, wohin er im Saal gehört und welcher Begleittext Gäste zum Hochladen bringt.',
})

const herkunft = [
  {
    title: 'Event anlegen',
    copy: 'Sobald dein Event im Konto steht, gehört ihm ein eigener QR-Code. Vorher existiert er nicht.',
  },
  {
    title: 'Code holen',
    copy: 'Im Event-Bereich lädst du ihn als Bilddatei herunter. Daneben steht die Event-Adresse zum Kopieren, falls dein Layout lieber einen Link trägt.',
  },
  {
    title: 'Dann erst drucken',
    copy: 'Der Code führt auf die Upload-Seite genau dieses Events. Karten aus einer früheren Planungsrunde zeigen ins Leere.',
  },
]

const groessen = [
  {
    ort: 'Tischkarte, Menükarte, Platzkärtchen',
    abstand: 'rund 30 cm',
    mass: '3 bis 4 cm',
  },
  {
    ort: 'Aufsteller auf Steh-, Buffet- oder Bartisch',
    abstand: '50 bis 80 cm',
    mass: '6 bis 8 cm',
  },
  {
    ort: 'Schild am Eingang oder neben der Leinwand',
    abstand: '1 bis 2 m',
    mass: '12 bis 20 cm',
  },
  {
    ort: 'Plakat im Gang oder auf der Staffelei',
    abstand: '2 bis 3 m',
    mass: '20 bis 30 cm',
  },
]

const kontrast = [
  'Dunkler Code auf hellem Grund, am besten schwarz auf weissem oder cremefarbenem Papier',
  'Hintergrund so hell, dass gedruckter Fliesstext darauf mühelos lesbar bleibt',
  'Ringsum ein freier Rand von etwa einem Zehntel der Kantenlänge, in den nichts hineinragt',
  'Kein Foto, kein Aquarell und kein Blumenmuster hinter den Modulen',
  'Mattes Papier statt Glanzlaminat oder Metallicfolie – beides spiegelt im Kerzenlicht',
  'Keine Umkehrung ins Helle auf Dunkel und keine Prägung ohne Farbe',
]

const platzierung = [
  {
    title: 'Aufrecht statt flach',
    copy: 'Ein schräg stehender Aufsteller liegt im Blickfeld der sitzenden Gäste. Ein flach liegendes Kärtchen spiegelt und verschwindet unter Servietten.',
  },
  {
    title: 'Auf jedem Tisch einer',
    copy: 'Dazu je einer beim Apéro, an der Bar und beim Buffet. Wer den Code sucht, sucht ihn genau einmal.',
  },
  {
    title: 'Frei vor dem Gesteck',
    copy: 'Blumen, Kerzenständer und Weinflaschen wandern im Lauf des Abends. Stell den Aufsteller vor die Deko, nicht dahinter.',
  },
  {
    title: 'Ein Schild bei der Leinwand',
    copy: 'Dort schauen die Gäste ohnehin hin, und der Zusammenhang zwischen Bild auf dem Screen und Code auf dem Schild erklärt sich von selbst.',
  },
  {
    title: 'Licht mitdenken',
    copy: 'Gedimmtes Saallicht senkt den Kontrast. Ein Platz neben einer Lichtquelle oder einem Teelicht spart den Griff zum Blitz.',
  },
  {
    title: 'Zweite Runde einplanen',
    copy: 'Stell zum Dessert oder zur Tanzfläche nochmals Karten hin. Die schönsten Bilder entstehen später am Abend.',
  },
]

const texte = [
  {
    anlass: 'Hochzeit',
    zeilen: [
      'Eure Sicht auf unseren Tag',
      'Code scannen, Bild aussuchen, abschicken – ohne App, ohne Konto.',
      'Es läuft gleich darauf über die Leinwand.',
    ],
  },
  {
    anlass: 'Geburtstag',
    zeilen: [
      'Deine Fotos von heute Abend',
      'Scannen und hochladen, mehr braucht es nicht.',
      'Der Screen zeigt sie sofort allen im Raum.',
    ],
  },
  {
    anlass: 'Taufe oder Feier im kleinen Kreis',
    zeilen: [
      'Bilder von heute, an einem Ort',
      'Scanne den Code und lade dein Foto hoch.',
      'Derselbe Code führt später zur Galerie.',
    ],
  },
  {
    anlass: 'Team-Event oder Firmenessen',
    zeilen: [
      'Fotos vom Abend, gesammelt',
      'Code scannen, Bild wählen, fertig.',
      'Alles landet in derselben Slideshow.',
    ],
  },
]

const zusatzzeilen = [
  'Hochgeladene Bilder erscheinen auf dem Screen und in der Galerie.',
  'Bitte nur Fotos hochladen, die alle Abgebildeten zeigen möchten.',
  'Die Bilder liegen auf Schweizer Servern und werden danach automatisch gelöscht.',
]

const fehler = [
  {
    title: 'Code unter 3 cm',
    copy: 'Auf edlem Büttenpapier wirkt ein kleiner Code dezent. Am Tisch wird er zur Geduldsprobe, sobald das Licht gedimmt ist.',
  },
  {
    title: 'Rahmen zu nah',
    copy: 'Eine goldene Linie rund um den Code sieht gut aus und frisst die Ruhezone. Lass Abstand zwischen Zierrand und Modulen.',
  },
  {
    title: 'Code über dem Foto',
    copy: 'Ein Bild im Hintergrund nimmt den Modulen den Kontrast. Setz den Code auf eine ruhige, helle Fläche.',
  },
  {
    title: 'Weich gerechnete Kanten',
    copy: 'Wer die Bilddatei im Layoutprogramm vergrössert, schaltet die Glättung aus. Die Quadrate müssen hart bleiben.',
  },
  {
    title: 'Nur ein Schild am Eingang',
    copy: 'Beim Ankommen sind die Hände voll. Was am Platz nicht nochmals auftaucht, wird nicht gescannt.',
  },
  {
    title: 'Karte ohne Erklärung',
    copy: 'Ein nackter Code beantwortet nicht, wohin das Bild geht. Zwei Zeilen darunter erhöhen die Zahl der Uploads spürbar.',
  },
]

const test = [
  'Probedruck in Originalgrösse machen, nicht am Bildschirm prüfen',
  'Mit zwei verschiedenen Handys scannen, eines davon ein älteres',
  'Bei der Beleuchtung testen, die am Fest tatsächlich herrscht',
  'Aus der Sitzposition scannen, nicht aus 10 cm Abstand',
  'Prüfen, ob sich die Upload-Seite des richtigen Events öffnet',
]

const faq = [
  {
    question: 'Bekommen wir fertige Druckvorlagen als Datei?',
    answer:
      'Nein. Hier stehen Masse, Platzierungen und Textbausteine zum Abschreiben, aber es gibt keine Datei zum Herunterladen. Den QR-Code selbst holst du dir im Event-Bereich und setzt ihn in dein eigenes Layout oder gibst ihn der Druckerei weiter.',
  },
  {
    question: 'Dürfen wir den Code in unsere eigene Tischkarte einbauen?',
    answer:
      'Ja. Der Code ist eine gewöhnliche Bilddatei und passt in jedes Textprogramm, jede Einladungskarte und jede Vorlage der Druckerei. Achte nur auf die Kantenlänge und den freien Rand ringsum.',
  },
  {
    question: 'Reicht ein einziger Code für alle Tische?',
    answer:
      'Ja. Alle Karten tragen denselben Code, weil alle Gäste in dasselbe Event hochladen. Du musst also nur ein Motiv gestalten und es in der nötigen Stückzahl drucken.',
  },
  {
    question: 'Sollen wir auf der Karte erwähnen, wo die Bilder landen?',
    answer:
      'Ja. Ein Satz darüber, dass hochgeladene Fotos auf dem Screen und in der Galerie sichtbar sind, nimmt Rückfragen am Tisch vorweg. Gespeichert wird DSG-konform auf Schweizer Servern, nach Ablauf der Galerie wird automatisch gelöscht.',
  },
]

const jsonLd = graph(
  breadcrumbNode([
    { name: 'Home', path: '/' },
    {
      name: 'QR-Code auf Tischkarten und Schildern',
      path: '/qr-code-vorlagen',
    },
  ]),
  faqNode(faq),
)

export default function QrCodeVorlagenPage() {
  return (
    <div className='container max-w-5xl py-16 space-y-20'>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <ScrollReveal>
        <div className='max-w-2xl space-y-5'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            QR-Code am Fest
          </p>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            QR-Code auf Tischkarten und Schildern gestalten
          </h1>
          <p className='text-lg text-muted-foreground'>
            Tischkarte, Aufsteller beim Apéro oder Schild neben der Leinwand: Ob
            deine Gäste den Code scannen, entscheidet sich an Grösse, Kontrast
            und Standort. Diese Seite sammelt Masse, Platzierungen und
            Formulierungen, mit denen du dein Schild selbst gestaltest.
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button size='lg' asChild>
              <Link href='/register'>
                Event starten
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/demo'>Demo ansehen</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Ehrlichkeits-Hinweis */}
      <ScrollReveal>
        <div className='flex gap-4 rounded-2xl border border-border bg-muted/50 p-6'>
          <Info className='size-5 shrink-0 text-primary' />
          <p className='text-sm text-muted-foreground'>
            Fertige Druckdateien gibt es hier nicht. Was auf dieser Seite steht,
            sind Zentimeterangaben, Regeln für Kontrast und Standort sowie
            Textbausteine zum Abschreiben – umsetzbar in jedem Textprogramm und
            bei jeder Druckerei.
          </p>
        </div>
      </ScrollReveal>

      {/* Herkunft des Codes */}
      <ScrollReveal>
        <section className='space-y-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Woher der Code kommt
          </h2>
          <div className='grid gap-4 md:grid-cols-3'>
            {herkunft.map((step, i) => (
              <div
                key={step.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <span className='text-sm font-semibold text-muted-foreground'>
                  0{i + 1}
                </span>
                <h3 className='mt-2 font-semibold'>{step.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Groesse */}
      <ScrollReveal>
        <section className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>
              Grösse in Zentimetern
            </h2>
            <p className='max-w-2xl text-muted-foreground'>
              Die Faustregel ist simpel: Leseabstand durch 10 ergibt die
              Kantenlänge. Wer im Zweifel ist, geht eine Nummer grösser – ein zu
              grosser Code stört niemanden, ein zu kleiner kostet Uploads.
            </p>
          </div>
          {/* Bis md Karten, ab md Tabelle – ohne horizontales Scrollen.
              data-md-skip: die Markdown-Fassung nimmt nur die Tabelle. */}
          <ul data-md-skip className='grid gap-3 md:hidden'>
            {groessen.map((row) => (
              <li
                key={row.ort}
                className='rounded-2xl border border-border bg-card p-5 text-sm'
              >
                <h3 className='font-semibold'>{row.ort}</h3>
                <dl className='mt-3 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5'>
                  <dt className='text-muted-foreground'>Leseabstand</dt>
                  <dd>{row.abstand}</dd>
                  <dt className='text-muted-foreground'>Kantenlänge</dt>
                  <dd className='font-medium'>{row.mass}</dd>
                </dl>
              </li>
            ))}
          </ul>
          <div className='hidden overflow-hidden rounded-2xl border border-border md:block'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-muted/50 text-muted-foreground'>
                <tr>
                  <th className='px-5 py-3 font-semibold'>Wo der Code steht</th>
                  <th className='px-5 py-3 font-semibold'>Leseabstand</th>
                  <th className='px-5 py-3 font-semibold'>Kantenlänge</th>
                </tr>
              </thead>
              <tbody>
                {groessen.map((row) => (
                  <tr key={row.ort} className='border-t border-border'>
                    <td className='px-5 py-3'>{row.ort}</td>
                    <td className='px-5 py-3 text-muted-foreground'>
                      {row.abstand}
                    </td>
                    <td className='px-5 py-3 font-medium'>{row.mass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='max-w-2xl text-sm text-muted-foreground'>
            Gemeint ist immer das schwarz-weisse Quadrat selbst, ohne Rahmen und
            ohne Text darunter. Unter 3 cm wird das Scannen am gedeckten Tisch
            zur Fummelei.
          </p>
        </section>
      </ScrollReveal>

      {/* Kontrast */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Kontrast und freier Rand
          </h2>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {kontrast.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm'
              >
                <CheckCircle className='mt-0.5 size-4 shrink-0 text-primary' />
                {item}
              </li>
            ))}
          </ul>
          <p className='max-w-2xl text-sm text-muted-foreground'>
            Die heruntergeladene Datei endet direkt an den äussersten Modulen.
            Den freien Rand legst du also selbst an, indem du den Code auf eine
            weisse Fläche setzt. Beim Vergrössern im Layoutprogramm darf keine
            Glättung mitlaufen – die Quadrate müssen hart bleiben.
          </p>
        </section>
      </ScrollReveal>

      {/* Platzierung */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Platzierung im Raum
          </h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            {platzierung.map((item) => (
              <div
                key={item.title}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <h3 className='font-semibold'>{item.title}</h3>
                <p className='mt-1.5 text-sm text-muted-foreground'>
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Begleittext */}
      <ScrollReveal>
        <section className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl md:text-3xl font-bold'>
              Begleittext zum Abschreiben
            </h2>
            <p className='max-w-2xl text-muted-foreground'>
              Drei Zeilen genügen: eine Überschrift, der Handgriff und das, was
              danach passiert. Übernimm eine Variante wörtlich oder tausch die
              Namen aus.
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {texte.map((block) => (
              <div
                key={block.anlass}
                className='rounded-2xl border border-border bg-card p-6'
              >
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
                  {block.anlass}
                </p>
                <p className='mt-3 font-semibold'>{block.zeilen[0]}</p>
                <p className='mt-1.5 text-sm text-muted-foreground'>
                  {block.zeilen[1]}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {block.zeilen[2]}
                </p>
              </div>
            ))}
          </div>
          <div className='rounded-2xl border border-border bg-muted/50 p-6'>
            <p className='font-semibold'>Zeilen zum Ergänzen</p>
            <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
              {zusatzzeilen.map((zeile) => (
                <li key={zeile} className='flex items-start gap-2.5'>
                  <ScanLine className='mt-0.5 size-4 shrink-0 text-primary' />
                  {zeile}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* Haeufige Fehler */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>Häufige Fehler</h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            {fehler.map((item) => (
              <div
                key={item.title}
                className='flex gap-3 rounded-2xl border border-border bg-card p-6'
              >
                <XCircle className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                <div>
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p className='mt-1.5 text-sm text-muted-foreground'>
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Test vor dem Druck */}
      <ScrollReveal>
        <section className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Vor dem Druck testen
          </h2>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {test.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm'
              >
                <CheckCircle className='mt-0.5 size-4 shrink-0 text-primary' />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className='space-y-4'>
          <h2 className='text-2xl md:text-3xl font-bold'>Häufige Fragen</h2>
          <div className='space-y-3'>
            {faq.map((item) => (
              <details
                key={item.question}
                className='group rounded-lg border border-border shadow-sm'
              >
                <summary className='flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden'>
                  {item.question}
                  <span className='shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='px-6 pb-4 text-muted-foreground'>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className='rounded-2xl border border-border bg-card p-8 md:p-12 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>
            Erst der Code, dann die Karte
          </h2>
          <p className='text-muted-foreground mb-2 max-w-2xl mx-auto'>
            Leg dein Event an, lade den QR-Code herunter und gestalte die Karten
            mit den Massen von dieser Seite.
          </p>
          <p className='text-sm text-muted-foreground mb-6'>
            Registrierung kostenlos • Einmalpreis pro Event • Kein Abo
          </p>
          <Button size='lg' asChild>
            <Link href='/register'>
              Event starten
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* Weiterlesen */}
      <div className='rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground'>
        Weiterlesen:{' '}
        <Link
          href='/fotobox-ohne-app'
          className='font-medium text-primary hover:underline'
        >
          warum Gäste keine App brauchen
        </Link>{' '}
        oder{' '}
        <Link
          href='/qr-code-fotos-hochzeit'
          className='font-medium text-primary hover:underline'
        >
          Hochzeitsfotos per QR-Code sammeln
        </Link>
        . Planst du einen Grossanlass mit Badges, Roll-ups und mehreren
        Bildschirmen? Dann passt eher das Schwesterprodukt{' '}
        <a
          href='https://social-wall.ch'
          className='font-medium text-primary hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          social-wall.ch
        </a>{' '}
        von EdelByte.
      </div>
    </div>
  )
}
