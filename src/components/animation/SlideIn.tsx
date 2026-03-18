'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SlideInProps {
  direction?: 'left' | 'right'
  delay?: number
  className?: string
  children: React.ReactNode
}

export function SlideIn({
  direction = 'left',
  delay = 0,
  className,
  children,
}: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
