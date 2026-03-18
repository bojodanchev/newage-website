'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggerChildrenProps {
  staggerDelay?: number
  className?: string
  children: React.ReactNode
}

export function StaggerChildren({
  staggerDelay = 0.1,
  className,
  children,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
