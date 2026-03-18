import { cn } from '@/lib/utils'

interface SeparatorProps {
  variant?: 'default' | 'gradient'
  className?: string
}

export function Separator({
  variant = 'default',
  className,
}: SeparatorProps) {
  return (
    <hr
      className={cn(
        'h-px border-0',
        variant === 'default' && 'bg-neutral-700/50',
        variant === 'gradient' &&
          'bg-gradient-to-r from-transparent via-neutral-700 to-transparent',
        className
      )}
    />
  )
}
