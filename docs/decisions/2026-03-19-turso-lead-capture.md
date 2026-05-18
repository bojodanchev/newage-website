# Decision: Turso for Lead Capture

**Date**: 2026-03-19
**Status**: accepted

## Context
The New Age site had working contact and newsletter forms that only logged to console. Needed persistent lead storage across all form types (popup, contact, newsletter) without adding heavy infrastructure.

## Decision
Use Turso (libSQL) with a single `leads` table. All 3 form sources write to the same table with a `source` column discriminator. Extra contact form fields stored as JSON in an `extra` column.

## Alternatives Considered
- **Supabase/Postgres**: Heavier, more setup, overkill for a leads table
- **Vercel KV/Blob**: No SQL, harder to query
- **Airtable/Google Sheets API**: Fragile, rate limits, vendor lock-in
- **Resend webhook → email only**: No queryable data

## Consequences
- Simple schema, single table, no ORM overhead
- Graceful degradation: forms work even if DB is down
- `@libsql/client/web` avoids native binary issues on macOS
- Turso free tier is sufficient for lead volume
- Future: can add analytics queries directly against Turso
