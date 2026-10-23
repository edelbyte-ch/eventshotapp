import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Kein «X-Powered-By: Next.js» – verraet nur den Stack.
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
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
