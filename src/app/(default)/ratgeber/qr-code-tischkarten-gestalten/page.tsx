import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/qr-code-tischkarten-gestalten',
  title: 'QR-Code-Tischkarten für Gästefotos gestalten',
  description:
    'Grösse, Platzierung, Kontrast und Text: So gestaltet ihr Tischkarten und Aufsteller, die eure Gäste wirklich zum Hochladen bringen.',
})

const content: ArticleContent = {
  image: 'qr-code-scannen',
  eyebrow: 'Gestaltung',
  title: 'QR-Code-Tischkarten gestalten',
  lead: 'Eine QR-Code-Tischkarte wird gescannt, wenn der Code darauf das auffälligste Element ist und ein einziger Satz darunter erklärt, was mit dem Foto geschieht. Papier, Schrift und Farbe machen die Karte schön – wirksam machen sie diese beiden Dinge.',
  path: '/ratgeber/qr-code-tischkarten-gestalten',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'heading',
      text: 'Warum viele Karten am Tisch untergehen',
    },
    {
      type: 'paragraph',
      text: 'Tischkarten entstehen fast immer zuletzt, wenn Einladung, Menükarte und Sitzplan bereits gestaltet sind. Der QR-Code kommt als Nachzügler dazu und wird dem fertigen Layout untergeordnet: klein, zurückhaltend, in derselben zarten Farbe wie das Monogramm. Damit dreht sich die Rangfolge um. Für die Papeterie ist der Code ein Störer, für eure Gäste ist er der einzige Grund, die Karte überhaupt in die Hand zu nehmen.',
    },
    {
      type: 'paragraph',
      text: 'Dazu kommt der Zeitpunkt. Am Tisch wird nichts in Ruhe gelesen, sondern zwischen Vorspeise und Gespräch kurz angeschaut. Was in dieser einen Sekunde nicht beantwortet ist, wird nicht nachgefragt – die Karte wandert unter die Serviette. Die Wirkung entscheidet sich deshalb an zwei Fragen: Sehe ich den Code? Und verstehe ich, wohin mein Bild geht?',
    },
    {
      type: 'heading',
      text: 'Format, Papier und Standfestigkeit',
    },
    {
      type: 'paragraph',
      text: 'Am gedeckten Tisch konkurriert eure Karte mit Gläsern, Gestecken und Menükarten. Eine gefalzte Aufstellkarte im Postkartenformat hat gegenüber dem flachen Kärtchen zwei Vorteile: Sie behält ihre Höhe, und sie lässt sich beidseitig bedrucken, sodass der Code von beiden Seiten des Tisches erreichbar ist. Wer beim flachen Kärtchen bleiben will, stellt es in einen kleinen Halter aus Acryl oder Holz.',
    },
    {
      type: 'paragraph',
      text: 'Beim Papier entscheidet die Oberfläche, nicht das Gewicht. Kraftpapier, stark strukturierter Büttenkarton und dunkel durchgefärbte Sorten sehen auf dem Musterbogen wunderbar aus und kosten am Abend Scans, weil die feinen Quadrate des Codes darauf ausfransen. Wenn ihr auf dem strukturierten Papier bestehen möchtet, druckt den Code auf ein helles Feld und klebt dieses auf – richtig gemacht ist das ein gestalterisches Mittel und kein Notbehelf.',
    },
    {
      type: 'paragraph',
      text: 'Die Kartenstärke wählt ihr nach der Standfestigkeit. Eine Karte, die sich nach zwei Stunden im warmen Saal wellt und umkippt, ist so unsichtbar wie gar keine.',
    },
    {
      type: 'heading',
      text: 'Der Aufbau, von oben nach unten',
    },
    {
      type: 'paragraph',
      text: 'Eine Karte, die trägt, hat vier Pflichtelemente und eine freiwillige Fusszeile. Jedes zusätzliche Element nimmt dem Code Platz, ohne etwas beizutragen.',
    },
    {
      type: 'ordered',
      items: [
        'Eine kurze Zeile, die den Anlass benennt und die Gäste anspricht – zwei bis fünf Wörter, gross genug für den Blick im Vorbeigehen.',
        'Der Code selbst, freigestellt auf einer ruhigen hellen Fläche, mit Luft zu Zierrand und Text.',
        'Ein Satz mit dem Handgriff, in Verben statt in Substantiven: scannen, Bild aussuchen, abschicken.',
        'Ein Satz mit dem Ziel: wo das Bild auftaucht und wie lange es danach noch abrufbar ist.',
        'Freiwillig eine kleine Fusszeile mit der Bitte, nur Bilder hochzuladen, mit denen alle Abgebildeten einverstanden sind.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Die Reihenfolge ist wichtiger als die Typografie. Wer den erklärenden Satz über den Code setzt, verlangt Lesen vor dem Handeln. Wer ihn darunter setzt, erreicht die Gäste in dem Moment, in dem sie das Handy ohnehin schon in der Hand halten.',
    },
    {
      type: 'heading',
      text: 'Sprache: eine Einladung, kein Hinweis',
    },
    {
      type: 'paragraph',
      text: 'Formulierungen wie «Foto-Upload verfügbar» oder «Bilder gerne teilen» beschreiben ein Angebot und lösen nichts aus. In Bewegung setzt eine Aufforderung mit einem Verb am Anfang und einem Grund am Ende. «Zeigt uns euren Blick auf diesen Tag» trägt weiter als jede technische Erklärung, weil es sagt, wofür die Mühe gut ist.',
    },
    {
      type: 'paragraph',
      text: 'Verzichtet dabei auf Fachwörter aus der Software-Welt. «Plattform» und «Portal» gehören nicht in den Wortschatz aller eurer Gäste, «Bild abschicken» versteht jede und jeder. Und lasst den Konjunktiv weg: Wer schreibt, die Gäste könnten gerne etwas beitragen, lädt zum Nichtstun ein.',
    },
    {
      type: 'heading',
      text: 'Wie viele Karten – und wann sie in den Druck gehen',
    },
    {
      type: 'paragraph',
      text: 'Die Stückzahl ergibt sich nicht aus der Gästezahl, sondern aus den Orten, an denen gesessen, gestanden und gewartet wird.',
    },
    {
      type: 'ordered',
      items: [
        'Zählt die Tische: eine Karte pro Tisch, bei langen Tafeln eine pro vier bis sechs Plätze.',
        'Zählt die Stehorte dazu – Apéro, Bar, Buffet, Dessert. Dort braucht es keine Tischkarte, sondern einen grösseren Aufsteller im gleichen Design.',
        'Rechnet eine kleine Reserve ein. Karten gehen verloren, werden nass oder wandern als Andenken in die Handtasche.',
        'Legt euer Event an, bevor ihr layoutet: Den QR-Code gibt es erst, wenn das Event im Konto steht.',
        'Druckt ein einzelnes Muster in Originalgrösse und probiert es zu Hause bei gedimmtem Licht aus, bevor die ganze Auflage bestellt wird.',
        'Plant die Lieferzeit der Druckerei ein und legt die Karten so früh bereit, dass sie am Vortag nur noch verteilt werden müssen.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Am vierten Punkt kippen die meisten Zeitpläne. Wer die gesamte Papeterie ein halbes Jahr im Voraus in den Druck gibt, hat den Code zu diesem Zeitpunkt noch nicht. Zwei Wege führen daran vorbei: Entweder legt ihr das Event so früh an, dass der Code beim Gestalten schon vorliegt. Oder die Karten gehen ohne Code in den Druck und bekommen später ein aufgeklebtes Etikett – das kostet einen Bastelabend und rettet den Termin.',
    },
    {
      type: 'heading',
      text: 'Wann eine Karte das falsche Mittel ist',
    },
    {
      type: 'paragraph',
      text: 'Nicht jede Feier braucht gedruckte Karten. Bei einem Essen mit zwanzig Personen an einer Tafel wirkt eine kurze Ansage vor dem Hauptgang mehr als jedes Kärtchen: Alle hören zu, alle haben das Handy in Reichweite, und die Frage, wohin das Bild denn nun geht, ist in zehn Sekunden beantwortet. Bei einer freien Trauung im Freien und in der Mittagssonne kämpft ihr gegen Spiegelungen und gegen dunkle Displays – dort gehört der Code eher an den Apéro-Platz im Schatten.',
    },
    {
      type: 'paragraph',
      text: 'Und wenn ihr euch bewusst gegen Handys am Tisch entscheidet, ist die Tischkarte der falsche Ort. Dann stellt ihr Aufsteller nur dort auf, wo Fotos ausdrücklich erwünscht sind – an der Bar, beim Dessert, an der Tanzfläche – und lasst die gedeckten Tische frei. Das ist keine halbe Lösung, sondern eine klare Ansage, die eure Gäste verstehen.',
    },
    {
      type: 'heading',
      text: 'Wenn die Karte zu eurer Fotowand gehört',
    },
    {
      type: 'paragraph',
      text: 'Bei EventShot trägt jedes Event einen eigenen QR-Code. Er führt eure Gäste ohne App und ohne Konto direkt auf die Upload-Seite, das gewählte Bild erscheint kurz darauf in der Live-Slideshow auf Beamer oder TV, und derselbe Code öffnet nach dem Fest die digitale Galerie. Für die Gestaltung heisst das: Ihr braucht ein einziges Code-Bild für sämtliche Karten und Aufsteller, weil alle Uploads in dasselbe Event laufen. Ein Motiv, eine Datei, beliebig viele Formate.',
    },
    {
      type: 'note',
      text: 'Auf der Karte dürft ihr ruhig erwähnen, dass die Bilder DSG-konform auf Schweizer Servern liegen und nach Ablauf der Galerie automatisch gelöscht werden – das nimmt Rückfragen am Tisch vorweg. Wie ihr mit Aufnahmen einzelner Gäste umgeht, bleibt eine Frage der Rücksicht: Wer nicht auf die Leinwand möchte, sagt das, und ihr nehmt das Bild aus dem Event. Dieser Text ersetzt keine Rechtsberatung.',
    },
  ],
  faq: [
    {
      question:
        'Gehört der QR-Code auf die Menükarte oder auf eine eigene Karte?',
      answer:
        'Beides funktioniert. Auf der Menükarte spart ihr ein Druckstück, verliert den Code aber aus dem Blick, sobald das Menü gelesen ist. Eine eigene Aufstellkarte bleibt den ganzen Abend stehen und lässt sich zum Dessert an einen neuen Platz stellen.',
    },
    {
      question: 'Dürfen wir die Karte in unseren Hochzeitsfarben drucken?',
      answer:
        'Ja. Farbige Flächen, Schriften und Ränder sind kein Problem, solange das Feld rund um den Code hell und einfarbig bleibt und der Code selbst dunkel gedruckt wird.',
    },
    {
      question: 'Reicht der Drucker zu Hause für die Karten?',
      answer:
        'Ja. Für Aufstellkarten auf festem Papier genügt ein gewöhnlicher Tintenstrahl- oder Laserdrucker. In die Druckerei geht ihr, wenn ihr Sonderfarben wollt, eine hohe Auflage braucht oder ein Papier gewählt habt, das euer Gerät nicht sauber einzieht.',
    },
    {
      question: 'Wann sollen wir die Karten drucken lassen?',
      answer:
        'Sobald euer Event angelegt ist und der QR-Code vorliegt. Früher gedruckte Karten zeigen entweder ins Leere oder brauchen später ein aufgeklebtes Etikett mit dem richtigen Code.',
    },
  ],
  related: [
    {
      title: 'Masse, Kontrast und Textbausteine für den QR-Code',
      href: '/qr-code-vorlagen',
    },
    {
      title: 'Hochzeitsfotos per QR-Code sammeln',
      href: '/qr-code-fotos-hochzeit',
    },
    {
      title: 'Wie ihr eure Gäste um Fotos bittet',
      href: '/ratgeber/gaeste-um-fotos-bitten',
    },
    {
      title: 'Das Fotoprogramm eurer Hochzeit planen',
      href: '/ratgeber/hochzeit-fotoprogramm-planen',
    },
  ],
  ctaTitle: 'Erst der Code, dann der Druck',
  ctaText:
    'Legt euer Event an, ladet den QR-Code als Bilddatei herunter und setzt ihn in euer Kartenlayout. Die Registrierung ist kostenlos, bezahlt wird erst beim Buchen.',
}

export default function QrCodeTischkartenGestaltenPage() {
  return <ArticlePage content={content} />
}
