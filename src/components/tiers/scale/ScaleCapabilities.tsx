'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Group {
  title: string
  items: string[]
}

/**
 * The full capability stack — anchor #how (hero's secondary CTA scrolls here).
 * Reads `scale.capabilities`:
 *   eyebrow (optional), title, intro (optional),
 *   groups: Array<{ title, items: string[] }>
 * Rendered as a 2×2 grid of tier-card columns on md+.
 */
export function ScaleCapabilities() {
  const t = useTranslations('scale.capabilities')
  const groups = (t.raw('groups') as Group[]) ?? []

  return (
    <section id="how" className="section-padding relative scroll-mt-16">
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
          {t.has('intro') && (
            <p className="mt-5 text-lg text-foreground/65">{t('intro')}</p>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {groups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease }}
              className="tier-card flex flex-col rounded-2xl p-7 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tier-accent-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-xl font-bold">{group.title}</h3>
              </div>
              <ul className="mt-6 space-y-3.5">
                {group.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/70"
                  >
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'var(--tier-accent)' }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
