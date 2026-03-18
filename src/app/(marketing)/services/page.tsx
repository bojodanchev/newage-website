import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { getAllServices } from '@/data/services'
import { ServiceCard } from '@/components/features/services/ServiceCard'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { FadeIn } from '@/components/animation/FadeIn'

export const metadata: Metadata = createMetadata({
  title: 'Services',
  description:
    'Full-service business systems: software development, automation, marketing, sales infrastructure, and complete business builds. Everything under one roof.',
  path: '/services',
})

export default function ServicesPage() {
  const services = getAllServices()

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline="What We Do"
          title="Everything Your Business Needs. Under One Roof."
          description="From custom software to full business builds — we architect the systems that turn ideas into revenue machines. No fragmented vendors. No communication gaps. One team, total ownership."
        />
      </SectionWrapper>

      {/* Services Grid */}
      <SectionWrapper className="!pt-0">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* What Sets Us Apart */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline="Why New Age"
          title="What Sets Us Apart"
          description="The difference between a vendor and a growth partner."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn direction="left">
            <div className="bg-white/5 backdrop-blur-xl border border-accent-purple/20 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold gradient-text mb-4">
                New Age
              </h3>
              <ul className="space-y-3">
                {[
                  'One team owns the entire outcome',
                  'Systems built to compound over time',
                  'Revenue-first — every decision optimizes for growth',
                  'Full transparency: weekly demos, shared dashboards',
                  'Post-launch support included in every tier',
                  'You talk to the builders, not account managers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                    <svg
                      className="shrink-0 mt-0.5 w-4 h-4 text-accent-mint"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-neutral-500 mb-4">
                Typical Agency
              </h3>
              <ul className="space-y-3">
                {[
                  'Multiple vendors, nobody owns the big picture',
                  'One-off campaigns with no compounding effect',
                  'Vanity metrics: likes, impressions, deliverables',
                  'Monthly reports you never read',
                  'Support ends when the invoice is paid',
                  'Account managers relay messages to developers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-500">
                    <svg
                      className="shrink-0 mt-0.5 w-4 h-4 text-neutral-600"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline="Don't See What You Need? We Probably Do It."
        subheadline="Let's talk about what your business actually needs — no templates, no upsells."
        primaryCTA={{ label: "Let's Talk", href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/work' }}
      />
    </>
  )
}
