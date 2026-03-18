import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  className?: string
  fullWidth?: boolean
  dotGrid?: boolean
  children: React.ReactNode
}

export function SectionWrapper({
  id,
  className,
  fullWidth,
  dotGrid,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        fullWidth ? 'px-0' : 'mx-auto max-w-7xl px-6',
        dotGrid && 'dot-grid',
        className
      )}
    >
      {children}
    </section>
  )
}
