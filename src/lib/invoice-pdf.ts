// lib/invoice-pdf.ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fs from 'fs'
import { formatChf } from '@/lib/pricing'

type InvoiceData = {
  invoiceNumber: string
  customerEmail: string
  eventName: string
  plan: string
  amountCHF: number
  date: Date
  /** Listenpreis in Rappen; mit Aktion/Gutschein wird aufgeschluesselt. */
  regularPrice?: number
  promotion?: { name: string; percent: number; amount: number } | null
  /** Im Stripe-Checkout eingeloester Gutscheincode, in Rappen. */
  voucherDiscount?: number
}

export async function generateInvoicePdf(
  data: InvoiceData
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const draw = (text: string, x: number, y: number, size = 10, b = false) =>
    page.drawText(text, {
      x,
      y,
      size,
      font: b ? bold : font,
      color: rgb(0, 0, 0),
    })

  // LOGO
  const logoBytes = fs.readFileSync('public/EdelByte_Logo_Light_Rect.png')
  const logo = await pdf.embedPng(logoBytes)
  page.drawImage(logo, { x: 50, y: 770, width: 180, height: 40 })

  // HEADER
  draw('Rechnung', 400, 780, 16, true)

  draw(`Rechnungsnummer: ${data.invoiceNumber}`, 400, 750)
  draw(`Datum: ${data.date.toLocaleDateString('de-CH')}`, 400, 735)

  // FIRMA
  draw('EdelByte – IT mit Leidenschaft', 50, 720, 11, true)
  draw('Endrit Veliji', 50, 705)
  draw('Schweiz', 50, 690)
  draw('CHE-123.456.789', 50, 675)

  // KUNDE
  draw('Rechnung an:', 50, 645, 11, true)
  draw(data.customerEmail, 50, 630)

  // LEISTUNG
  draw('Leistung', 50, 580, 11, true)
  draw(`EventShot – ${data.plan}`, 50, 560)
  draw(`Event: ${data.eventName}`, 50, 545)

  // pdf-lib kann mit StandardFonts kein U+2212; deshalb ASCII-Minus.
  const minus = (rappen: number) => `- ${formatChf(rappen).replace('− ', '')}`
  const hasBreakdown =
    data.regularPrice !== undefined &&
    (Boolean(data.promotion) || (data.voucherDiscount ?? 0) > 0)

  if (hasBreakdown && data.regularPrice !== undefined) {
    let y = 525
    draw('Regulärer Preis', 50, y)
    draw(formatChf(data.regularPrice), 450, y)
    if (data.promotion) {
      y -= 15
      draw(`${data.promotion.name} -${data.promotion.percent}%`, 50, y)
      draw(minus(data.promotion.amount), 450, y)
    }
    if ((data.voucherDiscount ?? 0) > 0) {
      y -= 15
      draw('Gutschein', 50, y)
      draw(minus(data.voucherDiscount ?? 0), 450, y)
    }
    y -= 22
    draw('Total', 50, y, 11, true)
    draw(`CHF ${data.amountCHF.toFixed(2)}`, 450, y, 11, true)
  } else {
    draw(`CHF ${data.amountCHF.toFixed(2)}`, 450, 545, 11, true)
  }

  // FOOTER
  draw('Zahlungsstatus: Bezahlt', 50, 150)
  draw(`Zahlungseingang: ${data.date.toLocaleDateString('de-CH')}`, 50, 135)
  draw('Zahlungsart: Stripe', 50, 120)

  draw('Nicht MwSt-pflichtig gemäss Art. 10 MWSTG', 50, 95)
  draw('Keine Zahlung mehr erforderlich.', 50, 80)

  return pdf.save()
}
