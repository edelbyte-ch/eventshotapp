import { photoLimitPhrase } from '@/lib/photo-limits'

export type FaqItem = { question: string; answer: string }

export type FaqGroup = {
  id: string
  heading: string
  lead: string
  items: FaqItem[]
}

/**
 * Zentrale Frageliste der Domain. Sie ist zugleich die Quelle fuer das
 * FAQPage-Markup auf /faq und fuer /llms-full.txt – deshalb enthaelt kein
 * Antworttext Links, Aufzaehlungen oder Formatierung.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'upload',
    heading: 'Upload und QR-Code',
    lead: 'Was auf dem Handy der Gäste passiert – und was eben nicht.',
    items: [
      {
        question: 'Wie kommen die Gäste zum Foto-Upload?',
        answer:
          'Über den QR-Code. Ein Scan mit der Handykamera öffnet die Upload-Seite direkt im Browser – ohne App und ohne Konto.',
      },
      {
        question: 'Funktioniert das auf jedem Smartphone gleich?',
        answer:
          'Ja. iPhone und Android brauchen nur die eingebaute Kamera und einen aktuellen Browser, ein bestimmtes Modell ist nicht nötig.',
      },
      {
        question: 'Wie viele Fotos darf eine einzelne Person beisteuern?',
        answer:
          `So viele, wie sie möchte – eine Obergrenze pro Gast gibt es nicht. Begrenzt ist nur die Gesamtzahl pro Event: Basic nimmt ${photoLimitPhrase('BASIC')} an, Premium ${photoLimitPhrase('PREMIUM')} und Enterprise ${photoLimitPhrase('ENTERPRISE')}.`,
      },
      {
        question: 'Lassen sich auch Videos hochladen?',
        answer:
          'Nein. Die Upload-Seite nimmt ausschliesslich Bilder entgegen, EventShot ist auf Fotos ausgelegt.',
      },
      {
        question: 'Steht bei den Bildern, wer sie beigesteuert hat?',
        answer:
          'Nein. Slideshow und Galerie zeigen allein das Foto, weder Namen noch Nachrichten erscheinen dazu.',
      },
    ],
  },
  {
    id: 'einrichten',
    heading: 'Event einrichten',
    lead: 'Der Teil, den du vor dem Anlass einmal erledigst.',
    items: [
      {
        question: 'Wie lange dauert das Aufsetzen eines Events?',
        answer:
          'Wenige Minuten. Du legst das Event an, wählst das Paket und hast danach den QR-Code und die Event-Adresse zur Hand.',
      },
      {
        question: 'Kann ich den QR-Code ausdrucken lassen?',
        answer:
          'Ja. Du lädst ihn als Bilddatei herunter und setzt ihn auf Tischkarten, Aufsteller oder ein Plakat im Eingang.',
      },
      {
        question: 'Wie früh soll ich das Event anlegen?',
        answer:
          'Sobald Datum und Location feststehen. Dann bleibt Zeit, den Code drucken zu lassen und die Anzeige einmal in Ruhe durchzuspielen.',
      },
      {
        question: 'Muss vor Ort etwas installiert werden?',
        answer:
          'Nein. Die Anzeige läuft im Browser des Geräts, das am Bildschirm hängt. Zusätzliche Software oder Hardware braucht es nicht.',
      },
    ],
  },
  {
    id: 'technik',
    heading: 'Slideshow und Technik',
    lead: 'Was im Saal steht und wie die Bilder dorthin kommen.',
    items: [
      {
        question: 'Welches Gerät hängt am Beamer oder Fernseher?',
        answer:
          'Ein Laptop, ein Tablet oder ein Smart-TV mit Browser. Darauf rufst du die Slideshow auf und gibst sie auf Leinwand, Beamer oder TV aus.',
      },
      {
        question: 'Wie schnell erscheint ein Foto auf dem Screen?',
        answer:
          'In Sekunden. Ist der Upload durch, nimmt die laufende Slideshow das neue Bild in die Rotation auf.',
      },
      {
        question: 'Wie viele Slideshow-Screens sind möglich?',
        answer:
          'Basic zeigt 1 Slideshow-Screen, Premium bis zu 3 und Enterprise unbegrenzt viele. Alle Screens zeigen dieselben Fotos.',
      },
      {
        question: 'Kann ich das Tempo der Slideshow beeinflussen?',
        answer:
          'Ja, ab Premium. Die Anzeigedauer je Foto ist dort einstellbar, und die Slideshow-Steuerung lässt sich bei Bedarf ausblenden.',
      },
      {
        question: 'Wie gut muss das Internet am Veranstaltungsort sein?',
        answer:
          'Eine stabile Verbindung genügt. Uploads und Anzeige laufen über das Netz, für das Anzeigegerät lohnt sich deshalb ein zuverlässiges WLAN oder ein Kabel.',
      },
      {
        question: 'Ist ein Wasserzeichen zu sehen?',
        answer:
          'In Basic und Premium läuft ein dezentes EventShot-Wasserzeichen mit. Mit Enterprise lässt es sich deaktivieren und durch eigenes Branding in der Slideshow ersetzen.',
      },
    ],
  },
  {
    id: 'galerie',
    heading: 'Galerie und Datenschutz',
    lead: 'Was nach dem Fest bleibt und wie lange.',
    items: [
      {
        question: 'Wie lange habe ich Zugriff auf die Galerie?',
        answer:
          'Im Basic-Paket eine Woche, mit Premium einen Monat und mit Enterprise ein Vierteljahr – konkret 7, 30 oder 90 Tage nach dem Anlass.',
      },
      {
        question: 'Wie kommen die Gäste später an die Bilder?',
        answer:
          'Über denselben QR-Code oder über den Event-Link. Beides führt nach dem Fest in die digitale Galerie, wo sich die Fotos ansehen und speichern lassen.',
      },
      {
        question: 'Was geschieht nach Ablauf der Galerie?',
        answer:
          'Alle Aufnahmen werden automatisch und DSG-konform von unseren Schweizer Servern gelöscht. Was du behalten möchtest, sicherst du also vorher.',
      },
      {
        question: 'Wo liegen die Fotos während des Anlasses?',
        answer:
          'Auf unserer eigenen Infrastruktur in der Schweiz. Es ist kein Drittanbieter beteiligt und es gibt keine Weitergabe.',
      },
      {
        question: 'Nach welchem Datenschutzrecht arbeitet EventShot?',
        answer:
          'Nach dem Schweizer Datenschutzgesetz. Speicherung, Zugriff und Löschung sind DSG-konform geregelt, die Einzelheiten stehen in der Datenschutzerklärung.',
      },
      {
        question: 'Was gilt für Fotos, auf denen andere Gäste zu sehen sind?',
        answer:
          'Es gilt das Recht am eigenen Bild. Meist reicht ein kurzer Hinweis auf dem Aufsteller: Hochgeladene Fotos erscheinen auf der Leinwand und in der Galerie.',
      },
    ],
  },
  {
    id: 'preise',
    heading: 'Preise und Buchung',
    lead: 'Ein Preis pro Anlass, keine laufenden Kosten.',
    items: [
      {
        question: 'Was kostet EventShot?',
        answer:
          'Basic CHF 49.-, Premium CHF 99.- und Enterprise CHF 149.-, jeweils pro Event. Bezahlt wird einmalig für den Anlass, kein Abo.',
      },
      {
        question: 'Fallen Kosten an, bevor ich buche?',
        answer:
          'Nein. Registrierung und Einrichtung sind kostenlos, verrechnet wird erst das gewählte Paket beim Buchen.',
      },
      {
        question: 'Welches Paket passt zu meinem Anlass?',
        answer:
          'Für einen Geburtstag reicht Basic. Für eine Hochzeit oder ein Firmenessen empfehlen wir Premium: bis zu 3 Slideshow-Screens, einstellbare Anzeigedauer und 30 Tage digitale Galerie.',
      },
      {
        question: 'Passt EventShot auch zu einem Grossanlass?',
        answer:
          'Gedacht ist es für private Feiern und kleinere Firmenanlässe. Planst du eine Konferenz oder ein Fest mit mehreren hundert Gästen, passt unser Schwesterprodukt social-wall.ch besser.',
      },
      {
        question: 'An wen wende ich mich bei offenen Punkten?',
        answer:
          'Am direktesten per Mail an info@edelbyte.ch oder telefonisch unter 044 500 25 04. Wir sitzen in der Schweiz und schauen uns dein Anliegen persönlich an.',
      },
    ],
  },
]
