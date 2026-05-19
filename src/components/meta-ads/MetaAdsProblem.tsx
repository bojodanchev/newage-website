'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface ProblemItem {
  title: string
  body: string
}

export function MetaAdsProblem() {
  const t = useTranslations('meta-ads.problem')
  const items = t.raw('items') as ProblemItem[]

  return (
    <section id="problem" className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-orange"
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
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease }}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40">
                0{idx + 1}
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm text-foreground/70 md:text-base">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
