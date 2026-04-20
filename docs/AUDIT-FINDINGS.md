# Kairos Studio — Pre-Deploy Audit Findings (Snapshot)

Captured: 2026-04-20. Source: 3 parallel static-analysis passes. Remediation plan: `Auditoria.md`.

## Critical (C)

- **C1** `.mcp.json` contains 4 live credentials (n8n JWT, GitHub PAT, Notion token, Firecrawl key) and was NOT gitignored. Gitignored in Phase 0. Rotation not required (file was never committed or pushed).
- **C2** n8n API JWT, GitHub PAT, Notion token, Firecrawl key present in working tree — same as C1. No external exposure confirmed.

## High (H)

- **H1** `/api/chat` has no rate limit — cost-amplification vector.
- **H2** `/api/chat` has no input validation or size cap.
- **H3** User message passed verbatim as AI Agent prompt text — prompt injection surface.
- **H4** `conversationHistory` accepted from client without verification.
- **H5** LEAD_DATA marker in model output can be induced by user, triggering partner-lead emails.
- **H6** n8n webhook has no shared secret — direct-webhook attack bypasses Next.js entirely.
- **H7** No security HTTP headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- **H8** `loader.mp4` (705 KB) blocks LCP on every page load; sessionStorage guard promised but not implemented.
- **H9** Neue Montreal loaded via render-blocking CSS `@import` from Fontshare CDN; no preconnect.
- **H10** `.env.local` holds live webhook URL + personal phone; not committed but one `git add -A` away.

## Medium (M)

- **M1** RAG content from Supabase trusted blindly — no output validation.
- **M2** Workflow D Code node has placeholder URLs `TU_CALENDLY_URL` / `TU_NUMERO_WA` — verify replaced.
- **M3** `/api/chat` has no CORS header — browser-safe but non-browser clients unrestricted.
- **M4** GSAP + Lenis loaded unconditionally on every page via `LenisProvider`.
- **M5** framer-motion bundled eagerly in 4 places — not lazy-loaded.
- **M6** Calendly iframe has no `loading="lazy"`.
- **M7** `perfil.jpeg` has no `placeholder="blur"`.
- **M8** `images.formats` not set — AVIF disabled.
- **M9** `CursorGlow.tsx:33-34` — comma operator bug breaks lerp.
- **M10** No per-page `generateMetadata`; shared root title/description.
- **M11** No `og:image`, no sitemap, no robots.txt.

## Low (L)

- **L1** Scaffold SVGs (file/globe/next/vercel/window.svg) in public/.
- **L2** Typo in `es.json`: "Edilso" → "Edilson".
- **L3** `frameBorder` deprecated attribute in `contacto/page.tsx`.
- **L4** Hero ctaSecondary button has no onClick/href.
- **L5** Nav is `"use client"` but most of its markup is static — could be split.
- **L6** No ESLint, no tests, no CI.
- **L7** `output.poweredByHeader` not disabled — leaks `X-Powered-By: Next.js`.
- **L8** CONTEXT.md claims middleware was renamed `proxy.ts`; actual file is `src/middleware.ts`. Doc drift.
