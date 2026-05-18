import { getDb } from './db'

let initialized = false

const ALLOWED_SOURCES = ['popup', 'contact', 'newsletter', 'meta-ads'] as const

const CREATE_LEADS_SQL = `
  CREATE TABLE IF NOT EXISTS leads (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT,
    email           TEXT NOT NULL,
    phone           TEXT,
    source          TEXT NOT NULL CHECK(source IN ('popup', 'contact', 'newsletter', 'meta-ads')),
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

  const inspect = await db.execute({
    sql: "SELECT sql FROM sqlite_master WHERE type='table' AND name='leads'",
    args: [],
  })

  const existingSql = String((inspect.rows[0]?.sql as string | undefined) ?? '')
  const hasMetaAds = existingSql.includes("'meta-ads'")

  if (!hasMetaAds) {
    const stmts: string[] = [
      'PRAGMA foreign_keys = OFF',
      'BEGIN TRANSACTION',
      'ALTER TABLE leads RENAME TO leads_legacy_pre_meta_ads',
      `CREATE TABLE leads (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        name            TEXT,
        email           TEXT NOT NULL,
        phone           TEXT,
        source          TEXT NOT NULL CHECK(source IN ('popup', 'contact', 'newsletter', 'meta-ads')),
        preferred_contact TEXT,
        extra           TEXT,
        created_at      TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      'INSERT INTO leads (id, name, email, phone, source, preferred_contact, extra, created_at) SELECT id, name, email, phone, source, preferred_contact, extra, created_at FROM leads_legacy_pre_meta_ads',
      'DROP TABLE leads_legacy_pre_meta_ads',
      'COMMIT',
      'PRAGMA foreign_keys = ON',
    ]
    for (const sql of stmts) {
      try {
        await db.execute(sql)
      } catch (err) {
        console.error('[leads migration] step failed:', sql, err)
        try {
          await db.execute('ROLLBACK')
        } catch {
          // ignore
        }
        throw err
      }
    }
    console.info('[leads migration] widened CHECK(source) to include meta-ads')
  }

  initialized = true
}

export function isValidLeadSource(source: string): source is (typeof ALLOWED_SOURCES)[number] {
  return (ALLOWED_SOURCES as readonly string[]).includes(source)
}
