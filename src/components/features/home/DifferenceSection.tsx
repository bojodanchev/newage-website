'use client'

import { SlideIn } from '@/components/animation/SlideIn'
import { FadeIn } from '@/components/animation/FadeIn'

const beforeItems = [
  'Manual data entry across 5+ platforms',
  'Leads lost in spreadsheets',
  'No follow-up automation',
  'Inconsistent brand experience',
  'Revenue capped by bandwidth',
]

const afterItems = [
  'Unified system, single source of truth',
  'Automated lead capture & nurture',
  'Smart follow-ups that never miss',
  'Consistent, premium brand at every touchpoint',
  'Revenue scales independently of headcount',
]

export function DifferenceSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            The <span className="gradient-text">Difference</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          {/* Before */}
          <SlideIn direction="left">
            <div className="rounded-xl border border-red-500/20 border-l-4 border-l-red-500/40 bg-red-500/[0.05] backdrop-blur-xl p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-red-400 mb-6">
                Without New Age
              </p>
              <ul className="space-y-4">
                {beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm font-bold text-white/50 bg-white/10 rounded-full w-10 h-10 items-center justify-center">
            VS
          </div>

          {/* After */}
          <SlideIn direction="right">
            <div className="rounded-xl border border-accent-mint/20 border-l-4 border-l-accent-mint/40 bg-accent-mint/[0.05] backdrop-blur-xl p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-mint mb-6">
                With New Age
              </p>
              <ul className="space-y-4">
                {afterItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-accent-mint mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
