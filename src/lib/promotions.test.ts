import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { formatChf, PLANS } from '@/lib/pricing'
import {
  getActivePromotion,
  getPromotionById,
  parseEventDate,
  quotePrice,
  todayInZurich,
} from '@/lib/promotions'

// Buchung waehrend der Aktion (Oktober 2026) als fester Zeitpunkt.
const OKTOBER = new Date('2026-10-15T10:00:00Z')

function quote(plan: (typeof PLANS)[number], iso: string, now = OKTOBER) {
  const date = parseEventDate(iso)
  assert.ok(date, `Datum ${iso} ungueltig`)
  return quotePrice(plan, date, { now })
}

describe('Eventdatum entscheidet ueber die Winteraktion', () => {
  const faelle: [string, boolean][] = [
    ['2026-11-30', false],
    ['2026-12-01', true],
    ['2026-12-24', true],
    ['2026-12-31', true],
    ['2027-01-01', true],
    ['2027-01-31', true],
    ['2027-02-01', false],
  ]
  for (const [iso, erwartet] of faelle) {
    it(`${iso} → ${erwartet ? '20 %' : 'kein Rabatt'}`, () => {
      const q = quote('PREMIUM', iso)
      assert.equal(q.promotion?.id === 'winter-2026', erwartet)
      assert.equal(q.discountPercent, erwartet ? 20 : 0)
    })
  }

  it('Dezember der Folgesaison bekommt die Aktion nicht', () => {
    assert.equal(quote('PREMIUM', '2027-12-10').promotion, null)
  })
})

describe('Preise in Rappen, ohne Rundungsfehler', () => {
  const erwartet = {
    BASIC: [4900, 980, 3920],
    PREMIUM: [9900, 1980, 7920],
    ENTERPRISE: [14900, 2980, 11920],
  } as const
  for (const plan of PLANS) {
    it(plan, () => {
      const q = quote(plan, '2026-12-19')
      assert.deepEqual(
        [q.regularPrice, q.discountAmount, q.finalPrice],
        erwartet[plan],
      )
      assert.equal(q.currency, 'chf')
      assert.ok(Number.isInteger(q.finalPrice))
    })
  }

  it('ohne Aktion bleibt der Listenpreis', () => {
    const q = quote('BASIC', '2027-02-01')
    assert.equal(q.finalPrice, 4900)
    assert.equal(q.discountAmount, 0)
  })

  it('formatChf', () => {
    assert.equal(formatChf(3920), 'CHF 39.20')
    assert.equal(formatChf(9900), 'CHF 99.00')
    assert.equal(formatChf(4900, 'list'), 'CHF 49.-')
    assert.equal(formatChf(11920, 'list'), 'CHF 119.20')
    assert.equal(formatChf(-1980), '− CHF 19.80')
  })
})

describe('Datum wechseln', () => {
  it('Dezember → Februar → Januar', () => {
    assert.ok(quote('PREMIUM', '2026-12-19').promotion)
    assert.equal(quote('PREMIUM', '2027-02-14').promotion, null)
    assert.ok(quote('PREMIUM', '2027-01-09').promotion)
  })
})

describe('Buchungszeitraum', () => {
  it('Buchung Dezember fuer Januar → Rabatt', () => {
    assert.ok(quote('BASIC', '2027-01-20', new Date('2026-12-10T12:00:00Z')).promotion)
  })

  it('nach Aktionsende keine aktive Aktion mehr', () => {
    // 01.02.2027 00:30 in Zuerich = 31.01. 23:30 UTC
    assert.equal(getActivePromotion(new Date('2027-01-31T23:30:00Z')), null)
    assert.ok(getActivePromotion(new Date('2027-01-31T22:30:00Z')))
  })

  it('Webhook: Aktion per ID gilt auch nach Buchungsschluss', () => {
    const date = parseEventDate('2027-01-31')
    assert.ok(date)
    const q = quotePrice('PREMIUM', date, {
      promotion: getPromotionById('winter-2026'),
    })
    assert.equal(q.finalPrice, 7920)
  })

  it('unbekannte Aktion → kein Rabatt', () => {
    const date = parseEventDate('2026-12-24')
    assert.ok(date)
    assert.equal(
      quotePrice('PREMIUM', date, { promotion: getPromotionById('gibts-nicht') })
        .finalPrice,
      9900,
    )
  })
})

describe('Zeitzonen', () => {
  it('parseEventDate dreht nie ueber UTC', () => {
    assert.deepEqual(parseEventDate('2027-01-01'), {
      year: 2027,
      month: 1,
      day: 1,
      iso: '2027-01-01',
    })
  })

  it('lehnt Zeitstempel und unmoegliche Daten ab', () => {
    assert.equal(parseEventDate('2027-01-01T00:00:00.000Z'), null)
    assert.equal(parseEventDate('2026-02-30'), null)
    assert.equal(parseEventDate('2026-13-01'), null)
    assert.equal(parseEventDate(''), null)
    assert.equal(parseEventDate(undefined), null)
  })

  it('todayInZurich rechnet in Schweizer Zeit', () => {
    assert.equal(todayInZurich(new Date('2026-12-31T23:30:00Z')), '2027-01-01')
  })
})
