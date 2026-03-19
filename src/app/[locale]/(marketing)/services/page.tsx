import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllServices } from '@/data'
import type { Locale } from '@/i18n/config'
import { ServiceCard } from '@/components/features/services/ServiceCard'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { FadeIn } from '@/components/animation/FadeIn'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('services.title'),
    description: t('services.description'),
  }
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')
  const services = getAllServices(locale as Locale)

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

      {/* Services Grid */}
      <SectionWrapper className="!pt-0">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* What Sets Us Apart */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline={t('comparison.overline')}
          title={t('comparison.title')}
          description={t('comparison.description')}
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn direction="left">
            <div className="bg-white/5 backdrop-blur-xl border border-accent-purple/20 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold gradient-text mb-4">
                {t('comparison.newAge.label')}
              </h3>
              <ul className="space-y-3">
                {(['oneTeam', 'compounding', 'revenuFirst', 'transparency', 'postLaunch', 'directAccess'] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-neutral-300">
                    <svg
                      className="shrink-0 mt-0.5 w-4 h-4 text-accent-mint"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    {t(`comparison.newAge.items.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-neutral-500 mb-4">
                {t('comparison.typicalAgency.label')}
              </h3>
              <ul className="space-y-3">
                {(['multipleVendors', 'oneOff', 'vanityMetrics', 'monthlyReports', 'supportEnds', 'accountManagers'] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-neutral-500">
                    <svg
                      className="shrink-0 mt-0.5 w-4 h-4 text-neutral-600"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                    {t(`comparison.typicalAgency.items.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
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
