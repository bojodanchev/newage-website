'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface ServiceItem {
  title: string
  desc: string
}

/**
 * "What's included" section. Reads `${ns}.services`:
 *   eyebrow (optional), title, intro (optional),
 *   items: Array<{ title: string; desc: string }>,
 *   note (optional — e.g. pricing framing)
 */
export function TierServices({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.services`)
  const items = (t.raw('items') as ServiceItem[]) ?? []

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[420px] w-[420px] rounded-full blur-[150px]"
        style={{ background: 'var(--tier-glow)' }}
      />
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
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
          <p className="mt-5 max-w-2xl text-lg text-foreground/65">{t('intro')}</p>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="tier-card rounded-2xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl tier-chip">
                <span className="text-base font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/65">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {t.has('note') && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto mt-10 max-w-2xl text-center text-base text-foreground/70"
          >
            {t('note')}
          </motion.p>
        )}
      </div>
    </section>
  )
}
