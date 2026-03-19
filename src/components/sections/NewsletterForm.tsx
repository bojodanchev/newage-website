'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations('common')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg(t('newsletter.errorInvalidEmail'))
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      // TODO: wire to newsletter API
      await new Promise((r) => setTimeout(r, 800))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMsg(t('newsletter.errorGeneric'))
    }
  }

  if (status === 'success') {
    return (
      <p className={cn('text-sm font-medium text-accent-mint', className)}>
        {t('newsletter.success')}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex gap-3', className)}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        placeholder={t('newsletter.placeholder')}
        className={cn(
          'flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm',
          'text-foreground placeholder:text-neutral-500',
          'transition-colors focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple/50',
          status === 'error' && 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'shrink-0 rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-5 py-2.5 text-sm font-medium text-white',
          'transition-all duration-300 hover:scale-[1.02] hover:glow-purple',
          'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'
        )}
      >
        {status === 'loading' ? t('newsletter.sending') : t('newsletter.subscribe')}
      </button>
      {status === 'error' && errorMsg && (
        <p className="absolute mt-12 text-xs text-red-500">{errorMsg}</p>
      )}
    </form>
  )
}
