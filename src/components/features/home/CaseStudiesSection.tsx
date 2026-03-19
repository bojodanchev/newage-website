'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Badge } from '@/components/ui/Badge'
import { fadeUp } from '@/lib/animations'

const caseStudies = [
  {
    industry: 'SaaS',
    headline: '3x Revenue in 90 Days',
    metric: '3x',
    description:
      'Built a complete sales infrastructure and automated lead nurture system for a B2B SaaS startup, tripling MRR within one quarter.',
    slug: 'saas-revenue-3x',
    color: 'purple' as const,
  },
  {
    industry: 'E-Commerce',
    headline: '500% ROAS on Paid Ads',
    metric: '500%',
    description:
      'Designed and built a full-funnel marketing system with automated retargeting, email flows, and conversion-optimized landing pages.',
    slug: 'ecommerce-500-roas',
    color: 'mint' as const,
  },
  {
    industry: 'Real Estate',
    headline: '10,000+ Hours Saved/Year',
    metric: '10K+',
    description:
      'Replaced manual processes with a custom CRM and automation suite, freeing the team to focus on closing deals instead of admin.',
    slug: 'real-estate-automation',
    color: 'orange' as const,
  },
]

export function CaseStudiesSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            Results That Speak
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <motion.div key={study.slug} variants={fadeUp}>
              <a
                href={`/work/${study.slug}`}
                className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:border-accent-purple/30"
              >
                <div className="relative h-32 rounded-t-xl bg-gradient-to-br from-accent-purple/20 via-accent-mint/10 to-transparent flex items-center justify-center">
                  <span className="absolute inset-0 flex items-center justify-center font-heading text-5xl font-bold text-white/20">
                    {study.metric}
                  </span>
                  <Badge color={study.color} className="absolute top-3 right-3">
                    {study.industry}
                  </Badge>
                </div>
                <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-3">
                  {study.headline}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-accent-purple group-hover:text-accent-mint transition-colors font-medium">
                  Read Case Study
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                </span>
                </div>
              </a>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="text-center mt-12 pb-4">
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-mint transition-colors font-medium"
          >
            View All Case Studies
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
