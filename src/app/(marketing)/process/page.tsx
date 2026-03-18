import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { ProcessTimeline } from '@/components/features/process/ProcessTimeline'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = createMetadata({
  title: 'Our Process',
  description:
    'From discovery to launch and beyond — our 5-phase process turns ideas into revenue-generating systems with full transparency at every step.',
  path: '/process',
})

const phases = [
  {
    step: 1,
    title: 'Discovery & Strategy',
    duration: 'Week 1-2',
    description:
      'We start by understanding your business inside and out. This phase establishes the foundation for everything we build.',
    deliverables: [
      'Free strategy session',
      'Business audit',
      'Goal setting',
      'Competitive analysis',
      'Custom roadmap',
    ],
  },
  {
    step: 2,
    title: 'Architecture & Design',
    duration: 'Week 2-4',
    description:
      'With strategy locked, we design the systems and interfaces that will power your growth.',
    deliverables: [
      'System architecture',
      'UI/UX design',
      'User flow mapping',
      'Tech stack selection',
      'Client approval',
    ],
  },
  {
    step: 3,
    title: 'Build & Automate',
    duration: 'Week 4-10',
    description:
      'This is where the magic happens. We build fast, test rigorously, and keep you in the loop at every step.',
    deliverables: [
      'Agile sprints',
      'Automation setup',
      'Integration',
      'Weekly demos',
      'QA testing',
    ],
  },
  {
    step: 4,
    title: 'Launch & Optimize',
    duration: 'Week 10-12',
    description:
      'Deployment is just the beginning. We launch with precision and immediately start optimizing for performance.',
    deliverables: [
      'Staged deployment',
      'Performance optimization',
      'Analytics setup',
      'Team training',
      'Launch support',
    ],
  },
  {
    step: 5,
    title: 'Scale & Support',
    duration: 'Ongoing',
    description:
      'We do not disappear after launch. We stay on as your growth partner, continuously improving the systems we built.',
    deliverables: [
      'Monthly reviews',
      'Continuous optimization',
      'Priority support',
      'Growth consulting',
    ],
  },
]

const commitments = [
  {
    title: 'Weekly Updates',
    description:
      'Every week, you get a clear status report — what was done, what is next, and any decisions that need your input. No surprises.',
    icon: '📋',
  },
  {
    title: 'Full Transparency',
    description:
      'Shared project boards, live dashboards, and direct access to the team building your product. You see everything we see.',
    icon: '🔍',
  },
  {
    title: 'Dedicated PM',
    description:
      'One point of contact who owns your project end-to-end. They know your business, your goals, and your timeline inside out.',
    icon: '🤝',
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline="Our Process"
          title="How We Turn Ideas Into Empires"
          description="A proven 5-phase methodology that takes you from concept to revenue-generating system — with full visibility at every step."
        />
      </SectionWrapper>

      {/* Process Timeline */}
      <SectionWrapper className="!pt-0">
        <ProcessTimeline phases={phases} />
      </SectionWrapper>

      {/* What to Expect */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline="Timeline"
          title="What to Expect"
          description="Key milestones from kickoff to ongoing growth."
          className="mb-12"
        />
        <div className="max-w-3xl mx-auto relative pl-8 md:pl-12">
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-mint to-accent-orange" />
          {[
            { week: 'Week 1', milestone: 'Kickoff call and business audit complete' },
            { week: 'Week 2', milestone: 'Strategy document and roadmap approved' },
            { week: 'Week 4', milestone: 'Designs and architecture signed off' },
            { week: 'Week 6', milestone: 'First working demo delivered' },
            { week: 'Week 10', milestone: 'Feature-complete build ready for QA' },
            { week: 'Week 12', milestone: 'Launch and go-live' },
            { week: 'Ongoing', milestone: 'Monthly optimization and growth reviews' },
          ].map((item, index) => (
            <FadeIn key={item.week} delay={index * 0.08}>
              <div className="relative mb-6">
                <div className="absolute -left-8 md:-left-12 top-2 w-3 h-3 rounded-full bg-accent-purple" />
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-mono text-accent-purple font-bold shrink-0 w-20">
                    {item.week}
                  </span>
                  <p className="text-neutral-300">{item.milestone}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionWrapper>

      {/* Our Commitment */}
      <SectionWrapper>
        <SectionHeader
          overline="Our Promise"
          title="Our Commitment"
          description="What you can always count on when working with us."
          className="mb-12"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {commitments.map((item) => (
            <FadeIn key={item.title}>
              <Card variant="hover" className="h-full text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline="Start Your Journey"
        subheadline="Book a free strategy call and let's map out your roadmap together."
        primaryCTA={{ label: 'Start Your Journey', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/work' }}
      />
    </>
  )
}
