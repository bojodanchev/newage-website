'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import type { InfluencerFunnelContent } from '@/data/influencer'
import { InfluencerLeadForm } from './InfluencerLeadForm'

const assets = {
  brands: { image: '/influencer/brand-studio.webp', position: 'object-center', color: '#ff725e' },
  influencers: { image: '/influencer/ecosystem-hero.webp', position: 'object-[70%_center]', color: '#a78bfa' },
  ugc: { image: '/influencer/ugc-creator.webp', position: 'object-center', color: '#8ee8c1' },
}

const ease = [0.16, 1, 0.3, 1] as const

export function InfluencerFunnel({ content, locale }: { content: InfluencerFunnelContent; locale: string }) {
  const reduced = useReducedMotion()
  const asset = assets[content.id]

  return (
    <div className="overflow-clip bg-[#0b0a0a] text-[#f5f0e9]" style={{ '--funnel-accent': asset.color } as React.CSSProperties}>
      <section className="relative min-h-[86svh] overflow-hidden border-b border-white/10">
        <Image src={asset.image} alt="" fill priority sizes="100vw" className={`object-cover ${asset.position}`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,7,.98)_0%,rgba(8,7,7,.85)_42%,rgba(8,7,7,.18)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0a] via-transparent to-black/30" />
        <div className="relative mx-auto flex min-h-[86svh] max-w-[1500px] items-end px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20">
          <div className="max-w-4xl">
            <motion.p initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[11px] uppercase tracking-[.26em] text-[var(--funnel-accent)]">NewAge Influence · {content.hero.eyebrow}</motion.p>
            <motion.h1 initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .08, ease }} className="mt-5 max-w-4xl font-heading text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[.94] tracking-[-.06em]">{content.hero.title}</motion.h1>
            <motion.p initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .24, ease }} className="mt-6 max-w-2xl text-lg text-white/65">{content.hero.description}</motion.p>
            <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .38 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#apply" className="inline-flex min-h-12 items-center gap-8 rounded-full bg-[var(--funnel-accent)] px-6 py-3.5 font-semibold text-[#130b09] transition-transform hover:scale-[1.02]">{content.hero.cta}<span>→</span></a>
              <span className="font-mono text-[10px] uppercase tracking-[.17em] text-white/40">{content.hero.note}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[.25em] text-[var(--funnel-accent)]">{content.problem.eyebrow}</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.03] tracking-[-.045em] sm:text-6xl">{content.problem.title}</h2>
          </div>
          <div className="border-t border-white/15">
            {content.problem.items.map((item, index) => (
              <motion.div key={item} initial={reduced ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .05, ease }} className="flex items-center gap-5 border-b border-white/10 py-7 text-xl text-white/65 sm:text-2xl">
                <span className="font-mono text-xs text-[var(--funnel-accent)]">0{index + 1}</span>{item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f2ede5] text-[#171312]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[.25em] text-[#a53c2d]">{content.solution.eyebrow}</p>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.03] tracking-[-.045em] sm:text-6xl">{content.solution.title}</h2>
              <p className="mt-5 max-w-lg text-black/55">{content.solution.description}</p>
            </div>
            <div className="grid sm:grid-cols-2">
              {content.solution.items.map((item, index) => <div key={item} className="min-h-28 border-b border-black/15 py-6 pr-6 text-xl font-semibold sm:min-h-36 sm:border-l sm:pl-7"><span className="mb-5 block font-mono text-[10px] text-black/35">0{index + 1}</span>{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[.25em] text-[var(--funnel-accent)]">{content.services.eyebrow}</p>
        <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-[-.045em] sm:text-6xl">{content.services.title}</h2>
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-5 border-y border-white/10 py-10">
          {content.services.items.map((item) => <span key={item} className="font-heading text-2xl font-semibold text-white/65 sm:text-4xl">{item}</span>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#151111]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[.25em] text-[var(--funnel-accent)]">{content.journey.eyebrow}</p>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-[-.045em] sm:text-6xl">{content.journey.title}</h2>
          <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-7">
            {content.journey.steps.map((step, index) => <div key={step} className="flex min-h-36 flex-col justify-between border-b border-r border-white/10 p-5"><span className="font-mono text-[10px] text-[var(--funnel-accent)]">0{index + 1}</span><strong className="font-heading text-lg leading-tight">{step}</strong></div>)}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[.75fr_1.25fr] lg:px-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[.25em] text-[var(--funnel-accent)]">{content.form.eyebrow}</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.03] tracking-[-.045em] sm:text-5xl">{content.form.title}</h2>
            <p className="mt-5 max-w-md text-white/55">{content.form.description}</p>
            <Link href="/influencer-marketing" className="mt-9 inline-flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-white">← {locale === 'bg' ? 'Обратно към екосистемата' : 'Back to the ecosystem'}</Link>
          </div>
          <InfluencerLeadForm content={content} locale={locale} />
        </div>
      </section>
    </div>
  )
}
