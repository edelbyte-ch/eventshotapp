import { sendMail } from '@/lib/mailer'

/**
 * Interne Betreiber-Benachrichtigungen.
 *
 * Schickt bei geschaeftsrelevanten Ereignissen (Registrierung, Login,
 * Event-Erstellung, Zahlung) eine Mail an den Betreiber. Die Funktionen
 * werfen NIEMALS – ein Mailfehler darf weder eine Registrierung noch einen
 * Stripe-Webhook scheitern lassen.
 *
 * Konfiguration ueber ENV (alle optional):
 *   ADMIN_NOTIFY_EMAIL    Empfaenger            (Default: info@edelbyte.ch)
 *   ADMIN_NOTIFY_ENABLED  'false' = alles aus   (Default: an)
 *   ADMIN_NOTIFY_LOGIN    'false' = Login-Mails aus (Default: an)
 */

const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? 'info@edelbyte.ch'
const FROM = 'EventShot <info@edelbyte.ch>'
const ENABLED = process.env.ADMIN_NOTIFY_ENABLED !== 'false'
const LOGIN_ENABLED = process.env.ADMIN_NOTIFY_LOGIN !== 'false'
const BASE_URL = process.env.BETTER_AUTH_URL ?? 'https://eventshot.ch'

const ACCENT = '#F54900'

type Row = { label: string; value: unknown }

function chf(amount: number) {
  return `CHF ${amount.toLocaleString('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function timestamp(date: Date = new Date()) {
  return date.toLocaleString('de-CH', {
    timeZone: 'Europe/Zurich',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalise(rows: Row[]) {
  return rows
    .map((row) => {
      if (row.value === null || row.value === undefined) return null
      const text =
        row.value instanceof Date ? timestamp(row.value) : String(row.value).trim()
      if (!text) return null
      return { label: row.label, value: text }
    })
    .filter((row): row is { label: string; value: string } => row !== null)
}

function renderHtml(headline: string, rows: { label: string; value: string }[]) {
  const cells = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:8px 0 8px 20px;color:#111;font-size:13px;word-break:break-word;"><strong>${escapeHtml(row.value)}</strong></td>
        </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>${escapeHtml(headline)}</title></head>
<body style="margin:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <div style="padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.06);">
      <div style="padding:20px 28px;border-bottom:3px solid ${ACCENT};">
        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#999;">EventShot · Betreiber-Info</div>
        <h1 style="margin:6px 0 0 0;font-size:19px;color:#111;">${escapeHtml(headline)}</h1>
      </div>
      <div style="padding:20px 28px;">
        <table style="width:100%;border-collapse:collapse;">${cells}</table>
      </div>
      <div style="padding:16px 28px;background:#fafafa;border-top:1px solid #eee;font-size:11px;color:#999;">
        Automatische Benachrichtigung von ${escapeHtml(BASE_URL)} · ${escapeHtml(timestamp())}
      </div>
    </div>
  </div>
</body>
</html>`
}

async function notify(subject: string, headline: string, rows: Row[]) {
  if (!ENABLED) return
  try {
    const clean = normalise(rows)
    await sendMail({
      from: FROM,
      to: ADMIN_EMAIL,
      subject,
      text: `${headline}\n\n${clean.map((r) => `${r.label}: ${r.value}`).join('\n')}\n\n${timestamp()}`,
      html: renderHtml(headline, clean),
    })
  } catch (error) {
    // Bewusst nur loggen: Betreiber-Mails duerfen nie einen Nutzerflow brechen.
    console.error('[admin-notify] Versand fehlgeschlagen:', error)
  }
}

// --------------------------------------------------
// Registrierung
// --------------------------------------------------
export async function notifyAdminSignup(user: {
  id: string
  name?: string | null
  email: string
  emailVerified?: boolean
}) {
  await notify(
    `Neue Registrierung: ${user.email}`,
    'Neue Registrierung auf EventShot',
    [
      { label: 'Name', value: user.name },
      { label: 'E-Mail', value: user.email },
      { label: 'E-Mail verifiziert', value: user.emailVerified ? 'ja' : 'nein (Bestaetigung ausstehend)' },
      { label: 'User-ID', value: user.id },
      { label: 'Zeitpunkt', value: timestamp() },
    ],
  )
}

