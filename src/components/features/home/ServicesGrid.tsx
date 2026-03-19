'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { fadeUp } from '@/lib/animations'

const services = [
  {
    icon: '💻',
    title: 'Software Development',
    description: 'Custom web apps, mobile, SaaS platforms',
    bullets: [
      'Full-stack web applications',
      'Mobile apps (iOS & Android)',
      'SaaS platform architecture',
      'API design & integrations',
    ],
  },
  {
    icon: '⚡',
    title: 'Automation & Systems',
    description: 'CRM, workflows, business process automation',
    bullets: [
      'CRM setup & customization',
      'Workflow automation',
      'Data pipeline engineering',
      'System integrations',
    ],
  },
  {
    icon: '📈',
    title: 'Marketing & Funnels',
    description: 'Lead gen, email automation, content systems',
    bullets: [
      'Funnel strategy & build',
      'Email sequences & automation',
      'Landing pages that convert',
      'Content distribution systems',
    ],
  },
  {
    icon: '💰',
    title: 'Sales Infrastructure',
    description: 'Outbound, pipelines, conversion optimization',
    bullets: [
      'Outbound sales systems',
      'Pipeline optimization',
      'Proposal & closing automation',
      'Revenue analytics dashboards',
    ],
  },
  {
    icon: '🗄️',
    title: 'Database & CRM',
    description: 'Data architecture, CRM customization, analytics',
    bullets: [
      'Database design & migration',
      'CRM customization & training',
      'Analytics & reporting',
      'Data-driven decision systems',
    ],
  },
  {
    icon: '🏗️',
    title: 'Full Business Build',
    description: 'Idea to MVP to scale. The complete package.',
    bullets: [
      'Market validation & strategy',
      'MVP development & launch',
      'Growth systems & scaling',
      'Ongoing technical partnership',
    ],
  },
]

export function ServicesGrid() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            What We Do
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            End-to-End <span className="gradient-text">Services</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 h-full transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.08] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-mint to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-2xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold font-heading mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm">{service.description}</p>

                {/* Reveal bullets on hover */}
                <ul className="mt-4 space-y-2 max-h-0 overflow-hidden opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-500">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-xs text-neutral-500 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-purple flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="text-center mt-12 pb-4">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-mint transition-colors font-medium"
          >
            Explore All Services
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
