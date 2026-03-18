'use client'

import { CountUp } from '@/components/animation/CountUp'
import { FadeIn } from '@/components/animation/FadeIn'

const metrics = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 340, suffix: '%', label: 'Avg Revenue Increase' },
  { value: 500, suffix: '+', label: 'Automations Built' },
  { value: 10000, suffix: '+', label: 'Hours Saved Monthly' },
]

export function MetricsSection() {
  return (
    <section className="py-20 bg-neutral-800/30 border-y border-neutral-700/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.15} className="text-center">
              <div className="gradient-text text-4xl md:text-5xl font-heading font-bold">
                <CountUp
                  end={metric.value}
                  suffix={metric.suffix}
                  duration={2200}
                />
              </div>
              <p className="text-neutral-400 text-sm mt-2">{metric.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
