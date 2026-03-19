import type { Locale } from '@/i18n/config'
import type {
  Service,
  CaseStudy,
  BlogPost,
  Testimonial,
  Metric,
  TeamMember,
  ClientLogo,
  IndustryItem,
  NavigationItem,
  FAQItem,
} from '@/types/content'

// Import EN data
import { services as enServices } from './en/services'
import { caseStudies as enCaseStudies } from './en/case-studies'
import { blogPosts as enBlogPosts } from './en/blog-posts'
import { testimonials as enTestimonials } from './en/testimonials'
import { faqs as enFaqs } from './en/faq'
import { team as enTeam } from './en/team'
import { metrics as enMetrics } from './en/metrics'
import { clients as enClients } from './en/clients'
import { industries as enIndustries } from './en/industries'
import { navigation as enNavigation } from './en/navigation'

// Import BG data
import { services as bgServices } from './bg/services'
import { caseStudies as bgCaseStudies } from './bg/case-studies'
import { blogPosts as bgBlogPosts } from './bg/blog-posts'
import { testimonials as bgTestimonials } from './bg/testimonials'
import { faqs as bgFaqs } from './bg/faq'
import { team as bgTeam } from './bg/team'
import { metrics as bgMetrics } from './bg/metrics'
import { clients as bgClients } from './bg/clients'
import { industries as bgIndustries } from './bg/industries'
import { navigation as bgNavigation } from './bg/navigation'

// Locale maps
const servicesMap: Record<Locale, Service[]> = { en: enServices, bg: bgServices }
const caseStudiesMap: Record<Locale, CaseStudy[]> = { en: enCaseStudies, bg: bgCaseStudies }
const blogPostsMap: Record<Locale, BlogPost[]> = { en: enBlogPosts, bg: bgBlogPosts }
const testimonialsMap: Record<Locale, Testimonial[]> = { en: enTestimonials, bg: bgTestimonials }
const faqsMap: Record<Locale, (FAQItem & { category: string })[]> = { en: enFaqs, bg: bgFaqs }
const teamMap: Record<Locale, TeamMember[]> = { en: enTeam, bg: bgTeam }
const metricsMap: Record<Locale, Metric[]> = { en: enMetrics, bg: bgMetrics }
const clientsMap: Record<Locale, ClientLogo[]> = { en: enClients, bg: bgClients }
const industriesMap: Record<Locale, IndustryItem[]> = { en: enIndustries, bg: bgIndustries }
const navigationMap: Record<Locale, NavigationItem[]> = { en: enNavigation, bg: bgNavigation }

// Services
export function getAllServices(locale: Locale = 'en'): Service[] {
  return servicesMap[locale] || servicesMap.en
}

export function getServiceBySlug(slug: string, locale: Locale = 'en'): Service | undefined {
  return getAllServices(locale).find((s) => s.slug === slug)
}

export function getServicesByCategory(category: string, locale: Locale = 'en'): Service[] {
  return getAllServices(locale).filter((s) => s.category === category)
}

// Case Studies
export function getAllCaseStudies(locale: Locale = 'en'): CaseStudy[] {
  return caseStudiesMap[locale] || caseStudiesMap.en
}

export function getCaseStudyBySlug(slug: string, locale: Locale = 'en'): CaseStudy | undefined {
  return getAllCaseStudies(locale).find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(locale: Locale = 'en'): CaseStudy[] {
  return getAllCaseStudies(locale).filter((cs) => cs.featured)
}

// Blog Posts
export function getAllBlogPosts(locale: Locale = 'en'): BlogPost[] {
  return blogPostsMap[locale] || blogPostsMap.en
}

export function getBlogPostBySlug(slug: string, locale: Locale = 'en'): BlogPost | undefined {
  return getAllBlogPosts(locale).find((post) => post.slug === slug)
}

export function getFeaturedPosts(locale: Locale = 'en'): BlogPost[] {
  return getAllBlogPosts(locale).filter((post) => post.featured)
}

export function getPostsByCategory(category: string, locale: Locale = 'en'): BlogPost[] {
  return getAllBlogPosts(locale).filter((post) => post.category === category)
}

// Testimonials
export function getAllTestimonials(locale: Locale = 'en'): Testimonial[] {
  return testimonialsMap[locale] || testimonialsMap.en
}

// FAQs
export function getAllFAQs(locale: Locale = 'en'): (FAQItem & { category: string })[] {
  return faqsMap[locale] || faqsMap.en
}

export function getFAQsByCategory(category: string, locale: Locale = 'en'): (FAQItem & { category: string })[] {
  return getAllFAQs(locale).filter((faq) => faq.category === category)
}

// Team
export function getAllTeamMembers(locale: Locale = 'en'): TeamMember[] {
  return teamMap[locale] || teamMap.en
}

export function getFounder(locale: Locale = 'en'): TeamMember {
  return getAllTeamMembers(locale)[0]
}

// Metrics
export function getAllMetrics(locale: Locale = 'en'): Metric[] {
  return metricsMap[locale] || metricsMap.en
}

// Clients
export function getAllClients(locale: Locale = 'en'): ClientLogo[] {
  return clientsMap[locale] || clientsMap.en
}

// Industries
export function getAllIndustries(locale: Locale = 'en'): IndustryItem[] {
  return industriesMap[locale] || industriesMap.en
}

// Navigation
export function getNavigation(locale: Locale = 'en'): NavigationItem[] {
  return navigationMap[locale] || navigationMap.en
}
