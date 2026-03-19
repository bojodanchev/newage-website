import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { createMetadata } from '@/lib/metadata'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/data'
import type { Locale } from '@/i18n/config'
import { ResultsGrid } from '@/components/features/work/ResultsGrid'
import { Timeline } from '@/components/features/work/Timeline'
import { BeforeAfterSlider } from '@/components/features/work/BeforeAfterSlider'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/animation/FadeIn'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies()
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const cs = getCaseStudyBySlug(slug, locale as Locale)
  if (!cs) return {}
  return createMetadata({
    title: cs.metaTitle,
    description: cs.metaDescription,
    path: `/work/${cs.slug}`,
  })
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('work')
  const cs = getCaseStudyBySlug(slug, locale as Locale)
  if (!cs) notFound()

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-neutral-800/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-purple mb-4">
              {t('detail.overline')}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl mb-4">
              {cs.client}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge color="neutral">{cs.industry}</Badge>
              {cs.servicesUsed.map((s) => (
                <Badge key={s} color="purple">{s}</Badge>
              ))}
              <Badge color="mint">{cs.timeline}</Badge>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h2 className="font-heading text-xl text-neutral-300 md:text-2xl">
              {cs.title}
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* The Challenge */}
      <SectionWrapper>
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-4">
              {t('detail.theChallenge')}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {cs.challenge}
            </p>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Our Approach */}
      <SectionWrapper className="!pt-0">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold gradient-text md:text-3xl mb-4">
              {t('detail.ourApproach')}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {cs.approach}
            </p>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* The Solution */}
      <SectionWrapper className="!pt-0">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-4">
              {t('detail.theSolution')}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-6">
              {cs.solution}
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Results */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline={t('detail.results.overline')}
          title={t('detail.results.title')}
          className="mb-12"
        />
        <div className="max-w-3xl mx-auto">
          <ResultsGrid results={cs.results} />
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      {cs.testimonial && (
        <SectionWrapper>
          <FadeIn>
            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-12">
              <svg
                className="w-10 h-10 text-accent-purple/40 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <blockquote className="text-xl text-foreground leading-relaxed mb-6 md:text-2xl">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-heading font-bold text-foreground">
                  {cs.testimonial.name}
                </p>
                <p className="text-sm text-neutral-400">
                  {cs.testimonial.title}, {cs.testimonial.company}
                </p>
              </div>
            </div>
          </FadeIn>
        </SectionWrapper>
      )}

      {/* Timeline */}
      {cs.projectTimeline.length > 0 && (
        <SectionWrapper>
          <SectionHeader
            overline={t('detail.timeline.overline')}
            title={t('detail.timeline.title')}
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto">
            <Timeline items={cs.projectTimeline} />
          </div>
        </SectionWrapper>
      )}

      {/* Before/After */}
      {cs.beforeAfter && (
        <SectionWrapper>
          <SectionHeader
            overline={t('detail.beforeAfter.overline')}
            title={t('detail.beforeAfter.title')}
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              before={cs.beforeAfter.before}
              after={cs.beforeAfter.after}
            />
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      <CTASection
        headline={t('detail.cta.headline')}
        subheadline={t('detail.cta.subheadline')}
        primaryCTA={{ label: t('detail.cta.primary'), href: '/contact' }}
        secondaryCTA={{ label: t('detail.cta.secondary'), href: '/work' }}
      />
    </>
  )
}
