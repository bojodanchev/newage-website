'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

function extractHeadings(html: string): TOCItem[] {
  const headings: TOCItem[] = []
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi
  let match

  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    })
  }

  return headings
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const t = useTranslations('blog')
  const [activeId, setActiveId] = useState<string>('')
  const headings = extractHeadings(content)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
        {t('post.onThisPage')}
      </p>
      <ul className="space-y-1 border-l border-neutral-700/50">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block border-l-2 py-1.5 text-sm transition-colors duration-200',
                heading.level === 2 ? 'pl-4' : 'pl-7',
                activeId === heading.id
                  ? 'border-accent-purple text-accent-purple'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
