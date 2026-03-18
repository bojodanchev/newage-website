export interface Service {
  slug: string
  title: string
  headline: string
  description: string
  metaTitle: string
  metaDescription: string
  icon: string
  category: ServiceCategory
  problem: string
  solution: string
  features: ServiceFeature[]
  process: ProcessStep[]
  techStack: TechItem[]
  pricingTiers: PricingTier[]
  faq: FAQItem[]
  relatedSlugs: string[]
}

export type ServiceCategory =
  | 'software-development'
  | 'automation-systems'
  | 'marketing-growth'
  | 'sales-infrastructure'
  | 'full-business-build'

export interface ServiceFeature {
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon?: string
}

export interface TechItem {
  name: string
  logo?: string
  category: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  industry: string
  servicesUsed: string[]
  timeline: string
  challenge: string
  approach: string
  solution: string
  techStack: string[]
  results: CaseStudyResult[]
  testimonial?: Testimonial
  projectTimeline: TimelineItem[]
  beforeAfter?: BeforeAfter
  metaTitle: string
  metaDescription: string
  featured?: boolean
}

export interface CaseStudyResult {
  metric: string
  value: string
  label: string
  icon?: string
}

export interface TimelineItem {
  date: string
  title: string
  description: string
}

export interface BeforeAfter {
  before: string
  after: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  tags: string[]
  author: Author
  publishedAt: string
  readingTime: number
  featured?: boolean
  metaTitle: string
  metaDescription: string
}

export type BlogCategory =
  | 'automation'
  | 'marketing'
  | 'sales'
  | 'development'
  | 'business-strategy'
  | 'case-studies'

export interface Author {
  name: string
  role: string
  avatar?: string
  bio?: string
}

export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  avatar?: string
  rating?: number
}

export interface Metric {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface IndustryItem {
  name: string
  icon: string
  slug: string
  projectCount: number
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  avatar?: string
  socials?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface ClientLogo {
  name: string
  logo: string
  url?: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}
