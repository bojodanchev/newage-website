'use client'

import { PhaseCard } from './PhaseCard'

interface Phase {
  step: number
  title: string
  duration: string
  description: string
  deliverables: string[]
}

interface ProcessTimelineProps {
  phases: Phase[]
}

export function ProcessTimeline({ phases }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Desktop: horizontal with connecting line */}
      <div className="hidden lg:block">
        {/* Gradient connecting line */}
        <div className="absolute top-[60px] left-0 right-0 h-px bg-gradient-to-r from-accent-purple via-accent-mint to-accent-orange" />

        <div className="grid grid-cols-5 gap-6">
          {phases.map((phase) => (
            <div key={phase.step} className="relative pt-4">
              {/* Dot on the line */}
              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-purple border-2 border-neutral-900 z-10" />
              <div className="mt-16">
                <PhaseCard {...phase} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack with scroll-snap */}
      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 scrollbar-hide">
          {phases.map((phase) => (
            <div
              key={phase.step}
              className="snap-center shrink-0 w-[85vw] max-w-sm"
            >
              <PhaseCard {...phase} />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-neutral-500 mt-4">
          Swipe to see all phases
        </p>
      </div>
    </div>
  )
}
