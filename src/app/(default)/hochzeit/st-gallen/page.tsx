import type { Metadata } from "next";
import {
  type UseCaseContent,
  UseCasePage,
} from "@/components/landing/use-case-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { photoLimitPhrase } from "@/lib/photo-limits";

export const metadata: Metadata = buildMetadata({
  path: "/hochzeit/st-gallen",
  title: "Fotowand Hochzeit St. Gallen – Gästefotos live",
  description:
    "Hochzeit in der Ostschweiz und am Bodensee: Gästefotos per QR-Code, live als Slideshow, danach digitale Galerie. Ohne App, DSG-konform.",
});

const content: UseCaseContent = {
  eyebrow: "EventShot für Hochzeiten in der Ostschweiz",
  title: "Hochzeits-Fotowand für St. Gallen und die Ostschweiz",
  intro:
    "Trauung beim Stiftsbezirk, Apéro auf dem Klosterplatz, Fest im Gewölbekeller oder unten am Bodensee: In der Ostschweiz führt ein Hochzeitstag oft von der Höhe der Stadt hinunter ans Wasser. Die Räume dazwischen sind sehr verschieden gross – der Pfalzkeller beim Klosterplatz fasst nach Betreiberangaben rund 75 bis 300 Personen, die Einstein Hall im Einstein St.Gallen bis etwa 400. Eure Gäste laden ihre Fotos überall per QR-Code hoch, ohne App und ohne Konto, und sehen sie sofort in der Live-Slideshow. Nach dem Fest bleibt euch die digitale Galerie mit allen Bildern – auch mit denen, die ihr an eurem eigenen Tag verpasst habt.",
  ablaufTitle: "So läuft euer Hochzeitstag in der Ostschweiz",
  ablauf: [
    {
      title: "Aufsteller im Gewölbe",
      copy: "Ein Aufsteller beim Eingang, je einer auf den Tischen. Im Kellergewölbe gehört er dorthin, wo Licht hinfällt.",
    },
    {
      title: "Gäste laden hoch",
      copy: "Bild auswählen, hochladen, weiterfeiern. Wer den Nachmittag in der Stadt verbracht hat, lädt am Abend nach.",
    },
    {
      title: "Galerie danach",
      copy: "Derselbe Code öffnet die digitale Galerie – inklusive der Bilder von der Fahrt an den Bodensee.",
    },
  ],
  featuresTitle: "Was zu eurer Hochzeit in St. Gallen passt",
  features: [
    "Foto-Upload per QR-Code, ganz ohne App",
    "Live-Slideshow im Kellergewölbe oder Hotelsaal",
    "Ein QR-Code für Stiftsbezirk, Apéro und Fest",
    "Digitale Galerie für Gäste aus der ganzen Ostschweiz",
    "DSG-konform, Schweizer Hosting",
    "Automatische Löschung nach Galerie-Ablauf",
  ],
  planName: "Premium",
  planPrice: "CHF 99.-",
  planReason:
    `Für eine Ostschweizer Hochzeit empfehlen wir Premium: ${photoLimitPhrase("PREMIUM")} für einen Tag an zwei Orten, einstellbare Anzeigedauer der Slideshow und 30 Tage digitale Galerie – Zeit genug, bis auch die Bilder vom Bodensee vollständig beisammen sind.`,
  faq: [
    {
      question:
        "Unsere Gäste kommen aus dem Rheintal und dem Toggenburg. Müssen sie eine App installieren?",
      answer:
        "Nein. Sie halten die Handykamera an den QR-Code, die Webseite öffnet sich im Browser, dann wählen sie ein Foto und laden es hoch. Ohne App, ohne Konto und ohne Registrierung – das gilt für die Nachbarin aus Wittenbach genauso wie für den Cousin, der erst zum Dessert aus Buchs anreist.",
    },
    {
      question: "Wie lange bleibt die Galerie nach unserer Hochzeit offen?",
      answer:
        "Im Premium-Plan 30 Tage, erreichbar über denselben QR-Code wie am Fest. Danach werden alle Fotos automatisch und DSG-konform von unseren Schweizer Servern gelöscht – ladet die Bilder, die ihr behalten wollt, also innerhalb dieser Frist herunter.",
    },
    {
      question: "Was brauchen wir im Gewölbe oder im Saal vor Ort?",
      answer:
        "Einen Beamer oder Bildschirm mit Browser und eine Internetverbindung. Die beiden Ostschweizer Raumtypen verhalten sich dabei gegensätzlich: Im fensterlosen Kellergewölbe ist eine Leinwand schon am Nachmittag gut lesbar, während in den Sälen am Bodensee mit ihren Fensterfronten bis in den Abend hinein ein heller Bildschirm die bessere Wahl ist. Klärt bei der Besichtigung ausserdem, ob es ein Gäste-WLAN gibt.",
    },
    {
      question:
        "Welche Arten von Hochzeitslocations gibt es in St. Gallen und der Ostschweiz?",
      answer:
        "Vier Muster prägen die Region: Kellergewölbe und Säle rund um den Klosterplatz, Stadthotels mit eigenem Bankettsaal, Häuser direkt am Bodenseeufer und Landgasthöfe im Toggenburg. Der Pfalzkeller mit der Neuen Pfalz steht für die Gewölbe-Variante und nennt rund 75 bis 300 Personen, das Einstein St.Gallen für das Stadthotel mit der Einstein Hall für bis zu rund 400 Personen, das Würth Haus Rorschach für die Häuser am See (jeweils Angaben der Betreiber). Diese Namen dienen ausschliesslich als Beispiel für die Art von Ort; eine Zusammenarbeit mit diesen Häusern besteht nicht.",
    },
    {
      question:
        "Wir heiraten in der Stadt und feiern unten am Bodensee. Worauf sollten wir achten?",
      answer:
        "Vor allem auf den Höhenunterschied: St. Gallen liegt spürbar höher als das Ufer bei Rorschach, die Abende in der Stadt bleiben kühler als unten am Wasser. Plant für den Apéro entsprechend, und rechnet mit einer Lücke während der Fahrt. Die Fotos aus dieser Zwischenzeit gehen nicht verloren – sie werden am Zielort hochgeladen und laufen dort in der Slideshow mit.",
    },
  ],
  ctaTitle: "Bereit für eure Foto-Wand in St. Gallen?",
  ctaText:
    "Richtet euer Hochzeits-Event in wenigen Minuten ein, lange bevor der erste Gast am Klosterplatz steht – Registrierung kostenlos, ihr zahlt erst beim Buchen.",
  breadcrumb: { name: "St. Gallen", path: "/hochzeit/st-gallen" },
};

export default function HochzeitStGallenPage() {
  return <UseCasePage content={content} />;
}
