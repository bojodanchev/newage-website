import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin/auth'
import { LoginForm } from './LoginForm'

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  if (await isAdminAuthenticated()) {
    redirect('/admin')
  }
  const sp = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40">
          NewAge · Admin
        </p>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">Sign in</span>
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Enter the admin password to view leads and bookings.
        </p>
        <div className="mt-8">
          <LoginForm redirectTo={sp.next} />
        </div>
      </div>
    </main>
  )
}
