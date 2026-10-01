import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/motion";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, faqNode, graph } from "@/lib/seo/schema";
import { photoLimitPhrase, photoLimitRange } from "@/lib/photo-limits";

export const metadata: Metadata = buildMetadata({
  path: "/qr-code-fotos-hochzeit",
  title: "Hochzeitsfotos per QR-Code sammeln",
  description:
    "So sammelt ihr Gästefotos per QR-Code: Code aufstellen, Gäste laden hoch, Bilder erscheinen live. Ohne App, DSG-konform, Schweizer Hosting.",
});

const schritte = [
  {
    title: "Event anlegen",
    copy: "Ihr erstellt euer Hochzeits-Event, wählt das Paket und erhaltet den QR-Code für den Upload dazu.",
  },
  {
    title: "Code sichtbar machen",
    copy: "Ein Aufsteller pro Tisch, dazu einer beim Empfang: Was gesehen wird, wird auch gescannt.",
  },
  {
    title: "Gäste laden hoch",
    copy: "Kamera auf den Code halten, Bild aus der Handy-Galerie wählen, abschicken. Weder App noch Konto stehen dazwischen.",
  },
  {
    title: "Galerie danach",
    copy: "Derselbe Code öffnet später die digitale Galerie mit allen Aufnahmen des Tages.",
  },
];

const orte = [
  {
    title: "Auf jedem Tisch",
    copy: "Zwischen Menükarte und Blumen gehört der Code an den Platz, an dem eure Gäste am längsten sitzen.",
  },
  {
    title: "Beim Empfang",
    copy: "Wer ankommt, hat das Handy ohnehin in der Hand – die ersten Bilder entstehen vor dem Apéro.",
  },
  {
    title: "An der Bar",
    copy: "Am Getränketisch bleiben die Leute stehen und plaudern. Ein kleiner Aufsteller reicht dort völlig.",
  },
  {
    title: "Neben der Torte",
    copy: "Das Anschneiden fotografieren fast alle. Ein Hinweis daneben führt die Bilder direkt zusammen.",
  },
  {
    title: "Neben der Leinwand",
    copy: "Wer die Slideshow sieht, versteht sofort, wohin das eigene Foto gehört.",
  },
];

const merkmale = [
  "Ein Handy mit Kamera genügt euren Gästen",
  "Foto-Upload per QR-Code, ganz ohne App",
  "Kein Konto, kein Login, kein Passwort",
  "Jedes Bild erscheint sofort in der Live-Slideshow",
  `Je nach Paket ${photoLimitRange()} pro Feier`,
  "DSG-konform, Schweizer Hosting, automatische Löschung nach Galerie-Ablauf",
];

const faq = [
  {
    question: "Braucht es für den Upload Internet im Saal?",
    answer:
      "Das Handy des Gastes braucht eine Verbindung, Mobilfunk genügt dafür. Wo der Empfang schwach ist, etwa in einem Gewölbekeller, klärt ihr das WLAN vorab mit der Location ab.",
  },
  {
    question: "Was tun wir, wenn ein Gast den Code nicht scannen kann?",
    answer:
      "Dann führt der Link zur selben Upload-Seite. Er lässt sich in jeden Browser eintippen oder in der Familiengruppe weiterreichen.",
  },
  {
    question: "Sehen unsere Gäste auch die Bilder der anderen?",
    answer:
      "Ja. Alle Aufnahmen laufen in der Live-Slideshow und liegen danach in der digitalen Galerie, die über denselben QR-Code erreichbar ist.",
  },
  {
    question: "Wie lange bleiben die gesammelten Hochzeitsfotos abrufbar?",
    answer:
      "Das hängt am Paket: Mit Basic bleibt die Galerie 7 Tage offen, mit Premium 30 Tage und mit Enterprise 90 Tage. Läuft diese Frist ab, werden sämtliche Bilder automatisch gelöscht.",
  },
  {
    question: "Was ist mit Gästen, die kein Foto beitragen möchten?",
    answer:
      "Niemand muss. Der QR-Code ist ein Angebot und keine Pflicht – wer nichts hochlädt, schaut die Slideshow trotzdem mit.",
  },
];

