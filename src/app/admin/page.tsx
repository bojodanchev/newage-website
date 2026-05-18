import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAdminAuthenticated } from '@/lib/admin/auth'
import { getDb } from '@/lib/db'
import { ensureLeadsTable } from '@/lib/db-schema'
import { LogoutButton } from './LogoutButton'

interface PageProps {
  searchParams: Promise<{
    source?: string
    q?: string
    page?: string
  }>
}

interface LeadRow {
  id: number
  name: string | null
  email: string
  phone: string | null
  source: string
  preferred_contact: string | null
  extra: string | null
  created_at: string
}

const SOURCES = ['', 'meta-ads', 'contact', 'newsletter', 'popup'] as const
const PAGE_SIZE = 50

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const sp = await searchParams
  const source = sp.source ?? ''
  const q = (sp.q ?? '').trim()
  const page = Math.max(1, Number(sp.page) || 1)
  const offset = (page - 1) * PAGE_SIZE

  let rows: LeadRow[] = []
  let total = 0
  let dbError: string | null = null

  try {
    await ensureLeadsTable()
    const db = getDb()
    if (!db) {
      dbError = 'Turso is not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.'
    } else {
      const where: string[] = []
      const args: (string | number)[] = []
      if (source) {
        where.push('source = ?')
        args.push(source)
      }
      if (q) {
        where.push('(email LIKE ? OR name LIKE ? OR extra LIKE ?)')
        const pattern = `%${q}%`
        args.push(pattern, pattern, pattern)
      }
      const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

      const countRes = await db.execute({
        sql: `SELECT COUNT(*) as c FROM leads ${whereSql}`,
        args,
      })
      total = Number(countRes.rows[0]?.c ?? 0)

      const res = await db.execute({
        sql: `SELECT id, name, email, phone, source, preferred_contact, extra, created_at
              FROM leads
              ${whereSql}
              ORDER BY id DESC
              LIMIT ? OFFSET ?`,
        args: [...args, PAGE_SIZE, offset],
      })
      rows = res.rows.map((r) => ({
        id: Number(r.id),
        name: (r.name as string | null) ?? null,
        email: String(r.email),
        phone: (r.phone as string | null) ?? null,
        source: String(r.source),
        preferred_contact: (r.preferred_contact as string | null) ?? null,
        extra: (r.extra as string | null) ?? null,
        created_at: String(r.created_at),
      }))
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Unknown error.'
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <main className="min-h-screen px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/10 pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/40">
              NewAge · Admin
            </p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">Leads</h1>
            <p className="mt-2 text-sm text-foreground/60">
              {total.toLocaleString()} total · page {page} of {totalPages}
            </p>
          </div>
          <LogoutButton />
        </header>

        {dbError && (
          <div className="mt-6 rounded-2xl border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-orange">
            DB error: {dbError}
          </div>
        )}

        <form className="mt-8 flex flex-wrap items-end gap-4" action="/admin">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              Source
            </span>
            <select
              name="source"
              defaultValue={source}
              className="mt-2 block h-11 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-sm text-foreground focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
            >
              {SOURCES.map((s) => (
                <option key={s || 'all'} value={s} className="bg-primary">
                  {s ? s : 'All sources'}
                </option>
              ))}
            </select>
          </label>

          <label className="block flex-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              Search (email · name · extra)
            </span>
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="bojo@…"
              className="mt-2 block h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent-purple/60 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
            />
          </label>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
          >
            Filter
          </button>

          {(source || q) && (
            <Link
              href="/admin"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 hover:text-foreground"
            >
              clear
            </Link>
          )}
        </form>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-foreground/[0.03] text-left font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !dbError && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-foreground/50">
                    No leads match this filter yet.
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <LeadRowItem key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </div>

        <nav className="mt-8 flex items-center justify-between">
          <PageLink page={page - 1} disabled={page <= 1} source={source} q={q}>
            ← Prev
          </PageLink>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/40">
            page {page} / {totalPages}
          </p>
          <PageLink page={page + 1} disabled={page >= totalPages} source={source} q={q}>
            Next →
          </PageLink>
        </nav>
      </div>
    </main>
  )
}

function LeadRowItem({ row }: { row: LeadRow }) {
  const extraPretty = formatExtra(row.extra)
  const kind = extraPretty.kind
  return (
    <tr className="border-t border-foreground/5 align-top">
      <td className="whitespace-nowrap px-4 py-3 text-foreground/70">
        {formatDate(row.created_at)}
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] ${badgeClass(row.source, kind)}`}>
          {row.source}
          {kind ? `·${kind}` : ''}
        </span>
      </td>
      <td className="px-4 py-3 text-foreground">{row.name || '—'}</td>
      <td className="px-4 py-3 text-foreground">
        <a href={`mailto:${row.email}`} className="hover:underline">
          {row.email}
        </a>
      </td>
      <td className="px-4 py-3 text-foreground/70">{row.phone || '—'}</td>
      <td className="px-4 py-3 text-foreground/70">
        {extraPretty.lines.length > 0 ? (
          <ul className="space-y-1">
            {extraPretty.lines.map(({ k, v }) => (
              <li key={k}>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/40">
                  {k}
                </span>{' '}
                <span>{v}</span>
              </li>
            ))}
          </ul>
        ) : (
          '—'
        )}
      </td>
    </tr>
  )
}

interface ExtraPretty {
  kind: string | null
  lines: { k: string; v: string }[]
}

function formatExtra(raw: string | null): ExtraPretty {
  if (!raw) return { kind: null, lines: [] }
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const kind = typeof parsed.kind === 'string' ? parsed.kind : null
    const lines: { k: string; v: string }[] = []
    for (const [k, v] of Object.entries(parsed)) {
      if (k === 'kind') continue
      if (v === null || v === undefined || v === '') continue
      lines.push({ k, v: typeof v === 'string' ? v : JSON.stringify(v) })
    }
    return { kind, lines }
  } catch {
    return { kind: null, lines: [{ k: 'raw', v: raw }] }
  }
}

function formatDate(raw: string): string {
  const iso = raw.includes('T') ? raw : raw.replace(' ', 'T') + 'Z'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return raw
  return d.toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
}

function badgeClass(source: string, kind: string | null): string {
  if (source === 'meta-ads' && kind === 'booking')
    return 'border-accent-mint/40 bg-accent-mint/10 text-accent-mint'
  if (source === 'meta-ads')
    return 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple'
  if (source === 'popup') return 'border-accent-orange/40 bg-accent-orange/10 text-accent-orange'
  return 'border-foreground/15 bg-foreground/[0.04] text-foreground/70'
}

function PageLink({
  page,
  disabled,
  source,
  q,
  children,
}: {
  page: number
  disabled: boolean
  source: string
  q: string
  children: React.ReactNode
}) {
  if (disabled) {
    return (
      <span className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/10 px-5 text-sm text-foreground/30">
        {children}
      </span>
    )
  }
  const params = new URLSearchParams()
  if (source) params.set('source', source)
  if (q) params.set('q', q)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return (
    <Link
      href={`/admin${qs ? `?${qs}` : ''}`}
      className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/20 px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
    >
      {children}
    </Link>
  )
}
