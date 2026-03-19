import { getDb } from './db'

let initialized = false

export async function ensureLeadsTable(): Promise<void> {
  if (initialized) return

  const db = getDb()
  if (!db) return

  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT,
      email           TEXT NOT NULL,
      phone           TEXT,
      source          TEXT NOT NULL CHECK(source IN ('popup', 'contact', 'newsletter')),
      preferred_contact TEXT,
      extra           TEXT,
      created_at      TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  initialized = true
}
