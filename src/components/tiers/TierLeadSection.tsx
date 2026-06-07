'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { TierLeadForm } from './TierLeadForm'

const ease = [0.16, 1, 0.3, 1] as const
type Tier = 'start' | 'grow' | 'scale'

/**
 * Conversion section (anchor #lead). Reads `${ns}.leadSection`:
 *   eyebrow, title, subtitle, bullets: string[], formTitle
 * The form itself reads `${ns}.leadForm`.
 */
export function TierLeadSection({ ns, tier }: { ns: string; tier: Tier }) {
  const t = useTranslations(`${ns}.leadSection`)
  const bullets = (t.has('bullets') ? (t.raw('bullets') as string[]) : []) ?? []

  return (
    <section id="lead" className="section-padding relative overflow-hidden scroll-mt-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{ background: 'var(--tier-glow)' }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text">
            {t('eyebrow')}
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
          >
            {t('title')}
          </motion.h2>
          <p className="mt-5 max-w-md text-lg text-foreground/65">{t('subtitle')}</p>

          {bullets.length > 0 && (
            <ul className="mt-8 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-foreground/75">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] tier-chip"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold">{t('formTitle')}</h3>
          <div className="mt-6">
            <TierLeadForm ns={ns} tier={tier} />
          </div>
        </div>
      </div>
    </section>
  )
}
