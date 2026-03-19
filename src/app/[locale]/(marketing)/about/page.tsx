import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllTeamMembers } from '@/data'
import type { Locale } from '@/i18n/config'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { SlideIn } from '@/components/animation/SlideIn'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('about.title'),
    description: t('about.description'),
  }
}

const techTools = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'Redis', 'AWS', 'Vercel', 'Stripe',
  'HubSpot', 'Make', 'n8n', 'Figma', 'Supabase',
  'TailwindCSS', 'Docker', 'GitHub Actions',
]

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const teamMembers = getAllTeamMembers(locale as Locale)

  const valueKeys = ['results', 'systems', 'partnership', 'innovation'] as const
  const valueIcons: Record<string, string> = {
    results: '📊',
    systems: '⚙️',
    partnership: '🤝',
    innovation: '💡',
  }
  const values = valueKeys.map((key) => ({
    title: t(`values.items.${key}.title`),
    description: t(`values.items.${key}.description`),
    icon: valueIcons[key],
  }))

  const metricKeys = ['projectsDelivered', 'revenueGenerated', 'clientRetention', 'countriesServed'] as const
  const metrics = metricKeys.map((key) => ({
    value: t(`metrics.items.${key}.value`),
    label: t(`metrics.items.${key}.label`),
  }))

  return (
    <>
      {/* Brand Story Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline={t('hero.overline')}
          title={t('hero.title')}
        />
        <FadeIn delay={0.2}>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mt-6">
            {t('story.paragraph1')}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mt-4">
            {t('story.paragraph2')}
          </p>
        </FadeIn>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper className="!pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SlideIn direction="left">
            <Card variant="hover" className="h-full">
              <span className="text-sm font-mono uppercase tracking-widest text-accent-purple mb-4 block">
                {t('missionVision.mission.label')}
              </span>
              <p className="text-lg text-foreground leading-relaxed">
                {t('missionVision.mission.text')}
              </p>
            </Card>
          </SlideIn>
          <SlideIn direction="right">
            <Card variant="hover" className="h-full">
              <span className="text-sm font-mono uppercase tracking-widest text-accent-mint mb-4 block">
                {t('missionVision.vision.label')}
              </span>
              <p className="text-lg text-foreground leading-relaxed">
                {t('missionVision.vision.text')}
              </p>
            </Card>
          </SlideIn>
        </div>
      </SectionWrapper>

      {/* Co-Founders */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline={t('founders.overline')}
          title={t('founders.title')}
          className="mb-16"
        />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-20">
          <FadeIn className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent-purple via-accent-mint to-accent-orange p-1">
              <img
                src="/team/bojo.png"
                alt={t('founders.bojidar.name')}
                className="w-full h-full rounded-full object-cover object-[center_20%]"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-accent-purple mb-2">
                {t('founders.bojidar.role')}
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 md:text-4xl">
                {t('founders.bojidar.name')}
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                {t('founders.bojidar.bio1')}
              </p>
              <p className="text-neutral-400 leading-relaxed">
                {t('founders.bojidar.bio2')}
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <FadeIn className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent-mint via-accent-purple to-accent-orange p-1">
              <img
                src="/team/sean.jpg"
                alt={t('founders.sean.name')}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-accent-mint mb-2">
                {t('founders.sean.role')}
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 md:text-4xl">
                {t('founders.sean.name')}
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                {t('founders.sean.bio1')}
              </p>
              <p className="text-neutral-400 leading-relaxed">
                {t('founders.sean.bio2')}
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Team */}
      {teamMembers.length > 0 && (
        <SectionWrapper>
          <SectionHeader
            overline={t('team.overline')}
            title={t('team.title')}
            description={t('team.description')}
            className="mb-12"
          />
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <FadeIn key={member.name}>
                <Card variant="hover" className="h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-mint p-0.5 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-foreground">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent-purple mb-3">{member.role}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </StaggerChildren>
        </SectionWrapper>
      )}

      {/* Values */}
      <SectionWrapper>
        <SectionHeader
          overline={t('values.overline')}
          title={t('values.title')}
          description={t('values.description')}
          className="mb-12"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value) => (
            <FadeIn key={value.title}>
              <Card variant="hover" className="h-full">
                <span className="text-3xl mb-3 block">{value.icon}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* By the Numbers */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline={t('metrics.overline')}
          title={t('metrics.title')}
          className="mb-12"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <FadeIn key={metric.label} delay={index * 0.1}>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text md:text-5xl mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-neutral-400">{metric.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionWrapper>

      {/* Tech & Tools */}
      <SectionWrapper>
        <SectionHeader
          overline={t('techTools.overline')}
          title={t('techTools.title')}
          description={t('techTools.description')}
          className="mb-12"
        />
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {techTools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-300 hover:border-accent-purple/30 hover:text-foreground transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCTA={{ label: t('cta.secondary'), href: '/process' }}
      />
    </>
  )
}
