import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SITE } from '@/lib/constants'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
    robots: { index: false, follow: false },
  }
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('legal')

  const sections = [
    'informationCollection',
    'useOfInformation',
    'cookies',
    'thirdPartyServices',
    'dataSecurity',
    'yourRights',
  ] as const

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">
          {t('privacy.title')}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          {t('privacy.lastUpdated')}
        </p>
      </div>

      {sections.map((key) => (
        <section key={key} className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {t(`privacy.${key}.title`)}
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            {t(`privacy.${key}.content`)}
          </p>
        </section>
      ))}

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          {t('privacy.contactUs.title')}
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          {t('privacy.contactUs.content')}{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent-purple underline underline-offset-2 transition-colors hover:text-accent-mint"
          >
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </div>
  )
}
