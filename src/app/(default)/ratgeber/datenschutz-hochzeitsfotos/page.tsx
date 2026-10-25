import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/datenschutz-hochzeitsfotos',
  title: 'Datenschutz bei Hochzeitsfotos – DSG in Kürze',
  description:
    'Recht am eigenen Bild, Einwilligung der Gäste und Aufbewahrung: was in der Schweiz gilt. Mit Muster-Hinweistext für eure Gäste.',
  type: 'article',
})

const content: ArticleContent = {
  image: 'galerie',
  eyebrow: 'Ratgeber Datenschutz',
  title: 'Gästefotos und Datenschutz an der Hochzeit',
  lead: 'Fotos, die eure Gäste am Fest machen und untereinander teilen, sind in der Schweiz zulässig, solange die Abgebildeten davon wissen und niemand gegen seinen Willen im Bild landet – heikel wird es erst, wenn die Bilder den Kreis der Feiernden verlassen oder ohne Enddatum liegen bleiben.',
  path: '/ratgeber/datenschutz-hochzeitsfotos',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Eine Hochzeit ist ein privates Fest und trotzdem der Anlass, an dem besonders viele Menschen gleichzeitig fotografieren: Trauzeugen, Grosseltern, Kinder mit dem Handy der Eltern, dazu der Fotograf. Sobald all diese Bilder an einem gemeinsamen Ort landen, stellt sich die Frage, wer sie sehen darf und wie lange sie bleiben.',
    },
    {
      type: 'paragraph',
      text: 'Die gute Nachricht vorweg: Für eine private Feier braucht es weder Formulare noch ein Verzeichnis. Es braucht einen Hinweis, eine Frist und eine Person, die zuständig ist. Dieser Artikel ordnet die Lage ein, ersetzt aber keine Rechtsberatung – bei einem konkreten Streitfall gehört die Frage zu einer Anwältin oder einem Anwalt.',
    },
    { type: 'heading', text: 'Zwei Ebenen, die zusammenspielen' },
    {
      type: 'paragraph',
      text: 'Die erste Ebene ist der Persönlichkeitsschutz aus dem Zivilrecht. Das sogenannte Recht am eigenen Bild ist in der Schweiz kein eigenes Gesetz, sondern ein Teil davon. Vereinfacht gesagt: Wer auf einem Foto erkennbar ist, entscheidet mit, ob dieses Foto weiterverbreitet wird.',
    },
    {
      type: 'paragraph',
      text: 'Die zweite Ebene ist das Datenschutzgesetz, kurz DSG. Es behandelt Bilder erkennbarer Personen als Personendaten. Für die rein private Nutzung – also für Fotos, die ihr im Kreis eurer Gäste teilt – nimmt das DSG die Bearbeitung weitgehend aus. Für den Anbieter, der die Bilder speichert, gilt es dagegen immer, unabhängig davon, wie klein eure Feier ist.',
    },
    {
      type: 'paragraph',
      text: 'In der Praxis heisst das für euch als Brautpaar: Ihr müsst keine Unterschriften sammeln. Ihr solltet aber sagen, dass fotografiert und geteilt wird, und ihr solltet wissen, wo die Bilder liegen und wann sie verschwinden.',
    },
    { type: 'heading', text: 'Einwilligung heisst nicht Unterschrift' },
    {
      type: 'paragraph',
      text: 'Eine Zustimmung kann ausdrücklich sein, sie kann sich aber auch aus dem Verhalten ergeben. Wer für die Kamera posiert, willigt in die Aufnahme ein. Diese stillschweigende Zustimmung deckt allerdings nur ab, womit die Person rechnen musste.',
    },
    {
      type: 'paragraph',
      text: 'Die entscheidende Unterscheidung lautet deshalb nicht fotografieren oder nicht fotografieren, sondern aufnehmen oder weiterverbreiten. Ein Schnappschuss vom Tisch der Cousine, der in der Galerie eurer Hochzeit auftaucht, ist etwas anderes als dasselbe Bild in einem offenen Profil. Je grösser und unbestimmter der Kreis der Betrachtenden, desto klarer muss die Zustimmung sein.',
    },
    { type: 'heading', text: 'Drei Fragen, die ihr vor dem Fest beantwortet' },
    {
      type: 'ordered',
      items: [
        'Wer sieht die Bilder? Legt fest, ob die Galerie nur euren Gästen offensteht oder ob ihr den Zugang weitergebt. Je enger der Kreis, desto weniger müsst ihr im Voraus klären.',
        'Wie lange bleiben sie? Setzt eine Frist, bevor das erste Bild hochgeladen wird, und nennt sie den Gästen. Eine Aufbewahrung ohne Enddatum ist der Punkt, an dem aus einer Feier eine Datensammlung wird.',
        'Wer entscheidet über ein einzelnes Bild? Bestimmt eine Person – oft die Trauzeugin oder der Trauzeuge –, die Löschwünsche am Fest und danach entgegennimmt. Ohne benannte Stelle landet so ein Wunsch nirgends.',
      ],
    },
    { type: 'heading', text: 'So informiert ihr eure Gäste' },
    {
      type: 'paragraph',
      text: 'Information schlägt Formular. Ein kurzer Hinweis, der an mehreren Stellen auftaucht, erreicht praktisch alle Anwesenden – ohne dass die Stimmung darunter leidet.',
    },
    {
      type: 'list',
      items: [
        'In der Einladung oder auf eurer Hochzeitsseite, ein bis zwei Sätze',
        'Auf der Tischkarte oder dem Aufsteller direkt neben dem QR-Code',
        'In der Ansage beim Apéro, gesprochen und in einem Satz',
        'Auf der Seite, auf der das Foto ausgewählt und abgeschickt wird',
      ],
    },
    {
      type: 'note',
      text: 'Muster-Hinweistext für Tischkarte oder Aushang: «Wir sammeln heute alle Fotos an einem Ort. Was ihr hochladet, sehen die anderen Gäste auf der Leinwand und später in der Galerie. Ladet bitte nur Bilder hoch, mit denen die Abgebildeten einverstanden sind – Fotos von Kindern nur mit Einverständnis der Eltern. Wer ein Bild entfernt haben möchte, sagt es [Name], wir löschen es ohne Rückfragen. Die Galerie ist bis zum [Datum] offen, danach werden alle Bilder automatisch gelöscht.»',
    },
    {
      type: 'heading',
      text: 'Kinder, Kirche und Gäste, die nicht aufs Bild wollen',
    },
    {
      type: 'paragraph',
      text: 'Bei Kindern entscheiden die Eltern. Das Bild vom Blumenmädchen auf der Leinwand ist unproblematisch, bis eine Mutter es nicht möchte – dann wird es entfernt, ohne Diskussion. Formuliert den Hinweis so, dass Löschen als normaler Vorgang erscheint und sich niemand als Spielverderber fühlt.',
    },
    {
      type: 'paragraph',
      text: 'Für die Trauung selbst kommt das Hausrecht des Ortes dazu. Kirchgemeinden und Zivilstandsämter haben eigene Regeln, ob und von wo aus fotografiert werden darf. Diese Absprache gehört ins Vorgespräch und nicht auf die Tischkarte.',
    },
    {
      type: 'paragraph',
      text: 'Und es gibt an jedem Fest ein bis zwei Gäste, die nicht abgelichtet werden möchten – aus beruflichen Gründen, wegen einer Trennung oder einfach so. Ein kurzes Wort vorab ist für alle angenehmer als eine Diskussion am Buffet.',
    },
    { type: 'heading', text: 'Wo die Bilder liegen und wann sie verschwinden' },
    {
      type: 'paragraph',
      text: 'Der zweite Teil der Frage betrifft nicht eure Gäste, sondern die Technik dahinter. Drei Punkte sind entscheidend: der Speicherort, die Zugänglichkeit und die Löschung. Ein Dienst, der die Bilder auf Schweizer Servern behält, ist leichter einzuordnen als eine Kette aus mehreren Beteiligten. Und eine Galerie, die nur über einen nicht erratbaren Zugang erreichbar ist, unterscheidet sich deutlich von einer, die jede Suchmaschine findet.',
    },
    {
      type: 'paragraph',
      text: 'EventShot speichert die Fotos DSG-konform auf eigener Infrastruktur in der Schweiz und löscht sie nach Ablauf der Galerie automatisch – je nach Plan 7, 30 oder 90 Tage nach dem Fest. Genau darum sollte die Frist schon vorher feststehen: Sie ist der eingebaute Schlusspunkt, den ihr euren Gästen nennen könnt.',
    },
    {
      type: 'paragraph',
      text: 'Ehrlich dazu gehört auch: Wenn ihr die Bilder dauerhaft und ohne Frist an einem Ort haben wollt, ist ein Dienst mit automatischer Löschung dafür der falsche Platz. Dann ladet ihr die Fotos rechtzeitig herunter und legt sie zu Hause ab. Und wenn nur die engste Familie beteiligt ist und niemand eine Slideshow braucht, tut es ein geteiltes Album im kleinen Kreis genauso – datenschutzfreundlich ist immer die Variante, bei der weniger Menschen Zugriff haben.',
    },
    { type: 'heading', text: 'Nach dem Fest: die kurze Liste' },
    {
      type: 'list',
      items: [
        'Löschwünsche innerhalb weniger Tage erledigen statt sammeln',
        'Den Zugang zur Galerie nicht in offene Gruppen oder öffentliche Profile stellen',
        'Vor Fristende alles sichern, was ihr behalten möchtet',
        'Vor einer Veröffentlichung bei den erkennbar abgebildeten Personen nachfragen',
      ],
    },
    {
      type: 'paragraph',
      text: 'Mehr braucht eine private Hochzeit nicht. Wer diese vier Punkte abhakt, hat den Datenschutz sauber geregelt – und muss am Fest selbst nicht mehr daran denken.',
    },
  ],
  faq: [
    {
      question: 'Müssen wir jeden Gast einzeln um Erlaubnis fragen?',
      answer:
        'Nein. Für ein privates Fest genügt ein gut sichtbarer Hinweis, dass Fotos gesammelt und allen Gästen gezeigt werden. Wichtig ist, dass jede Person weiss, wohin die Bilder gehen, und dass ein Löschwunsch ohne Aufwand möglich ist.',
    },
    {
      question: 'Dürfen wir die Hochzeitsfotos danach öffentlich zeigen?',
      answer:
        'Nur mit Zustimmung der erkennbar abgebildeten Personen. Über ein Bild, auf dem nur ihr beide zu sehen seid, entscheidet ihr allein; sobald Gäste erkennbar sind, fragt vorher nach. Das gilt auch für Fotos, die ihr von Gästen erhalten habt.',
    },
    {
      question: 'Was tun wir, wenn jemand ein Bild gelöscht haben will?',
      answer:
        'Löschen, ohne nach Gründen zu fragen, und der Person danach kurz Bescheid geben. Wenn das Bild bereits weiterverschickt wurde, sagt ihr das offen – ihr könnt nur entfernen, was noch bei euch liegt.',
    },
    {
      question: 'Wie lange dürfen wir die Bilder aufbewahren?',
      answer:
        'So lange, wie es für den Zweck nötig ist, und nicht länger. Für Gästefotos heisst das eine überschaubare Frist nach dem Fest und danach das private Archiv. Bei EventShot endet die Galerie je nach Plan nach 7, 30 oder 90 Tagen automatisch.',
    },
    {
      question: 'Gilt das alles auch für die Bilder unseres Fotografen?',
      answer:
        'Dafür ist euer Vertrag mit ihm massgebend. Klärt darin, wer die Aufnahmen wie verwenden darf, ob er sie für eigene Werbung zeigen möchte und wie lange er sie aufbewahrt. Diese Punkte sind unabhängig von der Galerie eurer Gäste.',
    },
  ],
  related: [
    {
      title: 'Hochzeitsfotos sichern und archivieren',
      href: '/ratgeber/hochzeitsfotos-archivieren',
    },
    {
      title: 'Hochzeitsfotos per QR-Code sammeln',
      href: '/qr-code-fotos-hochzeit',
    },
    { title: 'Datenschutzerklärung von EventShot', href: '/datenschutz' },
  ],
  ctaTitle: 'Gästefotos mit klarem Enddatum sammeln',
  ctaText:
    'Ein Ort für alle Bilder, Schweizer Hosting und eine Galerie, die sich nach Ablauf von selbst löscht. Das Anlegen eines Kontos kostet nichts – der Einmalpreis pro Event fällt erst mit der Buchung an.',
}

export default function DatenschutzHochzeitsfotosPage() {
  return <ArticlePage content={content} />
}
