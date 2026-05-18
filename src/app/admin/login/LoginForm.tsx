'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, redirectTo }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.message || 'Login failed.')
        setSubmitting(false)
        return
      }
      router.replace(data.redirectTo || '/admin')
      router.refresh()
    } catch {
      setError('Network error.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 block h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-sm text-foreground focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
        />
      </label>

      {error && (
        <p className="rounded-xl border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-orange">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-primary transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
