import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/geburtstagsparty-fotos-sammeln',
  title: 'Fotos an der Geburtstagsparty sammeln',
  description:
    'Wie du an deiner Party alle Bilder an einem Ort zusammenbringst – ohne Gruppenchat, ohne App und ohne Nachfragen am Tag danach.',
})

const content: ArticleContent = {
  image: 'leinwand-gruppenfoto',
  eyebrow: 'Ratgeber',
  title: 'Fotos an der Geburtstagsparty sammeln',
  lead: 'Kurz gesagt: Lege vor der Party einen einzigen Ort fest, an dem alle Bilder landen, und zeige ihn deinen Gästen am Abend selbst – wer erst am Tag danach nachfragt, bekommt nur einen Bruchteil der Fotos.',
  path: '/ratgeber/geburtstagsparty-fotos-sammeln',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'An einer Geburtstagsparty fotografieren fast alle. Am Montag danach liegen die Bilder trotzdem verstreut auf zwanzig Handys, in zwei Gruppenchats und in Storys, die längst wieder verschwunden sind. Das Problem ist selten die Technik – es ist der Zeitpunkt, zu dem du deine Gäste fragst.',
    },
    { type: 'heading', text: 'Warum der Tag danach zu spät ist' },
    {
      type: 'paragraph',
      text: 'Wer am Abend feiert, denkt nicht ans Sortieren. Sobald die Party vorbei ist, sinkt die Lust, den eigenen Fotoordner durchzugehen, mit jedem Tag weiter. Dazu kommt eine Hürde, die leicht unterschätzt wird: Ohne festen Sammelort muss jeder Gast selbst entscheiden, welche Bilder überhaupt taugen, an wen sie gehen und auf welchem Weg. Diese drei Entscheidungen kosten mehr Überwindung als das Hochladen selbst.',
    },
    {
      type: 'paragraph',
      text: 'Zeigst du den Ort dagegen schon während der Feier, entsteht die Bereitschaft im Moment der Aufnahme. Jemand macht ein gutes Bild, sieht den Hinweis auf dem Tisch und lädt es hoch, solange es noch offen auf dem Display liegt. Über die Ausbeute entscheidet deshalb die Vorbereitung, nicht das Nachfassen.',
    },
    { type: 'heading', text: 'Drei Wege im Vergleich' },
    {
      type: 'paragraph',
      text: 'Es gibt keinen Weg, der für jede Party der richtige ist. Die Wahl hängt an drei Fragen: Wie viele Gäste kommen, kennen sich alle untereinander, und was soll mit den Bildern nach der Feier passieren.',
    },
    {
      type: 'paragraph',
      text: 'Der Gruppenchat ist der naheliegendste Weg und für eine kleine Runde oft der beste. Wenn zehn Leute feiern, die ohnehin im selben Chat schreiben, brauchst du nichts anderes. Zwei Nachteile solltest du kennen: Messenger rechnen Bilder beim Versand herunter, du bekommst also nicht die Aufnahme in Originalqualität. Und wer nicht im Chat ist – die Nachbarin, der Arbeitskollege, die Tante –, kann weder etwas beitragen noch mitschauen.',
    },
    {
      type: 'paragraph',
      text: 'Ein geteiltes Fotoalbum in der Cloud löst das Qualitätsproblem. Dafür braucht jeder Gast ein Konto beim passenden Dienst und muss eine Einladung annehmen. Bei gemischtem Publikum scheitert es genau dort: Wer den Dienst nicht ohnehin nutzt, meldet sich mitten in der Party nicht neu an. Für die Familie, die dasselbe Ökosystem verwendet, ist es dagegen eine saubere Lösung.',
    },
    {
      type: 'paragraph',
      text: 'Eine Upload-Seite mit QR-Code dreht die Logik um: Der Gast scannt den Code, wählt seine Bilder aus und ist fertig – ohne App und ohne Konto. Der Aufwand liegt bei dir in der Vorbereitung statt bei zwanzig Gästen im entscheidenden Moment. Dafür brauchst du einen Anbieter, brauchbaren Empfang am Ort und einen ausgedruckten Code.',
    },
    { type: 'heading', text: 'Der Ablauf, Schritt für Schritt' },
    {
      type: 'ordered',
      items: [
        'Eine Woche vorher: Sammelort auswählen und einmal selbst durchspielen – mit dem eigenen Handy, genau so, wie es ein Gast tun würde.',
        'Drei Tage vorher: Den Hinweis in die Einladung oder in den Gruppenchat schreiben, damit am Abend niemand überrascht wird.',
        'Am Tag der Party: Code ausdrucken und aufstellen. Ein Aufsteller pro Tisch, dazu einer beim Buffet und einer bei der Bar.',
        'Beim Anstossen: Zwei Sätze sagen. Wo die Bilder hinkommen, wie lange sie dort bleiben und dass niemand mitmachen muss.',
        'Später am Abend: Einmal daran erinnern, wenn die Stimmung am höchsten ist – meistens nach dem Essen oder nach der Torte.',
        'Am nächsten Tag: Den Link ein letztes Mal in den Gruppenchat stellen, für alle, die es unterwegs vergessen haben.',
        'Innerhalb der Frist: Die Bilder, die du behalten willst, herunterladen und dort ablegen, wo deine übrigen Erinnerungen auch liegen.',
      ],
    },
    { type: 'heading', text: 'Damit die Gäste wirklich hochladen' },
    {
      type: 'paragraph',
      text: 'Die Beteiligung hängt weniger am Werkzeug als an ein paar Kleinigkeiten, die in der Hektik gern untergehen.',
    },
    {
      type: 'list',
      items: [
        'Sichtbarkeit vor Gestaltung: Lieber vier schlichte Aufsteller im Raum als eine schöne Karte am Eingang, die nach zehn Minuten niemand mehr anschaut.',
        'Ein Bildschirm ist die beste Aufforderung: Wer das eigene Foto gross im Raum sieht, lädt das nächste von selbst hoch.',
        'Eine kurze Ansage schlägt jeden gedruckten Text, weil sie den Zeitpunkt vorgibt und alle gleichzeitig erreicht.',
        'Kein Druck: Sag ausdrücklich, dass niemand etwas beisteuern muss. Das macht es gerade für zurückhaltende Gäste einfacher.',
        'Eine helfende Hand: Ältere Gäste scannen ungern selbst. Wenn jemand aus der Familie kurz aushilft, sind ihre Aufnahmen auch dabei.',
        'Ein Reserveplan: Notiere den Link zusätzlich in Klarschrift auf den Aufsteller, falls eine Kamera den Code nicht erkennt.',
      ],
    },
    { type: 'heading', text: 'Was du vorher klären solltest' },
    {
      type: 'paragraph',
      text: 'Sobald Bilder von anderen Personen an einem gemeinsamen Ort liegen, werden Personendaten bearbeitet. Das Schweizer Datenschutzgesetz verlangt dabei vor allem Transparenz: Die Abgebildeten sollen wissen, wohin ihre Bilder gehen, wer sie sehen kann und wie lange sie gespeichert bleiben. In der Praxis heisst das für eine Party keine Formulare, sondern einen klaren Satz auf dem Aufsteller und eine Ansage, die alle mitbekommen.',
    },
    {
      type: 'paragraph',
      text: 'Zwei Punkte lohnen sich zusätzlich. Erstens: Wer nicht fotografiert werden möchte, soll das sagen können, ohne sich zu erklären – und du entfernst das betreffende Bild danach kommentarlos aus der Galerie. Zweitens: Feiern Kinder mit, entscheiden deren Eltern darüber, ob die Aufnahmen in die Sammlung dürfen. Beides klärt sich in einem Nebensatz, wenn du es früh genug ansprichst.',
    },
    {
      type: 'note',
      text: 'Dieser Abschnitt beschreibt die übliche Praxis für eine private Feier und ersetzt keine Rechtsberatung. Sobald Bilder später veröffentlicht werden sollen – auf einer Website oder in sozialen Netzwerken –, gelten deutlich strengere Anforderungen als beim Sammeln im geschlossenen Kreis.',
    },
    { type: 'heading', text: 'Wann sich ein eigener Sammelort lohnt' },
    {
      type: 'paragraph',
      text: 'Ehrlich gesagt: Bei acht Leuten, die sich alle kennen und im selben Chat schreiben, brauchst du dafür kein zusätzliches Werkzeug. Interessant wird ein eigener Sammelort ab dem Moment, in dem die Gästeliste gemischt ist – Familie, Freundeskreis, Arbeit, Nachbarschaft – und niemand alle anderen auf einem Kanal erreicht.',
    },
    {
      type: 'paragraph',
      text: 'Genau dafür ist EventShot gedacht. Deine Gäste scannen den QR-Code, wählen ein Bild und laden es hoch, ohne App und ohne Konto. Es läuft sofort in der Live-Slideshow auf TV oder Beamer, und über denselben Code kommst du danach an die digitale Galerie. Für einen Geburtstag genügt Basic zu CHF 49.- pro Event mit 7 Tagen Galerie; wer den Gästen mehr Zeit zum Herunterladen lassen will, nimmt Premium zu CHF 99.- mit 30 Tagen.',
    },
    {
      type: 'paragraph',
      text: 'Was es nicht sein will, ist ein dauerhaftes Fotoarchiv. Nach Ablauf der Galerie werden alle Bilder automatisch und DSG-konform von den Schweizer Servern gelöscht. Wer sie behalten möchte, lädt sie vorher herunter. Für dich als Gastgeber ist das eher ein Vorteil: Die Frist zwingt dich, die Auswahl gleich zu treffen, statt sie zwei Jahre vor dir herzuschieben.',
    },
  ],
  faq: [
    {
      question: 'Wie viele Fotos kommen an einer Party wirklich zusammen?',
      answer:
        'Das hängt fast nur davon ab, ob der Sammelort während der Feier sichtbar ist. Belastbare Durchschnittswerte gibt es dafür nicht, dafür sind Partys zu unterschiedlich – der Unterschied zwischen Ansage am Abend und Nachfrage am Tag danach ist aber deutlich spürbar.',
    },
    {
      question: 'Brauchen meine Gäste dafür WLAN?',
      answer:
        'Nein. Für den Upload genügt der normale Mobilfunk. Nur wenn die Feier im Keller, im Gewölbe oder in einer Berghütte stattfindet, lohnt sich ein Gäste-WLAN mit gut lesbarem Passwort direkt neben dem QR-Code.',
    },
    {
      question: 'Was mache ich mit einem Bild, das jemand nicht dabeihaben will?',
      answer:
        'Nimm es aus der Galerie, ohne darüber zu diskutieren. Als Veranstalter kannst du einzelne Fotos nachträglich löschen, und die Person muss dafür keinen Grund nennen.',
    },
    {
      question: 'Lohnt sich das auch ohne Beamer im Raum?',
      answer:
        'Ja. Ein Fernseher oder ein grosses Tablet reicht völlig, um die Bilder sichtbar zu machen. Ganz ohne Bildschirm bleibt der Nutzen, dass alle Fotos an einem Ort liegen – der sichtbare Ablauf ist allerdings der stärkste Anreiz zum Hochladen.',
    },
  ],
  related: [
    { title: 'Fotowand & Slideshow für deinen Geburtstag', href: '/geburtstag' },
    { title: 'Fotobox ohne App: QR-Code statt Download', href: '/fotobox-ohne-app' },
    { title: 'QR-Code auf Tischkarte und Schild gestalten', href: '/qr-code-vorlagen' },
    { title: 'Live-Slideshow für Beamer und TV', href: '/live-slideshow' },
  ],
  ctaTitle: 'Alle Party-Fotos an einem Ort',
  ctaText:
    'Du legst dein Event in wenigen Minuten an und druckst den QR-Code aus. Das Konto anzulegen ist kostenlos, bezahlt wird erst beim Buchen des Events.',
}

export default function GeburtstagspartyFotosSammelnPage() {
  return <ArticlePage content={content} />
}
