'use client'

import { useTranslations } from 'next-intl'

const clientKeys = [
  'meridianLabs', 'apexDigital', 'quantumGrowth', 'stratoSystems',
  'vanguardAI', 'nexusCorp', 'pinnacleSaas', 'forgeCapital',
] as const

export function LogoBar() {
  const t = useTranslations('home')
  const clients = clientKeys.map((key) => t(`logoBar.clients.${key}`))
  const marqueeItems = [...clients, ...clients]

  return (
    <section className="py-8 border-t border-b border-neutral-700/30 overflow-hidden">
      <p className="text-neutral-400 text-xs uppercase tracking-[0.15em] text-center mb-6">
        {t('logoBar.trustedBy')}
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

        <div className="flex animate-marquee">
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 px-6 text-neutral-400 font-heading font-semibold uppercase tracking-[0.15em] text-xs whitespace-nowrap flex items-center gap-6"
            >
              {name}
              <span className="text-neutral-600">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
