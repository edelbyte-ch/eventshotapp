import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/einwegkameras-oder-digital',
  title: 'Einwegkameras an der Hochzeit – oder digital?',
  description:
    'Der Klassiker im Vergleich: Kosten, Entwicklung, Ausschuss und Wartezeit gegen sofort sichtbare Gästefotos in der digitalen Galerie.',
})

const content: ArticleContent = {
  image: 'foto-hochladen',
  eyebrow: 'Ratgeber',
  title: 'Einwegkameras oder digitale Fotowand?',
  lead: 'Wollt ihr alle Bilder des Abends behalten und nicht nur einen Zufallsausschnitt, ist die digitale Variante die verlässlichere – Einwegkameras sind dafür das schönere Deko- und Überraschungselement. Wer beides mag, muss sich nicht entscheiden: Ein paar Kameras auf die Tische, den Rest über den QR-Code.',
  path: '/ratgeber/einwegkameras-oder-digital',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Die Frage kommt meistens beim Tischplan auf: Kameras hinlegen, QR-Code aufstellen oder beides? Die beiden Wege lösen unterschiedliche Aufgaben. Einwegkameras schaffen ein Erlebnis am Tisch, die digitale Fotowand sorgt dafür, dass am Ende nichts fehlt. Wer sie gegeneinander abwägt, sollte deshalb nicht nur auf den Preis schauen, sondern auf das, was am Tag danach übrig bleibt.',
    },
    { type: 'heading', text: 'Was Einwegkameras gut können' },
    {
      type: 'paragraph',
      text: 'Der Reiz ist echt und lässt sich digital nicht nachbauen. Wer den analogen Look mag, bekommt ihn nur so:',
    },
    {
      type: 'list',
      items: [
        'Korn, harte Blitzlichter und Farbstiche, die kein Filter überzeugend nachahmt',
        'Keine Kontrolle und keine Wiederholung – dadurch entstehen ungestellte Bilder',
        'Auch Gäste ohne Smartphone machen mit, Kinder besonders gern',
        'Die Kamera liegt als Gegenstand auf dem Tisch und erklärt sich fast von selbst',
        'Funktioniert ohne Strom, ohne Empfang und ohne einen einzigen Klick',
      ],
    },
    { type: 'heading', text: 'Wo sie an Grenzen stossen' },
    {
      type: 'paragraph',
      text: 'Die Einschränkungen zeigen sich fast alle erst nach dem Fest, wenn nichts mehr zu ändern ist.',
    },
    {
      type: 'list',
      items: [
        'Der eingebaute Blitz reicht nur wenige Meter weit – im abgedunkelten Saal und auf der Tanzfläche wird es schwierig',
        'Die Zahl der Aufnahmen steht auf der Packung und ist fix; danach ist die Kamera leer',
        'Niemand sieht, ob ein Bild etwas geworden ist, ein Teil des Films ist am Ende unbrauchbar',
        'Kameras wandern von Tisch zu Tisch, verschwinden oder bleiben liegen',
        'Zwischen Fest und fertigen Bildern liegen Entwicklung und Postweg',
        'Die Gäste sehen ihre eigenen Aufnahmen nie – ausser ihr schickt sie ihnen einzeln zu',
      ],
    },
    {
      type: 'paragraph',
      text: 'Das ist kein Argument gegen Einwegkameras, sondern gegen die Erwartung, sie könnten den Abend vollständig abdecken. Rechnet bei beiden Wegen mit Verlust, nur an verschiedener Stelle: Analog verlieren sich die Bilder, die zu dunkel, verwackelt oder doppelt belichtet sind, und ihr merkt es erst nach der Entwicklung. Digital verliert ihr das, was niemand hochlädt – Aufnahmen, die auf dem Handy liegen bleiben, weil der Gast den Hinweis nie gesehen hat. Der eine Verlust lässt sich nicht beeinflussen, der andere schon.',
    },
    { type: 'heading', text: 'Der Kostenunterschied im Prinzip' },
    {
      type: 'paragraph',
      text: 'Konkrete Preise ändern sich je nach Anbieter und Jahr, deshalb hier nur die Struktur – die bleibt stabil. Bei Einwegkameras zahlt ihr dreimal: den Kaufpreis pro Kamera, die Entwicklung pro Film und, wenn ihr die Bilder auch digital braucht, das Einscannen. Alle drei Posten wachsen mit der Zahl der Kameras, und die wächst mit der Zahl der Tische.',
    },
    {
      type: 'paragraph',
      text: 'Ein Einmalpreis pro Event verhält sich anders: Er bleibt gleich, ob 10 oder 80 Gäste hochladen und ob am Ende 50 oder 500 Bilder zusammenkommen. Das macht die digitale Variante nicht automatisch günstiger – aber planbar, während die analoge Rechnung mit jedem zusätzlichen Tisch steigt.',
    },
    {
      type: 'paragraph',
      text: 'Rechnet beim analogen Weg auch den Aufwand mit, der nach dem Fest anfällt: Filme einsammeln, zum Labor bringen, Abzüge sortieren und die Digitalisierung bestellen. Das ist kein grosser Betrag, aber es sind Wochen, in denen sich niemand zuständig fühlt – und in denen die Kameras in einer Schublade liegen.',
    },
    { type: 'heading', text: 'Sofort oder in ein paar Wochen' },
    {
      type: 'paragraph',
      text: 'Der grösste Unterschied ist nicht der Preis, sondern der Zeitpunkt. Analoge Bilder wirken gerade deshalb, weil man auf sie wartet – zum Abend selbst können sie nichts beitragen. Digitale Gästefotos erscheinen dagegen sofort in der Live-Slideshow auf Beamer oder TV, und das verändert den Abend spürbar: Wer sein Bild auf der Leinwand entdeckt, lädt kurz darauf das nächste hoch.',
    },
    {
      type: 'paragraph',
      text: 'Danach bleibt die digitale Galerie. Alle, die den QR-Code gescannt haben, kommen über denselben Code wieder an die Bilder – auch an die, die sie selbst nicht gemacht haben. Bei Einwegkameras liegt diese Verteilung komplett bei euch.',
    },
    { type: 'heading', text: 'So kombiniert ihr beides' },
    {
      type: 'paragraph',
      text: 'Die Aufteilung ist einfacher, als sie klingt: Die Kameras übernehmen den Tisch, der QR-Code übernimmt den Rest des Saals. So liegt an jedem Ort das Mittel, das dort funktioniert – und ihr müsst euren Gästen nur eine Sache erklären, nicht zwei.',
    },
    {
      type: 'ordered',
      items: [
        'Legt zwei bis drei Kameras auf die Tische, an denen die Gäste sitzen, die selten zum Handy greifen.',
        'Stellt den QR-Code dort auf, wo etwas passiert: beim Apéro, am Dessertbuffet, an der Bar.',
        'Schreibt auf die Tischkarte, was ihr euch wünscht. Ohne Aufforderung passiert wenig, mit einem Satz sehr viel.',
        'Sagt einmal am Abend an, dass die Bilder auf der Leinwand von den Gästen stammen.',
        'Sammelt die Kameras am Schluss bewusst ein – am besten übernimmt das eine Person aus der Trauzeugenrunde.',
        'Bestellt beim Entwickeln gleich die Digitalisierung mit, damit analoge und digitale Bilder am selben Ort landen.',
      ],
    },
    { type: 'heading', text: 'Was EventShot dabei übernimmt' },
    {
      type: 'paragraph',
      text: 'Die Gäste scannen den QR-Code, wählen ein Foto und laden es hoch – ohne App und ohne Konto. Es erscheint sofort in der Live-Slideshow. Danach bleibt die digitale Galerie: 7 Tage bei Basic für CHF 49.-, 30 Tage bei Premium für CHF 99.- und 90 Tage bei Enterprise für CHF 149.-, jeweils einmalig pro Event. Anschliessend werden die Bilder automatisch und DSG-konform von unseren Schweizer Servern gelöscht.',
    },
    {
      type: 'paragraph',
      text: 'Ein Punkt gilt für beide Wege gleich: Nicht alle möchten fotografiert werden. Sagt am Abend einmal, dass niemand mitmachen muss – bei den Kameras auf dem Tisch genauso wie beim QR-Code. Das ist keine Rechtsberatung, sondern die Rücksicht, die eine Feier für alle angenehm macht.',
    },
    {
      type: 'note',
      text: 'Für die Slideshow genügt ein Bildschirm oder Beamer mit Browser und Internetverbindung. Die Gäste laden über ihre eigene Mobilfunkverbindung hoch – ein Gäste-WLAN im Saal ist praktisch, aber keine Voraussetzung.',
    },
    { type: 'heading', text: 'Wann Einwegkameras besser passen' },
    {
      type: 'paragraph',
      text: 'Es gibt Feiern, bei denen die analoge Variante klar vorne liegt: wenn viele eurer Gäste kein Smartphone dabeihaben, wenn ihr euch ausdrücklich wünscht, dass an den Tischen keine Handys liegen, wenn im Saal weder Empfang noch eine brauchbare Verbindung existiert – oder wenn euch genau das Warten auf den Umschlag mit den Abzügen Freude macht. In diesen Fällen ist die digitale Fotowand das falsche Werkzeug, und das sagen wir lieber vorher als nachher.',
    },
  ],
  faq: [
    {
      question: 'Wie viele Einwegkameras brauchen wir?',
      answer:
        'Rechnet mit einer Kamera pro Tisch und legt eine kurze Erklärung dazu, wofür sie gedacht ist. Ohne Hinweis bleibt ein Teil der Filme unbenutzt liegen, mit Hinweis sind manche schon vor dem Dessert voll.',
    },
    {
      question: 'Bekommen unsere Gäste die analogen Bilder auch digital?',
      answer:
        'Nein, nicht von selbst. Erst wenn ihr beim Entwickeln eine Digitalisierung mitbestellt, entstehen Dateien. Die Weitergabe an die Gäste liegt danach bei euch.',
    },
    {
      question: 'Ist der digitale Weg für ältere Gäste zu kompliziert?',
      answer:
        'Nein, meistens nicht. Wer die Kamera am Handy öffnen kann, schafft auch den QR-Code: Code anvisieren, auf die Einblendung tippen, Bild auswählen. Es braucht weder App noch Konto, und wo es doch hakt, hilft eine Person am Tisch in zehn Sekunden weiter.',
    },
    {
      question: 'Funktioniert das auch, wenn im Saal kein WLAN liegt?',
      answer:
        'Ja, sofern Mobilfunkempfang vorhanden ist. Die Gäste laden über ihre eigene Verbindung hoch. Nur das Gerät, auf dem die Slideshow läuft, braucht eine stabile eigene Internetverbindung.',
    },
    {
      question: 'Was passiert mit den digitalen Bildern nach dem Fest?',
      answer:
        'Sie bleiben für die Laufzeit eures Pakets in der digitalen Galerie, also 7, 30 oder 90 Tage. Danach werden sie automatisch gelöscht, deshalb ladet ihr sie vorher herunter.',
    },
  ],
  related: [
    {
      title: 'Was Fotos an der Hochzeit kosten',
      href: '/ratgeber/hochzeitsbudget-fotos',
    },
    { title: 'Alternative zur Mietfotobox', href: '/fotobox-alternative' },
    { title: 'Live-Slideshow auf Beamer oder TV', href: '/live-slideshow' },
    { title: 'QR-Code-Vorlagen zum Ausdrucken', href: '/qr-code-vorlagen' },
  ],
  ctaTitle: 'Bereit für die Bilder eurer Gäste?',
  ctaText:
    'Richtet das Event in wenigen Minuten ein und stellt die QR-Codes neben die Kameras. Die Registrierung ist kostenlos, ihr zahlt erst beim Buchen.',
}

export default function EinwegkamerasOderDigitalPage() {
  return <ArticlePage content={content} />
}
