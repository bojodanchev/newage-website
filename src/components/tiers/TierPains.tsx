'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Pain {
  pain: string
  note?: string
}

/**
 * Problem / agitation section. Reads `${ns}.problem`:
 *   eyebrow (optional), title, intro (optional),
 *   items: Array<{ pain: string; note?: string }>,
 *   empathy (optional closing line)
 */
export function TierPains({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.problem`)
  const items = (t.raw('items') as Pain[]) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        {t.has('eyebrow') && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text"
          >
            {t('eyebrow')}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>
        {t.has('intro') && (
          <p className="mt-5 max-w-2xl text-lg text-foreground/65">{t('intro')}</p>
        )}

        <div className="mt-12 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="tier-card rounded-2xl p-5 sm:p-6"
            >
              <div className="flex gap-4">
                <span
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tier-chip"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-lg font-semibold text-foreground">{item.pain}</p>
                  {item.note && (
                    <p className="mt-1.5 text-sm text-foreground/55">{item.note}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {t.has('empathy') && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 max-w-2xl text-lg font-medium text-foreground/80"
          >
            {t('empathy')}
          </motion.p>
        )}
      </div>
    </section>
  )
}
