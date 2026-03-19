import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function NotFound() {
  const t = useTranslations('errors')

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-mint/10 animate-pulse" />

      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
        {t('notFound.code')}
      </p>
      <h1 className="font-heading text-5xl font-bold gradient-text md:text-7xl">
        {t('notFound.title')}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-center text-lg text-neutral-400">
        {t('notFound.description')}
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]"
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  )
}
