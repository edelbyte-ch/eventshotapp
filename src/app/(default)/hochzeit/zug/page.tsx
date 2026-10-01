import type { Metadata } from "next";
import {
  type UseCaseContent,
  UseCasePage,
} from "@/components/landing/use-case-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { photoLimitPhrase } from "@/lib/photo-limits";

export const metadata: Metadata = buildMetadata({
  path: "/hochzeit/zug",
  title: "Hochzeits-Fotowand Zug – Gästefotos live",
  description:
    "Hochzeit am Zugersee, in Cham oder Baar: Fotos der Gäste per QR-Code sammeln, live zeigen und danach behalten. Ohne App, DSG-konform.",
});

const content: UseCaseContent = {
  eyebrow: "EventShot für Hochzeiten am Zugersee",
  title: "Hochzeits-Fotowand für Zug und den Zugersee",
  intro:
    "Trauung in der Zuger Altstadt, Apéro am Seeufer, Fest in Cham oder Baar: Im kleinsten Hochzeitsradius der Innerschweiz liegen die Stationen eines Tages selten mehr als eine Viertelstunde auseinander. Die Gästeliste reicht dafür weit über den Kanton hinaus – in Zug sitzen laut dem Branchenreport der CV VC 719 der 1’749 Blockchain-Unternehmen des Crypto Valley, dazu zahlreiche weitere internationale Firmensitze, und entsprechend gemischt sind die Tische. Alle laden ihre Fotos per QR-Code hoch, ohne App und ohne Konto, und das Bild erscheint sofort in der Live-Slideshow. Nach dem Fest bleibt euch die digitale Galerie, auf die auch angereiste Gäste von zu Hause aus zugreifen.",
  ablaufTitle: "So läuft euer Hochzeitstag rund um Zug",
  ablauf: [
    {
      title: "Code am Seeufer",
      copy: "Ein Aufsteller beim Apéro am Wasser, später je einer auf den Tischen im Saal. Mehr Vorbereitung braucht es nicht.",
    },
    {
      title: "Scannen und hochladen",
      copy: "Scannen, Foto auswählen, hochladen. Auch wer erst nach Feierabend aus Zürich eintrifft, macht sofort mit.",
    },
    {
      title: "Galerie danach",
      copy: "Gäste, die am Montag zurückreisen, öffnen die digitale Galerie später über genau denselben Code.",
    },
  ],
  featuresTitle: "Was zu eurer Hochzeit am Zugersee passt",
  features: [
    "Foto-Upload per QR-Code, ganz ohne App",
    "Live-Slideshow auf Beamer oder TV im Festsaal",
    "Ein QR-Code für Zug, Cham und Baar",
    "Digitale Galerie auch für weit angereiste Gäste",
    "DSG-konform, Schweizer Hosting",
    "Automatische Löschung nach Galerie-Ablauf",
  ],
  planName: "Premium",
  planPrice: "CHF 99.-",
  planReason:
    `Für eine Hochzeit am Zugersee passt Premium: ${photoLimitPhrase("PREMIUM")} vom Apéro bis spät in die Nacht, einstellbare Anzeigedauer der Slideshow und 30 Tage digitale Galerie – damit auch Gäste, die kurz nach dem Fest wieder zurückfliegen, in Ruhe an ihre Bilder kommen.`,
  faq: [
    {
      question: "Müssen unsere Gäste für den Upload eine App installieren?",
      answer:
        "Nein. QR-Code scannen, Foto auswählen, hochladen – fertig. Es braucht weder App noch Konto, und das Bild läuft gleich darauf in der Live-Slideshow mit. Das hilft besonders, wenn ein Teil der Gesellschaft erst am Vorabend in Zug eintrifft und niemand während des Fests etwas einrichten mag.",
    },
    {
      question: "Wie lange kommen wir nach dem Fest an die Fotos?",
      answer:
        "Mit Premium bleibt die digitale Galerie 30 Tage offen. Weil bei Zuger Hochzeiten oft ein Teil der Gäste innert weniger Tage wieder abreist, ist diese Frist die eigentliche Sammelzeit: Alle sehen und holen ihre Bilder in Ruhe von zu Hause aus. Danach werden die Fotos automatisch und DSG-konform von unseren Schweizer Servern gelöscht.",
    },
    {
      question:
        "Der Apéro ist am Seeufer, das Fest im Saal – wo läuft die Slideshow?",
      answer:
        "Dort, wo ein Bildschirm oder Beamer steht, also in aller Regel drinnen. Am Wasser lohnt sich keine Projektion: Gegen die Abendsonne über dem Zugersee bleibt jede Leinwand blass. Die Bilder vom Apéro sind aber längst hochgeladen und laufen ab der ersten Minute im Saal mit, sobald ihr die Slideshow im Browser öffnet.",
    },
    {
      question:
        "Welche Arten von Hochzeitslocations gibt es rund um den Zugersee?",
      answer:
        "Vier Muster sind typisch für den kleinen Kanton: Häuser direkt am Seeufer, Säle in der Zuger Altstadt, Mehrzwecksäle in den Agglomerationsgemeinden und Stadthotels mit Bankettbetrieb. Das Theater Casino Zug am Ufer nennt Anlässe bis rund 600 Personen, der Burgbachsaal steht mit seinem Foyer für die Altstadt-Variante, der Lorzensaal Cham für den grossen Mehrzwecksaal und das Parkhotel Zug für das Hotel im Stadtzentrum (Angaben der Betreiber). Die Namen stehen hier nur als Beispiel für die Art von Ort; eine Verbindung zu diesen Häusern besteht nicht.",
    },
    {
      question:
        "Ein Teil unserer Gäste spricht kaum Deutsch. Klappt der Upload trotzdem?",
      answer:
        "Ja. Der ganze Weg besteht aus drei Handgriffen: Code scannen, Foto auswählen, hochladen. Wer unsicher ist, sieht das eigene Bild kurz darauf auf der Leinwand – diese Bestätigung kommt ohne Worte aus.",
    },
  ],
  ctaTitle: "Bereit für eure Foto-Wand am Zugersee?",
  ctaText:
    "Legt euer Hochzeits-Event in wenigen Minuten an, samt QR-Code für Trauung, Apéro und Fest – Registrierung kostenlos, ihr zahlt erst beim Buchen.",
  breadcrumb: { name: "Zug", path: "/hochzeit/zug" },
};

export default function HochzeitZugPage() {
  return <UseCasePage content={content} />;
}
