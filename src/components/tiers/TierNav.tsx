'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'

/**
 * Minimal funnel nav: brand → home, language toggle, single CTA.
 * Theme color comes from the ancestor `.tier-*` class.
 */
export function TierNav({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.nav`)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-primary/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm tier-cta"
            aria-hidden
          >
            N
          </span>
          <span>New Age</span>
        </Link>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a
            href="#lead"
            className="hidden h-10 items-center justify-center rounded-full px-5 text-sm font-semibold tier-cta transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </header>
  )
}
