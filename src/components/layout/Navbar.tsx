'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    setScrolled(currentScrollY > 50)
    setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          scrolled ? 'glass shadow-lg border-b border-white/5' : 'bg-transparent',
          visible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold gradient-text"
          >
            {SITE.name}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-neutral-400 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              Book a Strategy Call
            </Button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-foreground transition-transform" />
              <span className="block h-0.5 w-6 bg-foreground transition-transform" />
              <span className="block h-0.5 w-4 bg-foreground transition-transform ml-auto" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
