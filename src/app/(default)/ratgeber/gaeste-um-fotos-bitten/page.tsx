import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/gaeste-um-fotos-bitten',
  title: 'Gäste um Fotos bitten – Texte und Beispiele',
  description:
    'Formulierungen für Tischkarte, Ansage und Einladung, mit denen Gäste ihre Fotos wirklich hochladen. Mit Beispieltexten zum Übernehmen.',
})

const content: ArticleContent = {
  image: 'qr-code-scannen',
  eyebrow: 'Ratgeber',
  title: 'Wie ihr eure Gäste um Fotos bittet',
  lead: 'Sagt in einem einzigen Satz, was ihr euch wünscht, wohin das Bild geht und wie schnell es erledigt ist – diese drei Angaben an der richtigen Stelle entscheiden darüber, ob eure Gäste tatsächlich hochladen oder es nur vorhaben.',
  path: '/ratgeber/gaeste-um-fotos-bitten',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Fotografiert wird an eurem Fest ohnehin. Das Problem ist selten die Bereitschaft, sondern die Lücke zwischen dem Moment, in dem jemand ein Bild macht, und dem Moment, in dem es bei euch ankommt. Wer diese Lücke schliessen will, muss nicht netter fragen, sondern konkreter.',
    },

    { type: 'heading', text: 'Warum die höfliche Bitte verpufft' },
    {
      type: 'paragraph',
      text: 'Das übliche Muster sieht so aus: In der Einladung steht ein freundlicher Satz über Fotos, am Fest selbst kommt niemand mehr darauf zurück, und danach trudeln drei Bilder ein. Das liegt fast nie an Desinteresse. Es liegt daran, dass die Bitte zum falschen Zeitpunkt ausgesprochen wurde und keine Handlung beschreibt.',
    },
    {
      type: 'paragraph',
      text: 'Dazu kommen vier Gedanken, die eure Gäste völlig zu Recht haben. Der Fotograf ist doch da, meine Schnappschüsse braucht niemand. Mein Bild ist unscharf und schief. Ich schicke es später, wenn ich zu Hause bin. Und der häufigste: Ich weiss gar nicht, wohin damit.',
    },
    {
      type: 'paragraph',
      text: 'Jeder dieser Einwände lässt sich mit einem Satz entkräften – vorausgesetzt, dieser Satz steht dort, wo das Handy sowieso schon in der Hand liegt.',
    },

    { type: 'heading', text: 'Drei Stellen, die zusammen wirken' },
    {
      type: 'paragraph',
      text: 'Eine Bitte allein reicht nicht, drei sind genug. Sie erfüllen unterschiedliche Aufgaben und ersetzen einander nicht.',
    },
    {
      type: 'list',
      items: [
        'Einladung oder Beileger: Hier gebt ihr die Erlaubnis. Der Satz sagt, dass ihr euch Bilder eurer Gäste ausdrücklich wünscht – nicht, wie sie technisch abgeschickt werden.',
        'Karte am Platz: Hier steht die Handlung. Sie liegt genau dort, wo eure Gäste am längsten sitzen, und wirkt den ganzen Abend, ohne dass jemand erinnern muss.',
        'Gesprochene Ansage: Hier entsteht der Anstoss. Ein Moment, in dem alle gleichzeitig zum Handy greifen, füllt die Sammlung schneller als jede Karte es je könnte.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Die Leinwand selbst ist die vierte Erinnerung, und sie kostet euch nichts. Sobald die ersten Bilder erscheinen, ziehen die Nachbartische nach. Deshalb lohnt es sich, zwei oder drei eigene Aufnahmen hochzuladen, bevor die Gäste eintreffen – eine leere Fläche wirkt wie ein Fehler, eine gefüllte wie eine Einladung.',
    },

    { type: 'heading', text: 'Beispieltexte zum Übernehmen' },
    {
      type: 'paragraph',
      text: 'Die folgenden Formulierungen könnt ihr wörtlich abschreiben und nur den Anlass austauschen. Sie sind bewusst kurz – jeder zusätzliche Satz senkt die Zahl derer, die ihn zu Ende lesen.',
    },
    {
      type: 'list',
      items: [
        'Beileger zur Einladung: «Wir haben einen Fotografen, aber nur eine Perspektive. Eure gehört dazu. Am Fest steht auf jedem Tisch ein QR-Code – wer mag, lädt darüber seine Bilder hoch, ohne App und ohne Konto.»',
        'Zeile auf der Menü- oder Tischkarte: «Fotografiert ihr heute? Code scannen, Bild aussuchen, abschicken.»',
        'Ansage nach dem Hauptgang, gesprochen von Trauzeuge oder Gotte: «Bevor der Kaffee kommt, kurz etwas in eigener Sache: Auf jedem Tisch steht ein Code. Haltet die Kamera darauf, sucht ein Bild von heute aus und schickt es ab – es läuft gleich hier auf der Leinwand mit. Nehmt ruhig auch die unscharfen, die sind meistens die besten.»',
        'Erinnerung später am Abend: «Von der Tanzfläche fehlen noch Bilder. Der Code steht an der Bar.»',
        'Nachricht am Tag danach: «Danke für gestern. Wer noch Fotos auf dem Handy hat: Der Code von den Tischen funktioniert weiter, und dort liegen inzwischen auch die Bilder der anderen.»',
      ],
    },
    {
      type: 'paragraph',
      text: 'Auffällig an allen fünf Texten ist, was fehlt: Keiner sagt «bitte macht viele Fotos». Sie beschreiben stattdessen eine Handlung aus drei Schritten und ein Ergebnis, das man unmittelbar sieht.',
    },

    { type: 'heading', text: 'Der richtige Moment im Ablauf' },
    {
      type: 'paragraph',
      text: 'Der Zeitpunkt wirkt stärker als die Formulierung. Diese Reihenfolge hat sich bewährt:',
    },
    {
      type: 'ordered',
      items: [
        'Beim Empfang nur die Karten aufstellen, noch keine Ansage machen. Wer gerade ankommt, hat die Hände voll und den Kopf woanders.',
        'Nach dem Hauptgang die Ansage platzieren. Alle sitzen, alle sind satt, das Handy liegt neben dem Glas.',
        'Nach dem ersten Tanz einen zweiten Anlauf nehmen. Jetzt entstehen die Bilder, die auf keiner offiziellen Aufnahme auftauchen.',
        'Am nächsten Vormittag eine einzige Nachricht schicken – und danach nicht mehr nachfassen.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Wer die Bitte nur zu Beginn ausspricht, bekommt Fotos vom Apéro und nichts vom Rest des Abends. Wer sie dreimal wiederholt, nervt. Zwei Anläufe plus eine Nachricht danach treffen es für die meisten Feste.',
    },

    { type: 'heading', text: 'Was ihr besser weglasst' },
    {
      type: 'list',
      items: [
        'Zahlenvorgaben wie «mindestens drei Bilder pro Person». Sie machen aus einem Wunsch eine Aufgabe.',
        'Mehrere Sammelwege nebeneinander. Wer Gruppenchat, Mailadresse und QR-Code gleichzeitig anbietet, erhält am Ende drei halbe Sammlungen.',
        'Lange Erklärtexte auf der Tischkarte. Mehr als drei Zeilen liest bei Kerzenlicht niemand.',
        'Den Hinweis, wofür ihr die Bilder braucht. Ein Projekt im Hintergrund erzeugt Erwartungsdruck und schreckt eher ab.',
        'Fachbegriffe. Upload-Link, Galerie-Zugang und Event-Code sind für euch klar, am Tisch sind sie es nicht.',
        'Eine Ansage von jemandem, der den Ablauf nicht kennt. Wer sie hält, sollte den Code vorher einmal selbst gescannt haben.',
      ],
    },
    {
      type: 'note',
      text: 'Nennt neben der Bitte auch die Grenze. Ein kurzer Hinweis, dass niemand Aufnahmen anderer Personen ohne deren Einverständnis hochladen soll, gehört auf dieselbe Karte. Das ersetzt keine Rechtsberatung, nimmt aber die unangenehmste Situation des Abends vorweg.',
    },

    { type: 'heading', text: 'Wenn trotzdem wenig ankommt' },
    {
      type: 'paragraph',
      text: 'Es gibt Gästekreise, bei denen auch der beste Text wenig ändert. Bei einer Feier mit vielen älteren Gästen ist die Hürde nicht die Formulierung, sondern das Scannen selbst. Dann hilft eine Person, die an zwei, drei Tischen kurz danebensteht – ein Enkel, eine Trauzeugin, irgendjemand mit Geduld.',
    },
    {
      type: 'paragraph',
      text: 'Bei einem Abendessen zu fünfzehnt lohnt sich der ganze Aufbau oft gar nicht. Zwei gezielte Nachrichten am Tag danach bringen dort mehr als ein Aufsteller pro Tisch. Und wenn ihr einen Fotografen habt, der den ganzen Tag begleitet, sind Gästefotos ein Zusatz und kein Ersatz – plant sie auch so ein.',
    },
    {
      type: 'paragraph',
      text: 'Kommen am Ende zwanzig Bilder statt zweihundert zusammen, ist das kein Misserfolg. Zwanzig Aufnahmen aus zwanzig Blickwinkeln zeigen einen Abend, den eine einzelne Kamera nicht einfangen kann.',
    },

    { type: 'heading', text: 'Wohin die Bitte führen sollte' },
    {
      type: 'paragraph',
      text: 'Damit eine gute Formulierung nicht an der Technik scheitert, braucht sie ein Ziel ohne Hürden. Bei EventShot führt der QR-Code auf eine Seite im Browser des Handys: Bild aus der Galerie wählen, abschicken, fertig. Weder App noch Konto stehen dazwischen, und die Aufnahme erscheint sofort in der Live-Slideshow auf Beamer oder TV. Nach dem Fest führt derselbe Code nicht mehr zum Upload, sondern in die digitale Galerie mit allen Aufnahmen des Tages. Gespeichert wird auf unserer eigenen Infrastruktur in der Schweiz, DSG-konform, und nach Ablauf der Galerie verschwinden die Bilder automatisch.',
    },
  ],
  faq: [
    {
      question: 'Sollen wir schon in der Einladung um Fotos bitten?',
      answer:
        'Ja. Die Einladung ist der richtige Ort für die Erlaubnis, aber nicht für die Anleitung. Ein Satz genügt, dass ihr euch Bilder eurer Gäste wünscht. Wie sie abgeschickt werden, erklärt ihr erst am Fest selbst.',
    },
    {
      question: 'Sollen wir die Ansage selbst machen?',
      answer:
        'Nein. Als Gastgeber steht ihr an diesem Abend ohnehin im Mittelpunkt, und eine Bitte in eigener Sache klingt schnell nach Pflichtprogramm. Trauzeugen, Gotte oder wer sonst durch den Abend führt, sagt denselben Satz deutlich beiläufiger.',
    },
    {
      question: 'Müssen unsere Gäste eine App installieren, um Fotos zu schicken?',
      answer:
        'Nein. Der QR-Code öffnet eine gewöhnliche Webseite im Browser des Handys, ohne Installation und ohne Konto. Genau das gehört in die Ansage, denn die Sorge vor dem App-Store ist der häufigste stille Abbruchgrund.',
    },
    {
      question: 'Ist es zu spät, erst am Tag nach dem Fest um Fotos zu bitten?',
      answer:
        'Nein. Viele Gäste sortieren ihre Aufnahmen ohnehin erst zu Hause. Nennt in der Nachricht ein Datum, bis wann ihr sammelt. Ohne Frist wird aus einem Vorsatz für morgen schnell gar nie.',
    },
  ],
  related: [
    {
      title: 'QR-Code auf Tischkarte und Schild richtig gestalten',
      href: '/qr-code-vorlagen',
    },
    {
      title: 'Hochzeitsfotos per QR-Code sammeln',
      href: '/qr-code-fotos-hochzeit',
    },
    {
      title: 'QR-Code-Tischkarten gestalten',
      href: '/ratgeber/qr-code-tischkarten-gestalten',
    },
    { title: 'Live-Fotowand für die Hochzeit', href: '/hochzeit' },
  ],
  ctaTitle: 'Bereit für eure Gästefotos?',
  ctaText:
    'Legt euer Event in wenigen Minuten an, ladet den QR-Code herunter und druckt ihn auf eure Karten. Die Registrierung kostet nichts, bezahlt wird erst beim Buchen eines Events.',
}

export default function GaesteUmFotosBittenPage() {
  return <ArticlePage content={content} />
}
