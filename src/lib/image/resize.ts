import sharp from 'sharp'

export async function generateThumbnail(input: Buffer, size = 400) {
  return sharp(input)
    .rotate() // EXIF Orientation fix
    .resize(size, size, {
      fit: 'cover',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 70,
      mozjpeg: true,
    })
    .toBuffer()
}

/**
 * Fassung fuer die Lightbox. Die Originale vom Handy wiegen im Schnitt 5 MB
 * (gemessen: 41 Fotos, bis 10.7 MB) — damit stand die Lightbox auf dem Handy
 * sekundenlang auf dem Ladekreis. 1920 px bei q80 sind rund 385 kB und auf
 * einem Handy- oder Laptopbildschirm nicht vom Original zu unterscheiden.
 * WebP brachte nur 5 % weniger, JPEG bleibt wie beim Thumbnail.
 */
export async function generateDisplayImage(input: Buffer, maxEdge = 1920) {
  return sharp(input)
    .rotate() // EXIF Orientation fix
    .resize(maxEdge, maxEdge, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 80,
      mozjpeg: true,
    })
    .toBuffer()
}
