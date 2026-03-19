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
    title: t('terms.title'),
    description: t('terms.description'),
    robots: { index: false, follow: false },
  }
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('legal')

  const sections = [
    'acceptance',
    'services',
    'paymentTerms',
    'intellectualProperty',
    'limitationOfLiability',
    'termination',
    'governingLaw',
  ] as const

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">
          {t('terms.title')}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          {t('terms.lastUpdated')}
        </p>
      </div>

      {sections.map((key) => (
        <section key={key} className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {t(`terms.${key}.title`)}
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            {t(`terms.${key}.content`, { siteName: SITE.name })}
          </p>
        </section>
      ))}

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          {t('terms.contact.title')}
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          {t('terms.contact.content')}{' '}
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
