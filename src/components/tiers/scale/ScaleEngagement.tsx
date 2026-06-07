'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Phase {
  title: string
  desc: string
}

/**
 * Stepped engagement timeline. Reads `scale.engagement`:
 *   eyebrow (optional), title, phases: Array<{ title, desc }>, note (optional)
 * Horizontal stepped timeline on desktop (connector line), stacked on mobile.
 */
export function ScaleEngagement() {
  const t = useTranslations('scale.engagement')
  const phases = (t.raw('phases') as Phase[]) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
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

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connector line (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px md:block"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--tier-ring), var(--tier-ring), transparent)',
            }}
            aria-hidden
          />
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg font-extrabold tier-cta-grad tier-glow">
                {i + 1}
              </div>
              <h3 className="mt-6 font-heading text-lg font-bold tier-accent-text">
                {phase.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/65">
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {t.has('note') && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
            className="mt-12 inline-flex rounded-full px-5 py-2.5 text-sm text-foreground/70 tier-chip"
          >
            {t('note')}
          </motion.p>
        )}
      </div>
    </section>
  )
}
