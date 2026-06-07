'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'

const ease = [0.16, 1, 0.3, 1] as const

interface PickerCard {
  key: 'start' | 'grow' | 'scale'
  badge: string
  title: string
  desc: string
  cta: string
}

const HREF: Record<PickerCard['key'], string> = {
  start: '/start',
  grow: '/grow',
  scale: '/scale',
}

/**
 * Homepage self-selection "which fits you?" router (PRD: route visitors to the
 * right tier). Each card carries its own `.tier-*` class so the tier color
 * cascades even though the home page isn't inside a tier wrapper.
 */
export function TierPicker() {
  const t = useTranslations('home.pathPicker')
  const cards = (t.raw('cards') as PickerCard[]) ?? []

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-400">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-300">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className={`tier-${card.key}`}
            >
              <Link
                href={HREF[card.key]}
                className="tier-card group flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:tier-glow"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] tier-chip">
                  {card.badge}
                </span>
                <h3 className="mt-6 font-heading text-2xl font-extrabold tier-grad-text">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-300">
                  {card.desc}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold tier-accent-text">
                  {card.cta}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
