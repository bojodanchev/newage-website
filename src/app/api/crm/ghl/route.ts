import { NextResponse } from 'next/server'
import { z } from 'zod'
import { forwardToGhl } from '@/lib/crm/ghl'

const bodySchema = z.object({
  event: z.enum(['lead', 'booking_scheduled', 'booking_cancelled']),
  event_id: z.string().min(8),
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  custom: z.record(z.string(), z.unknown()).optional(),
  occurred_at: z.string().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.issues }, { status: 400 })
  }

  const data = parsed.data
  const result = await forwardToGhl({
    event: data.event,
    event_id: data.event_id,
    source: 'meta-ads-funnel',
    email: data.email,
    name: data.name,
    phone: data.phone,
    company: data.company,
    website: data.website || undefined,
    custom: data.custom,
    occurred_at: data.occurred_at,
  })

  if (!result.ok && !result.skipped) {
    return NextResponse.json({ ok: false, status: result.status, body: result.body }, { status: 502 })
  }

  return NextResponse.json({ ok: true, skipped: result.skipped ?? false, status: result.status })
}
