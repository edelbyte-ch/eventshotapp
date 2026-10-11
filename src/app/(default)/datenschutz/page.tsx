import { buildMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  path: '/datenschutz',
  title: 'Datenschutzerklärung',
  description:
    'Wie EventShot personenbezogene Daten DSG-konform verarbeitet und auf Schweizer Servern speichert – transparent erklärt.',
})

export default function DatenschutzPage() {
  return (
    <div className='container max-w-3xl py-16 space-y-10'>
      <div className='text-center space-y-2'>
        <h1 className='text-4xl font-bold tracking-tight'>
          Datenschutzerklärung
        </h1>
        <p className='text-muted-foreground'>
          Gültig für alle Nutzer:innen von{' '}
          <span className='text-primary'>eventshot.ch</span> – Stand: Juni 2025
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          1. Verantwortliche Stelle
        </h2>
        <p>
          Verantwortlich für die Datenverarbeitung im Sinne des Schweizer DSG
          ist:
          <br />
          <strong>EdelByte – IT mit Leidenschaft</strong>
          <br />
          Betreiber der Plattform EventShot
          <br />
          8488 Turbenthal, Schweiz
          <br />
          E-Mail:{' '}
          <Link
            href='mailto:info@edelbyte.ch'
            className='text-primary underline hover:opacity-80'
          >
            info@edelbyte.ch
          </Link>
          <br />
          Website:{' '}
          <a
            href='https://edelbyte.ch'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary underline hover:opacity-80'
          >
            https://edelbyte.ch
          </a>
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          2. Erhobene Daten
        </h2>
        <p>
          Beim Besuch unserer Seiten oder bei Nutzung eines Event-Zugangs werden
          folgende Daten verarbeitet:
        </p>
        <ul className='list-disc ps-6 space-y-1'>
          <li>Subdomain-Name und Planinformationen</li>
          <li>Vorname, Name, E-Mail-Adresse, Firmenname (sofern angegeben)</li>
          <li>Fotos, die Gäste freiwillig hochladen</li>
          <li>Meta- und Nutzungsdaten (Browsertyp, IP-Adresse, Zeitpunkt)</li>
        </ul>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          3. Zweck der Datenverarbeitung
        </h2>
        <p>
          Die Datenverarbeitung dient ausschliesslich dem Betrieb und der
          Abwicklung deines Event-Zugangs. Eine Weitergabe an Dritte erfolgt
          nicht. Fotos sind öffentlich im Rahmen der jeweiligen Subdomain
          sichtbar und werden nach Ablauf des Events automatisch gelöscht.
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          4. Speicherfristen
        </h2>
        <p>
          Alle gespeicherten Inhalte (Bilder, Subdomain-Daten) werden
          automatisch <strong>7 Tage</strong> nach Event-Ende gelöscht.
          Zahlungsdaten werden gemäss gesetzlichen Vorgaben{' '}
          <strong>10 Jahre</strong> aufbewahrt.
        </p>
      </section>

      <section id='chat' className='space-y-4 scroll-mt-24'>
        <h2 className='text-2xl font-semibold text-primary'>
          5. Chat-Assistent (KI)
        </h2>
        <p>
          Über den Chat auf eventshot.ch kannst du freiwillig Fragen stellen –
          ohne Anmeldung. Der Chat wird von EdelByte selbst betrieben
          (desk.edelbyte.ch). Gespeichert werden deine Nachrichten, allfällige
          Anhänge, freiwillig angegebene Kontaktdaten sowie wenige technische
          Angaben (Sprache, Einstiegsseite ohne Parameter, Herkunfts-Domain,
          Zeitzone). Damit dein Verlauf erhalten bleibt, legt das Chatfenster
          einen zufälligen Schlüssel im Speicher deines Browsers ab; es werden
          keine Tracking-Cookies gesetzt.
        </p>
        <p>
          Erste Antworten erstellt ein KI-Assistent. Dazu werden deine
          Chat-Nachrichten an Anthropic, PBC (USA) übermittelt und dort zur
          Erstellung der Antwort verarbeitet. Anthropic verwendet diese Daten
          gemäss seinen Bedingungen für Geschäftskunden nicht zum Training
          seiner Modelle. Bitte gib im Chat keine besonders schützenswerten
          Daten ein. Auf Wunsch übernimmt jederzeit ein Mensch.
        </p>
        <p>
          Gespräche ohne weitere Anfrage löschen wir nach spätestens 12
          Monaten, Anhänge nach 6 Monaten. Du kannst deinen Chatverlauf
          jederzeit selbst über das Menü im Chat löschen.
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>6. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung oder
          Einschränkung der Verarbeitung deiner personenbezogenen Daten. Ebenso
          kannst du der Verarbeitung widersprechen oder deine Einwilligung
          jederzeit widerrufen.
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          7. Änderungen dieser Erklärung
        </h2>
        <p>
          Diese Datenschutzerklärung kann jederzeit angepasst werden. Es gilt
          jeweils die auf{' '}
          <Link href='/' className='text-primary underline hover:opacity-80'>
            eventshot.ch
          </Link>{' '}
          veröffentlichte Version.
        </p>
      </section>

      <div className='border-t pt-8 text-sm text-muted-foreground text-center'>
        Fragen zum Datenschutz?{' '}
        <Link
          href='mailto:info@edelbyte.ch'
          className='text-primary underline hover:opacity-80'
        >
          Kontaktiere uns
        </Link>
      </div>
    </div>
  )
}
