'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/Badge'
import { fadeUp } from '@/lib/animations'
import type { CaseStudy } from '@/types/content'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const t = useTranslations('common')
  const headlineResult = caseStudy.results[0]

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/work/${caseStudy.slug}`}
        className="group block h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-purple/30 hover:scale-[1.02] hover:glow-purple"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-accent-purple/20 via-neutral-800 to-accent-mint/20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neutral-600 text-sm font-mono">
              {caseStudy.client}
            </span>
          </div>
        </div>
        <div className="p-6">
          <Badge color="neutral" className="mb-3">
            {caseStudy.industry}
          </Badge>
          {headlineResult && (
            <p className="text-3xl font-bold gradient-text mb-2">
              {headlineResult.value} {headlineResult.label}
            </p>
          )}
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent-purple transition-colors">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
            {caseStudy.challenge}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-purple group-hover:gap-2 transition-all duration-300">
            {t('readCaseStudy')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
