'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const FRAMEWORK_IMAGE = '/meta-ads/process/framework.png'

interface SolutionStep {
  stage: string
  label: string
  title: string
  body: string
}

function FrameworkDiagram() {
  const [hasImage, setHasImage] = useState(false)
  useEffect(() => {
    let cancelled = false
    fetch(FRAMEWORK_IMAGE, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setHasImage(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  if (!hasImage) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      className="mt-12 overflow-hidden rounded-3xl border border-foreground/10"
    >
      <span
        className="block aspect-[3/2] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${FRAMEWORK_IMAGE})` }}
        aria-hidden
      />
    </motion.div>
  )
}

export function MetaAdsSolution() {
  const t = useTranslations('meta-ads.solution')
  const steps = t.raw('steps') as SolutionStep[]

  return (
    <section id="solution" className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16">
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
          <span className="gradient-text">{t('title')}</span>
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

        <FrameworkDiagram />

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent md:block" />
          {steps.map((step, idx) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12, ease }}
              className="glass relative rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-accent-purple/40 bg-accent-purple/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-purple">
                  {step.stage}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                  {step.label}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold md:text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm text-foreground/70 md:text-base">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
