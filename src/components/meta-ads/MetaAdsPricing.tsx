'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Variant {
  tag: string
  title: string
  price: string
  priceNote: string
  points: string[]
}

interface RoiItem {
  k: string
  v: string
}

export function MetaAdsPricing() {
  const t = useTranslations('meta-ads.pricing')
  const variants = t.raw('variants') as Variant[]
  const roi = t.raw('roi') as RoiItem[]

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent-purple/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[360px] w-[360px] rounded-full bg-accent-mint/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-purple"
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
          className="mt-6 inline-flex rounded-full border border-foreground/15 bg-foreground/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/60"
        >
          {t('valueNote')}
        </motion.p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {variants.map((variant, idx) => {
            const featured = idx === 1
            return (
              <motion.div
                key={variant.tag}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 lg:p-10 ${
                  featured
                    ? 'glass-strong border-accent-mint/30 shadow-[0_24px_60px_-30px_rgba(0,229,160,0.45)]'
                    : 'glass'
                }`}
              >
                <span
                  className={`inline-flex self-start rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] ${
                    featured
                      ? 'border-accent-mint/40 bg-accent-mint/10 text-accent-mint'
                      : 'border-foreground/15 text-foreground/60'
                  }`}
                >
                  {variant.tag}
                </span>

                <h3 className="mt-6 font-heading text-xl font-bold leading-tight md:text-2xl">
                  {variant.title}
                </h3>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-heading text-4xl font-extrabold tracking-tight gradient-text md:text-5xl">
                    {variant.price}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                    {variant.priceNote}
                  </span>
                </div>

                <ul className="mt-8 space-y-3 border-t border-foreground/10 pt-6">
                  {variant.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-foreground/80 md:text-base"
                    >
                      <span
                        className={`mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                          featured ? 'bg-accent-mint' : 'bg-accent-purple'
                        }`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#lead-form"
                  className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    featured
                      ? 'bg-foreground text-primary'
                      : 'border border-foreground/20 text-foreground hover:border-foreground/40'
                  }`}
                >
                  {t('cta')}
                </a>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-10"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="font-heading text-xl font-bold md:text-2xl">{t('roiTitle')}</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-mint">
              {t('roiBody')}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roi.map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-foreground/10 p-5 lg:p-6"
              >
                <div className="font-heading text-lg font-bold gradient-text">{item.k}</div>
                <p className="mt-2 text-sm text-foreground/70">{item.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
