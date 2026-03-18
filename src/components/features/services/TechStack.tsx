'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { TechItem } from '@/types/content'

interface TechStackProps {
  items: TechItem[]
}

export function TechStack({ items }: TechStackProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {items.map((item) => (
        <motion.div
          key={item.name}
          variants={fadeUp}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 hover:border-accent-purple/30 hover:bg-white/[0.08]"
        >
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-neutral-500 mt-1">{item.category}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
