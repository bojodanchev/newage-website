'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import type { InfluencerLandingContent } from '@/data/influencer'

const ease = [0.16, 1, 0.3, 1] as const

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d={diagonal ? 'M4 14 14 4M6 4h8v8' : 'M3 9h12m-4-4 4 4-4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function InfluencerLanding({ content }: { content: InfluencerLandingContent }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const networkY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -140])
  const heroScale = useTransform(scrollYProgress, [0, 0.22], reduced ? [1, 1] : [1, 1.06])

  return (
    <div className="overflow-clip bg-[#0b0a0a] text-[#f5f0e9] [--influence:#ff725e]">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-white/10">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image src="/influencer/ecosystem-hero.webp" alt="Creators producing a campaign together in a studio" fill priority sizes="100vw" className="object-cover object-[64%_center]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,8,.98)_0%,rgba(9,8,8,.86)_34%,rgba(9,8,8,.18)_72%,rgba(9,8,8,.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,8,8,.95)_0%,transparent_35%,rgba(9,8,8,.3)_100%)]" />
        <motion.div aria-hidden="true" style={{ y: networkY }} className="absolute inset-y-0 left-[54%] hidden w-px bg-gradient-to-b from-transparent via-[#ff725e]/50 to-transparent lg:block" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] items-end px-6 pb-12 pt-28 sm:px-10 md:pb-16 lg:px-16 lg:pb-20">
          <div className="max-w-4xl">
            <motion.p initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff9a8b] sm:text-xs">
              {content.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.08, ease }}
              className="max-w-3xl font-heading text-[clamp(3.2rem,8.5vw,8.5rem)] font-extrabold leading-[0.88] tracking-[-0.065em]"
            >
              {content.hero.title}{' '}
              <span className="text-[#ff725e]">{content.hero.titleAccent}</span>
            </motion.h1>
            <motion.p initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28, ease }} className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              {content.hero.description}
            </motion.p>
            <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.4, ease }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/influencer-marketing/brands" className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full bg-[#ff725e] px-6 py-3.5 font-semibold text-[#130b09] transition-transform hover:scale-[1.02] focus-visible:outline-[#ff725e]">
                {content.hero.primary}<span className="transition-transform group-hover:translate-x-1"><Arrow /></span>
              </Link>
              <Link href="/influencer-marketing/influencers" className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-white/30 bg-black/20 px-6 py-3.5 font-semibold backdrop-blur-md transition-colors hover:border-white/70 hover:bg-white/10">
                {content.hero.secondary}<span className="transition-transform group-hover:rotate-45"><Arrow diagonal /></span>
              </Link>
            </motion.div>
          </div>
          <div className="absolute bottom-8 right-10 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 md:flex">
            <span className="h-px w-12 bg-white/30" />{content.hero.scroll}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <Reveal className="grid gap-7 border-b border-white/10 pb-12 md:grid-cols-[1fr_1.6fr] md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff725e]">{content.audience.eyebrow}</p>
          <div>
            <h2 className="font-heading text-4xl font-bold leading-[1] tracking-[-0.045em] sm:text-6xl">{content.audience.title}</h2>
            <p className="mt-5 max-w-2xl text-base text-white/55 sm:text-lg">{content.audience.description}</p>
          </div>
        </Reveal>

        <div className="mt-6 divide-y divide-white/10">
          {content.audience.paths.map((path, index) => (
            <Reveal key={path.id} delay={index * 0.06}>
              <Link href={path.href} className="group grid min-h-[300px] gap-8 py-6 md:grid-cols-[.55fr_1fr_240px] md:items-center lg:min-h-[360px] lg:grid-cols-[.45fr_1fr_320px]">
                <div>
                  <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: path.accent }}>{path.eyebrow}</p>
                </div>
                <div className="max-w-2xl">
                  <h3 className="font-heading text-3xl font-bold leading-tight tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">{path.title}</h3>
                  <p className="mt-4 max-w-xl text-white/55">{path.description}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold" style={{ color: path.accent }}>{path.cta}<Arrow /></span>
                </div>
                <div className="relative order-first aspect-[16/10] overflow-hidden rounded-[1.25rem] md:order-none md:aspect-[4/5]">
                  <Image src={path.image} alt="" fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#f2ede5] text-[#171312]">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1fr_1.3fr] lg:px-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#b54231]">{content.shift.eyebrow}</p>
            <h2 className="mt-5 max-w-xl font-heading text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content.shift.title}</h2>
          </Reveal>
          <Reveal className="grid gap-10 sm:grid-cols-2" delay={0.08}>
            <div className="border-t border-black/20 pt-5">
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">{content.shift.oldLabel}</p>
              <ul className="space-y-5 text-lg text-black/55">{content.shift.oldItems.map((item) => <li key={item} className="flex gap-3"><span className="text-[#b54231]">×</span>{item}</li>)}</ul>
            </div>
            <div className="border-t border-[#b54231] pt-5">
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[#b54231]">{content.shift.newLabel}</p>
              <ul className="space-y-5 text-lg font-medium">{content.shift.newItems.map((item) => <li key={item} className="flex gap-3"><span className="text-[#b54231]">↗</span>{item}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff725e]">{content.process.eyebrow}</p>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-[-0.045em] sm:text-6xl">{content.process.title}</h2>
          <p className="mt-5 text-lg text-white/55">{content.process.description}</p>
        </Reveal>
        <div className="mt-16 border-t border-white/15">
          {content.process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.04}>
              <div className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[120px_1fr_1fr] md:items-center">
                <span className="font-mono text-xs text-[#ff725e]">{step.number}</span>
                <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{step.title}</h3>
                <p className="max-w-lg text-white/50">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#151111] py-24 md:py-32">
        <div aria-hidden="true" className="absolute -right-28 top-0 h-[480px] w-[480px] rounded-full bg-[#ff725e]/10 blur-[100px]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:px-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff725e]">{content.outcomes.eyebrow}</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content.outcomes.title}</h2>
            <p className="mt-5 max-w-lg text-white/55">{content.outcomes.description}</p>
          </Reveal>
          <Reveal className="grid grid-cols-2 border-l border-t border-white/10" delay={0.08}>
            {content.outcomes.items.map((item, index) => (
              <div key={item} className="flex min-h-28 items-end border-b border-r border-white/10 p-5 text-lg font-semibold sm:min-h-36 sm:p-7 sm:text-2xl">
                <span className="mr-auto">{item}</span><span className="font-mono text-[9px] text-white/25">0{index + 1}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image src="/influencer/brand-studio.webp" alt="Brand and creator reviewing campaign production" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="lg:pt-12" delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff725e]">{content.events.eyebrow}</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl">{content.events.title}</h2>
            <p className="mt-5 text-lg text-white/55">{content.events.description}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-8">
              <ul className="space-y-3 border-t border-white/15 pt-5 text-sm text-white/70">{content.events.services.map((item) => <li key={item}>{item}</li>)}</ul>
              <ul className="space-y-3 border-t border-white/15 pt-5 text-sm text-white/40">{content.events.formats.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
          <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff725e]">{content.industries.eyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-[-0.045em] sm:text-5xl">{content.industries.title}</h2>
            </div>
            <div className="flex gap-4 font-mono text-xs uppercase tracking-wider text-white/45">{content.industries.platforms.map((item) => <span key={item}>{item}</span>)}</div>
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-9" delay={0.08}>
            {content.industries.items.map((item) => <span key={item} className="font-heading text-xl font-semibold text-white/65 sm:text-2xl">{item}</span>)}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ff725e] text-[#160b09]">
        <motion.div aria-hidden="true" style={{ y: networkY }} className="absolute right-[12%] top-[-20%] h-[140%] w-px rotate-[18deg] bg-black/15" />
        <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
          <Reveal className="max-w-5xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/60">{content.final.eyebrow}</p>
            <h2 className="mt-6 font-heading text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.94] tracking-[-0.06em]">{content.final.title}</h2>
            <p className="mt-6 max-w-xl text-lg text-black/65">{content.final.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/influencer-marketing/brands#apply" className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full bg-[#160b09] px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02]">{content.final.primary}<Arrow /></Link>
              <Link href="/influencer-marketing/influencers#apply" className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-black/30 px-6 py-3.5 font-semibold transition-colors hover:bg-black/10">{content.final.secondary}<Arrow diagonal /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
