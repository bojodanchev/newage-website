'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleClick() {
    setSubmitting(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={submitting}
      className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/20 px-5 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-60"
    >
      {submitting ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
