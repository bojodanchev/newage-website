'use client'

import { FadeIn } from '@/components/animation/FadeIn'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid" />

      {/* Subtle gradient glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(108, 58, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-accent-purple/20 to-accent-mint/20 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text">
            Ready to Build Something Extraordinary?
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-xl text-neutral-300 mt-4 max-w-2xl mx-auto">
            Let&apos;s turn your vision into a revenue machine.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              className="glow-purple"
            >
              Start Your Project
              <svg
                className="w-4 h-4 ml-1"
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
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Download Capabilities Deck
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
