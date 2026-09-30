import 'server-only'

import { cacheLife } from 'next/cache'
import { getActivePromotion, type Promotion } from '@/lib/promotions'

/**
 * Die heute buchbare Aktion fuer die statisch vorgerenderten Marketingseiten.
 *
 * Mit cacheComponents darf eine vorgerenderte Seite die Uhrzeit nur in einem
 * gecachten Bereich lesen. Stuendlich neu berechnet: endet eine Aktion um
 * Mitternacht, verschwinden Hinweise und Aktionspreise spaetestens eine
 * Stunde danach – der Checkout rechnet ohnehin selbst nach.
 */
export async function getDisplayPromotion(): Promise<Promotion | null> {
  'use cache'
  cacheLife('hours')
  return getActivePromotion()
}
