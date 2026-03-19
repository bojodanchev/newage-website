import { SITE, SOCIALS } from './constants'
import type { Service, FAQItem, BlogPost } from '@/types/content'

export function organizationSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    email: SITE.email,
    sameAs: Object.values(SOCIALS),
    foundingDate: `${SITE.foundedYear}`,
    inLanguage: locale === 'bg' ? 'bg' : 'en',
  }
}

export function serviceSchema(service: Service, locale: string = 'en') {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
    },
    url: `${SITE.url}${prefix}/services/${service.slug}`,
    inLanguage: locale === 'bg' ? 'bg' : 'en',
  }
}

export function faqSchema(items: FAQItem[], locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'bg' ? 'bg' : 'en',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function blogPostSchema(post: BlogPost, locale: string = 'en') {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}${prefix}/blog/${post.slug}`,
    inLanguage: locale === 'bg' ? 'bg' : 'en',
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
