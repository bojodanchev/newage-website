'use client'

import { FormEvent, useEffect, useState } from 'react'
import type { InfluencerFunnelContent } from '@/data/influencer'

export function InfluencerLeadForm({ content, locale }: { content: InfluencerFunnelContent; locale: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [renderedAt, setRenderedAt] = useState(0)
  const isBrand = content.id === 'brands'

  useEffect(() => setRenderedAt(Date.now()), [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const response = await fetch('/api/leads/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, audienceType: content.id, locale, renderedAt: Number(payload.renderedAt) }),
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border-t border-[#ff725e] py-14">
        <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff725e] text-xl text-black">✓</span>
        <h3 className="font-heading text-3xl font-bold">{content.form.successTitle}</h3>
        <p className="mt-3 max-w-lg text-white/55">{content.form.successText}</p>
      </div>
    )
  }

  const fieldClass = 'min-h-12 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#ff725e]'

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input name="website_url" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
      <label className="sr-only" htmlFor={`${content.id}-name`}>{content.form.fields.name}</label>
      <input id={`${content.id}-name`} name="name" required minLength={2} placeholder={content.form.fields.name} className={fieldClass} />
      <label className="sr-only" htmlFor={`${content.id}-email`}>{content.form.fields.email}</label>
      <input id={`${content.id}-email`} name="email" type="email" required placeholder={content.form.fields.email} className={fieldClass} />
      <label className="sr-only" htmlFor={`${content.id}-phone`}>{content.form.fields.phone}</label>
      <input id={`${content.id}-phone`} name="phone" type="tel" placeholder={content.form.fields.phone} className={fieldClass} />
      {isBrand ? (
        <>
          <label className="sr-only" htmlFor={`${content.id}-company`}>{content.form.fields.company}</label>
          <input id={`${content.id}-company`} name="company" required placeholder={content.form.fields.company} className={fieldClass} />
        </>
      ) : (
        <>
          <label className="sr-only" htmlFor={`${content.id}-audience`}>{content.form.fields.audience}</label>
          <input id={`${content.id}-audience`} name="audienceSize" placeholder={content.form.fields.audience} className={fieldClass} />
        </>
      )}
      <label className="sr-only" htmlFor={`${content.id}-website`}>{content.form.fields.website}</label>
      <input id={`${content.id}-website`} name="website" type="url" placeholder={content.form.fields.website} className={fieldClass} />
      {!isBrand && <><label className="sr-only" htmlFor={`${content.id}-niche`}>{content.form.fields.niche}</label><input id={`${content.id}-niche`} name="niche" placeholder={content.form.fields.niche} className={fieldClass} /></>}
      <label className="sr-only" htmlFor={`${content.id}-goals`}>{content.form.fields.goals}</label>
      <textarea id={`${content.id}-goals`} name="goals" required minLength={12} maxLength={2000} rows={4} placeholder={content.form.fields.goals} className={`${fieldClass} resize-none sm:col-span-2`} />
      <div className="mt-4 flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 items-center gap-7 rounded-full bg-[#ff725e] px-6 py-3.5 font-semibold text-[#160b09] transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60">
          {status === 'sending' ? '…' : content.form.submit}<span aria-hidden="true">→</span>
        </button>
        {status === 'error' && <p role="alert" className="text-sm text-red-300">{locale === 'bg' ? 'Нещо се обърка. Моля, опитайте отново.' : 'Something went wrong. Please try again.'}</p>}
      </div>
    </form>
  )
}
