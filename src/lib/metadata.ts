import type { Metadata } from 'next'
import { SITE } from './constants'

interface MetadataParams {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  locale?: string
}

export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  locale = 'en',
}: MetadataParams): Metadata {
  const prefix = locale === 'en' ? '' : `/${locale}`
  const url = `${SITE.url}${prefix}${path}`
  const ogImage = image || `/api/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE.url}${path}`,
        bg: `${SITE.url}/bg${path}`,
      },
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}
