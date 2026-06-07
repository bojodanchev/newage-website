'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Stat {
  value: string
  label: string
}
interface Testimonial {
  quote: string
  name: string
  role: string
  metric?: string
}

/**
 * Social-proof section. Reads `${ns}.proof`:
 *   eyebrow (optional), title,
 *   stats: Array<{ value, label }> (optional),
 *   testimonials: Array<{ quote, name, role, metric? }> (optional)
 */
export function TierProof({ ns }: { ns: string }) {
  const t = useTranslations(`${ns}.proof`)
  const stats = (t.has('stats') ? (t.raw('stats') as Stat[]) : []) ?? []
  const testimonials =
    (t.has('testimonials') ? (t.raw('testimonials') as Testimonial[]) : []) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {t.has('eyebrow') && (
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text">
            {t('eyebrow')}
          </p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        {stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="tier-card rounded-2xl p-6 text-center"
              >
                <div className="font-heading text-3xl font-extrabold tier-grad-text md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-foreground/55">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="tier-card flex flex-col rounded-2xl p-6"
              >
                <blockquote className="text-[15px] leading-relaxed text-foreground/80">
                  “{tm.quote}”
                </blockquote>
                {tm.metric && (
                  <div className="mt-4 font-heading text-lg font-bold tier-accent-text">
                    {tm.metric}
                  </div>
                )}
                <figcaption className="mt-auto pt-5 text-sm">
                  <span className="font-semibold text-foreground">{tm.name}</span>
                  <span className="block text-foreground/50">{tm.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
