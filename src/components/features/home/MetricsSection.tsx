'use client'

import { useTranslations } from 'next-intl'
import { CountUp } from '@/components/animation/CountUp'
import { FadeIn } from '@/components/animation/FadeIn'

const metricsData = [
  { value: 47, suffix: '+', key: 'projectsDelivered' },
  { value: 215, suffix: '%', key: 'avgRevenueIncrease' },
  { value: 120, suffix: '+', key: 'automationsBuilt' },
  { value: 2400, suffix: '+', key: 'hoursSavedMonthly' },
]

export function MetricsSection() {
  const t = useTranslations('home')

  return (
    <section className="py-20 bg-neutral-800/50 border-y border-neutral-700/30">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-neutral-700/30">
          {metricsData.map((metric, i) => (
            <FadeIn key={metric.key} delay={i * 0.15} className="text-center">
              <div className="gradient-text text-5xl md:text-6xl font-heading font-bold">
                <CountUp
                  end={metric.value}
                  suffix={metric.suffix}
                  duration={2200}
                />
              </div>
              <p className="text-neutral-400 text-sm mt-2">{t(`metrics.${metric.key}`)}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
