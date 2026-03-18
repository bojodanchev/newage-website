'use client'

import { useIntersection } from '@/hooks/use-intersection'
import { Counter } from '@/components/ui/Counter'
import { cn } from '@/lib/utils'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  end,
  duration,
  prefix,
  suffix,
  className,
}: CountUpProps) {
  const [ref, isInView] = useIntersection<HTMLSpanElement>()

  return (
    <span ref={ref} className={cn(className)}>
      <Counter
        end={end}
        duration={duration}
        prefix={prefix}
        suffix={suffix}
        trigger={isInView}
      />
    </span>
  )
}
