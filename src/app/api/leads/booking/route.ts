import { NextResponse } from 'next/server'
import { z } from 'zod'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  event_id: z.string().optional(),
  calendly_event_uri: z.string().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.issues },
      { status: 400 }
    )
  }

  const data = parsed.data

  const extra = JSON.stringify({
    kind: 'booking',
    event_id: data.event_id,
    calendly_event_uri: data.calendly_event_uri,
    bookedAt: new Date().toISOString(),
  })

  try {
    await ensureLeadsTable()
    const db = getDb()
    if (db) {
      await db.execute({
        sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact, extra) VALUES (?, ?, ?, ?, ?, ?)',
        args: [data.name || null, data.email, null, 'meta-ads', 'email', extra],
      })
    } else {
      console.warn('[meta-ads booking] Turso not configured — booking accepted but not persisted.')
    }
  } catch (dbError) {
    console.error('[meta-ads booking] db error:', dbError)
  }

  return NextResponse.json({ success: true })
}
