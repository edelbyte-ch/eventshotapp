import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'
import { photoLimitPhrase } from '@/lib/photo-limits'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/hochzeitsbudget-fotos',
  title: 'Hochzeitsbudget für Fotos – die Posten',
  description:
    'Fotograf, Fotobox, Prints und digitale Fotowand: welche Posten im Budget stecken und wo sich sparen lässt, ohne Erinnerungen zu verlieren.',
})

const content: ArticleContent = {
  eyebrow: 'Ratgeber',
  title: 'Was Fotos an der Hochzeit kosten',
  lead: 'Rechnet das Fotobudget in zwei Teilen: einem festen Posten für die professionelle Begleitung und mehreren wählbaren Posten für Gästefotos, Papier und Technik – dann diskutiert ihr nicht mehr über eine Gesamtsumme, sondern über einzelne Entscheidungen.',
  path: '/ratgeber/hochzeitsbudget-fotos',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Einen Richtwert, der für jede Hochzeit stimmt, gibt es nicht. Was eine Reportage kostet, hängt an der Dauer, an der Anreise und am Umfang der Nachbearbeitung; alles, was danach kommt, ist eine Entscheidung für sich. Wer zuerst die Posten auflistet und erst dann Zahlen einträgt, merkt schnell, dass sich nicht das Budget als Ganzes kürzen lässt, sondern immer nur ein einzelner Block.',
    },
    {
      type: 'paragraph',
      text: 'Fest ist dabei fast immer nur ein einziger Teil: die Person, die den Tag professionell begleitet. Sie wird lange im Voraus gebucht, ihr Preis steht früh fest und lässt sich später kaum noch bewegen. Alles Übrige – Gästefotos, Papier, Technik, Aufbewahrung – könnt ihr bis wenige Wochen vor dem Fest anpassen. Diese Reihenfolge sollte das Budget abbilden.',
    },
    { type: 'heading', text: 'Die Posten im Fotobudget' },
    {
      type: 'paragraph',
      text: 'Fünf Blöcke decken bei den meisten Feiern alles ab, was mit Bildern zu tun hat. Schreibt sie auf, bevor ihr die erste Offerte einholt:',
    },
    {
      type: 'list',
      items: [
        'Professionelle Fotografie: Reportagezeit am Hochzeitstag, Vorgespräch, Anreise und die Bearbeitung danach',
        'Gästefotos: Einwegkameras, eine gemietete Fotobox, eine digitale Fotowand – oder bewusst gar nichts',
        'Ausgabe auf Papier: Fotobuch, Abzüge für die Eltern, Danksagungskarten mit Bild',
        'Technik im Saal: Beamer oder TV, Verlängerungskabel, ein Tisch oder Rollwagen, eine Internetverbindung',
        'Aufbewahrung: eine zweite Kopie aller Dateien, die woanders liegt als die erste',
      ],
    },
    {
      type: 'paragraph',
      text: 'Der letzte Punkt taucht in kaum einem Budgetplan auf und ist trotzdem der einzige, der euch nach Jahren noch beschäftigt. Eine externe Festplatte kostet wenig im Vergleich zu allem anderen auf dieser Liste.',
    },
    {
      type: 'paragraph',
      text: 'Entscheidet ausserdem in der richtigen Reihenfolge: zuerst das, was knapp ist, danach das, was jederzeit verfügbar bleibt. An beliebten Samstagen sind Fotografinnen und Fotografen früh ausgebucht, während ihr eine Fotobox, Einwegkameras oder eine digitale Fotowand auch drei Wochen vorher noch bekommt. Steht das Gesamtbudget im Frühjahr noch nicht, legt ihr trotzdem den festen Posten fest und lasst den Rest offen – nicht umgekehrt.',
    },
    { type: 'heading', text: 'Was in der Offerte fehlt' },
    {
      type: 'paragraph',
      text: 'Angebote sind unterschiedlich geschnitten, und genau daraus entstehen die Budgetüberraschungen. Nicht in jedem Grundpreis enthalten sind die Anreise aus einer anderen Region, eine zweite fotografierende Person, die Zahl der fertig bearbeiteten Bilder, die Lieferfrist und die Frage, was ihr mit den Aufnahmen anschliessend tun dürft.',
    },
    {
      type: 'paragraph',
      text: 'Bei einer gemieteten Fotobox verschiebt sich die Liste, das Prinzip bleibt gleich. Fragt konsequent nach allem, was nicht ausdrücklich im Grundpreis steht – und lasst euch die Antwort schriftlich geben.',
    },
    { type: 'heading', text: 'Fragen vor der Unterschrift' },
    {
      type: 'ordered',
      items: [
        'Wie viele Stunden sind enthalten, und was kostet eine zusätzliche Stunde?',
        'Sind Anreise, Verpflegung und allenfalls eine Übernachtung eingerechnet?',
        'Wie viele fertig bearbeitete Bilder erhalten wir, und bis wann?',
        'Dürfen wir die Bilder selbst drucken lassen und im Familienkreis weitergeben?',
        'Kommt eine zweite fotografierende Person mit, und steht sie im Preis?',
        'Was gilt, wenn wir den Termin verschieben müssen?',
      ],
    },
    {
      type: 'paragraph',
      text: 'Die vierte Frage wird am häufigsten übersehen und ist die folgenreichste: Wenn ihr eure eigenen Hochzeitsbilder weder drucken lassen noch weitergeben dürft, nützt euch der günstigste Preis nichts.',
    },
    { type: 'heading', text: 'Wo sich sparen lässt' },
    {
      type: 'paragraph',
      text: 'Am wirksamsten spart, wer die Dauer kürzt statt die Qualität. Eine Reportage vom Anziehen bis zum Dessert deckt in der Regel die Bilder ab, die später tatsächlich im Album landen; der spätere Abend lebt ohnehin von dem, was die Gäste selbst festhalten.',
    },
    {
      type: 'list',
      items: [
        'Reportagezeit auf die Kernstunden begrenzen statt auf den ganzen Tag',
        'Das Fotobuch erst nach dem Fest bestellen, wenn ihr in Ruhe auswählen könnt',
        'Abzüge nur für die Personen drucken, die wirklich welche möchten',
        'Den späten Abend bewusst den Gästefotos überlassen',
        'Deko und Requisiten weglassen, die nur für Bilder gedacht sind',
      ],
    },
    {
      type: 'paragraph',
      text: 'Das Fotobuch gehört bewusst ans Ende der Liste. Erst wenn alle Bilder beisammen sind, wisst ihr, wie viele Seiten ihr überhaupt füllen wollt – vorher bestellt ihr auf Verdacht. Dasselbe gilt für Danksagungskarten: Wer sie erst nach der Bildauswahl in Auftrag gibt, druckt einmal statt zweimal.',
    },
    { type: 'heading', text: 'Wo Sparen teuer wird' },
    {
      type: 'paragraph',
      text: 'Drei Dinge solltet ihr nicht kürzen. Erstens die Nutzungsrechte, siehe oben. Zweitens die zweite Kopie: Ein einziger Speicherort ist kein Backup, und Handys gehen verloren. Drittens die Zeit, in der die Gästefotos eingesammelt werden – was drei Wochen nach dem Fest nicht beisammen ist, kommt erfahrungsgemäss auch nicht mehr zusammen.',
    },
    {
      type: 'paragraph',
      text: 'Und noch eine Beobachtung aus der Praxis: Wer überall ein bisschen kürzt, bekommt am Ende von allem eine schwache Version. Einen Posten ganz zu streichen, den ihr nicht wirklich braucht, ist meistens die bessere Entscheidung als fünf Posten halbherzig zu bezahlen.',
    },
    { type: 'heading', text: 'Wo die digitale Fotowand steht' },
    {
      type: 'paragraph',
      text: `EventShot ist ein Einmalpreis pro Event: CHF 49.- für Basic, CHF 99.- für Premium und CHF 149.- für Enterprise. Darin enthalten sind die Live-Slideshow auf Beamer oder TV und der Zugriff auf die digitale Galerie – 7 Tage bei Basic, 30 bei Premium, 90 bei Enterprise. Basic nimmt ${photoLimitPhrase('BASIC')} an, Premium ${photoLimitPhrase('PREMIUM')} und Enterprise ${photoLimitPhrase('ENTERPRISE')}. Für eine Hochzeit reicht Premium meist aus, weil 30 Tage genügen, damit alle ihre Bilder herunterladen können.`,
    },
    {
      type: 'paragraph',
      text: 'Im Budget verhält sich dieser Posten anders als die übrigen: Er wächst nicht mit der Gästezahl, mit der Zahl der Bilder oder mit der Länge des Abends. Anfahrt, Aufbau und Betreuung entfallen, weil nichts geliefert und nichts aufgestellt werden muss ausser einem ausgedruckten QR-Code.',
    },
    {
      type: 'note',
      text: 'Bei mehreren hundert Gästen verschiebt sich die Rechnung noch einmal: Dann geht es weniger um Erinnerungsbilder am Tisch als um Sichtbarkeit im ganzen Saal. Für diesen Rahmen führt EdelByte social-wall.ch.',
    },
    { type: 'heading', text: 'Wann etwas anderes besser passt' },
    {
      type: 'paragraph',
      text: 'Wenn ihr gedruckte Bilder noch am selben Abend in der Hand halten möchtet, führt an einer gemieteten Fotobox mit Drucker kein Weg vorbei; das kann eine digitale Fotowand nicht leisten. Kommen eure Gäste überwiegend ohne Smartphone, sind Einwegkameras auf den Tischen die ehrlichere Wahl. Und wenn ihr am Ende nur ein Dutzend Bilder im engsten Kreis behalten wollt, genügt ein Ordner, den ihr selbst befüllt – auch das ist ein gültiges Ergebnis dieser Rechnung.',
    },
  ],
  faq: [
    {
      question:
        'Wie viel Prozent unseres Budgets sollten wir für Fotos einplanen?',
      answer:
        'Dafür gibt es keine belastbare Faustregel, die für jede Hochzeit passt. Geht stattdessen vom Ergebnis aus: Was möchtet ihr in einem Jahr in der Hand halten – ein Fotobuch, eine vollständige Sammlung aller Bilder oder beides? Aus dieser Antwort ergibt sich die Summe.',
    },
    {
      question: 'Können Gästefotos den Fotografen ersetzen?',
      answer:
        'Nein. Gästefotos zeigen den Abend aus vielen Blickwinkeln, aber niemand aus der Gästeschar kümmert sich um Licht, Gruppenbilder und den Ablauf. Die beiden Quellen ergänzen einander, die eine ersetzt die andere nicht.',
    },
    {
      question: 'Lohnt sich ein Fotobuch oder reichen die Dateien?',
      answer:
        'Beides hat seinen Platz. Die Dateien sind das Archiv, das Buch ist das, was tatsächlich angeschaut wird. Wer sparen muss, verschiebt das Buch auf später und wählt dafür in Ruhe aus.',
    },
    {
      question: 'Kostet EventShot pro Gast oder pro Foto etwas?',
      answer:
        'Nein. Der Preis gilt einmalig pro Event, unabhängig davon, wie viele Gäste hochladen und wie viele Bilder zusammenkommen. Die Registrierung ist kostenlos, gezahlt wird erst beim Buchen.',
    },
    {
      question: 'Was kostet die Aufbewahrung nach dem Fest?',
      answer:
        'Bei EventShot nichts zusätzlich. Der Galerie-Zugriff steckt im Paketpreis und endet nach 7, 30 oder 90 Tagen, danach werden die Bilder automatisch und DSG-konform gelöscht. Ladet sie in dieser Zeit herunter und legt sie an zwei Orten ab.',
    },
  ],
  related: [
    {
      title: 'Einwegkameras oder digitale Fotowand?',
      href: '/ratgeber/einwegkameras-oder-digital',
    },
    {
      title: 'Was eine Fotobox in der Schweiz kostet',
      href: '/fotobox-kosten-schweiz',
    },
    { title: 'Live-Fotowand für die Hochzeit', href: '/hochzeit' },
    { title: 'Preise pro Event', href: '/preise' },
  ],
  ctaTitle: 'Gästefotos zum Einmalpreis',
  ctaText:
    'Legt euer Hochzeits-Event an, druckt den QR-Code aus und zahlt erst, wenn ihr bucht. Die Registrierung selbst kostet nichts.',
}

export default function HochzeitsbudgetFotosPage() {
  return <ArticlePage content={content} />
}
