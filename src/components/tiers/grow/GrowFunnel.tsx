'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Layer {
  title: string
  desc: string
}

// Progressive narrowing to visually read as a funnel (top wide → bottom narrow).
const WIDTHS = ['100%', '92%', '84%', '76%', '68%'] as const

/**
 * Intermediate "5-layer funnel" solution section. Reads `grow.funnel`:
 *   eyebrow, title, intro (optional), layers: Array<{ title, desc }>
 * Vertical stack of tier-cards, progressively narrower and centered, numbered 1–5.
 * Carries id="how" so the hero's secondary CTA scrolls here.
 */
export function GrowFunnel() {
  const t = useTranslations('grow.funnel')
  const layers = (t.raw('layers') as Layer[]) ?? []

  return (
    <section id="how" className="section-padding relative scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="max-w-2xl">
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
          {t.has('intro') && (
            <p className="mt-5 text-lg text-foreground/65">{t('intro')}</p>
          )}
        </div>

        <div className="relative mt-14 flex flex-col items-center gap-4">
          {/* vertical spine connecting the layers */}
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent, var(--tier-ring), var(--tier-ring), transparent)',
            }}
            aria-hidden
          />

          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="tier-card relative w-full rounded-2xl p-5 sm:p-6"
              style={{ maxWidth: WIDTHS[i] ?? '68%' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-lg font-extrabold tier-cta-grad tier-glow">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">{layer.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/65">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
