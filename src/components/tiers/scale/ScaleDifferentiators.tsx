'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface Block {
  title: string
  body: string
  points: string[]
}

/**
 * Two large alternating feature blocks covering the AI-agents layer and the
 * custom-software layer. Reads `scale.differentiators`:
 *   eyebrow (optional), title (optional),
 *   blocks: Array<{ title, body, points: string[] }>
 */
export function ScaleDifferentiators() {
  const t = useTranslations('scale.differentiators')
  const blocks = (t.raw('blocks') as Block[]) ?? []

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {(t.has('eyebrow') || t.has('title')) && (
          <div className="max-w-2xl">
            {t.has('eyebrow') && (
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] tier-accent-text">
                {t('eyebrow')}
              </p>
            )}
            {t.has('title') && (
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease }}
                className="mt-4 font-heading text-3xl font-extrabold leading-tight md:text-5xl"
              >
                {t('title')}
              </motion.h2>
            )}
          </div>
        )}

        <div className="mt-16 space-y-16 md:space-y-24">
          {blocks.map((block, i) => {
            const reversed = i % 2 === 1
            return (
              <div
                key={i}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease }}
                  className={reversed ? 'lg:order-2' : 'lg:order-1'}
                >
                  <p className="font-mono text-xs tier-accent-text">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-extrabold leading-tight md:text-4xl">
                    {block.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                    {block.body}
                  </p>
                </motion.div>

                {/* Points card */}
                <motion.ul
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className={`tier-card grid gap-px overflow-hidden rounded-2xl ${
                    reversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {block.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4 p-5 sm:p-6"
                    >
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] tier-chip"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="text-[15px] leading-relaxed text-foreground/80">
                        {point}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
