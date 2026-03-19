'use client'

import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const steps = [
  {
    icon: '🔍',
    title: 'Discovery & Strategy',
    description: 'Deep dive into your business, goals, and competitive landscape.',
  },
  {
    icon: '📐',
    title: 'Architecture & Design',
    description: 'Blueprint the systems, flows, and user experience.',
  },
  {
    icon: '⚙️',
    title: 'Build & Automate',
    description: 'Develop, integrate, and wire up every moving part.',
  },
  {
    icon: '🚀',
    title: 'Launch & Optimize',
    description: 'Go live, test, measure, and refine for peak performance.',
  },
  {
    icon: '📊',
    title: 'Scale & Support',
    description: 'Continuous improvement with data-driven iteration.',
  },
]

export function ProcessPreview() {
  return (
    <section className="section-padding bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            How We Work
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            Our <span className="gradient-text">Process</span>
          </h2>
        </FadeIn>

        {/* Mobile: horizontal scroll. Desktop: grid */}
        <StaggerChildren className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-5 gap-6 md:gap-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="relative flex-shrink-0 w-64 md:w-auto snap-center"
            >
              {/* Connecting line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-[2px] bg-gradient-to-r from-accent-purple to-accent-mint opacity-50" />
              )}

              <div className="relative text-center">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-heading text-6xl font-bold text-white/5 pointer-events-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative inline-flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-purple shadow-lg shadow-accent-purple/50 mb-2" />
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-3xl mb-4">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">
                  {step.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="text-center mt-12 pb-4">
          <a
            href="/process"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-mint transition-colors font-medium"
          >
            See Our Full Process
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
