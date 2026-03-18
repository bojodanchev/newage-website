import { cn } from '@/lib/utils'

type Variant = 'default' | 'hover' | 'glow'

interface CardProps {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  default: '',
  hover:
    'hover:border-accent-purple/30 hover:bg-white/[0.08] transition-all duration-300',
  glow: 'glow-purple',
}

export function Card({ variant = 'default', className, children }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
