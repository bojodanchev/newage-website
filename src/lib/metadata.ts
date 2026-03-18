import type { Metadata } from 'next'
import { SITE } from './constants'

interface MetadataParams {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: MetadataParams): Metadata {
  const url = `${SITE.url}${path}`
  const ogImage = image || `/api/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
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
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  }
}
