import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/taufe-fotos-diskret-sammeln',
  title: 'Fotos an der Taufe sammeln – diskret & sicher',
  description:
    'Kinderfotos im Familienkreis: wie ihr Bilder sammelt, wer sie sehen darf und wann sie wieder gelöscht werden. DSG-konform erklärt.',
})

const content: ArticleContent = {
  image: 'leinwand-familie',
  eyebrow: 'Ratgeber',
  title: 'Fotos an der Taufe diskret sammeln',
  lead: 'Kurz gesagt: Sammelt die Aufnahmen an einem Ort, der nur den geladenen Gästen offensteht, sagt vorher, wie lange sie dort bleiben – und bittet ausdrücklich darum, nichts öffentlich zu posten. Damit bleibt der Tag eine Erinnerung im Familienkreis.',
  path: '/ratgeber/taufe-fotos-diskret-sammeln',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Eine Taufe ist die erste Feier im Leben eines Menschen, der noch zu keiner Aufnahme etwas sagen kann. Genau das macht das Fotosammeln hier heikler als an jeder anderen Familienfeier: Es wird viel fotografiert, die Bilder zeigen ein Kind, und ihr entscheidet stellvertretend darüber, wo sie am Ende liegen.',
    },
    { type: 'heading', text: 'Warum bei einer Taufe andere Überlegungen gelten' },
    {
      type: 'paragraph',
      text: 'Der Kreis ist klein, aber ungewöhnlich breit gemischt: Grosseltern, Paten, Geschwister, Nachbarn aus dem Dorf, manchmal Bekannte aus der Kirchgemeinde. Diese Leute kennen sich untereinander oft kaum und haben sehr unterschiedliche Vorstellungen davon, was man mit einem Kinderfoto macht. Die einen schicken es niemandem, die anderen stellen es noch am selben Abend in ein soziales Netzwerk.',
    },
    {
      type: 'paragraph',
      text: 'Dazu kommt der zeitliche Horizont. Ein Partyfoto ist nach zwei Jahren belanglos, ein Bild vom Taufkleid begleitet ein Kind noch, wenn es selbst darüber entscheiden könnte. Wer die Bilder gesammelt hat und wie lange sie irgendwo abrufbar bleiben, ist deshalb keine technische Nebenfrage, sondern gehört zur Planung des Tages.',
    },
    { type: 'heading', text: 'Was das Schweizer Datenschutzrecht dazu sagt' },
    {
      type: 'paragraph',
      text: 'Aufnahmen, auf denen Personen erkennbar sind, gelten als Personendaten. Das Schweizer Datenschutzgesetz knüpft daran ein paar einfache Grundsätze: Die Bearbeitung soll für die Betroffenen erkennbar sein, sie darf nicht weiter gehen, als der Zweck es verlangt, und die Daten dürfen nicht länger aufbewahrt werden, als dieser Zweck es erfordert. Beim Kind kommt der zivilrechtliche Persönlichkeitsschutz dazu – das Recht am eigenen Bild steht ihm selbst zu, ausgeübt wird es bis auf Weiteres von euch.',
    },
    {
      type: 'paragraph',
      text: 'Für eine Taufe bedeutet das drei Dinge. Ihr entscheidet, ob und wo Bilder eures Kindes zusammengetragen werden. Die Gäste sollen vorher wissen, wohin ihre Aufnahmen gehen und wie lange sie dort liegen. Und das Sammeln im geladenen Kreis ist etwas anderes als eine Veröffentlichung: Sobald ein Bild in einem offenen Netzwerk landet, verlasst ihr diesen Rahmen und könnt die weitere Verbreitung nicht mehr steuern.',
    },
    {
      type: 'note',
      text: 'Das ist eine Beschreibung der üblichen Praxis und ersetzt keine Rechtsberatung. Wer eine verbindliche Einschätzung braucht – etwa weil in der Familie Uneinigkeit besteht oder weil Bilder veröffentlicht werden sollen –, holt sie bei einer Fachperson.',
    },
    { type: 'heading', text: 'Die Bitte an die Gäste, konkret formuliert' },
    {
      type: 'paragraph',
      text: 'Der wirksamste Schritt kostet nichts: Sagt es klar und einmal für alle. Eine Bitte, die einen Grund nennt, wird deutlich häufiger befolgt als ein Verbot ohne Begründung. Ein Satz auf dem Aufsteller und derselbe Satz laut vor dem Essen reichen aus.',
    },
    {
      type: 'paragraph',
      text: 'Als Vorlage zum Übernehmen: «Wir sammeln die Fotos von heute an einem Ort, damit alle sie bekommen. Bitte ladet sie über den QR-Code hoch, statt sie in sozialen Netzwerken zu teilen – wir möchten die Bilder unseres Kindes im Familienkreis behalten.» Wer die Formulierung freundlicher mag, ergänzt sie um den Hinweis, dass die Galerie nach einer festen Frist wieder verschwindet.',
    },
    { type: 'heading', text: 'Woran ihr einen geschlossenen Sammelort erkennt' },
    {
      type: 'paragraph',
      text: 'Die Werkzeuge sehen von aussen ähnlich aus, unterscheiden sich aber genau in den Punkten, auf die es bei Kinderfotos ankommt. Diese sechs Fragen klären das vor der Buchung, unabhängig vom Anbieter.',
    },
    {
      type: 'list',
      items: [
        'Ist die Galerie nur über einen nicht erratbaren Link erreichbar – oder kann sie in Suchmaschinen auftauchen?',
        'Wo stehen die Server, und wer hat neben euch Zugriff auf die Bilder?',
        'Gibt es eine feste Löschfrist, oder bleiben die Aufnahmen liegen, bis jemand daran denkt?',
        'Könnt ihr einzelne Bilder nachträglich entfernen, wenn ein Gast darum bittet?',
        'Müssen die Gäste ein Konto anlegen? Jedes zusätzliche Konto ist ein weiterer Ort, an dem etwas gespeichert wird.',
        'Was steht in den Nutzungsbedingungen zur Weiterverwendung der Bilder? Dieser Abschnitt ist kurz und lohnt die fünf Minuten.',
      ],
    },
    { type: 'heading', text: 'Der Ablauf rund um den Tauftag' },
    {
      type: 'ordered',
      items: [
        'Zwei Wochen vorher: Untereinander klären, wie offen ihr mit den Bildern umgehen wollt. Diese Entscheidung trefft ihr besser in Ruhe als zwischen Kirche und Apéro.',
        'Eine Woche vorher: Sammelort einrichten, Frist festlegen und den Ablauf einmal mit dem eigenen Handy durchspielen.',
        'Drei Tage vorher: Die Paten und die Grosseltern kurz informieren. Sie fotografieren am meisten und geben die Bilder am ehesten weiter.',
        'Am Tauftag: Aufsteller mit Code und Hinweistext beim Apéro und auf den Tischen platzieren, nicht nur beim Eingang.',
        'Vor dem Essen: Die Bitte einmal laut aussprechen, in zwei Sätzen und ohne erhobenen Zeigefinger.',
        'In den Tagen danach: Den Link an alle schicken, mit dem Datum, an dem die Galerie schliesst. Ein konkretes Datum wirkt besser als «in einem Monat».',
        'Vor Fristende: Eure Auswahl herunterladen und dorthin legen, wo die Familienbilder ohnehin archiviert werden.',
      ],
    },
    { type: 'heading', text: 'Die Löschfrist gehört zur Planung' },
    {
      type: 'paragraph',
      text: 'Eine Sammlung, die niemand je schliesst, ist das eigentliche Risiko. Sie wird nicht durch einen Angriff zum Problem, sondern durch Vergessen: Der Link wandert weiter, die Familie wächst, und irgendwann weiss niemand mehr, wer alles Zugriff hat. Eine feste Frist löst das, ohne dass ihr euch etwas merken müsst.',
    },
    {
      type: 'paragraph',
      text: 'Sinnvoll ist eine Frist, die lange genug für alle Nachzügler ist und kurz genug, dass ihr die Auswahl nicht ewig aufschiebt. Für eine Taufe reichen meist ein bis vier Wochen, je nachdem, wie weit die Paten verstreut wohnen. Wichtig ist nur, dass die Frist von Anfang an feststeht und dass alle sie kennen.',
    },
    { type: 'heading', text: 'Wenn EventShot dazu passt – und wann nicht' },
    {
      type: 'paragraph',
      text: 'EventShot ist für genau diesen Fall gebaut: Die Gäste scannen den QR-Code, wählen ein Bild und laden es hoch, ohne App und ohne Konto. Es läuft ruhig über den Bildschirm im Restaurant, und unter den Aufnahmen steht kein Absendername. Die Fotos liegen DSG-konform auf unserer eigenen Infrastruktur in der Schweiz, kein Drittanbieter ist beteiligt, und nach Ablauf der Galerie werden sie automatisch gelöscht. Die Frist wählt ihr über den Plan: Basic zu CHF 49.- pro Event mit 7 Tagen, Premium zu CHF 99.- mit 30 Tagen.',
    },
    {
      type: 'paragraph',
      text: 'Für kleine Taufen gilt aber dasselbe wie überall: Wenn nur Gotte und Götti fotografieren und ihr euch danach ohnehin seht, braucht es kein Werkzeug dazwischen. Und wer die Bilder dauerhaft aufbewahren will, kommt um ein eigenes Archiv nicht herum – eine Galerie mit automatischer Löschung ist der Sammelpunkt für ein paar Wochen, nicht das Familienalbum für zwanzig Jahre.',
    },
  ],
  faq: [
    {
      question: 'Dürfen wir Fotos unseres Patenkindes überhaupt sammeln?',
      answer:
        'Ja, im privaten Rahmen und mit dem Einverständnis der Eltern. Entscheidend ist, dass die Eltern wissen und wollen, wo die Bilder ihres Kindes zusammenlaufen – und dass die Sammlung nicht öffentlich einsehbar ist.',
    },
    {
      question: 'Wie halten wir Gäste davon ab, Bilder öffentlich zu posten?',
      answer:
        'Technisch gar nicht, denn die Aufnahmen liegen auf deren eigenen Geräten. Wirksam ist nur die klare, freundlich begründete Bitte vor Ort – und ein Sammelort, der das Teilen im Familienkreis so einfach macht, dass der Umweg über ein Netzwerk unattraktiv wird.',
    },
    {
      question: 'Können wir ein einzelnes Bild wieder entfernen?',
      answer:
        'Ja. Als Veranstalter löscht ihr einzelne Fotos nachträglich aus der Galerie. Das ist der übliche Weg, wenn ein Gast sich später unwohl mit einer Aufnahme fühlt.',
    },
    {
      question: 'Kommen die Grosseltern ohne Vorkenntnisse damit zurecht?',
      answer:
        'Ja. Es braucht nur die Kamera-App des Handys: Code scannen, Seite öffnet sich im Browser, Bild auswählen. Wenn jemand unsicher ist, hilft es, den Ablauf beim Apéro einmal vorzumachen.',
    },
    {
      question: 'Was passiert mit den Bildern nach Ablauf der Galerie?',
      answer:
        'Sie werden automatisch und vollständig von den Schweizer Servern gelöscht. Wer Aufnahmen behalten möchte, lädt sie vorher herunter; danach lässt sich nichts mehr wiederherstellen.',
    },
  ],
  related: [
    { title: 'Fotowand & Slideshow für die Taufe', href: '/taufe' },
    { title: 'Fotowand für Konfirmation und Firmung', href: '/konfirmation' },
    { title: 'Fotowand fürs Familienfest', href: '/familienfest' },
  ],
  ctaTitle: 'Bilder der Taufe im Familienkreis',
  ctaText:
    'Ihr richtet das Event in wenigen Minuten ein und legt die Dauer der Galerie gleich mit fest. Registrieren könnt ihr euch kostenlos, bezahlt wird erst beim Buchen.',
}

export default function TaufeFotosDiskretSammelnPage() {
  return <ArticlePage content={content} />
}
