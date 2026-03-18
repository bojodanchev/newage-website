'use client'

import { motion } from 'framer-motion'
import { HeroScene } from '@/components/three/HeroScene'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js background */}
      <HeroScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="max-w-4xl">
          <motion.h1
            className="font-heading text-5xl md:text-7xl lg:text-display font-extrabold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            We Don&apos;t Just Build Software.
          </motion.h1>

          <motion.h1
            className="font-heading text-5xl md:text-7xl lg:text-display font-extrabold leading-tight gradient-text mt-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            We Build Business Empires.
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-neutral-300 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            The full-service agency that architects, builds, and scales the
            systems behind your revenue.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <Button href="/contact" size="lg" variant="primary" className="glow-purple">
              Book a Strategy Call
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              See Our Work
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
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
