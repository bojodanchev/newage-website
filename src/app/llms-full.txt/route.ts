import { SITE } from '@/lib/constants'
import {
  getAllServices,
  getAllCaseStudies,
  getAllBlogPosts,
  getAllTeamMembers,
  getAllFAQs,
} from '@/data'

export const dynamic = 'force-static'

const BASE_URL = SITE.url

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

export function GET() {
  const services = getAllServices('en')
  const caseStudies = getAllCaseStudies('en')
  const blogPosts = getAllBlogPosts('en')
  const team = getAllTeamMembers('en')
  const faqs = getAllFAQs('en')

  const out: string[] = []

  out.push(`# ${SITE.name} — Full Content Index`)
  out.push('')
  out.push(`> ${clean(SITE.description)}`)
  out.push('')
  out.push(
    `This is the long-form companion to ${BASE_URL}/llms.txt. It contains the full text of each service, case study, and article so that language models can ground responses in primary source material from ${SITE.name}.`,
  )
  out.push('')
  out.push(`- Canonical site: ${BASE_URL}`)
  out.push(`- Founded ${SITE.foundedYear} · ${SITE.location}`)
  out.push(`- Contact: ${SITE.email}`)
  out.push('')

  out.push('## Company Overview')
  out.push('')
  out.push(
    `${SITE.name} is a premium digital agency that builds custom software, business automations, marketing funnels, and sales infrastructure. We partner with founders and operators who need a senior team to architect the systems behind their growth — not freelancers, not generic agencies, not low-code patchwork. Every engagement combines strategy, engineering, and operations under one roof.`,
  )
  out.push('')

  if (team.length) {
    out.push('### Team')
    out.push('')
    for (const m of team) {
      out.push(`- **${m.name}** — ${m.role}`)
      if (m.bio) out.push(`  ${clean(m.bio)}`)
    }
    out.push('')
  }

  out.push('## Services')
  out.push('')
  for (const s of services) {
    out.push(`### ${s.title}`)
    out.push('')
    out.push(`- URL: ${BASE_URL}/services/${s.slug}`)
    out.push(`- Headline: ${clean(s.headline)}`)
    out.push('')
    out.push(`**Problem.** ${clean(s.problem)}`)
    out.push('')
    out.push(`**Solution.** ${clean(s.solution)}`)
    out.push('')
    if (s.features?.length) {
      out.push('**Capabilities:**')
      for (const f of s.features) {
        out.push(`- ${f.title} — ${clean(f.description)}`)
      }
      out.push('')
    }
    if (s.techStack?.length) {
      out.push(
        `**Tech stack:** ${s.techStack.map((t) => `${t.name} (${t.category})`).join(', ')}.`,
      )
      out.push('')
    }
    if (s.pricingTiers?.length) {
      out.push('**Engagement tiers:**')
      for (const t of s.pricingTiers) {
        out.push(`- ${t.name} (${t.price}) — ${clean(t.description)}`)
      }
      out.push('')
    }
  }

  out.push('## Case Studies')
  out.push('')
  for (const cs of caseStudies) {
    out.push(`### ${cs.title}`)
    out.push('')
    out.push(`- URL: ${BASE_URL}/work/${cs.slug}`)
    out.push(`- Client: ${cs.client}`)
    out.push(`- Industry: ${cs.industry}`)
    out.push(`- Timeline: ${cs.timeline}`)
    out.push(`- Services used: ${cs.servicesUsed.join(', ')}`)
    out.push('')
    out.push(`**Challenge.** ${clean(cs.challenge)}`)
    out.push('')
    out.push(`**Approach.** ${clean(cs.approach)}`)
    out.push('')
    out.push(`**Solution.** ${clean(cs.solution)}`)
    out.push('')
    if (cs.results?.length) {
      out.push('**Results:**')
      for (const r of cs.results) {
        out.push(`- ${r.value} ${r.label}`)
      }
      out.push('')
    }
    if (cs.beforeAfter) {
      out.push(`**Before.** ${clean(cs.beforeAfter.before)}`)
      out.push('')
      out.push(`**After.** ${clean(cs.beforeAfter.after)}`)
      out.push('')
    }
    if (cs.testimonial) {
      out.push(
        `> "${clean(cs.testimonial.quote)}" — ${cs.testimonial.name}, ${cs.testimonial.title}, ${cs.testimonial.company}`,
      )
      out.push('')
    }
  }

  out.push('## Articles')
  out.push('')
  for (const post of blogPosts) {
    out.push(`### ${post.title}`)
    out.push('')
    out.push(`- URL: ${BASE_URL}/blog/${post.slug}`)
    out.push(`- Published: ${post.publishedAt}`)
    out.push(`- Category: ${post.category}`)
    out.push(`- Reading time: ${post.readingTime} min`)
    if (post.author?.name) out.push(`- Author: ${post.author.name}`)
    out.push('')
    out.push(clean(post.excerpt))
    out.push('')
    const body = stripHtml(post.content)
    if (body) {
      out.push(body)
      out.push('')
    }
  }

  if (faqs.length) {
    out.push('## Frequently Asked Questions')
    out.push('')
    for (const f of faqs) {
      out.push(`**Q: ${clean(f.question)}**`)
      out.push('')
      out.push(clean(f.answer))
      out.push('')
    }
  }

  const body = out.join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
