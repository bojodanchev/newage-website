'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/types/content'

interface AccordionProps {
  items: FAQItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('divide-y divide-neutral-700', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  )
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left gap-4 group"
      >
        <span className="text-lg font-medium text-foreground group-hover:text-accent-purple transition-colors">
          {item.question}
        </span>
        <span
          className={cn(
            'shrink-0 w-6 h-6 flex items-center justify-center rounded-full',
            'border border-neutral-700 text-neutral-400 transition-all duration-300',
            isOpen && 'rotate-45 border-accent-purple text-accent-purple'
          )}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 2v8M2 6h8" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-neutral-400 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
