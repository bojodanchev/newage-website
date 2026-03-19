import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'bg'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export const { Link, useRouter, usePathname, redirect } =
  createNavigation(routing)
