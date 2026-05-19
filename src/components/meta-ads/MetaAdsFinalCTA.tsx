'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

export function MetaAdsFinalCTA() {
  const t = useTranslations('meta-ads.finalCta')

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden border-t border-foreground/5 px-6 py-32 sm:px-8 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-mint"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl"
        >
          <span className="gradient-text">{t('title')}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 md:text-lg"
        >
          {t('body')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#booking"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#lead-form"
            className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-8 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40"
        >
          {t('trust')}
        </motion.p>
      </div>
    </section>
  )
}
