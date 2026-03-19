'use client'

import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const industryKeys = ['saas', 'ecommerce', 'realEstate', 'healthcare', 'finance', 'agencies', 'localBiz'] as const
const industryIcons = ['🚀', '🛒', '🏠', '🏥', '💳', '🏢', '📍']

export function IndustriesSection() {
  const t = useTranslations('home')

  return (
    <section className="section-padding-sm bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            {t('industries.overline')}
          </p>
          <h2 className="font-heading text-3xl md:text-h3 font-bold">
            {t('industries.title')} <span className="gradient-text">{t('industries.titleHighlight')}</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {industryKeys.map((key, i) => (
            <motion.div key={key} variants={fadeUp}>
              <div className="group text-center cursor-default">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl mb-2 transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.08] group-hover:scale-110">
                  {industryIcons[i]}
                </div>
                <p className="text-sm font-medium text-neutral-300">
                  {t(`industries.items.${key}.name`)}
                </p>
                <p className="text-xs text-neutral-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`industries.items.${key}.projects`)}{t('industries.projectsSuffix')}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
