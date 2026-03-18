import type { FAQItem } from '@/types/content'

interface CategorizedFAQ extends FAQItem {
  category: 'general' | 'pricing' | 'process' | 'technology' | 'support'
}

export const faqs: CategorizedFAQ[] = [
  // General
  {
    category: 'general',
    question: 'What does New Age actually do?',
    answer:
      'We build the software, automations, and business infrastructure that turns ideas into revenue machines. That includes custom web and mobile apps, business process automation, marketing funnels, sales systems, and full end-to-end business builds. We are not a traditional agency — we are a systems partner.',
  },
  {
    category: 'general',
    question: 'Who is New Age for?',
    answer:
      'Founders, CEOs, and operations leaders at businesses generating $500K–$50M in annual revenue who need systems that scale. Whether you are launching a new product, automating operations, or rebuilding your sales infrastructure — if growth is the goal, we are the build partner.',
  },
  {
    category: 'general',
    question: 'How is New Age different from other agencies?',
    answer:
      'Most agencies specialize in one lane — marketing, development, or consulting. We operate across all of them because business systems do not live in silos. We build the product, automate the operations, and wire the marketing and sales infrastructure together. One team, one outcome: revenue growth.',
  },
  {
    category: 'general',
    question: 'Do you work with startups or only established businesses?',
    answer:
      'Both. Our Idea-to-MVP and Full Business Build services are designed for early-stage founders. Our Growth and Enterprise tiers serve established businesses that need infrastructure upgrades. The common thread is ambition — we work with people who are serious about building something that lasts.',
  },

  // Pricing
  {
    category: 'pricing',
    question: 'How much does a typical project cost?',
    answer:
      'Projects range from $3,000 for targeted automation engagements to $75,000+ for full business builds. Most clients invest between $10,000–$35,000. Every project starts with a detailed proposal so you know the exact investment before committing.',
  },
  {
    category: 'pricing',
    question: 'Do you offer payment plans?',
    answer:
      'Yes. Standard terms are 50% upfront and 50% at delivery. For larger projects, we offer milestone-based payment schedules aligned to sprint deliverables. We want the financial structure to work for both sides.',
  },
  {
    category: 'pricing',
    question: 'What if the project costs more than estimated?',
    answer:
      'Our proposals include fixed pricing for the agreed scope. If scope changes are requested during the project, we provide a change order with updated pricing before any additional work begins. No surprise invoices.',
  },
  {
    category: 'pricing',
    question: 'Do you offer retainer agreements?',
    answer:
      'Yes. After project delivery, many clients transition to a monthly retainer for ongoing development, automation maintenance, and growth optimization. Retainers start at $2,500/month and are structured around your specific needs.',
  },

  // Process
  {
    category: 'process',
    question: 'What does the engagement process look like?',
    answer:
      'Discovery call → Proposal → Kickoff → Sprint-based delivery → Launch → Post-launch support. The discovery call is free and takes 30–45 minutes. If we are a fit, you receive a detailed proposal within 48 hours. From signed agreement to kickoff is typically 5–7 business days.',
  },
  {
    category: 'process',
    question: 'How long do projects take?',
    answer:
      'Automation projects: 2–6 weeks. Software development: 4–16 weeks. Marketing & sales builds: 4–12 weeks. Full business builds: 8–24 weeks. Every project has a fixed timeline agreed upon before development begins.',
  },
  {
    category: 'process',
    question: 'How involved do I need to be during the project?',
    answer:
      'Expect 2–5 hours per week of involvement — primarily approvals, feedback sessions, and sprint demos. We handle the execution. You steer the direction. We will never block progress waiting for feedback — we build, show you, and iterate.',
  },
  {
    category: 'process',
    question: 'What happens if I am not happy with the results?',
    answer:
      'Our sprint-based process means you see working output every two weeks and provide feedback in real time. Issues are caught and corrected early, not discovered at delivery. If a specific deliverable misses the mark, we revise it at no additional cost within the agreed scope.',
  },

  // Technology
  {
    category: 'technology',
    question: 'What technology stack do you use?',
    answer:
      'Our core stack is React/Next.js, TypeScript, Node.js, PostgreSQL, and modern automation platforms (Make, n8n). We also work with Python, React Native, Supabase, Stripe, HubSpot, Salesforce, and dozens of other tools. We choose the right tool for the job, not the one we are most familiar with.',
  },
  {
    category: 'technology',
    question: 'Can you work with our existing tools and systems?',
    answer:
      'Yes. We integrate with and build on top of existing infrastructure. If a tool change would deliver significantly better results, we present the case with data — but we never force migrations. Your current investment is respected.',
  },
  {
    category: 'technology',
    question: 'Do you build AI-powered solutions?',
    answer:
      'Yes. We integrate LLMs, vector search, AI-powered automation, intelligent lead scoring, and predictive analytics into our builds. AI is a tool in our stack — we deploy it where it delivers measurable ROI, not as a marketing gimmick.',
  },

  // Support
  {
    category: 'support',
    question: 'What kind of support do you provide after launch?',
    answer:
      'Every project includes a post-launch support window (30–90 days depending on tier). This covers bug fixes, performance monitoring, and minor adjustments. For ongoing needs, our retainer agreements provide continuous development and optimization.',
  },
  {
    category: 'support',
    question: 'Do you provide training for our team?',
    answer:
      'Yes. Every deliverable includes documentation and training sessions. We make sure your team can operate, maintain, and extend the systems we build. We want to empower your team, not create dependency.',
  },
  {
    category: 'support',
    question: 'How do we communicate during the project?',
    answer:
      'You get a dedicated Slack channel with direct access to your project lead and the engineers working on your build. Bi-weekly sprint demos, async updates, and a shared project board for full transparency. No account managers or gatekeepers.',
  },
]

export function getAllFAQs(): CategorizedFAQ[] {
  return faqs
}

export function getFAQsByCategory(category: string): CategorizedFAQ[] {
  return faqs.filter((faq) => faq.category === category)
}
