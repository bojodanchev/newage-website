'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Badge } from '@/components/ui/Badge'
import { fadeUp } from '@/lib/animations'

const caseStudyKeys = ['saas', 'ecommerce', 'realEstate'] as const
const caseStudyMeta = [
  { slug: 'saas-3x-revenue', metric: '3x', color: 'purple' as const },
  { slug: 'ecommerce-automation', metric: '500%', color: 'mint' as const },
  { slug: 'real-estate-pipeline', metric: '10K+', color: 'orange' as const },
]

export function CaseStudiesSection() {
  const t = useTranslations('home')

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            {t('caseStudies.overline')}
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            {t('caseStudies.title')} <span className="gradient-text">{t('caseStudies.titleHighlight')}</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudyKeys.map((key, i) => (
            <motion.div key={key} variants={fadeUp}>
              <Link
                href={`/work/${caseStudyMeta[i].slug}`}
                className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:border-accent-purple/30"
              >
                <div className="relative h-32 rounded-t-xl bg-gradient-to-br from-accent-purple/20 via-accent-mint/10 to-transparent flex items-center justify-center">
                  <span className="absolute inset-0 flex items-center justify-center font-heading text-5xl font-bold text-white/20">
                    {caseStudyMeta[i].metric}
                  </span>
                  <Badge color={caseStudyMeta[i].color} className="absolute top-3 right-3">
                    {t(`caseStudies.items.${key}.industry`)}
                  </Badge>
                </div>
                <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-3">
                  {t(`caseStudies.items.${key}.headline`)}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {t(`caseStudies.items.${key}.description`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-accent-purple group-hover:text-accent-mint transition-colors font-medium">
                  {t('caseStudies.readCaseStudy')}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="text-center mt-12 pb-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-mint transition-colors font-medium"
          >
            {t('caseStudies.viewAll')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
