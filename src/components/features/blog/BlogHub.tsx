'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { getAllBlogPosts, getFeaturedPosts, getPostsByCategory } from '@/data'
import { PostCard } from '@/components/features/blog/PostCard'
import { NewsletterForm } from '@/components/sections/NewsletterForm'
import type { BlogCategory } from '@/types/content'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

const categoryKeys: { key: string; value: BlogCategory | 'all' }[] = [
  { key: 'all', value: 'all' },
  { key: 'automation', value: 'automation' },
  { key: 'marketing', value: 'marketing' },
  { key: 'sales', value: 'sales' },
  { key: 'development', value: 'development' },
  { key: 'businessStrategy', value: 'business-strategy' },
]

export function BlogHub() {
  const t = useTranslations('blog')
  const locale = useLocale() as Locale
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')

  const allPosts = getAllBlogPosts(locale)
  const featuredPosts = getFeaturedPosts(locale)
  const featured = featuredPosts[0]

  const filteredPosts =
    activeCategory === 'all' ? allPosts : getPostsByCategory(activeCategory, locale)

  const nonFeaturedPosts =
    activeCategory === 'all'
      ? filteredPosts.filter((p) => !p.featured)
      : filteredPosts

  return (
    <>
      {/* Featured Post */}
      {featured && activeCategory === 'all' && (
        <Link
          href={`/blog/${featured.slug}`}
          className={cn(
            'group mb-16 block rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12',
            'transition-all duration-300',
            'hover:border-accent-purple/30 hover:bg-white/[0.08] hover:glow-purple'
          )}
        >
          <span className="inline-flex items-center rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple">
            {t('hub.featured')}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground transition-colors group-hover:text-accent-purple md:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span>{featured.author.name}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span>{formatDate(featured.publishedAt, locale)}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span>{featured.readingTime} {t('hub.minRead')}</span>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-purple transition-all group-hover:gap-3">
            {t('hub.readArticle')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      )}

      {/* Category Filters */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categoryKeys.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
              activeCategory === cat.value
                ? 'bg-accent-purple text-white'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-foreground'
            )}
          >
            {t(`hub.categories.${cat.key}`)}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nonFeaturedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {nonFeaturedPosts.length === 0 && (
        <p className="py-20 text-center text-neutral-500">
          {t('hub.emptyState')}
        </p>
      )}

      {/* Newsletter CTA Banner */}
      <div className="mt-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-center md:p-12">
        <h3 className="font-heading text-2xl font-bold gradient-text">
          {t('hub.newsletterCta.title')}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-neutral-400">
          {t('hub.newsletterCta.description')}
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </>
  )
}
