'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
      className={cn('inline-block', className)}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
