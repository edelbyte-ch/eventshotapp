import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp',
  title: 'Hochzeitsfotos sammeln ohne WhatsApp-Gruppe',
  description:
    'Warum WhatsApp Bilder komprimiert, wie ihr Fotos in Originalqualität sammelt und welche Wege sich für Gästefotos wirklich eignen.',
})

const content: ArticleContent = {
  eyebrow: 'Ratgeber',
  title: 'Hochzeitsfotos der Gäste sammeln – ohne WhatsApp-Gruppe',
  lead: 'Legt vor dem Fest einen Sammelort fest, den alle ohne Konto erreichen: Der Gruppenchat ist der bequemste Weg für einen Abend, verkleinert aber jedes Bild beim Versand und lässt genau die Gäste aussen vor, die nicht in der Gruppe sind.',
  path: '/ratgeber/hochzeitsfotos-teilen-ohne-whatsapp',
  datePublished: '2026-08-19',
  dateModified: '2026-10-24',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Die Gruppe entsteht meistens von selbst. Jemand legt sie zwei Tage vor der Hochzeit an, alle sind drin, die ersten Bilder kommen noch in derselben Nacht. Genau deshalb wird sie so selten hinterfragt. Wer die Fotos aber nicht nur anschauen, sondern behalten will, merkt spätestens beim Fotobuch, was auf dem Weg verloren gegangen ist.',
    },

    { type: 'heading', text: 'Was die Gruppe wirklich gut kann' },
    {
      type: 'paragraph',
      text: 'Fairerweise: Kein anderer Weg ist so schnell aufgesetzt. Es gibt nichts einzurichten, niemand muss etwas lernen, und die Bilder sind sofort für alle sichtbar – samt der Kommentare darunter, die oft das eigentlich Schöne sind. Für den Abend selbst ist das schwer zu schlagen.',
    },
    {
      type: 'paragraph',
      text: 'Was die Gruppe nicht kann, ist aufbewahren. Sie ist ein Gespräch, kein Speicher. Diese Unterscheidung erklärt fast alle Probleme, die danach auftauchen.',
    },

    { type: 'heading', text: 'Wo sie an ihre Grenzen stösst' },
    {
      type: 'list',
      items: [
        'Bildqualität: WhatsApp verkleinert Fotos beim Versand, damit sie schnell ankommen. Für den Blick auf dem Handy reicht das Ergebnis völlig, für einen grossen Abzug oder ein gedrucktes Buch oft nicht mehr.',
        'Wer nicht drin ist, bleibt draussen: Grosseltern ohne Smartphone, Arbeitskolleginnen ohne eure Nummer, Gäste, die grundsätzlich keine Gruppen mögen. Von ihnen kommt dann gar nichts an.',
        'Vermischung: Zwischen den Fotos stehen Sprachnachrichten, Absprachen zur Heimfahrt und Glückwünsche. Das Aussortieren dauert länger als das Sammeln gedauert hat.',
        'Reihenfolge: Die Bilder treffen über Tage verteilt ein, nicht in der Reihenfolge des Abends. Wer sie später ordnen möchte, hat kaum Anhaltspunkte.',
        'Vergänglichkeit: Wird die Gruppe verlassen oder der Verlauf gelöscht, sind die Aufnahmen weg, sofern sie niemand einzeln gesichert hat.',
        'Handarbeit: Jedes Bild muss einzeln aus dem Verlauf geholt werden. Bei zweihundert Aufnahmen ist das ein Abend Arbeit für eine Person.',
      ],
    },
    {
      type: 'paragraph',
      text: 'WhatsApp bietet inzwischen an, Bilder in höherer Qualität oder als Datei zu verschicken. Beides funktioniert, muss aber bei jedem einzelnen Bild bewusst gewählt werden. Und genau das tut um zwei Uhr nachts neben der Tanzfläche niemand.',
    },

    { type: 'heading', text: 'Vier Wege, ehrlich verglichen' },
    {
      type: 'list',
      items: [
        'Gruppenchat: sofort startklar, null Vorbereitung, aber verkleinerte Bilder und kein Zugang für alle ausserhalb der Gruppe. Passt für kleine Runden, in denen ohnehin schon jeder im selben Verlauf schreibt.',
        'Geteilter Cloud-Ordner: behält die volle Qualität und lässt sich gut sortieren. Dafür brauchen viele Gäste ein Konto beim jeweiligen Anbieter, der Speicherplatz ist begrenzt, und der Ordner bleibt offen, bis ihn jemand aufräumt.',
        'E-Mail: funktioniert für zwei bis drei Bilder pro Person und für Gäste, die mit allem anderen fremdeln. Bei grösseren Mengen stossen Anhänge an Grenzen, und ihr sammelt am Ende in eurem Posteingang.',
        'Upload-Seite per QR-Code: ein Ort für alle, ohne Konto und ohne Chat. Dafür müsst ihr sie vor dem Fest einrichten und die Codes drucken lassen – der Aufwand liegt vorne statt hinten.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Es gibt keinen Weg, der alles gleichzeitig kann. Die ehrliche Frage lautet deshalb nicht, welcher der beste ist, sondern wie viele eurer Gäste den ersten Schritt ohne Hilfe schaffen.',
    },

    { type: 'heading', text: 'Wann die Gruppe die richtige Wahl bleibt' },
    {
      type: 'paragraph',
      text: 'Wenn ihr zu fünfzehnt im Restaurant sitzt, alle einander kennen und der Chat für die Anreise sowieso schon existiert, ist ein zweiter Sammelort blosser Ballast. Dasselbe gilt, wenn ihr die Bilder nur anschauen und nichts davon drucken wollt – dann ist die verkleinerte Datei vollkommen ausreichend.',
    },
    {
      type: 'paragraph',
      text: 'Kritisch wird es erst, wenn drei Bedingungen zusammenkommen: viele Gäste, ein Teil davon ausserhalb eures Chats, und der Wunsch, später etwas Gedrucktes daraus zu machen. Trifft nur eine davon zu, könnt ihr euch die Umstellung sparen.',
    },

    { type: 'heading', text: 'So sammelt ihr in voller Qualität' },
    {
      type: 'ordered',
      items: [
        'Entscheidet vor dem Fest, wohin die Bilder gehen. Nach der Feier ist die Sammlung bereits über Geräte und Chats verteilt und lässt sich nicht mehr zusammenführen.',
        'Wählt einen Zugang ohne Konto und ohne Installation. Jede zusätzliche Anmeldung kostet euch Gäste, und zwar genau die, die selten hochladen.',
        'Nennt den Sammelort dort, wo fotografiert wird – auf dem Tisch und an der Bar, nicht nur in der Einladung.',
        'Sagt einmal laut, dass die Bilder nicht verkleinert werden. Für alle, die schon einmal ein Fotobuch aus Chat-Bildern gemacht haben, ist das ein echtes Argument.',
        'Setzt eine Frist fürs Nachladen und kommuniziert sie. Zwei Wochen reichen den meisten, und eine Frist bringt mehr Bilder als eine offene Einladung.',
        'Ladet danach alles herunter und legt es an zwei getrennten Orten ab, bevor die Sammlung abläuft. Eine Kopie auf einem einzigen Laptop ist keine Sicherung.',
      ],
    },

    { type: 'heading', text: 'Was danach mit den Bildern geschieht' },
    {
      type: 'paragraph',
      text: 'Ein Sammelort, den niemand wieder schliesst, ist das eigentliche Datenschutzproblem – nicht der Upload selbst. Cloud-Ordner und Gruppen bestehen oft jahrelang weiter, mit Aufnahmen von Menschen, die nie gefragt wurden, ob ihr Bild dort liegen darf.',
    },
    {
      type: 'paragraph',
      text: 'Das Schweizer Datenschutzgesetz verlangt, dass Personendaten nur so lange bearbeitet werden, wie es der Zweck erfordert. In der Praxis heisst das für euch: Legt von Anfang an fest, wann die Sammlung endet, und haltet euch daran. Wer diesen Punkt nicht plant, verschiebt ihn erfahrungsgemäss auf nie.',
    },
    {
      type: 'note',
      text: 'Diese Einordnung beschreibt den Grundsatz und ersetzt keine Rechtsberatung. Wer Gästefotos über den privaten Kreis hinaus veröffentlichen möchte, sollte die abgebildeten Personen vorher fragen.',
    },

    { type: 'heading', text: 'Der Weg über den QR-Code' },
    {
      type: 'paragraph',
      text: 'Bei EventShot hängt an eurem Event ein QR-Code. Die Gäste halten die Handykamera darauf, wählen ein Bild aus und schicken es ab, ohne App und ohne Konto. Die Datei wird dabei nicht für den Versand verkleinert, sondern so abgelegt, wie sie das Handy verlässt. Auf der Leinwand läuft die Aufnahme sofort in der Live-Slideshow mit, und über denselben Code öffnet sich später die digitale Galerie, aus der alle ihre Bilder herunterladen können.',
    },
    {
      type: 'paragraph',
      text: 'Bezahlt wird einmalig pro Event: CHF 49.-, CHF 99.- oder CHF 149.-, je nachdem, wie lange die Galerie danach offen bleiben soll – 7, 30 oder 90 Tage. Danach werden die Bilder automatisch von unseren Schweizer Servern gelöscht, ihr müsst also innerhalb dieser Frist herunterladen.',
    },
  ],
  faq: [
    {
      question: 'Wie sammeln wir die Fotos der Gäste nach der Hochzeit ein?',
      answer:
        'Am einfachsten mit einem einzigen Sammelort, den alle ohne Konto erreichen, etwa einem QR-Code, der im Browser eine Upload-Seite öffnet. Bei EventShot können Gäste darüber auch nach dem Fest noch Fotos nachreichen, solange die Galerie läuft: 7, 30 oder 90 Tage je nach Paket. Schickt den Link dazu am besten mit der Dankeskarte.',
    },
    {
      question:
        'Können wir Bilder aus dem Gruppenchat nachträglich in Originalqualität bekommen?',
      answer:
        'Nein. Was einmal verkleinert verschickt wurde, lässt sich nicht zurückrechnen. Die Originaldatei liegt weiterhin auf dem Handy der Person, die sie geschickt hat. Ihr müsst also einzeln nachfragen, solange die Bilder dort noch nicht gelöscht sind.',
    },
    {
      question: 'Reicht ein geteilter Cloud-Ordner für Gästefotos?',
      answer:
        'Ja, wenn eure Gäste ohnehin beim selben Anbieter sind und mit Ordnern umgehen können. Rechnet damit, dass ein Teil an der Anmeldung scheitert, und legt vorher fest, wer den Ordner am Ende wieder aufräumt.',
    },
    {
      question: 'Können Gäste auch kurze Videos schicken?',
      answer:
        'Nein. In die Galerie kommen ausschliesslich Fotos. Wenn euch Videos wichtig sind, braucht ihr dafür einen zweiten Weg und solltet das den Gästen auch sagen, damit niemand vergeblich probiert.',
    },
    {
      question: 'Sollen wir die WhatsApp-Gruppe zusätzlich weiterlaufen lassen?',
      answer:
        'Nein. Zwei Sammelstellen nebeneinander führen dazu, dass beide halb voll bleiben. Nutzt den Chat für Absprachen und Glückwünsche und lasst die Bilder an einem einzigen Ort landen.',
    },
  ],
  related: [
    { title: 'Live-Fotowand für die Hochzeit', href: '/hochzeit' },
    {
      title: 'Hochzeitsfotos per QR-Code sammeln',
      href: '/qr-code-fotos-hochzeit',
    },
    {
      title: 'Hochzeitsfotos sichern und archivieren',
      href: '/ratgeber/hochzeitsfotos-archivieren',
    },
    {
      title: 'Die Live-Slideshow auf Beamer oder TV',
      href: '/live-slideshow',
    },
  ],
  ctaTitle: 'Alle Bilder an einem Ort?',
  ctaText:
    'Ein Sammelort, eingerichtet noch bevor die erste Gruppe entsteht: Der QR-Code steht sofort zum Ausdrucken bereit, bezahlt wird einmalig pro Event.',
}

export default function HochzeitsfotosTeilenOhneWhatsappPage() {
  return <ArticlePage content={content} />
}
