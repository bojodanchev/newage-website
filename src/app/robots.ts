import { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export const dynamic = 'force-static'

// AI assistant and search crawlers we explicitly welcome.
// Listed individually so vendors that special-case named user-agents
// see an explicit allow rather than relying on the wildcard rule.
const AI_USER_AGENTS = [
  'GPTBot',          // OpenAI training crawler
  'OAI-SearchBot',   // ChatGPT search index
  'ChatGPT-User',    // ChatGPT browse-on-demand
  'ClaudeBot',       // Anthropic training crawler
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',   // Perplexity index
  'Perplexity-User', // Perplexity on-demand fetch
  'Google-Extended', // Gemini / AI Overviews training opt-in
  'GoogleOther',
  'Applebot',
  'Applebot-Extended', // Apple Intelligence training opt-in
  'Bingbot',
  'CCBot',           // Common Crawl (feeds most foundation models)
  'cohere-ai',
  'Diffbot',
  'DuckAssistBot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Amazonbot',
  'Bytespider',
  'YouBot',
  'Timpibot',
  'omgili',
  'Kagibot',
]

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin/']

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
