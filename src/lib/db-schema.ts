import { getDb } from './db'

let initialized = false

/**
 * Known lead sources. Validation happens at the application layer (Zod +
 * isValidLeadSource) rather than via a DB CHECK constraint — that keeps adding
 * new funnels (the 3-tier system, future campaigns) a code-only change with no
 * fragile table migration each time.
 */
const ALLOWED_SOURCES = [
  'popup',
  'contact',
  'newsletter',
  'meta-ads',
  'banking',
  'start',
  'grow',
  'scale',
] as const

const CREATE_LEADS_SQL = `
  CREATE TABLE IF NOT EXISTS leads (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT,
    email           TEXT NOT NULL,
    phone           TEXT,
    source          TEXT NOT NULL,
    preferred_contact TEXT,
    extra           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
  )
`

export async function ensureLeadsTable(): Promise<void> {
  if (initialized) return

  const db = getDb()
  if (!db) return

  await db.execute(CREATE_LEADS_SQL)

  // If a previously-created table still carries the old CHECK(source IN (...))
  // constraint, rebuild it without one so new sources (banking, start, grow,
  // scale, …) insert cleanly. SQLite can't drop a constraint in place.
  const inspect = await db.execute({
    sql: "SELECT sql FROM sqlite_master WHERE type='table' AND name='leads'",
    args: [],
  })

  const existingSql = String((inspect.rows[0]?.sql as string | undefined) ?? '')
  const hasCheckConstraint = /CHECK\s*\(\s*source/i.test(existingSql)

  if (hasCheckConstraint) {
    // Run as a single atomic batch. libsql's HTTP client auto-commits each
    // execute() independently, so cross-statement BEGIN/COMMIT does NOT work —
    // batch(..., 'write') wraps these in one transaction (auto-rollback on
    // error). leads has no foreign keys, so no PRAGMA dance is needed.
    try {
      await db.batch(
        [
          'ALTER TABLE leads RENAME TO leads_legacy_pre_unconstrained',
          `CREATE TABLE leads (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            name            TEXT,
            email           TEXT NOT NULL,
            phone           TEXT,
            source          TEXT NOT NULL,
            preferred_contact TEXT,
            extra           TEXT,
            created_at      TEXT NOT NULL DEFAULT (datetime('now'))
          )`,
          'INSERT INTO leads (id, name, email, phone, source, preferred_contact, extra, created_at) SELECT id, name, email, phone, source, preferred_contact, extra, created_at FROM leads_legacy_pre_unconstrained',
          'DROP TABLE leads_legacy_pre_unconstrained',
        ],
        'write'
      )
      console.info('[leads migration] dropped CHECK(source) constraint')
    } catch (err) {
      // Never throw — a failed migration must not block lead capture. The
      // per-request INSERT has its own try/catch, so worst case a non-listed
      // source fails its own insert loudly instead of silently losing a lead.
      console.error('[leads migration] failed (continuing):', err)
      return
    }
  }

  initialized = true
}

export function isValidLeadSource(source: string): source is (typeof ALLOWED_SOURCES)[number] {
  return (ALLOWED_SOURCES as readonly string[]).includes(source)
}
