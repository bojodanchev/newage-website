import { NextResponse } from 'next/server'
import { influencerLeadSchema } from '@/types/forms'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'

const sourceByAudience = {
  brands: 'influencer-brands',
  influencers: 'influencer-talent',
  ugc: 'influencer-ugc',
} as const

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = influencerLeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.issues }, { status: 400 })
  }

  const data = parsed.data
  const source = sourceByAudience[data.audienceType]
  const extra = JSON.stringify({
    kind: 'influencer-ecosystem',
    audienceType: data.audienceType,
    company: data.company,
    website: data.website,
    audienceSize: data.audienceSize,
    niche: data.niche,
    goals: data.goals,
    locale: data.locale,
    submittedAt: new Date().toISOString(),
  })

  try {
    await ensureLeadsTable()
    const db = getDb()
    if (db) {
      await db.execute({
        sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact, extra) VALUES (?, ?, ?, ?, ?, ?)',
        args: [data.name, data.email, data.phone || null, source, 'email', extra],
      })
    } else {
      console.warn(`[influencer lead] Turso not configured — ${source} accepted but not persisted.`)
    }
  } catch (error) {
    console.error('[influencer lead] database error:', error)
    return NextResponse.json({ success: false, message: 'Could not save application.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
