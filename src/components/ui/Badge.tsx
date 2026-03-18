import { cn } from '@/lib/utils'

type Color = 'purple' | 'mint' | 'orange' | 'neutral'

interface BadgeProps {
  color?: Color
  className?: string
  children: React.ReactNode
}

const colorStyles: Record<Color, string> = {
  purple: 'bg-accent-purple/10 text-accent-purple',
  mint: 'bg-accent-mint/10 text-accent-mint',
  orange: 'bg-accent-orange/10 text-accent-orange',
  neutral: 'bg-neutral-700/50 text-neutral-300',
}

export function Badge({ color = 'purple', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  )
}
