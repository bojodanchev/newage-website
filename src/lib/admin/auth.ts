import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'admin_session'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123'
}

export function adminSessionToken(): string {
  return createHash('sha256').update(`newage-admin:${getAdminPassword()}`).digest('hex')
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const cookie = store.get(ADMIN_COOKIE_NAME)
  return cookie?.value === adminSessionToken()
}
