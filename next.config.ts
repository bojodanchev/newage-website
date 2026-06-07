import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', '@react-three/fiber', '@react-three/drei'],
  },
  // Permanent 308 rename: the mortgage funnel moved /meta-ads → /banking.
  // Runs at the routing layer (before rendering) so existing ad links keep
  // working and their query string (fbclid/utm/…) is preserved.
  async redirects() {
    return [
      { source: '/meta-ads', destination: '/banking', permanent: true },
      { source: '/bg/meta-ads', destination: '/bg/banking', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
