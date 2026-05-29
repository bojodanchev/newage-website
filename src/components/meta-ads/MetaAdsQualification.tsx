'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Tier {
  level: string
  title: string
  items: string[]
}

const TIER_ACCENTS = [
  {
    badge: 'border-accent-mint/40 bg-accent-mint/10 text-accent-mint',
    dot: 'bg-accent-mint',
    hover: 'hover:border-accent-mint/30 hover:shadow-[0_18px_44px_-28px_rgba(0,229,160,0.5)]',
  },
  {
    badge: 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple',
    dot: 'bg-accent-purple',
    hover: 'hover:border-accent-purple/30 hover:shadow-[0_18px_44px_-28px_rgba(108,58,255,0.5)]',
  },
  {
    badge: 'border-accent-orange/40 bg-accent-orange/10 text-accent-orange',
    dot: 'bg-accent-orange',
    hover: 'hover:border-accent-orange/30 hover:shadow-[0_18px_44px_-28px_rgba(255,138,76,0.45)]',
  },
] as const

export function MetaAdsQualification() {
  const t = useTranslations('meta-ads.qualification')
  const target = t.raw('target') as string[]
  const exclude = t.raw('exclude') as string[]
  const tiers = t.raw('tiers') as Tier[]

  return (
    <section
      id="qualification"
      className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-mint"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-6 max-w-3xl font-heading text-3xl font-extrabold leading-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 max-w-2xl text-base text-foreground/70 md:text-lg"
        >
          {t('body')}
        </motion.p>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="glass rounded-2xl p-6 lg:p-8"
          >
            <h3 className="font-heading text-lg font-bold md:text-xl">{t('targetTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {target.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 md:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-mint/40 bg-accent-mint/10 text-[11px] text-accent-mint">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
            className="glass rounded-2xl p-6 lg:p-8"
          >
            <h3 className="font-heading text-lg font-bold md:text-xl">{t('excludeTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {exclude.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/60 md:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-orange/40 bg-accent-orange/10 text-[11px] text-accent-orange">
                    ✕
                  </span>
                  <span className="line-through decoration-foreground/20">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease }}
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            {t('tiersTitle')}
          </motion.h3>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tiers.map((tier, idx) => {
              const accent = TIER_ACCENTS[idx] ?? TIER_ACCENTS[0]
              return (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.05 + idx * 0.08, ease }}
                  whileHover={{ y: -4 }}
                  className={`group glass rounded-2xl p-6 transition-all duration-300 lg:p-7 ${accent.hover}`}
                >
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] ${accent.badge}`}
                  >
                    {tier.level}
                  </span>
                  <h4 className="mt-5 font-heading text-lg font-bold md:text-xl">{tier.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {tier.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-foreground/70"
                      >
                        <span
                          className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
