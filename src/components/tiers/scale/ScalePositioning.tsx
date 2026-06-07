'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Stat {
  value: string
  label: string
}

/**
 * Editorial positioning statement — reads like the opening of a strategy
 * document. Reads `scale.positioning`:
 *   eyebrow (optional), title, body OR paragraphs: string[],
 *   stats (optional): Array<{ value, label }>
 */
export function ScalePositioning() {
  const t = useTranslations('scale.positioning')
  const paragraphs = t.has('paragraphs')
    ? (t.raw('paragraphs') as string[])
    : t.has('body')
      ? [t('body')]
      : []
  const stats = (t.has('stats') ? (t.raw('stats') as Stat[]) : []) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
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
          className="mt-5 max-w-3xl font-heading text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <div className="mt-8 space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease }}
              className="max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {stats.length > 0 && (
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="tier-tint-bg p-7"
              >
                <div className="font-heading text-4xl font-extrabold tier-grad-text">
                  {s.value}
                </div>
                <div className="mt-3 text-sm leading-relaxed text-foreground/55">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
