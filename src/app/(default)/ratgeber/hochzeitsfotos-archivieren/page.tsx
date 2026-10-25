import type { Metadata } from 'next'
import {
  type ArticleContent,
  ArticlePage,
} from '@/components/landing/article-page'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  path: '/ratgeber/hochzeitsfotos-archivieren',
  title: 'Hochzeitsfotos herunterladen und archivieren',
  description:
    'Nach dem Fest: alle Bilder sammeln, in Originalqualität herunterladen, sinnvoll benennen und sicher aufbewahren. Schritt für Schritt.',
  type: 'article',
})

const content: ArticleContent = {
  image: 'galerie',
  eyebrow: 'Ratgeber nach dem Fest',
  title: 'Hochzeitsfotos sichern und archivieren',
  lead: 'Zieht alle Bilder in der ersten Woche nach dem Fest an einem Ort zusammen, sichert sie in voller Auflösung auf einem Computer und legt sie danach an zwei getrennten Orten ab – wer diese drei Schritte macht, hat seine Hochzeitsfotos auch in zehn Jahren noch.',
  path: '/ratgeber/hochzeitsfotos-archivieren',
  datePublished: '2026-08-19',
  readingMinutes: 6,
  blocks: [
    {
      type: 'paragraph',
      text: 'Nach der Hochzeit liegen eure Bilder an mehr Orten, als euch bewusst ist: auf der Speicherkarte des Fotografen, in der Galerie eurer Gäste, in zwei Chatgruppen, auf dem Handy eurer Mutter und in einem Cloud-Speicher, der gerade voll ist. Ein Archiv entsteht daraus nicht von allein. Es entsteht an einem einzigen Abend, an dem ihr alles zusammenzieht.',
    },
    { type: 'heading', text: 'Warum die erste Woche zählt' },
    {
      type: 'paragraph',
      text: 'Drei Dinge laufen nach dem Fest gleichzeitig ab. Galerien und Fotodienste haben Fristen. Gäste räumen ihren Handyspeicher auf, oft schon auf der Heimreise. Und die Chatgruppe zur Hochzeit wird nach wenigen Wochen still, bevor jemand daran gedacht hat, die Bilder herauszuholen.',
    },
    {
      type: 'paragraph',
      text: 'Dazu kommt die Qualität. Was über Messenger geteilt wird, ist in der Regel stark verkleinert. Für den Bildschirm reicht das, für einen grossen Abzug an der Wand nicht mehr. Wer die vollen Auflösungen will, muss sie holen, solange sie noch existieren.',
    },
    { type: 'heading', text: 'Schritt für Schritt von der Galerie ins Archiv' },
    {
      type: 'ordered',
      items: [
        'Einen Termin setzen. Ein Abend in der Woche nach dem Fest, im Kalender eingetragen wie eine Verabredung – sonst verschiebt er sich um Monate.',
        'Eine Sammelstelle wählen. Ein Ordner auf einem Computer, nicht auf dem Handy. Nur dort habt ihr Übersicht, Speicherplatz und die Möglichkeit, Dateien zu benennen.',
        'Alle Quellen abarbeiten. Die Galerie eurer Gäste, die Lieferung des Fotografen, eure eigenen Handys, die Kamera des Trauzeugen. Schreibt die Quellen auf und hakt sie ab, statt sie im Kopf zu behalten.',
        'In voller Auflösung sichern. Wo ihr die Wahl habt, immer die Originaldatei nehmen – nie die Vorschau, nie den Bildschirmausschnitt.',
        'Einmal durchsehen und das Offensichtliche löschen: Verwackeltes, Fehlauslöser, dreimal dasselbe Buffet.',
        'Umbenennen, sortieren, Sicherungskopie anlegen. Erst wenn die zweite Kopie existiert, ist der Abend fertig.',
      ],
    },
    {
      type: 'heading',
      text: 'Ordner und Dateinamen, die in zehn Jahren funktionieren',
    },
    {
      type: 'paragraph',
      text: 'Ein Archiv ist nur so gut wie seine Auffindbarkeit. Zwei Regeln genügen dafür. Das Datum steht vorn und in der Reihenfolge Jahr-Monat-Tag, damit die Sortierung von allein stimmt. Und der Name sagt, was drin ist, ohne dass jemand die Datei öffnen muss.',
    },
    {
      type: 'list',
      items: [
        'Hauptordner nach dem Muster 2026-08-19_Hochzeit_Nachname',
        'Unterordner nach Quelle: 01_Fotograf, 02_Gaeste-Galerie, 03_Eigene-Handys',
        'Keine Umlaute, keine Leerzeichen, keine Sonderzeichen in Dateinamen, die zwischen Geräten wandern',
        'Eine Textdatei im Hauptordner mit drei Zeilen: was von wem stammt und wann ihr es gesichert habt',
      ],
    },
    {
      type: 'paragraph',
      text: 'Diese Textdatei klingt nach Bürokratie und ist doch der Teil, für den ihr euch später am meisten dankt. In fünf Jahren weiss niemand mehr, ob die Bilder im Ordner 03 von eurem Handy oder von dem eures Bruders stammen.',
    },
    { type: 'heading', text: 'Zwei Kopien sind eine, drei sind ein Archiv' },
    {
      type: 'paragraph',
      text: 'In der Datensicherung gilt die 3-2-1-Regel: drei Kopien der Daten, auf zwei verschiedenen Arten von Speicher, davon eine ausserhalb der eigenen Wohnung. Auf eine Hochzeit übersetzt ist das nichts Kompliziertes.',
    },
    {
      type: 'list',
      items: [
        'Kopie 1: der Arbeitsordner auf dem Computer, mit dem ihr Bilder anschaut und verschickt',
        'Kopie 2: eine externe Festplatte, die im Schrank liegt und nicht dauerhaft angeschlossen ist',
        'Kopie 3: ein Cloud-Speicher oder eine zweite Festplatte bei Eltern oder Geschwistern',
      ],
    },
    {
      type: 'paragraph',
      text: 'Der Sinn der dritten Kopie ist der Ort, nicht die Technik. Wasserschaden, Einbruch und ein vergessener Rucksack treffen alles, was am selben Platz liegt. Prüft einmal im Jahr, ob die Festplatte noch anläuft und ob sich einzelne Bilder wirklich öffnen lassen – eine Sicherung, die nie getestet wurde, ist bloss eine Vermutung.',
    },
    { type: 'heading', text: 'Aussortieren: weniger ist auffindbarer' },
    {
      type: 'paragraph',
      text: 'Speicherplatz ist günstig geworden, Aufmerksamkeit nicht. Einen Ordner mit tausenden Bildern, von denen viele unscharf sind, öffnet niemand ein zweites Mal. Löscht deshalb in zwei Durchgängen: zuerst das technisch Missratene, ein paar Wochen später die Dubletten. Was euch beim zweiten Durchgang unsicher macht, bleibt – Erinnerung muss nicht scharf sein.',
    },
    {
      type: 'paragraph',
      text: 'Legt zusätzlich einen kleinen Ordner mit euren Lieblingsbildern an, vielleicht 30 bis 50 Stück. Das ist der Ordner, den ihr Gästen schickt, aus dem das Fotobuch entsteht und den ihr in zehn Jahren tatsächlich sucht. Der grosse Rest darf ruhig im Archiv schlafen.',
    },
    { type: 'heading', text: 'Was aus der digitalen Galerie zu holen ist' },
    {
      type: 'paragraph',
      text: 'Die Galerie eurer Gäste ist ein Teil des Archivs, nicht das Archiv selbst. Ihr öffnet sie mit demselben QR-Code wie am Fest und sichert die Bilder von dort auf euer Gerät. Praktisch ist, das gleich am Computer zu tun und nicht am Handy: Die Dateien landen dann direkt in eurer Sammelstelle.',
    },
    {
      type: 'paragraph',
      text: 'Entscheidend ist die Frist. Die digitale Galerie bleibt je nach Plan 7 Tage bei Basic, 30 Tage bei Premium oder 90 Tage bei Enterprise nach dem Event offen. Anschliessend verschwinden alle Aufnahmen automatisch und DSG-konform von unserer Schweizer Infrastruktur. Tragt dieses Enddatum am Tag der Buchung in den Kalender ein, nicht erst, wenn die Hochzeitsreise vorbei ist.',
    },
    {
      type: 'paragraph',
      text: 'Ehrlich gesagt: Als Langzeitarchiv ist eine Event-Galerie nicht gedacht, und kein Dienst mit automatischer Löschung ist es. Wenn ihr euch selbst gut kennt und wisst, dass ihr erst spät dazu kommt, wählt den Plan mit der längeren Galerie – oder nehmt den Termin aus Schritt 1 wirklich ernst.',
    },
    { type: 'heading', text: 'Formate, Abzüge und der Sinn der Übung' },
    {
      type: 'paragraph',
      text: 'Speichert die Dateien so, wie die Kamera sie geliefert hat. JPEG ist der Normalfall und wird euch überleben. Aufnahmen von neueren iPhones kommen als HEIC – das lässt sich öffnen, macht auf älteren Geräten aber Mühe. Wandelt diese Bilder zusätzlich in JPEG um und behaltet beide Fassungen.',
    },
    {
      type: 'paragraph',
      text: 'Und dann macht etwas mit den Bildern. Ein Fotobuch, ein Abzug im Flur, ein digitaler Bilderrahmen bei den Grosseltern: Ein Archiv, das nur gesichert wird, schaut niemand an. Der Zweck des ganzen Aufwands ist nicht die Festplatte, sondern der Abend, an dem ihr sie wieder hervorholt.',
    },
  ],
  faq: [
    {
      question: 'Wie lange können wir die Bilder nach dem Fest sichern?',
      answer:
        'Der Zeitraum hängt vom Plan ab: 7 Tage bei Basic, 30 Tage bei Premium und 90 Tage bei Enterprise, jeweils ab dem Event. Ist diese Zeit vorbei, sind die Bilder unwiderruflich weg.',
    },
    {
      question: 'Reicht die Foto-App auf dem Handy als Archiv?',
      answer:
        'Als einzige Ablage nicht. Sie gleicht ab, statt zu sichern: Was ihr dort löscht, verschwindet nach kurzer Zeit auf allen Geräten. Nutzt sie für den schnellen Zugriff und legt die Sicherung getrennt davon an.',
    },
    {
      question:
        'Wie bekommen wir Bilder von Gästen, die nichts hochgeladen haben?',
      answer:
        'Fragt gezielt und einzeln nach, mit dem Zugang zur Galerie und der Frist im selben Satz. Drei persönliche Nachrichten an die Personen, die am meisten fotografiert haben, bringen meist mehr als eine Sammelnachricht an alle.',
    },
    {
      question: 'Sollen wir die Fotos zusätzlich ausdrucken?',
      answer:
        'Ein Abzug ist die einzige Kopie, die kein Dateiformat und kein Passwort braucht, und für die wichtigsten Bilder lohnt er sich. Als Ersatz für die digitale Sicherung taugt er nicht, weil sich Papier weder kopieren noch verschicken lässt.',
    },
  ],
  related: [
    {
      title: 'Gästefotos und Datenschutz an der Hochzeit',
      href: '/ratgeber/datenschutz-hochzeitsfotos',
    },
    { title: 'Alle Funktionen von EventShot', href: '/funktionen' },
    { title: 'Preise – Einmalpreis pro Event', href: '/preise' },
  ],
  ctaTitle: 'Alle Gästefotos an einem Ort statt in fünf Chatgruppen',
  ctaText:
    'Eure Gäste laden ihre Bilder per QR-Code hoch, ihr sichert danach alles aus der digitalen Galerie. Die Registrierung ist kostenlos, der Einmalpreis pro Event wird erst beim Buchen fällig.',
}

export default function HochzeitsfotosArchivierenPage() {
  return <ArticlePage content={content} />
}
