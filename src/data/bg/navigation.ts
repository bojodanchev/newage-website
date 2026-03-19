import type { NavigationItem } from '@/types/content'

export const navigation: NavigationItem[] = [
  {
    label: 'Услуги',
    href: '/services',
    children: [
      { label: 'Софтуерна разработка', href: '/services/software-development' },
      { label: 'Системи за автоматизация', href: '/services/automation-systems' },
      { label: 'Маркетинг и растеж', href: '/services/marketing-growth' },
      { label: 'Инфраструктура за продажби', href: '/services/sales-infrastructure' },
      { label: 'Цялостно изграждане на бизнес', href: '/services/full-business-build' },
    ],
  },
  { label: 'Проекти', href: '/work' },
  { label: 'Процес', href: '/process' },
  { label: 'За нас', href: '/about' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакт', href: '/contact' },
]

export function getNavigation(): NavigationItem[] {
  return navigation
}
