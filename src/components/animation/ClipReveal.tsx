'use client'

import { motion } from 'framer-motion'
import { clipReveal } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface ClipRevealProps {
  className?: string
  children: React.ReactNode
}

export function ClipReveal({ className, children }: ClipRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={clipReveal}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
