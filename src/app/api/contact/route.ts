import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/types/forms'
import { ensureLeadsTable } from '@/lib/db-schema'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactFormSchema.parse(body)

    // Phase 2: Send email via Resend, push to CRM
    console.log('Contact form submission:', validated)

    try {
      await ensureLeadsTable()
      const db = getDb()
      if (db) {
        const extra = JSON.stringify({
          serviceCategory: validated.serviceCategory,
          industry: validated.industry,
          companySize: validated.companySize,
          revenueRange: validated.revenueRange,
          timeline: validated.timeline,
          budgetRange: validated.budgetRange,
          projectDescription: validated.projectDescription,
          website: validated.website,
        })
        await db.execute({
          sql: 'INSERT INTO leads (name, email, phone, source, preferred_contact, extra) VALUES (?, ?, ?, ?, ?, ?)',
          args: [validated.name, validated.email, validated.phone || null, 'contact', validated.preferredContact, extra],
        })
      }
    } catch (dbError) {
      console.error('Failed to save contact lead:', dbError)
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 2 hours.",
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
