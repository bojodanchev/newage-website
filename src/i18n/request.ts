import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: {
      common: (await import(`../../messages/${locale}/common.json`)).default,
      home: (await import(`../../messages/${locale}/home.json`)).default,
      services: (await import(`../../messages/${locale}/services.json`)).default,
      work: (await import(`../../messages/${locale}/work.json`)).default,
      process: (await import(`../../messages/${locale}/process.json`)).default,
      about: (await import(`../../messages/${locale}/about.json`)).default,
      blog: (await import(`../../messages/${locale}/blog.json`)).default,
      contact: (await import(`../../messages/${locale}/contact.json`)).default,
      legal: (await import(`../../messages/${locale}/legal.json`)).default,
      errors: (await import(`../../messages/${locale}/errors.json`)).default,
      metadata: (await import(`../../messages/${locale}/metadata.json`)).default,
    },
  }
})
