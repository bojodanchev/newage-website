'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { newEventId, trackPixelEvent } from '@/lib/tracking/pixel'
import { trackGa4Event } from '@/lib/tracking/ga4'

const ease = [0.16, 1, 0.3, 1] as const

const POPUP_PARAMS = {
  hide_gdpr_banner: '1',
  hide_landing_page_details: '1',
  primary_color: '6C3AFF',
  text_color: 'F0F0F5',
  background_color: '0A0A0A',
}

interface CalendlyEventPayload {
  event?: string
  payload?: {
    invitee?: { email?: string; name?: string }
    event?: { uri?: string }
  }
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

function isCalendlyMessage(ev: MessageEvent): ev is MessageEvent<CalendlyEventPayload> {
  return (
    typeof ev.data === 'object' &&
    ev.data !== null &&
    'event' in ev.data &&
    typeof (ev.data as CalendlyEventPayload).event === 'string' &&
    (ev.data as CalendlyEventPayload).event!.startsWith('calendly.')
  )
}

function buildPopupUrl(baseUrl: string): string {
  try {
    const url = new URL(baseUrl)
    for (const [key, value] of Object.entries(POPUP_PARAMS)) {
      url.searchParams.set(key, value)
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}

export function MetaAdsBookingSection() {
  const t = useTranslations('meta-ads.booking')
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL
  const popupUrl = calendlyUrl ? buildPopupUrl(calendlyUrl) : ''
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!calendlyUrl) return

    function handleMessage(ev: MessageEvent) {
      if (!isCalendlyMessage(ev)) return
      const data = ev.data
      if (data.event === 'calendly.event_scheduled') {
        const eventId = newEventId()
        const inviteeEmail = data.payload?.invitee?.email
        const inviteeName = data.payload?.invitee?.name

        trackPixelEvent('Schedule', { content_name: 'meta-ads-funnel-call' }, eventId)
        trackGa4Event('schedule', {
          event_category: 'meta-ads-funnel',
          event_label: 'booking_scheduled',
          value: 1,
        })

        fetch('/api/meta/capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            event_name: 'Schedule',
            event_id: eventId,
            event_source_url: window.location.href,
            email: inviteeEmail,
            custom_data: { content_name: 'meta-ads-funnel-call' },
          }),
        }).catch(() => {})

        if (inviteeEmail) {
          fetch('/api/leads/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: inviteeEmail,
              name: inviteeName,
              event_id: eventId,
              calendly_event_uri: data.payload?.event?.uri,
            }),
          }).catch(() => {})
        }

        window.dispatchEvent(
          new CustomEvent('meta-ads:booking-scheduled', {
            detail: { email: inviteeEmail, eventId },
          })
        )
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [calendlyUrl])

  function openPopup() {
    if (!popupUrl) return
    if (typeof window === 'undefined' || !window.Calendly) return
    window.Calendly.initPopupWidget({ url: popupUrl })
  }

  return (
    <section
      id="booking"
      className="relative overflow-hidden border-t border-foreground/5 px-6 py-24 sm:px-8 lg:py-32 lg:px-16"
    >
      {calendlyUrl && (
        <>
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
            onReady={() => setReady(true)}
            onLoad={() => setReady(true)}
          />
          <link
            rel="stylesheet"
            href="https://assets.calendly.com/assets/external/widget.css"
          />
        </>
      )}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-mint/10 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-accent-purple/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-heading text-3xl font-extrabold leading-tight md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-6 max-w-2xl text-base text-foreground/70 md:text-lg"
        >
          {t('body')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12 grid gap-6 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-14"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-mint">
              30 minutes · zoom · free
            </p>
            <h3 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-3xl">
              {calendlyUrl
                ? 'Pick a time that works — the calendar opens right here.'
                : 'Booking opens once Calendly is connected.'}
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-foreground/70 md:text-base">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-mint" />
                <span>We audit your current funnel and tracking setup.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-mint" />
                <span>You leave with the next high-leverage fix written down.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-mint" />
                <span>No deck. No pitch. Audit you keep — even if we don&apos;t work together.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-stretch justify-center gap-4">
            {calendlyUrl ? (
              <>
                <button
                  type="button"
                  data-testid="calendly-open"
                  onClick={openPopup}
                  disabled={!ready}
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-foreground px-8 text-base font-semibold text-primary transition-transform hover:scale-[1.02] disabled:cursor-progress disabled:opacity-60"
                >
                  <span>Open the booking calendar</span>
                  <span aria-hidden className="text-lg transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
                <a
                  href={popupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  Or open in a new tab
                </a>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                  Calendly opens in a focused dark-themed modal
                </p>
              </>
            ) : (
              <div
                data-testid="calendly-fallback"
                className="flex h-full flex-col items-center justify-center gap-4 px-6 py-10 text-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40">
                  Calendly · setup pending
                </p>
                <p className="max-w-md text-sm text-foreground/70 md:text-base">{t('fallback')}</p>
                <a
                  href="#lead-form"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
                >
                  ↳ Use the form instead
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
