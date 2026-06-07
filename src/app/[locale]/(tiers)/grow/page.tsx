import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TierNav } from '@/components/tiers/TierNav'
import { TierHero } from '@/components/tiers/TierHero'
import { TierPains } from '@/components/tiers/TierPains'
import { GrowFunnel } from '@/components/tiers/grow/GrowFunnel'
import { TierServices } from '@/components/tiers/TierServices'
import { GrowMethodology } from '@/components/tiers/grow/GrowMethodology'
import { TierProof } from '@/components/tiers/TierProof'
import { TierLeadSection } from '@/components/tiers/TierLeadSection'
import { TierFinalCta } from '@/components/tiers/TierFinalCta'
import { TierFooter } from '@/components/tiers/TierFooter'
import { TierStickyCta } from '@/components/tiers/TierStickyCta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'grow.meta' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  }
}

export default async function GrowPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="tier-grow">
      <TierNav ns="grow" />
      <TierHero ns="grow" />
      <TierPains ns="grow" />
      <GrowFunnel />
      <TierServices ns="grow" />
      <GrowMethodology />
      <TierProof ns="grow" />
      <TierLeadSection ns="grow" tier="grow" />
      <TierFinalCta ns="grow" />
      <TierFooter ns="grow" />
      <TierStickyCta ns="grow" />
    </div>
  )
}
