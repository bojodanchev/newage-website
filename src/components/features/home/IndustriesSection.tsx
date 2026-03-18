'use client'

import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const industries = [
  { icon: '🚀', name: 'SaaS', projects: 45 },
  { icon: '🛒', name: 'E-Commerce', projects: 32 },
  { icon: '🏠', name: 'Real Estate', projects: 28 },
  { icon: '🏥', name: 'Healthcare', projects: 15 },
  { icon: '💳', name: 'Finance', projects: 18 },
  { icon: '🏢', name: 'Agencies', projects: 22 },
  { icon: '📍', name: 'Local Biz', projects: 20 },
]

export function IndustriesSection() {
  return (
    <section className="section-padding-sm">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            Who We Serve
          </p>
          <h2 className="font-heading text-3xl md:text-h3 font-bold">
            Industries We <span className="gradient-text">Transform</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {industries.map((ind) => (
            <motion.div key={ind.name} variants={fadeUp}>
              <div className="group text-center cursor-default">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl mb-2 transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.08] group-hover:scale-110">
                  {ind.icon}
                </div>
                <p className="text-sm font-medium text-neutral-300">
                  {ind.name}
                </p>
                <p className="text-xs text-neutral-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {ind.projects}+ projects
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
