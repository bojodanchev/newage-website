'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useExitIntent } from '@/hooks/use-exit-intent'
import { exitIntentSchema, type ExitIntentFormData } from '@/types/forms'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function ExitIntentPopup() {
  const { showPopup, dismiss } = useExitIntent()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExitIntentFormData>({
    resolver: zodResolver(exitIntentSchema),
    defaultValues: { preferredContact: 'email' },
  })

  async function onSubmit(data: ExitIntentFormData) {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        setTimeout(dismiss, 3000)
      }
    } catch {
      // Still dismiss on network error
      setSubmitted(true)
      setTimeout(dismiss, 3000)
    }
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-lg w-full mx-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-white"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {!submitted ? (
              <>
                <span className="mb-4 inline-block rounded-full bg-accent-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-orange">
                  Exclusive Offer
                </span>

                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  Wait! Don&apos;t Leave{' '}
                  <span className="gradient-text">Empty-Handed</span>
                </h2>

                <p className="mb-6 text-neutral-400">
                  Get a free audit and discover how much revenue you&apos;re
                  losing.
                </p>

                <ul className="mb-6 space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <span className="text-accent-mint">&#10003;</span>
                    Comprehensive site analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-mint">&#10003;</span>
                    Actionable recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-mint">&#10003;</span>
                    ROI forecast for your business
                  </li>
                </ul>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <Input
                    label="Name"
                    placeholder="Your name"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@company.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Phone (optional)"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <Select
                    label="Preferred Contact"
                    options={[
                      { value: 'email', label: 'Email' },
                      { value: 'phone', label: 'Phone' },
                      { value: 'whatsapp', label: 'WhatsApp' },
                    ]}
                    {...register('preferredContact')}
                    error={errors.preferredContact?.message}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your Free Audit \u2192'}
                  </Button>
                </form>

                <p className="mt-3 text-center text-xs text-neutral-500">
                  No spam, ever. We&apos;ll only contact you about your audit.
                </p>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mb-4 text-5xl text-accent-mint">&#10003;</div>
                <h3 className="mb-2 text-xl font-bold">We&apos;re On It!</h3>
                <p className="text-neutral-400">
                  Your free audit is being prepared. We&apos;ll be in touch
                  within 24 hours.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
