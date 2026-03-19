'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const t = useTranslations('common')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center',
        'rounded-full border border-accent-purple/30 bg-accent-purple/20',
        'text-foreground transition-all duration-300',
        'hover:bg-accent-purple/40 hover:border-accent-purple/50',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      )}
      aria-label={t('backToTop')}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 13V3M3 7l5-5 5 5" />
      </svg>
    </button>
  )
}
