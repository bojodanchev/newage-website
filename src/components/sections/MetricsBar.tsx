import type { Metric } from '@/types/content'
import { cn } from '@/lib/utils'

interface MetricsBarProps {
  metrics: Metric[]
  className?: string
}

export function MetricsBar({ metrics, className }: MetricsBarProps) {
  return (
    <section className={cn('w-full bg-neutral-800/50 py-16', className)}>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {metrics.map((metric, i) => (
          <div key={i} className="text-center">
            <p className="font-heading text-4xl font-bold gradient-text md:text-5xl">
              {metric.prefix}
              {metric.value}
              {metric.suffix}
            </p>
            <p className="mt-2 text-sm text-neutral-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
