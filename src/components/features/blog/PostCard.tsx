import Link from 'next/link'
import { cn } from '@/lib/utils'
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

const categoryLabels: Record<BlogCategory, string> = {
  automation: 'Automation',
  marketing: 'Marketing',
  sales: 'Sales',
  development: 'Development',
  'business-strategy': 'Business Strategy',
  'case-studies': 'Case Studies',
}

interface PostCardProps {
  post: BlogPost
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group block rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6',
        'transition-all duration-300',
        'hover:border-accent-purple/30 hover:bg-white/[0.08] hover:-translate-y-1 hover:glow-purple',
        className
      )}
    >
      <Badge color={categoryColors[post.category]} className="mb-4">
        {categoryLabels[post.category]}
      </Badge>

      <h3 className="font-heading text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-purple line-clamp-2">
        {post.title}
      </h3>

      <p className="mt-3 text-sm text-neutral-400 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="mt-5 flex items-center gap-3 text-xs text-neutral-500">
        <span>{post.author.name}</span>
        <span className="h-1 w-1 rounded-full bg-neutral-600" />
        <span>{formatDate(post.publishedAt)}</span>
        <span className="h-1 w-1 rounded-full bg-neutral-600" />
        <span>{post.readingTime} min read</span>
      </div>
    </Link>
  )
}
