import {
  ArrowRight,
  CheckCircle,
  MonitorPlay,
  QrCode,
  Timer,
} from "lucide-react";
import type { Metadata } from "next";
import { formatChf, PLAN_PRICES } from "@/lib/pricing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/motion";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, faqNode, graph } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  path: "/live-slideshow",
  title: "Live-Slideshow für Beamer & TV am Fest",
  description:
    "Gästefotos erscheinen sofort auf Leinwand, Beamer oder TV – mit Übergängen und einstellbarer Anzeigedauer. Ohne App, DSG-konform.",
});

const ablauf = [
  {
    icon: MonitorPlay,
    title: "Fläche bereitstellen",
    copy: "Beamer, Fernseher oder Monitor mit Internetzugang genügt. Du rufst die Slideshow im Browser auf und schaltest sie auf Vollbild.",
  },
  {
    icon: QrCode,
    title: "QR-Code aufstellen",
    copy: "Der Code liegt dort, wo deine Gäste sitzen oder anstossen. Jedes Bild, das darüber ankommt, reiht sich in den Lauf ein.",
  },
  {
    icon: Timer,
    title: "Galerie danach",
    copy: "Ist der Beamer aus, bleibt derselbe Bestand als digitale Galerie abrufbar – über denselben QR-Code wie am Abend.",
  },
];

const merkmale = [
  "Hochgeladene Bilder erscheinen in Sekunden im laufenden Wechsel",
  "Schöne Übergänge und Animationen zwischen den Fotos",
  "Einstellbare Anzeigedauer ab Premium",
  "Slideshow-Steuerung ein- und ausblendbar ab Premium",
  "Erweiterte Slideshow-Einstellungen mit Enterprise",
  "Läuft als Webseite im Browser, ohne Installation im Saal",
];

const plaene = [
  {
    name: "Basic",
    price: formatChf(PLAN_PRICES.BASIC, "list"),
    lines: [
      "Live-Slideshow mit unbegrenzten Foto-Uploads",
      "Digitale Galerie für 7 Tage",
      "Inkl. dezentem EventShot-Wasserzeichen",
    ],
  },
  {
    name: "Premium",
    price: formatChf(PLAN_PRICES.PREMIUM, "list"),
    highlighted: true,
    lines: [
      "Einstellbare Anzeigedauer je Bild",
      "Slideshow-Steuerung ein-/ausblendbar",
      "Digitale Galerie für 30 Tage",
    ],
  },
  {
    name: "Enterprise",
    price: formatChf(PLAN_PRICES.ENTERPRISE, "list"),
    lines: [
      "Erweiterte Slideshow-Einstellungen",
      "Eigenes Branding in der Slideshow",
      "Wasserzeichen optional deaktivierbar",
    ],
  },
];

const faq = [
  {
    question: "Wie schnell ist ein Foto auf der Leinwand?",
    answer:
      "In der Regel wenige Sekunden nach dem Absenden. Das Bild reiht sich selbstständig in den laufenden Wechsel ein, niemand muss dafür etwas anklicken.",
  },
  {
    question: "Kann ich bestimmen, wie lange ein Bild stehen bleibt?",
    answer:
      "Ab Premium ja, dort ist die Anzeigedauer einstellbar. Mit Enterprise kommen erweiterte Slideshow-Einstellungen dazu.",
  },
  {
    question: "Lässt sich die Steuerung während der Feier verbergen?",
    answer:
      "Ab Premium blendest du die Slideshow-Steuerung ein und aus, mit Enterprise ist sie konfigurierbar. Auf der Fläche bleibt dann nur das Bild sichtbar.",
  },
  {
    question: "Trägt die Slideshow ein Wasserzeichen?",
    answer:
      "Basic und Premium enthalten ein dezentes EventShot-Wasserzeichen. Mit Enterprise ist es optional deaktivierbar, dafür kommt eigenes Branding in der Slideshow dazu.",
  },
  {
    question: "Was geschieht mit den Bildern, wenn die Slideshow endet?",
    answer:
      "Die Bilder wandern in die digitale Galerie: 7 Tage mit Basic, 30 Tage mit Premium, 90 Tage mit Enterprise. Nach Ablauf dieser Frist werden alle Fotos automatisch von den Schweizer Servern gelöscht.",
  },
];

const jsonLd = graph(
  breadcrumbNode([
    { name: "Home", path: "/" },
    { name: "Live-Slideshow", path: "/live-slideshow" },
  ]),
  faqNode(faq),
);

export default function LiveSlideshowPage() {
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
            EventShot Live-Slideshow
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Die Live-Slideshow auf Beamer oder TV
          </h1>
          <p className="text-lg text-muted-foreground">
            Ob Beamer im Saal, Fernseher beim Apéro oder Monitor im Foyer: Die
            Live-Slideshow holt jedes hochgeladene Bild wenige Augenblicke
            später gross auf die Fläche. Die Anzeige läuft als gewöhnliche
            Webseite, wechselt mit ruhigen Übergängen weiter und braucht ausser
            einem Internetzugang keine zusätzliche Technik.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                Event starten
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/preise">Preise ansehen</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Ablauf */}
      <ScrollReveal>
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            So bringst du die Slideshow auf den grossen Bildschirm
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {ablauf.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-primary" />
                    <span className="text-sm font-semibold text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Merkmale */}
      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Was die Slideshow ausmacht
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

      {/* Plaene */}
      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Was jeder Plan an der Slideshow erlaubt
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Alle drei Pakete zeigen die Live-Slideshow und nehmen unbegrenzt
            viele Foto-Uploads entgegen. Unterschiedlich sind die
            Einstellmöglichkeiten und die Frist, in der die digitale Galerie
            danach offen bleibt.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {plaene.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border bg-card p-6 ${
                  plan.highlighted
                    ? "border-primary shadow-lg"
                    : "border-border shadow-sm"
                }`}
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="text-2xl font-bold text-foreground">
                    {plan.price}
                  </span>{" "}
                  pro Event
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {plan.lines.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle className="size-4 shrink-0 text-primary mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
            Bereit für die Slideshow auf deiner Leinwand?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Anlegen, Paket wählen, Bildschirm verbinden: mehr Vorbereitung
            braucht es nicht. Bezahlt wird einmal pro Event, die Registrierung
            selbst kostet nichts.
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
        <p className="font-medium text-foreground">Passend dazu</p>
        <ul className="space-y-1">
          <li>
            <Link
              href="/qr-code-fotos-hochzeit"
              className="font-medium text-primary hover:underline"
            >
              Hochzeitsfotos per QR-Code sammeln
            </Link>{" "}
            – der Weg vom Handy des Gastes auf die Fläche.
          </li>
          <li>
            <Link
              href="/hochzeit"
              className="font-medium text-primary hover:underline"
            >
              Hochzeits-Fotowand mit Live-Slideshow
            </Link>{" "}
            – der passende Plan für den grössten Tag.
          </li>
          <li>
            <Link
              href="/geburtstag"
              className="font-medium text-primary hover:underline"
            >
              Geburtstags-Fotowand
            </Link>{" "}
            – wenn die Party auf einem Fernseher läuft.
          </li>
        </ul>
        <p className="pt-2">
          Für einen Grossanlass mit vielen Teilnehmenden führt EdelByte das
          Schwesterprodukt{" "}
          <a
            href="https://social-wall.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            social-wall.ch
          </a>
          .
        </p>
      </div>
    </div>
  );
}
