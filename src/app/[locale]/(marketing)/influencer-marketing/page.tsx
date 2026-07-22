import { setRequestLocale } from 'next-intl/server'
import { createMetadata } from '@/lib/metadata'
import { getInfluencerLanding } from '@/data/influencer'
import { InfluencerLanding } from '@/components/influencer/InfluencerLanding'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const content = getInfluencerLanding(locale)
  return createMetadata({ ...content.metadata, path: '/influencer-marketing', image: '/influencer/ecosystem-hero.webp', locale })
}

export default async function InfluencerMarketingPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <InfluencerLanding content={getInfluencerLanding(locale)} />
}
