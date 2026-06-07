/**
 * Lead-notification email via Resend's REST API (no SDK dependency).
 *
 * Graceful by design — mirrors the Turso "works even if env is missing"
 * convention. If RESEND_API_KEY is absent the call is a no-op (logged), so
 * lead capture never fails just because email isn't configured yet.
 *
 * Env vars:
 *   RESEND_API_KEY   — required to actually send (get one at resend.com)
 *   LEAD_FROM_EMAIL  — verified sender, e.g. "New Age <leads@newagecontent.com>"
 *   LEAD_NOTIFY_TO   — comma-separated recipients; defaults to both inboxes
 */

const DEFAULT_RECIPIENTS = ['hello@newagecontent.com', 'bojodanchev@gmail.com']
const DEFAULT_FROM = 'New Age Leads <leads@newagecontent.com>'

export interface LeadNotification {
  /** Funnel / tier the lead came from (start | grow | scale | banking | …) */
  source: string
  /** Human label shown in the subject, e.g. "Beginner · /start" */
  tierLabel?: string
  name: string
  email?: string | null
  phone?: string | null
  /** Prospect's suggested time for a call/meeting */
  preferredTime?: string | null
  /** Tier-specific fields (business type, budget, challenge, …) */
  details?: Record<string, string | null | undefined>
  locale?: string
  sourceUrl?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#8B8BA3;font:600 12px/1.5 -apple-system,Segoe UI,sans-serif;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#F0F0F5;font:400 14px/1.5 -apple-system,Segoe UI,sans-serif;">${escapeHtml(value)}</td>
  </tr>`
}

/**
 * Send a lead-notification email. Returns true if Resend accepted it, false if
 * skipped (no key) or failed. Never throws — callers can fire-and-forget.
 */
export async function sendLeadNotification(lead: LeadNotification): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping notification for ${lead.source} lead "${lead.name}".`
    )
    return false
  }

  const from = process.env.LEAD_FROM_EMAIL || DEFAULT_FROM
  const to = (process.env.LEAD_NOTIFY_TO || DEFAULT_RECIPIENTS.join(','))
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const label = lead.tierLabel || lead.source
  const subject = `🟢 New ${label} lead — ${lead.name}`

  const detailRows = Object.entries(lead.details ?? {})
    .map(([k, v]) => row(k, v ?? undefined))
    .join('')

  const html = `<!doctype html>
<html><body style="margin:0;background:#0A0A0A;padding:24px;">
  <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#121218;border:1px solid #2D2D44;border-radius:16px;overflow:hidden;">
    <tr><td style="padding:22px 24px;background:linear-gradient(120deg,#6C3AFF,#00E5A0);">
      <div style="font:700 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.85);">New Age — Lead</div>
      <div style="margin-top:8px;font:800 20px/1.2 -apple-system,Segoe UI,sans-serif;color:#fff;">${escapeHtml(label)}</div>
    </td></tr>
    <tr><td style="padding:22px 24px;">
      <table role="presentation" width="100%">
        ${row('Name', lead.name)}
        ${row('Phone', lead.phone)}
        ${row('Email', lead.email)}
        ${row('Best time to talk', lead.preferredTime)}
        ${detailRows}
        ${row('Language', lead.locale)}
        ${row('From page', lead.sourceUrl)}
      </table>
      ${
        lead.phone
          ? `<a href="tel:${escapeHtml(lead.phone)}" style="display:inline-block;margin-top:18px;padding:12px 22px;background:#00E5A0;color:#04130A;font:700 14px/1 -apple-system,Segoe UI,sans-serif;text-decoration:none;border-radius:999px;">Call ${escapeHtml(lead.name.split(' ')[0])}</a>`
          : ''
      }
    </td></tr>
    <tr><td style="padding:14px 24px;border-top:1px solid #2D2D44;font:400 12px/1.5 -apple-system,Segoe UI,sans-serif;color:#8B8BA3;">
      Reply soon — speed-to-lead is the single biggest conversion lever.
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        reply_to: lead.email || undefined,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[email] Resend rejected (${res.status}): ${text}`)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] Resend request failed:', err)
    return false
  }
}
