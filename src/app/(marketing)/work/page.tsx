'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllCaseStudies } from '@/data/case-studies'
import { CaseStudyCard } from '@/components/features/work/CaseStudyCard'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { cn } from '@/lib/utils'

const categories = ['All', 'SaaS', 'E-Commerce', 'Real Estate'] as const

export default function WorkPage() {
  const allCaseStudies = getAllCaseStudies()
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered =
    activeFilter === 'All'
      ? allCaseStudies
      : allCaseStudies.filter((cs) => cs.industry === activeFilter)

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline="Our Work"
          title="Results That Speak for Themselves"
          description="Real projects. Real metrics. Real impact. See how we help businesses build systems that drive measurable growth."
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
              {cat}
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
            No case studies found for this category. Check back soon.
          </p>
        )}
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline="Want Results Like These?"
        subheadline="Every project starts with a conversation. Tell us where you are, and we'll show you where we can take you."
        primaryCTA={{ label: "Let's Talk", href: '/contact' }}
        secondaryCTA={{ label: 'View Services', href: '/services' }}
      />
    </>
  )
}
