'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/Badge'
import { fadeUp } from '@/lib/animations'
import type { Service } from '@/types/content'

interface ServiceCardProps {
  service: Service
}

const categoryLabels: Record<string, string> = {
  'software-development': 'Development',
  'automation-systems': 'Automation',
  'marketing-growth': 'Marketing',
  'sales-infrastructure': 'Sales',
  'full-business-build': 'Full Build',
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('common')

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/services/${service.slug}`}
        className="group block h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.08] hover:scale-[1.02] hover:glow-purple"
      >
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{service.icon}</span>
          <Badge color="purple">
            {categoryLabels[service.category] ?? service.category}
          </Badge>
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-purple group-hover:gap-2 transition-all duration-300">
          {t('learnMore')}
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
      </Link>
    </motion.div>
  )
}
