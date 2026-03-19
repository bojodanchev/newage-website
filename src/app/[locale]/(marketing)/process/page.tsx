import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ProcessTimeline } from '@/components/features/process/ProcessTimeline'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Card } from '@/components/ui/Card'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('process.title'),
    description: t('process.description'),
  }
}

export default async function ProcessPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('process')

  const phaseKeys = ['discovery', 'architecture', 'build', 'launch', 'scale'] as const
  const deliverableKeys: Record<string, string[]> = {
    discovery: ['freeStrategy', 'audit', 'goalSetting', 'competitive', 'roadmap'],
    architecture: ['systemArchitecture', 'uiUx', 'userFlow', 'techStack', 'clientApproval'],
    build: ['sprints', 'automation', 'integration', 'demos', 'qa'],
    launch: ['deployment', 'performance', 'analytics', 'training', 'launchSupport'],
    scale: ['reviews', 'optimization', 'support', 'consulting'],
  }

  const phases = phaseKeys.map((key, index) => ({
    step: index + 1,
    title: t(`phases.${key}.title`),
    duration: t(`phases.${key}.duration`),
    description: t(`phases.${key}.description`),
    deliverables: deliverableKeys[key].map((dk) => t(`phases.${key}.deliverables.${dk}`)),
  }))

  const milestoneKeys = ['week1', 'week2', 'week4', 'week6', 'week10', 'week12', 'ongoing'] as const
  const milestones = milestoneKeys.map((key) => ({
    week: t(`timeline.milestones.${key}.week`),
    milestone: t(`timeline.milestones.${key}.milestone`),
  }))

  const commitmentKeys = ['weeklyUpdates', 'fullTransparency', 'dedicatedPM'] as const
  const commitmentIcons: Record<string, string> = {
    weeklyUpdates: '📋',
    fullTransparency: '🔍',
    dedicatedPM: '🤝',
  }
  const commitments = commitmentKeys.map((key) => ({
    title: t(`commitment.items.${key}.title`),
    description: t(`commitment.items.${key}.description`),
    icon: commitmentIcons[key],
  }))

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline={t('hero.overline')}
          title={t('hero.title')}
          description={t('hero.description')}
        />
      </SectionWrapper>

      {/* Process Timeline */}
      <SectionWrapper className="!pt-0">
        <ProcessTimeline phases={phases} />
      </SectionWrapper>

      {/* What to Expect */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline={t('timeline.overline')}
          title={t('timeline.title')}
          description={t('timeline.description')}
          className="mb-12"
        />
        <div className="max-w-3xl mx-auto relative pl-8 md:pl-12">
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-mint to-accent-orange" />
          {milestones.map((item, index) => (
            <FadeIn key={item.week} delay={index * 0.08}>
              <div className="relative mb-6">
                <div className="absolute -left-8 md:-left-12 top-2 w-3 h-3 rounded-full bg-accent-purple" />
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-mono text-accent-purple font-bold shrink-0 w-20">
                    {item.week}
                  </span>
                  <p className="text-neutral-300">{item.milestone}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionWrapper>

      {/* Our Commitment */}
      <SectionWrapper>
        <SectionHeader
          overline={t('commitment.overline')}
          title={t('commitment.title')}
          description={t('commitment.description')}
          className="mb-12"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {commitments.map((item) => (
            <FadeIn key={item.title}>
              <Card variant="hover" className="h-full text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCTA={{ label: t('cta.secondary'), href: '/work' }}
      />
    </>
  )
}
