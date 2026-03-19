import type { IndustryItem } from '@/types/content'

export const industries: IndustryItem[] = [
  { name: 'SaaS & Technology', icon: '💻', slug: 'saas-technology', projectCount: 42 },
  { name: 'E-Commerce', icon: '🛒', slug: 'e-commerce', projectCount: 35 },
  { name: 'Real Estate', icon: '🏠', slug: 'real-estate', projectCount: 23 },
  { name: 'Healthcare', icon: '🏥', slug: 'healthcare', projectCount: 18 },
  { name: 'Finance & Fintech', icon: '💳', slug: 'finance-fintech', projectCount: 15 },
  { name: 'Agencies', icon: '🎯', slug: 'agencies', projectCount: 12 },
  { name: 'Local Businesses', icon: '🏪', slug: 'local-businesses', projectCount: 8 },
]

export function getAllIndustries(): IndustryItem[] {
  return industries
}
