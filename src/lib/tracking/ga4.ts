export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''

export function isGa4Enabled(): boolean {
  return Boolean(GA4_ID)
}

export interface Ga4EventParams {
  event_category?: string
  event_label?: string
  value?: number
  [key: string]: string | number | boolean | undefined
}

export function trackGa4Event(event: string, params: Ga4EventParams = {}): void {
  if (typeof window === 'undefined') return
  if (!isGa4Enabled()) return
  if (typeof window.gtag !== 'function') {
    console.info('[ga4 stub]', event, params)
    return
  }
  window.gtag('event', event, params)
}
