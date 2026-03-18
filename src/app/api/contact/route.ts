import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/types/forms'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactFormSchema.parse(body)

    // Phase 2: Send email via Resend, push to CRM
    console.log('Contact form submission:', validated)

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
