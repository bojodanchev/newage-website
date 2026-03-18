import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema } from '@/lib/structured-data'
import { getAllServices, getServiceBySlug } from '@/data/services'
import { ServiceHero } from '@/components/features/services/ServiceHero'
import { PricingTable } from '@/components/features/services/PricingTable'
import { TechStack } from '@/components/features/services/TechStack'
import { RelatedServices } from '@/components/features/services/RelatedServices'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CTASection } from '@/components/sections/CTASection'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Accordion } from '@/components/ui/Accordion'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <ServiceHero service={service} />

      {/* The Problem */}
      <SectionWrapper>
        <FadeIn>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🚨</span>
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                The Problem
              </h2>
            </div>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {service.problem}
            </p>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Our Solution */}
      <SectionWrapper className="!pt-0">
        <FadeIn>
          <div className="max-w-3xl bg-white/5 backdrop-blur-xl border border-accent-purple/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="font-heading text-2xl font-bold gradient-text md:text-3xl">
                Our Solution
              </h2>
            </div>
            <p className="text-lg text-neutral-300 leading-relaxed">
              {service.solution}
            </p>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* What's Included */}
      <SectionWrapper>
        <SectionHeader
          overline="Features"
          title="What's Included"
          className="mb-12"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {service.features.map((feature) => (
            <FadeIn key={feature.title}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full hover:border-accent-purple/30 transition-all duration-300">
                {feature.icon && (
                  <span className="text-2xl mb-3 block">{feature.icon}</span>
                )}
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* Our Process */}
      <SectionWrapper dotGrid>
        <SectionHeader
          overline="How It Works"
          title="Our Process"
          className="mb-12"
        />
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-12">
          {/* Connecting line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-mint to-accent-orange" />

          <div className="space-y-8">
            {service.process.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.1}>
                <div className="relative">
                  {/* Numbered dot */}
                  <div className="absolute -left-8 md:-left-12 top-2 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-accent-purple text-white text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Tech Stack */}
      <SectionWrapper>
        <SectionHeader
          overline="Technology"
          title="Our Tech Stack"
          className="mb-12"
        />
        <TechStack items={service.techStack} />
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper>
        <SectionHeader
          overline="Investment"
          title="Pricing"
          description="Transparent pricing. No hidden fees. No surprises."
          className="mb-12"
        />
        <PricingTable tiers={service.pricingTiers} />
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper>
        <SectionHeader
          overline="Questions"
          title="Frequently Asked Questions"
          className="mb-12"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={service.faq} />
        </div>
      </SectionWrapper>

      {/* Related Services */}
      <RelatedServices slugs={service.relatedSlugs} />

      {/* CTA */}
      <CTASection
        headline={`Let's Build Your ${service.title}`}
        subheadline="Book a free strategy call and let's map out exactly what you need."
        primaryCTA={{ label: 'Get Started', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/work' }}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(service.faq)),
        }}
      />
    </>
  )
}
