'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations('errors')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-red-500">
        {t('error.label')}
      </p>
      <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
        {t('error.title')}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-neutral-400">
        {error.message || t('error.defaultMessage')}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]"
        >
          {t('error.tryAgain')}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-accent-purple hover:text-accent-purple"
        >
          {t('error.goHome')}
        </Link>
      </div>
    </div>
  )
}
