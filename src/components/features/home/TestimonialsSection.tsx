'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerChildren } from '@/components/animation/StaggerChildren'
import { fadeUp } from '@/lib/animations'

const accentColors = ['text-accent-purple/10', 'text-accent-mint/10', 'text-accent-orange/10'] as const
const testimonialKeys = ['sarahChen', 'marcusTorres', 'elenaVoss'] as const
const testimonialMeta = [
  { initial: 'S', color: 'bg-accent-purple', rating: 5 },
  { initial: 'M', color: 'bg-accent-mint', rating: 5 },
  { initial: 'E', color: 'bg-accent-orange', rating: 5 },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-accent-orange"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const t = useTranslations('home')

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-purple mb-4">
            {t('testimonials.overline')}
          </p>
          <h2 className="font-heading text-4xl md:text-h2 font-bold">
            {t('testimonials.title')} <span className="gradient-text">{t('testimonials.titleHighlight')}</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialKeys.map((key, i) => (
            <motion.div key={key} variants={fadeUp}>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 h-full overflow-hidden">
                <span className={`absolute top-2 left-4 font-heading text-6xl ${accentColors[i % accentColors.length]} pointer-events-none select-none leading-none`}>
                  &ldquo;
                </span>
                <StarRating count={testimonialMeta[i].rating} />
                <blockquote className="text-lg text-neutral-300 leading-relaxed mb-6">
                  &ldquo;{t(`testimonials.items.${key}.quote`)}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${testimonialMeta[i].color} flex items-center justify-center text-sm font-bold text-white`}
                  >
                    {testimonialMeta[i].initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t(`testimonials.items.${key}.name`)}</p>
                    <p className="text-neutral-500 text-xs">
                      {t(`testimonials.items.${key}.title`)}, {t(`testimonials.items.${key}.company`)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
