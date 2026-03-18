import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  overline?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  overline,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === 'center' && 'text-center',
        className
      )}
    >
      {overline && (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
          {overline}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold gradient-text mb-6 md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg text-neutral-400 max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
