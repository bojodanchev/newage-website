import { NextResponse } from 'next/server'
import { metaAdsLeadSchema } from '@/types/forms'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON.' },
      { status: 400 }
    )
  }

  const parsed = metaAdsLeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.issues },
      { status: 400 }
    )
  }

  const data = parsed.data

  const extra = JSON.stringify({
    company: data.company,
    website: data.website || null,
    monthlyRevenue: data.monthlyRevenue,
    monthlyAdSpend: data.monthlyAdSpend,
    biggestBottleneck: data.biggestBottleneck,
    submittedAt: new Date().toISOString(),
  })

  try {
    await ensureLeadsTable()
    const db = getDb()
    if (db) {
      await db.execute({
        sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact, extra) VALUES (?, ?, ?, ?, ?, ?)',
        args: [data.name, data.email, null, 'meta-ads', 'email', extra],
      })
    } else {
      console.warn('[meta-ads lead] Turso not configured — lead accepted but not persisted.')
    }
  } catch (dbError) {
    console.error('[meta-ads lead] db error:', dbError)
  }

  const eventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `lead_${Date.now()}`

  return NextResponse.json({
    success: true,
    message: 'Audit request received. We will reply within 24 hours.',
    event_id: eventId,
  })
}
