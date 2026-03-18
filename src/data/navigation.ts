import type { NavigationItem } from '@/types/content'

export const navigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Software Development', href: '/services/software-development' },
      { label: 'Automation Systems', href: '/services/automation-systems' },
      { label: 'Marketing & Growth', href: '/services/marketing-growth' },
      { label: 'Sales Infrastructure', href: '/services/sales-infrastructure' },
      { label: 'Full Business Build', href: '/services/full-business-build' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function getNavigation(): NavigationItem[] {
  return navigation
}
