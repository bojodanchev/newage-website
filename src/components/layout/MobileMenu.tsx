'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SOCIALS, SITE } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15 } },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-primary/95 backdrop-blur-xl"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-heading text-xl font-bold gradient-text">
              {SITE.name}
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-foreground hover:border-accent-purple transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <motion.nav
            className="flex flex-1 flex-col items-center justify-center gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-heading text-2xl font-semibold text-foreground transition-colors hover:text-accent-purple"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={onClose}
            >
              Book a Strategy Call
            </Button>
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center gap-6 px-6 pb-8">
            {Object.entries(SOCIALS).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize text-neutral-500 transition-colors hover:text-foreground"
              >
                {name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
