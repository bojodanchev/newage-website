'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { newEventId, trackPixelEvent } from '@/lib/tracking/pixel'
import { trackGa4Event } from '@/lib/tracking/ga4'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function LeadForm() {
  const t = useTranslations('meta-ads.leadForm')
  const fields = t.raw('fields') as Record<string, string>
  const revenueOptions = t.raw('revenueOptions') as string[]
  const spendOptions = t.raw('spendOptions') as string[]

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const renderedAt = useRef<number>(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      website: String(data.get('website') || ''),
      monthlyRevenue: String(data.get('monthlyRevenue') || ''),
      monthlyAdSpend: String(data.get('monthlyAdSpend') || ''),
      biggestBottleneck: String(data.get('biggestBottleneck') || ''),
      website_url: String(data.get('website_url') || ''),
      renderedAt: renderedAt.current,
    }

    try {
      const res = await fetch('/api/leads/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(t('error'))
        return
      }

      const eventId = newEventId()
      trackPixelEvent('Lead', { content_name: 'meta-ads-funnel-audit' }, eventId)
      trackGa4Event('generate_lead', {
        event_category: 'meta-ads-funnel',
        event_label: 'audit_request',
        value: 1,
      })

      try {
        await fetch('/api/meta/capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            event_name: 'Lead',
            event_id: eventId,
            event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
            email: payload.email,
            custom_data: { content_name: 'meta-ads-funnel-audit' },
          }),
        })
      } catch {
        // CAPI is server-side; client doesn't block on it.
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('meta-ads:lead-submitted', {
            detail: { email: payload.email, eventId },
          })
        )
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage(t('error'))
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-mint/40 bg-accent-mint/10 text-accent-mint">
          ✓
        </div>
        <p className="mt-6 font-heading text-xl font-bold md:text-2xl">{t('success')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={fields.name} required type="text" autoComplete="name" />
        <Field
          name="email"
          label={fields.email}
          required
          type="email"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="company" label={fields.company} required type="text" autoComplete="organization" />
        <Field name="website" label={fields.website} type="url" autoComplete="url" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="monthlyRevenue" label={fields.monthlyRevenue} options={revenueOptions} required />
        <SelectField name="monthlyAdSpend" label={fields.monthlyAdSpend} options={spendOptions} required />
      </div>

      <TextareaField name="biggestBottleneck" label={fields.biggestBottleneck} required rows={3} />

      <p className="text-xs text-foreground/50">{t('consent')}</p>

      {errorMessage && (
        <p className="rounded-xl border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-orange">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-primary transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}

interface FieldProps {
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
}

function Field({ name, label, type = 'text', required, autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
        {required && <span className="ml-1 text-accent-orange">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 block h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
      />
    </label>
  )
}

interface SelectFieldProps {
  name: string
  label: string
  options: string[]
  required?: boolean
}

function SelectField({ name, label, options, required }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
        {required && <span className="ml-1 text-accent-orange">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 block h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-sm text-foreground focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-primary text-foreground">
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

interface TextareaFieldProps {
  name: string
  label: string
  rows?: number
  required?: boolean
}

function TextareaField({ name, label, rows = 3, required }: TextareaFieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
        {label}
        {required && <span className="ml-1 text-accent-orange">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="mt-2 block w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
      />
    </label>
  )
}
