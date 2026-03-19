import { MetadataRoute } from 'next'
import { getAllServices, getAllCaseStudies, getAllBlogPosts } from '@/data'

export const dynamic = 'force-static'

const BASE_URL = 'https://newagecontent.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/services',
    '/work',
    '/process',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ]

  const entries: MetadataRoute.Sitemap = []

  // Static pages for both locales
  for (const path of staticPages) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/services' ? 0.9 : 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}${path}`,
          bg: `${BASE_URL}/bg${path}`,
        },
      },
    })
  }

  // Services
  for (const s of getAllServices()) {
    entries.push({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/services/${s.slug}`,
          bg: `${BASE_URL}/bg/services/${s.slug}`,
        },
      },
    })
  }

  // Case studies
  for (const cs of getAllCaseStudies()) {
    entries.push({
      url: `${BASE_URL}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/work/${cs.slug}`,
          bg: `${BASE_URL}/bg/work/${cs.slug}`,
        },
      },
    })
  }

  // Blog posts
  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog/${post.slug}`,
          bg: `${BASE_URL}/bg/blog/${post.slug}`,
        },
      },
    })
  }

  return entries
}
