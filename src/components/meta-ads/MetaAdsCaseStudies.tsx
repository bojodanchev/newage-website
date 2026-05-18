'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface CaseStudy {
  client: string
  metric: string
  metricLabel: string
  before: string
  after: string
  note: string
}

export function MetaAdsCaseStudies() {
  const t = useTranslations('meta-ads.caseStudies')
  const items = t.raw('items') as CaseStudy[]

  return (
    <section id="results" className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/60"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-6 max-w-3xl font-heading text-3xl font-extrabold leading-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 max-w-2xl text-base text-foreground/70 md:text-lg"
        >
          {t('body')}
        </motion.p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <motion.article
              key={item.client}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease }}
              className="glass-strong relative overflow-hidden rounded-2xl p-6 lg:p-8"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                {item.client}
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <div className="font-heading text-5xl font-extrabold gradient-text md:text-6xl">
                  {item.metric}
                </div>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                {item.metricLabel}
              </div>

              <dl className="mt-8 space-y-3 border-t border-foreground/10 pt-6 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                    Before
                  </dt>
                  <dd className="text-right text-foreground/70">{item.before}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-mint">
                    After
                  </dt>
                  <dd className="text-right font-medium text-foreground">{item.after}</dd>
                </div>
              </dl>

              <p className="mt-6 text-xs text-foreground/60 md:text-sm">{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
