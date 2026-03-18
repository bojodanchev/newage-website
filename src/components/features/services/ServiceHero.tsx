import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/animation/FadeIn'
import type { Service } from '@/types/content'

interface ServiceHeroProps {
  service: Service
}

const categoryLabels: Record<string, string> = {
  'software-development': 'Development',
  'automation-systems': 'Automation',
  'marketing-growth': 'Marketing',
  'sales-infrastructure': 'Sales',
  'full-business-build': 'Full Build',
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="w-full bg-neutral-800/30 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <Badge color="purple" className="mb-6">
            {categoryLabels[service.category] ?? service.category}
          </Badge>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-heading text-4xl font-bold gradient-text md:text-6xl lg:text-7xl mb-4">
            {service.title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-heading text-xl text-foreground md:text-2xl mb-4">
            {service.headline}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-lg text-neutral-400 max-w-3xl mb-8">
            {service.description}
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-medium bg-gradient-to-r from-accent-purple to-accent-mint text-white transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]"
          >
            Get Started
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
