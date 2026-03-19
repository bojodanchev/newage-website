import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { organizationSchema } from '@/lib/structured-data'
import { HeroSection } from '@/components/features/home/HeroSection'
import { LogoBar } from '@/components/features/home/LogoBar'
import { ProblemSection } from '@/components/features/home/ProblemSection'
import { DifferenceSection } from '@/components/features/home/DifferenceSection'
import { ServicesGrid } from '@/components/features/home/ServicesGrid'
import { MetricsSection } from '@/components/features/home/MetricsSection'
import { CaseStudiesSection } from '@/components/features/home/CaseStudiesSection'
import { ProcessPreview } from '@/components/features/home/ProcessPreview'
import { TestimonialsSection } from '@/components/features/home/TestimonialsSection'
import { IndustriesSection } from '@/components/features/home/IndustriesSection'
import { BlogPreview } from '@/components/features/home/BlogPreview'
import { FinalCTA } from '@/components/features/home/FinalCTA'

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <HeroSection />
      <LogoBar />
      <ProblemSection />
      <DifferenceSection />
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-4xl" />
      <ServicesGrid />
      <MetricsSection />
      <CaseStudiesSection />
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-4xl" />
      <ProcessPreview />
      <TestimonialsSection />
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-4xl" />
      <IndustriesSection />
      <BlogPreview />
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent mx-auto max-w-4xl" />
      <FinalCTA />
    </>
  )
}
