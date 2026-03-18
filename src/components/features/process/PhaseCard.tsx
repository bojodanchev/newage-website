import { cn } from '@/lib/utils'

interface PhaseCardProps {
  step: number
  title: string
  duration: string
  description: string
  deliverables: string[]
  className?: string
}

export function PhaseCard({
  step,
  title,
  duration,
  description,
  deliverables,
  className,
}: PhaseCardProps) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full',
        className
      )}
    >
      <p className="text-5xl font-bold gradient-text mb-3">
        {String(step).padStart(2, '0')}
      </p>
      <h3 className="font-heading text-xl font-bold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-xs font-mono text-accent-purple mb-3">{duration}</p>
      <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2">
        {deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
            <svg
              className="shrink-0 mt-0.5 w-4 h-4 text-accent-mint"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8l3.5 3.5L13 5" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
