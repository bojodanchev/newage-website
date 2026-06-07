import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TierNav } from '@/components/tiers/TierNav'
import { TierHero } from '@/components/tiers/TierHero'
import { TierPains } from '@/components/tiers/TierPains'
import { StartSteps } from '@/components/tiers/start/StartSteps'
import { TierProof } from '@/components/tiers/TierProof'
import { TierServices } from '@/components/tiers/TierServices'
import { TierLeadSection } from '@/components/tiers/TierLeadSection'
import { TierFinalCta } from '@/components/tiers/TierFinalCta'
import { TierFooter } from '@/components/tiers/TierFooter'
import { TierStickyCta } from '@/components/tiers/TierStickyCta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'start.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  }
}

export default async function StartPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="tier-start">
      <TierNav ns="start" />
      <TierHero ns="start" />
      <TierPains ns="start" />
      <StartSteps />
      <TierProof ns="start" />
      <TierServices ns="start" />
      <TierLeadSection ns="start" tier="start" />
      <TierFinalCta ns="start" />
      <TierFooter ns="start" />
      <TierStickyCta ns="start" />
    </div>
  )
}
