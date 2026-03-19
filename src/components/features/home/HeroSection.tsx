'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { HeroScene } from '@/components/three/HeroScene'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const t = useTranslations('home')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js background */}
      <HeroScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-8 lg:px-16 py-32 w-full text-center">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {t('hero.titleLine1')}
          </motion.h1>

          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight gradient-text mt-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {t('hero.titleLine2')}
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-neutral-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <Button href="/contact" size="lg" variant="primary" className="glow-purple">
              {t('hero.cta.primary')}
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              {t('hero.cta.secondary')}
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
