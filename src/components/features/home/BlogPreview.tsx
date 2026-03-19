'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { Badge } from '@/components/ui/Badge'
import { fadeUp } from '@/lib/animations'
import { getAllBlogPosts } from '@/data/blog-posts'

const borderColors: Record<string, string> = {
  purple: 'border-t-accent-purple',
  mint: 'border-t-accent-mint',
  orange: 'border-t-accent-orange',
}

const colorCycle = ['purple', 'mint', 'orange'] as const

const categoryMap: Record<string, string> = {
  'automation': 'Automation',
  'sales': 'Sales',
  'business-strategy': 'Business Strategy',
  'development': 'Development',
  'marketing': 'Marketing',
}

const allPosts = getAllBlogPosts()
const posts = allPosts.slice(0, 3).map((post, i) => ({
  slug: post.slug,
  category: categoryMap[post.category] || post.category,
  title: post.title,
  excerpt: post.excerpt,
  author: post.author.name,
  date: new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  readingTime: post.readingTime,
  color: colorCycle[i % colorCycle.length],
}))

export function BlogPreview() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            Insights
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            Latest from the <span className="gradient-text">Blog</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <a
                href={`/blog/${post.slug}`}
                className={`group block bg-white/[0.07] backdrop-blur-xl border border-white/10 border-t-2 ${borderColors[post.color]} rounded-xl p-8 h-full transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.08]`}
              >
                <Badge color={post.color} className="mb-4">
                  {post.category}
                </Badge>
                <h3 className="font-heading text-lg font-semibold mb-3 group-hover:text-accent-purple transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span>{post.author}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <span className="text-accent-purple opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 text-lg">
                    &rarr;
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3} className="text-center mt-12 pb-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-mint transition-colors font-medium"
          >
            Read All Insights
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
