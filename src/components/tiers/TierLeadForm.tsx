'use client'

import { useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { newEventId, trackPixelEvent } from '@/lib/tracking/pixel'
import { trackGa4Event } from '@/lib/tracking/ga4'

type Tier = 'start' | 'grow' | 'scale'
type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FieldDef {
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  autoComplete?: string
  optionsKey?: string
  rows?: number
  full?: boolean
}

const TIER_FIELDS: Record<Tier, FieldDef[]> = {
  start: [
    { name: 'name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'phone', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'businessType', type: 'text', required: true, full: true },
    { name: 'biggestChallenge', type: 'textarea', required: true, rows: 3, full: true },
  ],
  grow: [
    { name: 'company', type: 'text', required: true, autoComplete: 'organization' },
    { name: 'name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', type: 'tel', autoComplete: 'tel' },
    { name: 'monthlyAdBudget', type: 'select', required: true, optionsKey: 'budgetOptions', full: true },
    { name: 'currentSituation', type: 'textarea', required: true, rows: 3, full: true },
  ],
  scale: [
    { name: 'company', type: 'text', required: true, autoComplete: 'organization' },
    { name: 'role', type: 'text', required: true, autoComplete: 'organization-title' },
    { name: 'email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', type: 'tel', autoComplete: 'tel' },
    { name: 'annualRevenue', type: 'select', required: true, optionsKey: 'revenueOptions', full: true },
    { name: 'primaryChallenge', type: 'textarea', required: true, rows: 3, full: true },
  ],
}

export function TierLeadForm({ ns, tier }: { ns: string; tier: Tier }) {
  const t = useTranslations(`${ns}.leadForm`)
  const locale = useLocale()
  const fields = t.raw('fields') as Record<string, string>
  const placeholders = (t.raw('placeholders') as Record<string, string>) ?? {}

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const renderedAt = useRef<number>(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => {
      const v = data.get(k)
      return v == null ? undefined : String(v)
    }

    const payload: Record<string, unknown> = {
      tier,
      name: get('name') || '',
      email: get('email') || '',
      phone: get('phone') || '',
      preferredTime: get('preferredTime') || '',
      businessType: get('businessType'),
      biggestChallenge: get('biggestChallenge'),
      company: get('company'),
      monthlyAdBudget: get('monthlyAdBudget'),
      currentSituation: get('currentSituation'),
      role: get('role'),
      annualRevenue: get('annualRevenue'),
      primaryChallenge: get('primaryChallenge'),
      locale,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      website_url: get('website_url') || '',
      renderedAt: renderedAt.current,
    }

    try {
      const res = await fetch('/api/leads/tier', {
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
      trackPixelEvent('Lead', { content_name: `tier-${tier}` }, eventId)
      trackGa4Event('generate_lead', {
        event_category: `tier-${tier}`,
        event_label: `${tier}_lead`,
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
            event_source_url: payload.sourceUrl,
            email: payload.email || undefined,
            custom_data: { content_name: `tier-${tier}` },
          }),
        })
      } catch {
        // server-side; never block the user on it
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
      <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full text-xl tier-chip">
          ✓
        </div>
        <p className="mt-6 font-heading text-xl font-bold md:text-2xl">{t('success')}</p>
        <p className="mt-3 max-w-sm text-sm text-foreground/60">{t('successSub')}</p>
      </div>
    )
  }

  const defs = TIER_FIELDS[tier]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {defs.map((f) => (
          <div key={f.name} className={f.full ? 'sm:col-span-2' : undefined}>
            {f.type === 'textarea' ? (
              <TextareaField
                name={f.name}
                label={fields[f.name]}
                placeholder={placeholders[f.name]}
                required={f.required}
                rows={f.rows}
              />
            ) : f.type === 'select' ? (
              <SelectField
                name={f.name}
                label={fields[f.name]}
                required={f.required}
                options={(t.raw(f.optionsKey as string) as string[]) ?? []}
              />
            ) : (
              <Field
                name={f.name}
                label={fields[f.name]}
                type={f.type}
                placeholder={placeholders[f.name]}
                required={f.required}
                autoComplete={f.autoComplete}
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <Field
            name="preferredTime"
            label={fields.preferredTime}
            type="text"
            placeholder={placeholders.preferredTime}
          />
        </div>
      </div>

      <p className="text-xs text-foreground/45">{t('consent')}</p>

      {errorMessage && (
        <p className="rounded-xl border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-orange">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-14 w-full items-center justify-center rounded-full px-8 text-base font-bold tier-cta-grad transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}

const labelClass =
  'font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55'
const inputClass =
  'mt-2 block h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-[color:var(--tier-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--tier-ring)]'

interface FieldProps {
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}

function Field({ name, label, type = 'text', required, autoComplete, placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 tier-accent-text">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  )
}

function SelectField({
  name,
  label,
  options,
  required,
}: {
  name: string
  label: string
  options: string[]
  required?: boolean
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 tier-accent-text">*</span>}
      </span>
      <select name={name} required={required} defaultValue="" className={inputClass}>
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

function TextareaField({
  name,
  label,
  rows = 3,
  required,
  placeholder,
}: {
  name: string
  label: string
  rows?: number
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 tier-accent-text">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-[color:var(--tier-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--tier-ring)]"
      />
    </label>
  )
}
