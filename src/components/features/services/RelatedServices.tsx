import { getServiceBySlug } from '@/data/services'
import { ServiceCard } from './ServiceCard'
import { StaggerChildren } from '@/components/animation/StaggerChildren'

interface RelatedServicesProps {
  slugs: string[]
}

export function RelatedServices({ slugs }: RelatedServicesProps) {
  const related = slugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean)

  if (related.length === 0) return null

  return (
    <section className="section-padding mx-auto max-w-7xl px-6">
      <h2 className="font-heading text-2xl font-bold gradient-text mb-8 md:text-3xl">
        You Might Also Need
      </h2>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((service) => (
          <ServiceCard key={service!.slug} service={service!} />
        ))}
      </StaggerChildren>
    </section>
  )
}
