import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  formatPhotoCount,
  isPhotoLimitReached,
  PLAN_PHOTO_LIMITS,
  photoLimitLabel,
  photoLimitPhrase,
  photoLimitRange,
  photoLimitReachedMessage,
  remainingPhotos,
} from '@/lib/photo-limits'
import { PLANS } from '@/lib/pricing'

describe('Foto-Limits pro Plan', () => {
  it('Basic 250, Premium 1000, Enterprise unbegrenzt', () => {
    assert.deepEqual(PLAN_PHOTO_LIMITS, {
      BASIC: 250,
      PREMIUM: 1000,
      ENTERPRISE: null,
    })
  })

  it('jeder Plan hat einen Eintrag', () => {
    for (const plan of PLANS) {
      assert.ok(plan in PLAN_PHOTO_LIMITS, `${plan} fehlt`)
    }
  })

  it('hoehere Plaene erlauben nie weniger Fotos', () => {
    const werte = PLANS.map((p) => PLAN_PHOTO_LIMITS[p] ?? Infinity)
    for (let i = 1; i < werte.length; i++) {
      assert.ok(werte[i] > werte[i - 1], `${PLANS[i]} nicht ueber ${PLANS[i - 1]}`)
    }
  })
})

describe('Grenze erreicht?', () => {
  const faelle: [string, number, number | null, boolean][] = [
    ['leer', 0, 250, false],
    ['knapp unter dem Limit', 249, 250, false],
    ['genau am Limit', 250, 250, true],
    ['ueber dem Limit (Altbestand, Grenze nachtraeglich gesenkt)', 260, 250, true],
    ['unbegrenzt, leer', 0, null, false],
    ['unbegrenzt, sehr viele', 1_000_000, null, false],
    ['Demo-Grenze 20, voll', 20, 20, true],
  ]
  for (const [name, used, limit, erwartet] of faelle) {
    it(name, () => {
      assert.equal(isPhotoLimitReached(used, limit), erwartet)
    })
  }
})

describe('freie Plaetze', () => {
  it('zaehlt herunter', () => {
    assert.equal(remainingPhotos(245, 250), 5)
    assert.equal(remainingPhotos(249, 250), 1)
    assert.equal(remainingPhotos(250, 250), 0)
  })

  it('nie negativ, auch wenn schon mehr drin sind', () => {
    assert.equal(remainingPhotos(300, 250), 0)
  })

  it('unbegrenzt bleibt unbegrenzt', () => {
    assert.equal(remainingPhotos(5000, null), null)
  })

  // So arbeitet finalizeUpload einen Stapel ab: jedes Foto zaehlt unter der
  // Sperre neu, bevor es angelegt wird. Von zehn Bildern bei 245/250
  // kommen genau fuenf durch, der Rest wird abgewiesen.
  it('Stapel von 10 bei 245/250: genau 5 werden angenommen', () => {
    let used = 245
    let angenommen = 0
    for (let i = 0; i < 10; i++) {
      if (isPhotoLimitReached(used, 250)) continue
      used++
      angenommen++
    }
    assert.equal(angenommen, 5)
    assert.equal(used, 250)
  })

  it('Stapel bei unbegrenzt: alle werden angenommen', () => {
    let angenommen = 0
    for (let i = 0; i < 500; i++) {
      if (!isPhotoLimitReached(10_000 + i, null)) angenommen++
    }
    assert.equal(angenommen, 500)
  })
})

describe('Texte', () => {
  it('Tausender mit Hochkomma', () => {
    assert.equal(formatPhotoCount(250), '250')
    assert.equal(formatPhotoCount(1000), "1'000")
    assert.equal(formatPhotoCount(12500), "12'500")
  })

  it('Preiskarten', () => {
    assert.equal(photoLimitLabel('BASIC'), 'Bis 250 Fotos pro Event')
    assert.equal(photoLimitLabel('PREMIUM'), "Bis 1'000 Fotos pro Event")
    assert.equal(photoLimitLabel('ENTERPRISE'), 'Unbegrenzte Foto-Uploads')
  })

  it('Fliesstext', () => {
    assert.equal(photoLimitPhrase('BASIC'), 'bis 250 Fotos')
    assert.equal(photoLimitPhrase('ENTERPRISE'), 'unbegrenzt viele Fotos')
    assert.equal(
      photoLimitRange(),
      "bis 250, bis 1'000 oder unbegrenzt viele Fotos",
    )
  })

  it('Absage nennt die Grenze und laesst das Wort Demo nur bei Demos stehen', () => {
    assert.equal(
      photoLimitReachedMessage(1000, false),
      "Dieses Event ist auf 1'000 Fotos begrenzt und voll.",
    )
    assert.equal(
      photoLimitReachedMessage(20, true),
      'Dieses Demo-Event ist auf 20 Fotos begrenzt und voll.',
    )
  })
})
