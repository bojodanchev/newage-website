'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Shared tier hero. Reads `${ns}.hero`:
 *   eyebrow, headlineLine1, headlineLine2, subheadline,
 *   ctaPrimary, ctaSecondary (optional), trust (optional)
 * Color comes from the ancestor `.tier-*` class.
 */
export function TierHero({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.hero`)
  const hasSecondary = t.has('ctaSecondary')
  const hasTrust = t.has('trust')

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[38%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: 'var(--tier-glow)' }}
        />
        <div className="absolute inset-0 dot-grid opacity-[0.35]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] tier-chip"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-8 font-heading text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
        >
          {t('headlineLine1')}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="tier-grad-text">{t('headlineLine2')}</span>
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
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#lead"
            className="inline-flex h-14 w-full items-center justify-center rounded-full px-9 text-base font-bold tier-cta-grad transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {t('ctaPrimary')}
          </a>
          {hasSecondary && (
            <a
              href="#how"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/15 px-9 text-base font-semibold text-foreground transition-colors hover:border-white/35 sm:w-auto"
            >
              {t('ctaSecondary')}
            </a>
          )}
        </motion.div>

        {hasTrust && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
            className="mt-8 text-sm text-foreground/50"
          >
            {t('trust')}
          </motion.p>
        )}
      </div>
    </section>
  )
}
