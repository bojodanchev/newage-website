import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { BlogHub } from '@/components/features/blog/BlogHub'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('blog.title'),
    description: t('blog.description'),
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  return (
    <div className="mx-auto max-w-7xl px-6 section-padding">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
          {t('hub.overline')}
        </p>
        <h1 className="font-heading text-4xl font-bold gradient-text md:text-6xl">
          {t('hub.title')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
          {t('hub.description')}
        </p>
      </div>

      <BlogHub />
    </div>
  )
}
