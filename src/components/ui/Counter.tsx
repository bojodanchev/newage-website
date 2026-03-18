'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface CounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  trigger?: boolean
}

export function Counter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  trigger = true,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const formatter = useRef(
    new Intl.NumberFormat('en-US')
  ).current

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    },
    [duration, end]
  )

  useEffect(() => {
    if (!trigger) return

    if (reducedMotion) {
      setCount(end)
      return
    }

    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, end, reducedMotion, animate])

  return (
    <span className={className}>
      {prefix}
      {formatter.format(count)}
      {suffix}
    </span>
  )
}
