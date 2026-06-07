import { permanentRedirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

// Force dynamic so permanentRedirect emits a real HTTP 308 (not a prerendered
// meta-refresh, which would drop ad tracking query params like fbclid/utm).
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/**
 * Legacy funnel path. The mortgage-broker funnel moved to `/banking`; this
 * permanently redirects (308) so existing ad links keep working — preserving
 * any query string. Locale-aware: EN (default, no prefix) → /banking,
 * BG → /bg/banking.
 */
export default async function MetaAdsRedirect({ params, searchParams }: PageProps) {
  const { locale } = await params
  const sp = await searchParams

  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(sp)) {
    if (Array.isArray(value)) value.forEach((v) => qs.append(key, v))
    else if (value != null) qs.set(key, value)
  }

  const base = locale === routing.defaultLocale ? '/banking' : `/${locale}/banking`
  const query = qs.toString()
  permanentRedirect(query ? `${base}?${query}` : base)
}
