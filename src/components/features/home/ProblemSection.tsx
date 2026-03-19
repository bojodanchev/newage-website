'use client'

import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const painPointKeys = ['scatteredSystems', 'manualEverything', 'noRealFunnel', 'techOverwhelm'] as const

const painPointIcons = [
  <svg key="scattered" className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875S10.5 3.089 10.5 4.125c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c.186 1.613.93 3.084 2.1 4.215a6.005 6.005 0 003.72 1.605m0 0v4.5m0-4.5a6.005 6.005 0 013.72-1.605 6.02 6.02 0 002.1-4.215 48.453 48.453 0 01-4.163.3.64.64 0 01-.657-.643v0c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875S10.5 3.089 10.5 4.125c0 .369.128.713.349 1.003.215.283.401.604.401.959v0" />
  </svg>,
  <svg key="manual" className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="funnel" className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>,
  <svg key="overwhelm" className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H20.5m-4.58 5.1l5.1-5.1m0 0l-5.1-5.1m5.1 5.1H3.5" />
  </svg>,
]

export function ProblemSection() {
  const t = useTranslations('home')

  return (
    <section id="problem" className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            {t('problem.title')}
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {painPointKeys.map((key, i) => (
            <motion.div key={key} variants={fadeUp}>
              <Card variant="hover" className="h-full border-l-2 border-red-500/30">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">{painPointIcons[i]}</div>
                <h3 className="text-lg font-semibold font-heading mb-2">
                  {t(`problem.items.${key}.title`)}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t(`problem.items.${key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.4} className="text-center mt-12">
          <p className="gradient-text font-heading text-2xl font-semibold">
            {t('problem.betterWay')}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
