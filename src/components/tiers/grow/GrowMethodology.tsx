'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Intermediate "why our system wins" section. Reads `grow.methodology`:
 *   eyebrow, title, points: string[]
 * Renders a 2x2 grid of tier-cards, each with a check + the point text.
 */
export function GrowMethodology() {
  const t = useTranslations('grow.methodology')
  const points = (t.raw('points') as string[]) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="max-w-2xl">
          {t.has('eyebrow') && (
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text">
              {t('eyebrow')}
            </p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="tier-card flex items-start gap-4 rounded-2xl p-6"
            >
              <span
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold tier-chip"
                aria-hidden
              >
                ✓
              </span>
              <p className="text-[15px] leading-relaxed text-foreground/80">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
