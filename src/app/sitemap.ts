import { MetadataRoute } from 'next'
import { getAllServices } from '@/data/services'
import { getAllCaseStudies } from '@/data/case-studies'
import { getAllBlogPosts } from '@/data/blog-posts'

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

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/services' ? 0.9 : 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudies().map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...blogEntries]
}
