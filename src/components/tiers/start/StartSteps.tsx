'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Step {
  title: string
  desc: string
}

/**
 * Beginner 4-step "what we actually do" flow. Reads `start.steps`:
 *   eyebrow, title, intro (optional), items: Array<{ title, desc }>
 * Horizontal with connectors on desktop, vertical stack on mobile.
 */
export function StartSteps() {
  const t = useTranslations('start.steps')
  const items = (t.raw('items') as Step[]) ?? []

  return (
    <section id="how" className="section-padding relative scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text">
            {t('eyebrow')}
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
          >
            {t('title')}
          </motion.h2>
          {t.has('intro') && (
            <p className="mt-5 text-lg text-foreground/65">{t('intro')}</p>
          )}
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          {/* connector line (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--tier-ring), var(--tier-ring), transparent)',
            }}
            aria-hidden
          />
          {items.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="relative"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-xl font-extrabold tier-cta-grad tier-glow">
                {i + 1}
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/65">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
