import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { BlogHub } from '@/components/features/blog/BlogHub'

export const metadata: Metadata = createMetadata({
  title: 'Blog | Insights & Strategy',
  description:
    'Expert perspectives on building, automating, and scaling modern businesses. Actionable strategies from the New Age team.',
  path: '/blog',
})

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 section-padding">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
          Blog
        </p>
        <h1 className="font-heading text-4xl font-bold gradient-text md:text-6xl">
          Insights &amp; Strategy
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
          Expert perspectives on building, automating, and scaling modern
          businesses.
        </p>
      </div>

      <BlogHub />
    </div>
  )
}
