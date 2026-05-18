import type { ReactNode } from 'react'
import { PixelLoader } from '@/components/meta-ads/PixelLoader'
import { GA4Loader } from '@/components/meta-ads/GA4Loader'

export default function MetaAdsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-primary text-foreground">
      <PixelLoader />
      <GA4Loader />
      {children}
    </main>
  )
}
