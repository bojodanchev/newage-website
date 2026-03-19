import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
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

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('home.title'),
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      url: SITE.url,
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

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
