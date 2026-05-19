import { SITE } from '@/lib/constants'
import {
  getAllServices,
  getAllCaseStudies,
  getAllBlogPosts,
  getAllTeamMembers,
} from '@/data'

export const dynamic = 'force-static'

const BASE_URL = SITE.url

function escape(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

export function GET() {
  const services = getAllServices('en')
  const caseStudies = getAllCaseStudies('en')
  const blogPosts = getAllBlogPosts('en')
  const team = getAllTeamMembers('en')

  const lines: string[] = []

  lines.push(`# ${SITE.name} — ${SITE.tagline}`)
  lines.push('')
  lines.push(`> ${escape(SITE.description)}`)
  lines.push('')
  lines.push(
    `${SITE.name} is a premium digital agency that builds custom software, business automations, marketing funnels, and sales infrastructure for ambitious founders and operators. We design, ship, and operate the systems that turn ideas into revenue.`,
  )
  lines.push('')
  lines.push(
    `- Founded ${SITE.foundedYear} · ${SITE.location} · Contact: ${SITE.email}`,
  )
  lines.push(`- Site: ${BASE_URL}`)
  lines.push(`- Bulgarian (bg) translation available under ${BASE_URL}/bg`)
  lines.push('')

  lines.push('## Services')
  lines.push('')
  for (const s of services) {
    const summary = escape(s.metaDescription || s.headline || s.description)
    lines.push(`- [${s.title}](${BASE_URL}/services/${s.slug}): ${summary}`)
  }
  lines.push('')

  lines.push('## Case Studies')
  lines.push('')
  for (const cs of caseStudies) {
    const summary = escape(cs.metaDescription)
    lines.push(`- [${cs.title}](${BASE_URL}/work/${cs.slug}): ${summary}`)
  }
  lines.push('')

  lines.push('## Articles')
  lines.push('')
  for (const post of blogPosts) {
    const summary = escape(post.excerpt)
    lines.push(`- [${post.title}](${BASE_URL}/blog/${post.slug}): ${summary}`)
  }
  lines.push('')

  lines.push('## Company')
  lines.push('')
  lines.push(`- [About](${BASE_URL}/about): The story, team, and operating principles behind ${SITE.name}.`)
  lines.push(`- [Process](${BASE_URL}/process): How we discover, scope, build, and scale client systems.`)
  lines.push(`- [Work](${BASE_URL}/work): Featured client engagements and outcomes.`)
  lines.push(`- [Blog](${BASE_URL}/blog): Long-form essays on automation, funnels, software, and growth.`)
  lines.push(`- [Contact](${BASE_URL}/contact): Start a project, request a proposal, or talk to the team.`)
  lines.push('')

  if (team.length) {
    lines.push('## Team')
    lines.push('')
    for (const m of team) {
      lines.push(`- ${m.name} — ${m.role}`)
    }
    lines.push('')
  }

  lines.push('## Optional')
  lines.push('')
  lines.push(`- [Privacy Policy](${BASE_URL}/privacy)`)
  lines.push(`- [Terms of Service](${BASE_URL}/terms)`)
  lines.push(`- [Sitemap (XML)](${BASE_URL}/sitemap.xml)`)
  lines.push(`- [Expanded content (llms-full.txt)](${BASE_URL}/llms-full.txt)`)
  lines.push('')

  const body = lines.join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
