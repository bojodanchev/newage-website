'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface UseCountUpOptions {
  end: number
  start?: number
  durationMs?: number
  prefix?: string
  suffix?: string
  decimals?: number
  enabled?: boolean
  triggerOnce?: boolean
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

export function useCountUp({
  end,
  start = 0,
  durationMs = 1200,
  prefix = '',
  suffix = '',
  decimals = 0,
  enabled = true,
  triggerOnce = true,
}: UseCountUpOptions) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: triggerOnce, amount: 0.4 })
  const [value, setValue] = useState<number>(enabled ? start : end)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setValue(end)
      return
    }
    if (!inView) return

    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const t = Math.min(1, elapsed / durationMs)
      const v = start + (end - start) * ease(t)
      setValue(v)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    startRef.current = null
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, start, end, durationMs, enabled])

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`
  return { ref, value, formatted, inView }
}
