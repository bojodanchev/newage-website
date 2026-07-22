import { setRequestLocale } from 'next-intl/server'
import { createMetadata } from '@/lib/metadata'
import { getInfluencerFunnel } from '@/data/influencer'
import { InfluencerFunnel } from '@/components/influencer/InfluencerFunnel'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const content = getInfluencerFunnel(locale, 'ugc')
  return createMetadata({ ...content.metadata, path: '/influencer-marketing/ugc', image: '/influencer/ugc-creator.webp', locale })
}

export default async function UgcPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <InfluencerFunnel content={getInfluencerFunnel(locale, 'ugc')} locale={locale} />
}
