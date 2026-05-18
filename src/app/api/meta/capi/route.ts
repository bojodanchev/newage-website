import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isCapiEnabled, sendCapiEvent } from '@/lib/tracking/capi'

const capiBodySchema = z.object({
  event_name: z.enum(['Lead', 'Schedule', 'CompleteRegistration', 'Contact']),
  event_id: z.string().min(8),
  event_source_url: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  custom_data: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = capiBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.issues }, { status: 400 })
  }

  if (!isCapiEnabled()) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'capi_not_configured' })
  }

  const data = parsed.data
  const headers = request.headers
  const forwardedFor = headers.get('x-forwarded-for') || ''
  const client_ip_address = forwardedFor.split(',')[0]?.trim() || undefined
  const client_user_agent = headers.get('user-agent') || undefined

  const result = await sendCapiEvent({
    event_name: data.event_name,
    event_id: data.event_id,
    event_source_url: data.event_source_url,
    user_data: {
      email: data.email,
      phone: data.phone,
      client_ip_address,
      client_user_agent,
    },
    custom_data: data.custom_data,
  })

  if (!result.ok && !result.skipped) {
    return NextResponse.json({ ok: false, status: result.status, body: result.body }, { status: 502 })
  }

  return NextResponse.json({ ok: true, skipped: result.skipped ?? false, status: result.status })
}
