'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { SITE } from '@/lib/constants'

/**
 * Minimal funnel footer. Reads `${ns}.footer`:
 *   tagline, fullSite (label for the link back to the main site)
 */
export function TierFooter({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.footer`)

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm tier-cta"
            aria-hidden
          >
            N
          </span>
          <span>New Age</span>
        </Link>
        <p className="max-w-sm text-sm text-foreground/55">{t('tagline')}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/55">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t('fullSite')}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
        </div>
        <p className="text-xs text-foreground/35">
          © {SITE.foundedYear}–{SITE.foundedYear + 2} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
