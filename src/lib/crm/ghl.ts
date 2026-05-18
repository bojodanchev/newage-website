export const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || ''

export function isGhlEnabled(): boolean {
  return Boolean(GHL_WEBHOOK_URL)
}

export type GhlEventType = 'lead' | 'booking_scheduled' | 'booking_cancelled'

export interface GhlEventPayload {
  event: GhlEventType
  event_id: string
  source: 'meta-ads-funnel'
  email: string
  name?: string
  phone?: string
  company?: string
  website?: string
  custom?: Record<string, unknown>
  occurred_at?: string
}

export interface GhlResult {
  ok: boolean
  status: number
  skipped?: boolean
  body?: unknown
}

export async function forwardToGhl(payload: GhlEventPayload): Promise<GhlResult> {
  if (!isGhlEnabled()) {
    return { ok: true, status: 200, skipped: true }
  }

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        occurred_at: payload.occurred_at ?? new Date().toISOString(),
      }),
    })
    let body: unknown
    try {
      body = await res.json()
    } catch {
      body = undefined
    }
    return { ok: res.ok, status: res.status, body }
  } catch (err) {
    return { ok: false, status: 0, body: { error: String(err) } }
  }
}
