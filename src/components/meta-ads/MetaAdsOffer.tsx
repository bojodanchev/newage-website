'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface OfferModule {
  letter: string
  title: string
  body: string
}

interface ProcessStep {
  label: string
  title: string
  body: string
}

export function MetaAdsOffer() {
  const t = useTranslations('meta-ads.offer')
  const modules = t.raw('modules') as OfferModule[]
  const processSteps = t.raw('process.steps') as ProcessStep[]

  return (
    <section id="offer" className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-purple"
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

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, idx) => (
            <motion.div
              key={mod.letter}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + idx * 0.05, ease }}
              className="glass rounded-2xl p-6 lg:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 font-heading text-sm font-bold text-foreground">
                {mod.letter}
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold md:text-xl">{mod.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{mod.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            {t('process.title')}
          </motion.h3>

          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + idx * 0.08, ease }}
                className="relative rounded-2xl border border-foreground/10 p-5 lg:p-6"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                  {step.label}
                </div>
                <div className="mt-4 font-heading text-lg font-bold">{step.title}</div>
                <p className="mt-2 text-sm text-foreground/65">{step.body}</p>
                <div className="absolute right-5 top-5 font-mono text-[10px] text-foreground/30">
                  0{idx + 1}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
