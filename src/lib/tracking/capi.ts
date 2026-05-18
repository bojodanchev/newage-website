import { createHash } from 'node:crypto'

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
export const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || ''
export const META_CAPI_TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE || ''

export function isCapiEnabled(): boolean {
  return Boolean(META_PIXEL_ID && META_CAPI_ACCESS_TOKEN)
}

export function hashUserData(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export interface CapiEvent {
  event_name: 'Lead' | 'Schedule' | 'CompleteRegistration' | 'Contact'
  event_id: string
  event_time?: number
  event_source_url?: string
  action_source?: 'website'
  user_data?: {
    email?: string
    phone?: string
    client_ip_address?: string
    client_user_agent?: string
  }
  custom_data?: Record<string, string | number | boolean>
}

export interface CapiResult {
  ok: boolean
  status: number
  body?: unknown
  skipped?: boolean
}

export async function sendCapiEvent(event: CapiEvent): Promise<CapiResult> {
  if (!isCapiEnabled()) {
    return { ok: true, status: 200, skipped: true }
  }

  const userData: Record<string, string | string[]> = {}
  if (event.user_data?.email) userData.em = [hashUserData(event.user_data.email)]
  if (event.user_data?.phone) userData.ph = [hashUserData(event.user_data.phone)]
  if (event.user_data?.client_ip_address) userData.client_ip_address = event.user_data.client_ip_address
  if (event.user_data?.client_user_agent) userData.client_user_agent = event.user_data.client_user_agent

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.event_name,
        event_time: event.event_time ?? Math.floor(Date.now() / 1000),
        event_id: event.event_id,
        event_source_url: event.event_source_url,
        action_source: event.action_source || 'website',
        user_data: userData,
        custom_data: event.custom_data,
      },
    ],
  }

  if (META_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = META_CAPI_TEST_EVENT_CODE
  }

  const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_ACCESS_TOKEN)}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => undefined)
    return { ok: res.ok, status: res.status, body }
  } catch (err) {
    return { ok: false, status: 0, body: { error: String(err) } }
  }
}
