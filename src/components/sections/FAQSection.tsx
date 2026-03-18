import type { FAQItem } from '@/types/content'
import { SectionHeader } from './SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export function FAQSection({
  items,
  title = 'Frequently Asked Questions',
  className,
}: FAQSectionProps) {
  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      <SectionHeader title={title} align="center" />
      <div className="mt-12">
        <Accordion items={items} />
      </div>
    </div>
  )
}
