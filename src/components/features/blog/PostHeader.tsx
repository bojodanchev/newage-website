import { useTranslations, useLocale } from 'next-intl'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { BlogPost, BlogCategory } from '@/types/content'

const categoryColors: Record<BlogCategory, 'purple' | 'mint' | 'orange' | 'neutral'> = {
  automation: 'purple',
  marketing: 'mint',
  sales: 'orange',
  development: 'purple',
  'business-strategy': 'mint',
  'case-studies': 'orange',
}

const categoryKeyMap: Record<BlogCategory, string> = {
  automation: 'automation',
  marketing: 'marketing',
  sales: 'sales',
  development: 'development',
  'business-strategy': 'businessStrategy',
  'case-studies': 'caseStudies',
}

interface PostHeaderProps {
  post: BlogPost
}

export function PostHeader({ post }: PostHeaderProps) {
  const t = useTranslations('blog')
  const locale = useLocale()

  return (
    <header className="mb-12">
      <Badge color={categoryColors[post.category]} className="mb-6">
        {t(`hub.categories.${categoryKeyMap[post.category]}`)}
      </Badge>

      <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-mint text-sm font-bold text-white">
          {post.author.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {post.author.name}
          </span>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span>{post.readingTime} {t('hub.minRead')}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 h-px w-full bg-gradient-to-r from-accent-purple/50 via-accent-mint/50 to-transparent" />
    </header>
  )
}
