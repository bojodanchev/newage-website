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
    'hover:border-accent-purple/30 hover:bg-white/[0.1] transition-all duration-300',
  glow: 'glow-purple',
}

export function Card({ variant = 'default', className, children }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-xl p-6',
        variantStyles[variant],
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  )
}
