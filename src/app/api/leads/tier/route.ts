import { NextResponse } from 'next/server'
import { tierLeadSchema } from '@/types/forms'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'
import { sendLeadNotification } from '@/lib/email'

const TIER_LABELS: Record<string, string> = {
  start: 'Beginner · /start',
  grow: 'Intermediate · /grow',
  scale: 'Pro · /scale',
}

/** Tier-specific fields surfaced in the email + admin `extra` blob. */
const TIER_DETAIL_FIELDS: Record<string, Array<[keyof Detail, string]>> = {
  start: [
    ['businessType', 'Business type'],
    ['biggestChallenge', 'Biggest challenge'],
  ],
  grow: [
    ['company', 'Company'],
    ['monthlyAdBudget', 'Monthly ad budget'],
    ['currentSituation', 'Current situation'],
  ],
  scale: [
    ['company', 'Company'],
    ['role', 'Role / title'],
    ['annualRevenue', 'Annual revenue'],
    ['primaryChallenge', 'Primary challenge'],
  ],
}

type Detail = {
  businessType?: string
  biggestChallenge?: string
  company?: string
  monthlyAdBudget?: string
  currentSituation?: string
  role?: string
  annualRevenue?: string
  primaryChallenge?: string
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = tierLeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.issues }, { status: 400 })
  }

  const data = parsed.data
  const tier = data.tier
  const detail = data as Detail

  // Build the tier-specific detail map (only fields that exist for this tier).
  const details: Record<string, string> = {}
  for (const [key, label] of TIER_DETAIL_FIELDS[tier] ?? []) {
    const value = detail[key]
    if (value) details[label] = value
  }

  const extra = JSON.stringify({
    tier,
    preferredTime: data.preferredTime || null,
    ...details,
    locale: data.locale || null,
    sourceUrl: data.sourceUrl || null,
    submittedAt: new Date().toISOString(),
  })

  // 1) Persist (graceful if Turso isn't configured).
  try {
    await ensureLeadsTable()
    const db = getDb()
    if (db) {
      await db.execute({
        sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact, extra) VALUES (?, ?, ?, ?, ?, ?)',
        args: [
          data.name,
          data.email || '',
          data.phone || null,
          tier,
          data.phone ? 'phone' : 'email',
          extra,
        ],
      })
    } else {
      console.warn(`[${tier} lead] Turso not configured — lead accepted but not persisted.`)
    }
  } catch (dbError) {
    console.error(`[${tier} lead] db error:`, dbError)
  }

  // 2) Notify the team (graceful if Resend isn't configured). Awaited so the
  //    serverless function doesn't get frozen before the request completes.
  try {
    await sendLeadNotification({
      source: tier,
      tierLabel: TIER_LABELS[tier],
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      preferredTime: data.preferredTime || null,
      details,
      locale: data.locale,
      sourceUrl: data.sourceUrl,
    })
  } catch (mailError) {
    console.error(`[${tier} lead] email error:`, mailError)
  }

  const eventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `lead_${Date.now()}`

  return NextResponse.json({ success: true, event_id: eventId })
}
