import { NextResponse } from 'next/server'
import { newsletterSchema } from '@/types/forms'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = newsletterSchema.parse(body)

    // Phase 2: Subscribe via Resend/ConvertKit
    console.log('Newsletter subscription:', validated)

    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!',
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
