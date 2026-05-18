/* eslint-disable @typescript-eslint/no-explicit-any */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    dataLayer?: unknown[]
    gtag?: (...args: any[]) => void
  }
}

export function isPixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID)
}

export interface PixelEventPayload {
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
}

export function trackPixelEvent(
  event: 'Lead' | 'Schedule' | 'CompleteRegistration' | 'Contact',
  payload: PixelEventPayload = {},
  eventId?: string
): void {
  if (typeof window === 'undefined') return
  if (!isPixelEnabled()) return
  if (typeof window.fbq !== 'function') return
  const opts = eventId ? { eventID: eventId } : undefined
  if (opts) {
    window.fbq('track', event, payload, opts)
  } else {
    window.fbq('track', event, payload)
  }
}

export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}
