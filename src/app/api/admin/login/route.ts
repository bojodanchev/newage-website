import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  adminSessionToken,
  getAdminPassword,
} from '@/lib/admin/auth'

const bodySchema = z.object({
  password: z.string().min(1),
  redirectTo: z.string().optional(),
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
    return NextResponse.json({ ok: false, message: 'Missing password.' }, { status: 400 })
  }

  if (parsed.data.password !== getAdminPassword()) {
    // Constant-ish delay to slow brute force on a small endpoint.
    await new Promise((r) => setTimeout(r, 400))
    return NextResponse.json({ ok: false, message: 'Wrong password.' }, { status: 401 })
  }

  const res = NextResponse.json({
    ok: true,
    redirectTo: parsed.data.redirectTo || '/admin',
  })

  res.cookies.set(ADMIN_COOKIE_NAME, adminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  })

  return res
}