// --------------------------------------------------
// Login
// --------------------------------------------------
export async function notifyAdminLogin(input: {
  userId: string
  name?: string | null
  email?: string | null
  ipAddress?: string | null
  userAgent?: string | null
}) {
  if (!LOGIN_ENABLED) return
  await notify(
    `Login: ${input.email ?? input.userId}`,
    'Anmeldung auf EventShot',
    [
      { label: 'Name', value: input.name },
      { label: 'E-Mail', value: input.email },
      { label: 'User-ID', value: input.userId },
      { label: 'IP-Adresse', value: input.ipAddress },
      { label: 'Geraet / Browser', value: input.userAgent },
      { label: 'Zeitpunkt', value: timestamp() },
    ],
  )
}

// --------------------------------------------------
// Event erstellt
// --------------------------------------------------
export async function notifyAdminEventCreated(input: {
  eventId: number | string
  name: string
  plan: string
  date?: Date | string | null
  location?: string | null
  description?: string | null
  tenantId?: number | string | null
  customerEmail?: string | null
  source: 'Self-Service (bezahlt)' | 'Admin-Bereich' | 'Stripe-Checkout'
}) {
  await notify(
    `Neues Event: ${input.name}`,
    'Neues Event auf EventShot erstellt',
    [
      { label: 'Eventname', value: input.name },
      { label: 'Plan', value: input.plan },
      { label: 'Eventdatum', value: input.date ? new Date(input.date) : null },
      { label: 'Ort', value: input.location },
      { label: 'Beschreibung', value: input.description },
      { label: 'Erstellt ueber', value: input.source },
      { label: 'Kunde', value: input.customerEmail },
      { label: 'Tenant-ID', value: input.tenantId },
      { label: 'Event-ID', value: input.eventId },
      { label: 'Zeitpunkt', value: timestamp() },
    ],
  )
}

// --------------------------------------------------
// Zahlung / Bestellung
// --------------------------------------------------
export async function notifyAdminPayment(input: {
  amountCHF: number
  plan: string
  eventName?: string | null
  customerEmail?: string | null
  customerName?: string | null
  invoiceNumber?: string | null
  stripeSessionId?: string | null
  /** Listenpreis in Rappen. */
  regularPrice?: number | null
  /** Lesbare Aktion, z. B. "Winteraktion −20 % (− CHF 19.80)". */
  promotion?: string | null
  /** Gutscheincode-Rabatt aus dem Stripe-Checkout, in Rappen. */
  voucherDiscount?: number | null
  /** Auffaelligkeit, die der Betreiber pruefen soll. */
  warning?: string | null
}) {
  await notify(
    `${input.warning ? '⚠️ ' : ''}Zahlung eingegangen: ${chf(input.amountCHF)} (${input.plan})`,
    'Zahlung auf EventShot eingegangen',
    [
      { label: 'Achtung', value: input.warning },
      { label: 'Betrag', value: chf(input.amountCHF) },
      {
        label: 'Listenpreis',
        value:
          input.regularPrice != null ? chf(input.regularPrice / 100) : null,
      },
      { label: 'Aktion', value: input.promotion },
      {
        label: 'Gutschein',
        value: input.voucherDiscount
          ? `− ${chf(input.voucherDiscount / 100)}`
          : null,
      },
      { label: 'Plan', value: input.plan },
      { label: 'Event', value: input.eventName },
      { label: 'Kunde', value: input.customerName },
      { label: 'Kunden-E-Mail', value: input.customerEmail },
      { label: 'Rechnungsnummer', value: input.invoiceNumber },
      { label: 'Stripe-Session', value: input.stripeSessionId },
      { label: 'Zeitpunkt', value: timestamp() },
    ],
  )
}
