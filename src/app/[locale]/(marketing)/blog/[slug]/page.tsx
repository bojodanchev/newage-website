import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllBlogPosts, getBlogPostBySlug, getPostsByCategory } from '@/data'
import type { Locale } from '@/i18n/config'
import { createMetadata } from '@/lib/metadata'
import { blogPostSchema } from '@/lib/structured-data'
import { PostHeader } from '@/components/features/blog/PostHeader'
import { TableOfContents } from '@/components/features/blog/TableOfContents'
import { ShareButtons } from '@/components/features/blog/ShareButtons'
import { PostCard } from '@/components/features/blog/PostCard'
import { NewsletterForm } from '@/components/sections/NewsletterForm'
import { SITE } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const post = getBlogPostBySlug(slug, locale as Locale)
  if (!post) return {}

  return createMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const post = getBlogPostBySlug(slug, locale as Locale)

  if (!post) notFound()

  const relatedPosts = getPostsByCategory(post.category, locale as Locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const postUrl = `${SITE.url}/blog/${post.slug}`

  return (
    <div className="mx-auto max-w-7xl px-6 section-padding">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema(post)) }}
      />

      <PostHeader post={post} />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
        {/* Main article */}
        <article
          className="blog-content prose-invert max-w-none
            [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground
            [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground
            [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-neutral-300
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-neutral-300
            [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-neutral-300
            [&_li]:mb-2 [&_li]:leading-relaxed
            [&_a]:text-accent-purple [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-mint
            [&_blockquote]:border-l-2 [&_blockquote]:border-accent-purple/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-neutral-400
            [&_code]:rounded [&_code]:bg-neutral-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-accent-mint"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <TableOfContents content={post.content} />
          <div className="mt-10">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </aside>
      </div>

      {/* Mobile share buttons */}
      <div className="mt-8 lg:hidden">
        <ShareButtons url={postUrl} title={post.title} />
      </div>

      {/* Author Bio */}
      <div className="mt-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8">
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-mint text-lg font-bold text-white">
            {post.author.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              {post.author.name}
            </p>
            <p className="text-sm text-accent-purple">{post.author.role}</p>
            {post.author.bio && (
              <p className="mt-2 text-sm text-neutral-400">{post.author.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-heading text-2xl font-bold gradient-text">
            {t('post.moreLikeThis')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((rp) => (
              <PostCard key={rp.slug} post={rp} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-center md:p-12">
        <h3 className="font-heading text-2xl font-bold gradient-text">
          {t('post.newsletterCta.title')}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-neutral-400">
          {t('post.newsletterCta.description')}
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
