# Vercel resource optimization — 2026-09-27

Nested layouts must initialize next-intl with setRequestLocale before rendering translated children. Pass locale explicitly to getMessages. The SSG symbol in next build is insufficient: verify actual prerender-manifest entries. The postbuild check protects the 18 public marketing/legal routes. Before: 15 total prerendered routes; after: 65. Both locales and all 58 localized pages returned 200 in local production checks.
