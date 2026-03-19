import { NextResponse } from 'next/server'
import { exitIntentSchema } from '@/types/forms'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = exitIntentSchema.parse(body)

    try {
      await ensureLeadsTable()
      const db = getDb()
      if (db) {
        await db.execute({
          sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact) VALUES (?, ?, ?, ?, ?)',
          args: [validated.name, validated.email, validated.phone || null, 'popup', validated.preferredContact],
        })
      }
    } catch (dbError) {
      console.error('Failed to save popup lead:', dbError)
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! We'll send your free audit within 24 hours.",
    })
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { success: false, errors: (error as Record<string, unknown>).issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
