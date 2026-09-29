/**
 * Ablageorte der abgeleiteten Bilder. Sie stehen nicht in der Datenbank,
 * sondern folgen aus Event und Foto — deshalb an einer Stelle, damit
 * Erzeugen, URL-Erneuerung und Loeschen dieselben Keys verwenden.
 */
export const thumbKey = (eventId: string, photoId: string) =>
  `events/${eventId}/thumb/${photoId}.jpg`

export const displayKey = (eventId: string, photoId: string) =>
  `events/${eventId}/display/${photoId}.jpg`
