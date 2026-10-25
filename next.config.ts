import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Kein «X-Powered-By: Next.js» – verraet nur den Stack.
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  // Markdown-Fassungen (public/md, siehe scripts/build-markdown.mjs) auch beim
  // direkten Abruf mit Zeichensatz ausliefern und nicht doppelt indexieren.
  async headers() {
    return [
      {
        source: '/md/:path*',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
    ]
  },
  images: {
    qualities: [25, 40, 50, 60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.edelbyte.ch',
      },
      {
        protocol: 'https',
        hostname: 'minio.edelbyte.ch',
      },
    ],
  },
}

export default nextConfig
