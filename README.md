# Kairos Studio

> Automatizaciones disparadas en el momento exacto.
> Portfolio personal de Jhon Escobar — consultor de automatizacion.

Primer proyecto del triple-stack de sitios web (portfolio personal → sitios de
clientes con Nano Banana 2 + Firecrawl → sitios con Stitch 2 + 3D). Template
reusable para los dos siguientes.

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** TypeScript, React 19
- **Styling:** Tailwind v4 (config via `@theme` en CSS) + CSS variables
- **i18n:** `next-intl` v4 — bilingue ES/EN con URLs `/es` y `/en`
- **Motion:** Framer Motion + GSAP + Lenis smooth scroll
- **Tipografia:** PP Neue Montreal (Fontshare) display, Inter body, JetBrains Mono stats
- **Contenido:** MDX (para case studies, fase 3)
- **Chatbot:** Next API route → webhook n8n (fase 5)

## Paleta

```css
--bg-primary:    #0B0F1A   /* navy deep — hero */
--bg-secondary:  #13213A   /* navy seccion */
--bg-tertiary:   #1C1C1C   /* charcoal cards */
--fg-primary:    #FAF3E7   /* cream tipografia */
--fg-muted:      #A8B0BD   /* muted text */
--accent:        #D97706   /* burnt orange CTAs */
```

---

## Como correr

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar .env.example a .env.local y completar
cp .env.example .env.local

# 3. Dev server
npm run dev        # http://localhost:3000 → redirige a /es

# 4. Build production
npm run build
npm run start
```

## Variables de entorno (`.env.local`)

| Variable | Uso | Fase |
|---|---|---|
| `N8N_CHAT_WEBHOOK_URL` | Webhook del agente Nagi | 5 |
| `ANTHROPIC_API_KEY` | Fallback LLM directo | 5 |
| `NEXT_PUBLIC_CALENDLY_URL` | Embed en `/contacto` | 2 |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics | 6 |
| `NEXT_PUBLIC_SITE_URL` | Metadata/OG | 1 |

---

## Estructura

```
kairos-studio/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # root wrapper
│   │   ├── [locale]/             # i18n: /es, /en
│   │   │   ├── layout.tsx        # fonts + Lenis + Nav/Footer/Nagi
│   │   │   ├── page.tsx          # home
│   │   │   ├── casos/
│   │   │   │   ├── aurora/page.tsx
│   │   │   │   └── sura/page.tsx
│   │   │   ├── servicios/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contacto/page.tsx
│   │   ├── api/chat/route.ts     # proxy a n8n Nagi
│   │   └── globals.css           # paleta + utilidades + keyframes
│   ├── components/
│   │   ├── layout/               # Nav, Footer, LocaleToggle, LenisProvider
│   │   ├── sections/             # Hero, TrustedBy, ProblemGrid, Showcase, Process, FinalCTA
│   │   ├── ui/                   # Section, Heading, Eyebrow, Button
│   │   └── chat/                 # NagiWidget (placeholder)
│   ├── i18n/
│   │   ├── routing.ts            # locales + defaultLocale
│   │   ├── request.ts            # message loader server-side
│   │   └── navigation.ts         # Link/router tipados por locale
│   ├── messages/
│   │   ├── es.json               # copy ES
│   │   └── en.json               # copy EN
│   ├── lib/
│   │   └── cn.ts                 # utility clsx-lite
│   └── proxy.ts                  # next-intl middleware (Next 16)
├── .env.example
├── next.config.ts                # next-intl plugin + MDX
└── package.json
```

---

## Fases del build

| Fase | Estado | Contenido |
|---|---|---|
| **0 — Pre-build** | ✅ | Paleta, fonts, nombre, chatbot spec |
| **1 — Scaffold** | ✅ | Next.js + i18n + Tailwind + Lenis + layout base |
| **2 — Home + Showcase** | ✅ | Hero animado, TrustedBy, ProblemGrid, Showcase, Process, FinalCTA |
| **3 — Case studies MDX** | ⏳ | Aurora + SURA completos (skeleton actual) |
| **4 — About + Servicios + Contacto** | 🟡 | Skeletons funcionales; falta timeline + Calendly embed real |
| **5 — Chatbot Nagi** | ⏳ | Stack React + `/api/chat` → n8n + Supabase pgvector |
| **6 — Pulido + Deploy** | ⏳ | Analytics, SEO, perf, dominio, Vercel prod |
| **7 — Herramienta ROI** | ⏳ | Seccion interactiva "¿Automatizable?" |

---

## Notas del diseno (cinematic studio dark)

- **Load intro:** headline se revela en 3 clip-path staggered (`reveal-1/2/3` en `globals.css`), sub + CTAs en fade-up diferido. Total ~2s.
- **Smooth scroll:** Lenis con `duration: 1.2` y easing custom — sweet spot del genero.
- **Grain overlay:** noise SVG via `.grain` en body, `mix-blend-mode: overlay` al 4%. Textura sin imagen.
- **Glow radial:** hero tiene `.hero-glow::before` con gradients radiales navy + acento — profundidad sin assets.
- **Hairlines:** borders `rgba(250,243,231, 0.08)` — el detalle que separa el genero del "dark tech generico".
- **Typography:** PP Neue Montreal con `tracking-[-0.04em]` en headlines gigantes. Mono JetBrains para numerales + eyebrows (tabular nums).

Referencias estructurales scraped 2026-04-11: **truehorizon.ai** (blueprint de secciones), **nateherk.com** (hero stat-first personal), **aiautomationsociety.ai** (marquee patterns).

## Plan completo

Ver `portfolio.md` en el repo raiz del proyecto Jarvis para el plan full:
context, decisiones locked, bundle analysis, chatbot spec, y fases detalladas.
