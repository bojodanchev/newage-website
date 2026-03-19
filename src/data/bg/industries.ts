import type { IndustryItem } from '@/types/content'

export const industries: IndustryItem[] = [
  { name: 'SaaS и технологии', icon: '💻', slug: 'saas-technology', projectCount: 42 },
  { name: 'Електронна търговия', icon: '🛒', slug: 'e-commerce', projectCount: 35 },
  { name: 'Недвижими имоти', icon: '🏠', slug: 'real-estate', projectCount: 23 },
  { name: 'Здравеопазване', icon: '🏥', slug: 'healthcare', projectCount: 18 },
  { name: 'Финанси и Fintech', icon: '💳', slug: 'finance-fintech', projectCount: 15 },
  { name: 'Агенции', icon: '🎯', slug: 'agencies', projectCount: 12 },
  { name: 'Локален бизнес', icon: '🏪', slug: 'local-businesses', projectCount: 8 },
]

export function getAllIndustries(): IndustryItem[] {
  return industries
}
