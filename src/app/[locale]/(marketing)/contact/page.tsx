import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { MultiStepForm } from '@/components/features/contact/MultiStepForm'
import { SITE, SOCIALS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('contact.title'),
    description: t('contact.description'),
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  const faqKeys = ['afterSubmit', 'cost', 'smallBusiness'] as const
  const faqs = faqKeys.map((key) => ({
    q: t(`faq.${key}.question`),
    a: t(`faq.${key}.answer`),
  }))

  return (
    <div className="mx-auto max-w-7xl px-6 section-padding">
      {/* Hero */}
      <div className="mb-16 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-purple">
          {t('hero.overline')}
        </p>
        <h1 className="font-heading text-4xl font-bold gradient-text md:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
          {t('hero.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <MultiStepForm />

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Call */}
          <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t('sidebar.quickCall.title')}
            </h3>
            <p className="mb-4 text-sm text-neutral-400">
              {t('sidebar.quickCall.description')}
            </p>
            <div className="rounded-lg border border-dashed border-neutral-700 bg-neutral-800/50 p-6 text-center">
              <p className="text-sm text-neutral-500">
                {t('sidebar.quickCall.comingSoon')}
              </p>
              <a
                href={`mailto:${SITE.email}?subject=Discovery%20Call%20Request`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent-purple transition-colors hover:text-accent-mint"
              >
                {t('sidebar.quickCall.emailToSchedule')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
              {t('sidebar.directContact.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-accent-purple"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-accent-purple"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {t('sidebar.directContact.twitter')}
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-accent-purple"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {t('sidebar.directContact.linkedin')}
                </a>
              </li>
            </ul>
          </div>

          {/* Response Time */}
          <div className="flex items-start gap-3 rounded-xl bg-accent-purple/5 border border-accent-purple/20 p-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent-purple">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p
              className="text-sm text-neutral-300"
              dangerouslySetInnerHTML={{ __html: t.raw('sidebar.responseTime') }}
            />
          </div>
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
          >
            <h4 className="mb-2 font-heading font-semibold text-foreground">
              {item.q}
            </h4>
            <p className="text-sm text-neutral-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
