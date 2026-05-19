'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useCountUp } from '@/lib/hooks/useCountUp'

const ease = [0.16, 1, 0.3, 1] as const

interface CaseStudy {
  client: string
  metric: string
  metricLabel: string
  before: string
  after: string
  note: string
}

interface CaseSlotMeta {
  slug: string
  image: string
  metric: { value: number; prefix: string; suffix: string; decimals: number }
}

const SLOTS: CaseSlotMeta[] = [
  {
    slug: 'meta-ads-cpl-breakdown',
    image: '/meta-ads/case-studies/cpl.png',
    metric: { value: 62, prefix: '−', suffix: '%', decimals: 0 },
  },
  {
    slug: 'meta-ads-mrr-multiplier',
    image: '/meta-ads/case-studies/mrr.png',
    metric: { value: 3.8, prefix: '', suffix: '×', decimals: 1 },
  },
  {
    slug: 'meta-ads-booked-calls',
    image: '/meta-ads/case-studies/calls.png',
    metric: { value: 212, prefix: '+', suffix: '', decimals: 0 },
  },
]

export function MetaAdsCaseStudies() {
  const t = useTranslations('meta-ads.caseStudies')
  const items = t.raw('items') as CaseStudy[]
  const ctaLabel = t.has('readBreakdown') ? t('readBreakdown') : 'Read the breakdown →'

  return (
    <section id="results" className="relative border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/60"
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <CaseStudyCard
              key={item.client}
              item={item}
              slot={SLOTS[idx] ?? SLOTS[0]}
              ctaLabel={ctaLabel}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardCover({ slot }: { slot: CaseSlotMeta }) {
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(slot.image, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setHasImage(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slot.image])

  return (
    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-accent-purple/40 via-primary to-accent-mint/20">
      {hasImage && (
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${slot.image})` }}
        />
      )}
      <span
        aria-hidden
        className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-accent-purple/30 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-accent-mint/30 blur-3xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
    </div>
  )
}

function CaseStudyCard({
  item,
  slot,
  ctaLabel,
  idx,
}: {
  item: CaseStudy
  slot: CaseSlotMeta
  ctaLabel: string
  idx: number
}) {
  const prefersReduced = useReducedMotion()
  const { ref, formatted } = useCountUp({
    end: slot.metric.value,
    prefix: slot.metric.prefix,
    suffix: slot.metric.suffix,
    decimals: slot.metric.decimals,
    durationMs: 1400,
    enabled: !prefersReduced,
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease }}
      whileHover={prefersReduced ? undefined : { y: -6 }}
      className="group glass-strong relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:border-accent-mint/30 hover:shadow-[0_24px_60px_-30px_rgba(0,229,160,0.45)]"
    >
      <CardCover slot={slot} />


      <div className="flex flex-col p-6 lg:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
          {item.client}
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="mt-6 flex items-baseline gap-3">
          <div className="font-heading text-5xl font-extrabold tracking-tight gradient-text md:text-6xl">
            {formatted}
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

        <Link
          href={`/blog/${slot.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/70 transition-colors hover:text-accent-mint"
        >
          <span>{ctaLabel}</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </motion.article>
  )
}
