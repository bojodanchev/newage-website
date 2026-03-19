'use client'

import { useTranslations } from 'next-intl'
import { SlideIn } from '@/components/animation/SlideIn'
import { FadeIn } from '@/components/animation/FadeIn'

const beforeKeys = ['manualDataEntry', 'leadsLost', 'noFollowUp', 'inconsistentBrand', 'revenueCapped'] as const
const afterKeys = ['unifiedSystem', 'automatedLeadCapture', 'smartFollowUps', 'consistentBrand', 'revenueScales'] as const

export function DifferenceSection() {
  const t = useTranslations('home')

  return (
    <section className="section-padding bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            {t('difference.title')} <span className="gradient-text">{t('difference.titleHighlight')}</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          {/* Before */}
          <SlideIn direction="left">
            <div className="rounded-xl border border-red-500/20 border-l-4 border-l-red-500/40 bg-red-500/[0.05] backdrop-blur-xl p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-red-400 mb-6">
                {t('difference.without.label')}
              </p>
              <ul className="space-y-4">
                {beforeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-neutral-300">{t(`difference.without.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm font-bold text-white/50 bg-white/10 rounded-full w-10 h-10 items-center justify-center">
            {t('difference.vs')}
          </div>

          {/* After */}
          <SlideIn direction="right">
            <div className="rounded-xl border border-accent-mint/20 border-l-4 border-l-accent-mint/40 bg-accent-mint/[0.05] backdrop-blur-xl p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent-mint mb-6">
                {t('difference.with.label')}
              </p>
              <ul className="space-y-4">
                {afterKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-accent-mint mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-neutral-300">{t(`difference.with.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
