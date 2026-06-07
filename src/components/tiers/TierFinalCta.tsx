'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Closing CTA. Reads `${ns}.finalCta`:
 *   title, subtitle, cta, microcopy (optional)
 */
export function TierFinalCta({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.finalCta`)

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[420px] w-[680px] rounded-full blur-[150px]"
        style={{ background: 'var(--tier-glow)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-3xl px-6 text-center sm:px-8"
      >
        <h2 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/65">{t('subtitle')}</p>
        <a
          href="#lead"
          className="mt-9 inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold tier-cta-grad transition-transform hover:scale-[1.03]"
        >
          {t('cta')}
        </a>
        {t.has('microcopy') && (
          <p className="mt-5 text-sm text-foreground/45">{t('microcopy')}</p>
        )}
      </motion.div>
    </section>
  )
}
