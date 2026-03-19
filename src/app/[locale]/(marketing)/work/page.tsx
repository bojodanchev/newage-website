'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllCaseStudies } from '@/data'
import type { Locale } from '@/i18n/config'
import { CaseStudyCard } from '@/components/features/work/CaseStudyCard'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { cn } from '@/lib/utils'

const categories = ['All', 'SaaS', 'E-Commerce', 'Real Estate'] as const

export default function WorkPage() {
  const locale = useLocale() as Locale
  const t = useTranslations('work')
  const allCaseStudies = getAllCaseStudies(locale)
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filterLabels: Record<string, string> = {
    All: t('filters.all'),
    SaaS: t('filters.saas'),
    'E-Commerce': t('filters.ecommerce'),
    'Real Estate': t('filters.realEstate'),
  }

  const filtered =
    activeFilter === 'All'
      ? allCaseStudies
      : allCaseStudies.filter((cs) => cs.industry === activeFilter)

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

      {/* Filter Tabs */}
      <SectionWrapper className="!pt-0">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === cat
                  ? 'bg-accent-purple text-white glow-purple'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-foreground border border-white/10'
              )}
            >
              {filterLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 py-12">
            {t('emptyState')}
          </p>
        )}
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCTA={{ label: t('cta.secondary'), href: '/services' }}
      />
    </>
  )
}
