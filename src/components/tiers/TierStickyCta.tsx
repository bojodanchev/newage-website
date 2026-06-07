'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Mobile-only sticky CTA bar (PRD: CTAs must be thumb-reachable on mobile).
 * Appears after the user scrolls past the hero. Reads `${ns}.nav.cta`.
 */
export function TierStickyCta({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.nav`)
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-primary/85 p-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#lead"
        className="flex h-14 items-center justify-center rounded-full px-6 text-base font-bold tier-cta-grad"
      >
        {t('cta')}
      </a>
    </div>
  )
}
