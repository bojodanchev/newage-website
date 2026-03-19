import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { getAllTeamMembers } from '@/data/team'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { SlideIn } from '@/components/animation/SlideIn'

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'The New Age story — why we exist, who we are, and how we help businesses build systems that turn ideas into revenue machines.',
  path: '/about',
})

const values = [
  {
    title: 'Results Over Promises',
    description: 'We measure success in revenue, not deliverables. If it does not move the needle, we do not build it.',
    icon: '📊',
  },
  {
    title: 'Systems Over Band-Aids',
    description: 'Build once, scale forever. We create infrastructure that compounds — not quick fixes that crumble.',
    icon: '⚙️',
  },
  {
    title: 'Partnership Over Transactions',
    description: 'Your success is our success. We think in years, not invoices — because that is how real growth works.',
    icon: '🤝',
  },
  {
    title: 'Innovation Over Convention',
    description: 'Better ways always exist. We challenge assumptions and build what should exist, not what everyone else builds.',
    icon: '💡',
  },
]

const metrics = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3M+', label: 'Revenue Generated for Clients' },
  { value: '98%', label: 'Client Retention Rate' },
  { value: '12', label: 'Countries Served' },
]

const techTools = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'Redis', 'AWS', 'Vercel', 'Stripe',
  'HubSpot', 'Make', 'n8n', 'Figma', 'Supabase',
  'TailwindCSS', 'Docker', 'GitHub Actions',
]

export default function AboutPage() {
  const teamMembers = getAllTeamMembers()

  return (
    <>
      {/* Brand Story Hero */}
      <SectionWrapper className="text-center">
        <SectionHeader
          overline="Our Story"
          title="The New Age Story"
        />
        <FadeIn delay={0.2}>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mt-6">
            Every business deserves systems that actually work. Not duct-taped tools that
            barely hold together. Not fragmented vendors who each own 10% of the picture.
            Not advice without execution.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mt-4">
            New Age was born from a simple frustration: businesses were spending fortunes on
            disconnected agencies, freelancers, and SaaS tools — and still operating in chaos.
            We built the company we wished existed — one team that owns the entire outcome,
            from software and automation to marketing and sales infrastructure. One partner that
            builds systems designed to compound, not campaigns designed to expire.
          </p>
        </FadeIn>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper className="!pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SlideIn direction="left">
            <Card variant="hover" className="h-full">
              <span className="text-sm font-mono uppercase tracking-widest text-accent-purple mb-4 block">
                Mission
              </span>
              <p className="text-lg text-foreground leading-relaxed">
                To build the systems that turn ambitious ideas into revenue-generating businesses —
                faster, smarter, and more reliably than any other partner in the market.
              </p>
            </Card>
          </SlideIn>
          <SlideIn direction="right">
            <Card variant="hover" className="h-full">
              <span className="text-sm font-mono uppercase tracking-widest text-accent-mint mb-4 block">
                Vision
              </span>
              <p className="text-lg text-foreground leading-relaxed">
                A world where every entrepreneur has access to enterprise-grade infrastructure
                — where the quality of your systems is never the bottleneck to your growth.
              </p>
            </Card>
          </SlideIn>
        </div>
      </SectionWrapper>

      {/* Co-Founders */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline="The Founders"
          title="Two People, One Mission"
          className="mb-16"
        />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-20">
          <FadeIn className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent-purple via-accent-mint to-accent-orange p-1">
              <img
                src="/team/bojo.png"
                alt="Bojidar Danchev"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-accent-purple mb-2">
                Co-Founder & CTO
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 md:text-4xl">
                Bojidar Danchev
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                The technical force behind New Age. Full-stack architect who designs and builds the
                software, automations, and infrastructure that power every client engagement. After
                spending years building products for startups and watching businesses waste millions
                on fragmented solutions, Bojidar co-founded New Age to prove that one team — with
                the right architecture — can deliver what normally takes five vendors and 18 months.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                His philosophy is simple: build systems that make money while you sleep, or do not
                build at all. Every project at New Age is designed to compound — because the best
                business infrastructure is the kind that gets better over time, not the kind you
                have to rebuild every quarter.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <FadeIn className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent-mint via-accent-purple to-accent-orange p-1">
              <img
                src="/team/sean.jpg"
                alt="Sean Isa"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-accent-mint mb-2">
                Co-Founder & COO
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 md:text-4xl">
                Sean Isa
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                The operational backbone of New Age. Sean owns client strategy, project delivery,
                and business development. He translates business problems into actionable roadmaps
                and ensures every project ships on time and on budget.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Where Bojidar builds the systems, Sean makes sure they solve the right problems
                for the right people. His focus is on outcomes — not outputs. Every engagement
                starts with understanding the business deeply, then working backwards to the
                technical solution that moves the needle fastest.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Team */}
      {teamMembers.length > 0 && (
        <SectionWrapper>
          <SectionHeader
            overline="The Team"
            title="The People Behind the Systems"
            description="A lean team of specialists who own the outcome — not just the task."
            className="mb-12"
          />
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <FadeIn key={member.name}>
                <Card variant="hover" className="h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-mint p-0.5 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-foreground">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent-purple mb-3">{member.role}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </StaggerChildren>
        </SectionWrapper>
      )}

      {/* Values */}
      <SectionWrapper>
        <SectionHeader
          overline="What We Believe"
          title="Our Values"
          description="The principles that guide every decision, every project, every line of code."
          className="mb-12"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value) => (
            <FadeIn key={value.title}>
              <Card variant="hover" className="h-full">
                <span className="text-3xl mb-3 block">{value.icon}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* By the Numbers */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline="Impact"
          title="By the Numbers"
          className="mb-12"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <FadeIn key={metric.label} delay={index * 0.1}>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text md:text-5xl mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-neutral-400">{metric.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionWrapper>

      {/* Tech & Tools */}
      <SectionWrapper>
        <SectionHeader
          overline="Our Stack"
          title="Tech & Tools We Use"
          description="The technologies and platforms that power everything we build."
          className="mb-12"
        />
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {techTools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-300 hover:border-accent-purple/30 hover:text-foreground transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        headline="Work With Us"
        subheadline="Ready to build something that actually works? Let's start with a conversation."
        primaryCTA={{ label: 'Work With Us', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Process', href: '/process' }}
      />
    </>
  )
}
