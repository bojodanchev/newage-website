'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Testimonial {
  name: string
  role: string
  city: string
  quote: string
  metric: string
  image: string
}

export function MetaAdsTestimonials() {
  const t = useTranslations('meta-ads.testimonials')
  const items = t.raw('items') as Testimonial[]

  return (
    <section
      id="testimonials"
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <TestimonialCard key={item.name} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Portrait({ image, name }: { image: string; name: string }) {
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(image, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setHasImage(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [image])

  return (
    <div className="relative h-20 w-20 shrink-0">
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent-purple/50 via-transparent to-accent-mint/40 blur-md opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-full border border-foreground/10 bg-gradient-to-br from-accent-purple/40 via-primary to-accent-mint/20"
      >
        {hasImage && (
          <span
            aria-hidden
            className="block h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
      </span>
      <span className="sr-only">{name}</span>
    </div>
  )
}

function TestimonialCard({ item, idx }: { item: Testimonial; idx: number }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease }}
      whileHover={prefersReduced ? undefined : { y: -6 }}
      className="group glass-strong relative flex flex-col rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-accent-mint/30 hover:shadow-[0_24px_60px_-30px_rgba(108,58,255,0.45)]"
    >
      <span
        aria-hidden
        className="absolute right-6 top-6 font-heading text-6xl leading-none text-accent-purple/40 select-none"
      >
        “
      </span>

      <blockquote className="mt-2 text-base leading-relaxed text-foreground/85 md:text-lg">
        {item.quote}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-foreground/10 pt-6">
        <Portrait image={item.image} name={item.name} />
        <div className="flex flex-col">
          <span className="font-heading text-base font-bold text-foreground">{item.name}</span>
          <span className="text-xs text-foreground/60">{item.role}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
            {item.city}
          </span>
        </div>
      </figcaption>

      <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-accent-mint/30 bg-accent-mint/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-mint">
        {item.metric}
      </div>
    </motion.figure>
  )
}
