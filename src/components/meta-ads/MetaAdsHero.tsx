'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

export function MetaAdsHero() {
  const t = useTranslations('meta-ads.hero')

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/20 blur-[140px]" />
        <div className="absolute right-1/4 top-2/3 h-[420px] w-[420px] rounded-full bg-accent-mint/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 text-center sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/60"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-8 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {t('headlineLine1')}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="gradient-text">{t('headlineLine2')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="mx-auto mt-8 max-w-2xl text-lg text-foreground/70 md:text-xl"
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#lead-form"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#solution"
            className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-8 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="mt-20 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/30"
        >
          {t('scrollHint')}
        </motion.p>
      </div>
    </section>
  )
}
