// Zwei Schnitte desselben 25-Sekunden-Reels: 16:9 ab md, 9:16 darunter.
// preload='none' + Poster: das jeweils ausgeblendete Video laedt keine Bytes.
export const REEL = {
  desktop: {
    src: '/eventshot-reel-desktop.mp4',
    poster: '/eventshot-reel-desktop-poster.jpg',
  },
  mobile: {
    src: '/eventshot-reel-mobile.mp4',
    poster: '/eventshot-reel-mobile-poster.jpg',
  },
  duration: 'PT25S',
  uploadDate: '2026-10-10',
}

export function ReelPlayer({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/** biome-ignore lint/a11y/useMediaCaption: Reel mit Musik, ohne Sprachinhalt */}
      <video
        poster={REEL.mobile.poster}
        controls
        preload='none'
        playsInline
        aria-label='EventShot Video: vom Foto bis zur Galerie'
        width={720}
        height={1280}
        className='md:hidden mx-auto w-full max-w-[360px] h-auto rounded-2xl bg-black shadow-xl'
      >
        <source src={REEL.mobile.src} type='video/mp4' />
        Dein Browser kann dieses Video nicht abspielen.
      </video>
      {/** biome-ignore lint/a11y/useMediaCaption: Reel mit Musik, ohne Sprachinhalt */}
      <video
        poster={REEL.desktop.poster}
        controls
        preload='none'
        playsInline
        aria-label='EventShot Video: vom Foto bis zur Galerie'
        width={1280}
        height={720}
        className='hidden md:block w-full h-auto rounded-2xl bg-black shadow-xl'
      >
        <source src={REEL.desktop.src} type='video/mp4' />
        Dein Browser kann dieses Video nicht abspielen.
      </video>
    </div>
  )
}
