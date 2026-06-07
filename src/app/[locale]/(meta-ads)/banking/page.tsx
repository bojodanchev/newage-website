import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { MetaAdsHero } from '@/components/meta-ads/MetaAdsHero'
import { MetaAdsProblem } from '@/components/meta-ads/MetaAdsProblem'
import { MetaAdsSolution } from '@/components/meta-ads/MetaAdsSolution'
import { MetaAdsQualification } from '@/components/meta-ads/MetaAdsQualification'
import { MetaAdsCaseStudies } from '@/components/meta-ads/MetaAdsCaseStudies'
import { MetaAdsTestimonials } from '@/components/meta-ads/MetaAdsTestimonials'
import { MetaAdsOffer } from '@/components/meta-ads/MetaAdsOffer'
import { MetaAdsPricing } from '@/components/meta-ads/MetaAdsPricing'
import { MetaAdsFAQ } from '@/components/meta-ads/MetaAdsFAQ'
import { MetaAdsLeadFormSection } from '@/components/meta-ads/MetaAdsLeadFormSection'
import { MetaAdsBookingSection } from '@/components/meta-ads/MetaAdsBookingSection'
import { MetaAdsFinalCTA } from '@/components/meta-ads/MetaAdsFinalCTA'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta-ads.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

/**
 * Mortgage-broker lead-gen funnel, canonical route `/banking`.
 * (Renamed from `/meta-ads`, which now permanently redirects here.) Reuses the
 * existing meta-ads components + the `meta-ads` message namespace unchanged.
 */
export default async function BankingFunnelPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <MetaAdsHero />
      <MetaAdsProblem />
      <MetaAdsSolution />
      <MetaAdsQualification />
      <MetaAdsCaseStudies />
      <MetaAdsTestimonials />
      <MetaAdsOffer />
      <MetaAdsPricing />
      <MetaAdsFAQ />
      <MetaAdsLeadFormSection />
      <MetaAdsBookingSection />
      <MetaAdsFinalCTA />
    </>
  )
}
