import type { ReactNode } from 'react'
import { PixelLoader } from '@/components/meta-ads/PixelLoader'
import { GA4Loader } from '@/components/meta-ads/GA4Loader'

/**
 * Layout for the 3-tier conversion funnels (/start, /grow, /scale).
 * Intentionally has NO marketing nav/footer — each tier page is a focused,
 * single-CTA funnel. A minimal in-page <TierNav /> handles logo + language.
 */
export default function TiersLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-primary text-foreground">
      <PixelLoader />
      <GA4Loader />
      {children}
    </main>
  )
}
