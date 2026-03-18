'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right'

interface FadeInProps {
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

export function FadeIn({
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  children,
}: FadeInProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offset = offsets[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
