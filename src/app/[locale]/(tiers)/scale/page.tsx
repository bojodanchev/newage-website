import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TierNav } from '@/components/tiers/TierNav'
import { TierHero } from '@/components/tiers/TierHero'
import { ScalePositioning } from '@/components/tiers/scale/ScalePositioning'
import { ScaleCapabilities } from '@/components/tiers/scale/ScaleCapabilities'
import { ScaleDifferentiators } from '@/components/tiers/scale/ScaleDifferentiators'
import { TierProof } from '@/components/tiers/TierProof'
import { ScaleEngagement } from '@/components/tiers/scale/ScaleEngagement'
import { TierLeadSection } from '@/components/tiers/TierLeadSection'
import { TierFinalCta } from '@/components/tiers/TierFinalCta'
import { TierFooter } from '@/components/tiers/TierFooter'
import { TierStickyCta } from '@/components/tiers/TierStickyCta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'scale.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  }
}

export default async function ScalePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="tier-scale">
      <TierNav ns="scale" />
      <TierHero ns="scale" />
      <ScalePositioning />
      <ScaleCapabilities />
      <ScaleDifferentiators />
      <TierProof ns="scale" />
      <ScaleEngagement />
      <TierLeadSection ns="scale" tier="scale" />
      <TierFinalCta ns="scale" />
      <TierFooter ns="scale" />
      <TierStickyCta ns="scale" />
    </div>
  )
}
