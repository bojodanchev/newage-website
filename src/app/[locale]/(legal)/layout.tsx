import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { SITE } from '@/lib/constants'

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations('errors')

  return (
    <>
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-heading text-lg font-bold gradient-text"
        >
          {SITE.name}
        </Link>
        <Link
          href="/"
          className="text-sm text-neutral-400 transition-colors hover:text-foreground"
        >
          &larr; {t('notFound.backHome')}
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20">{children}</main>

      <footer className="mx-auto max-w-3xl border-t border-neutral-700/50 px-6 py-8">
        <p className="text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </p>
      </footer>
    </>
  )
}
