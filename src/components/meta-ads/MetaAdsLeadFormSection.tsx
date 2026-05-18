'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { LeadForm } from './LeadForm'

const ease = [0.16, 1, 0.3, 1] as const

export function MetaAdsLeadFormSection() {
  const t = useTranslations('meta-ads.leadForm')

  return (
    <section
      id="lead-form"
      className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <h2 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-6 max-w-md text-base text-foreground/70 md:text-lg">{t('body')}</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40">
            hello@newagecontent.com
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="glass-strong rounded-3xl p-6 lg:p-8"
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}