const jsonLd = graph(
  breadcrumbNode([
    { name: "Home", path: "/" },
    {
      name: "Hochzeitsfotos per QR-Code sammeln",
      path: "/qr-code-fotos-hochzeit",
    },
  ]),
  faqNode(faq),
);

export default function QrCodeFotosHochzeitPage() {
  return (
    <div className="container max-w-5xl py-16 space-y-20">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <ScrollReveal>
        <div className="max-w-2xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            QR-Code für eure Hochzeitsfotos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hochzeitsfotos per QR-Code sammeln
          </h1>
          <p className="text-lg text-muted-foreground">
            Am Ende des Tages liegen die schönsten Aufnahmen auf zwei Dutzend
            fremden Handys – und bleiben meistens dort. Ein QR-Code auf dem
            Tisch führt eure Gäste auf eine Upload-Seite, auf der sie ihre
            Bilder in Sekunden abschicken. Alles kommt an einem Ort zusammen,
            läuft live auf der Leinwand und bleibt euch danach als digitale
            Galerie.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                Event starten
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/hochzeit">Zur Hochzeitsseite</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Schritte */}
      <ScrollReveal>
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            In vier Schritten zu den Gästefotos
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {schritte.map((schritt, i) => (
              <li
                key={schritt.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="text-sm font-semibold text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold">{schritt.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {schritt.copy}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>

      {/* Platzierung */}
      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Wo der Code an eurer Hochzeit stehen sollte
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Gesammelt wird nur, was auffällt. Diese fünf Stellen decken einen
            Hochzeitstag von der Ankunft bis zur Tanzfläche ab.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {orte.map((ort) => (
              <div
                key={ort.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold">{ort.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ort.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Merkmale */}
      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Was eure Gäste dafür brauchen
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {merkmale.map((merkmal) => (
              <li
                key={merkmal}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm"
              >
                <CheckCircle className="size-4 shrink-0 text-primary" />
                {merkmal}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      {/* Passender Plan */}
      <ScrollReveal>
        <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Passender Plan
            </p>
            <h2 className="text-2xl font-bold">Premium · CHF 99.-</h2>
            <p className="max-w-lg text-sm text-muted-foreground">
              Zur Hochzeit passt Premium: {photoLimitPhrase("PREMIUM")}, einstellbare
              Anzeigedauer in der Slideshow und 30 Tage digitale Galerie – lange
              genug, damit auch eure Gäste ihre Lieblingsbilder noch finden.
            </p>
          </div>
          <Button size="lg" asChild className="shrink-0">
            <Link href="/preise">Preise ansehen</Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Häufige Fragen</h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-border shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-4 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Bereit, alle Bilder an einem Ort zu sammeln?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Euer Hochzeits-Event steht in ein paar Minuten. Die Registrierung
            ist gratis; bezahlt wird ein einziger Betrag pro Event, sobald ihr
            bucht.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              Event starten
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </section>
      </ScrollReveal>

      {/* Weiterfuehrende Links */}
      <div className="rounded-2xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">Weiterlesen</p>
        <ul className="space-y-1">
          <li>
            <Link
              href="/live-slideshow"
              className="font-medium text-primary hover:underline"
            >
              Die Live-Slideshow auf Beamer oder TV
            </Link>{" "}
            – was mit den Bildern im Saal geschieht.
          </li>
          <li>
            <Link
              href="/fotobox-ohne-app"
              className="font-medium text-primary hover:underline"
            >
              Fotos sammeln ohne App
            </Link>{" "}
            – warum der Scan ohne Download auskommt.
          </li>
          <li>
            <Link
              href="/digitales-gaestebuch"
              className="font-medium text-primary hover:underline"
            >
              Digitales Gästebuch für die Hochzeit
            </Link>{" "}
            – wenn zum Bild noch ein Gruss gehört.
          </li>
        </ul>
      </div>
    </div>
  );
}
