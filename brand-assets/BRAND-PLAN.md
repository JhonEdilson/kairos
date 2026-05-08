# Kairos Studio — Brand Assets Plan
_Última actualización: 2026-05-07_

> Plan de trabajo para crear y wiring de la identidad visual.
> Referenciado desde `session-summary.md`.

---

## Estado por fase

| Fase | Descripción | Estado |
|---|---|---|
| 1 | Foundation (estructura + tokens + OG fix) | ✅ Completa |
| 2 | Referencias de logo (recibir + analizar) | ✅ Completa |
| 3 | Logo SVG — exploración y selección | ✅ Completa |
| 3.5 | Wordmark cascade ("studio" → drop del lockup) | ✅ Completa |
| 4 | Favicon + app icons | ✅ Completa |
| 5 | Moodboard visual (AI-generated image) | ⏳ Requiere NanoBanana (manual) |
| 6 | Brand Guidelines HTML (AIS-style) | ✅ Completa |
| 7 | Social kit (LinkedIn banner) | ✅ Completa |
| 8 | Wire-up final + MOODBOARD.md checklist | ✅ Completa |

---

## Fase 1 — Foundation ✅

**Completado:**
- `brand-assets/` estructura completa (8 subcarpetas)
- `brand-assets/colors/palette.svg` — 7 tokens de color
- `brand-assets/typography/typography-specimen.svg` — 3 fuentes con alphabets
- `brand-assets/brand-book/brand-book.html` — brand guide 9 secciones (standalone, printable a PDF)
- `brand-assets/brand-book/brand-guidelines.html` — AIS-style portrait reference sheet
- `brand-assets/moodboard/moodboard-prompt.md` — prompts para NanoBanana/Midjourney
- `brand-assets/README.md` — índice + instrucciones export
- **Fix:** `src/app/opengraph-image.tsx` — colores corregidos (#10B981 esmeralda → #D97706 burnt orange)
- **Actualizado:** `MOODBOARD.md` §9 Brand Assets + checklist
- **Actualizado:** `AGENTS.md` — nota brand identity para agentes futuros

---

## Fase 2 — Referencias ✅

**Referencias recibidas en `brand-assets/references/`:**
- `anthropic-logo-1.png` — AI monogram, negro sobre cream
- `anthropic-references.png` — Anthropic ecosystem
- `logos-1.png` — Logo Alphabet Dmitry Lepisov (30+ letterforms)
- `logos-2.png` — Amplemarket (wordmark + mark)
- `logos-3.png` — AI Project Logo Marks Jord Riekwel (18 AI consultancy marks)

**Decisiones capturadas:**
- Logo: K monogram geométrico (Anthropic-style)
- Lockup: wordmark **"Kairos"** (sin "studio" en el lockup visual)
- El brand name sigue siendo "Kairos Studio" en metadata/copy
- Método: SVG escrito por Claude + prompts AI en paralelo
- Inspiración principal: Anthropic "AI", Amplemarket

---

## Fase 3 — Logo SVG 🔄 EN PROGRESO

**Explorations creadas en `brand-assets/logo/explorations/`:**
- `kairos-K-A1-geometric.svg` — K pura Anthropic-style
- `kairos-K-A2-stencil.svg` — K con gaps industriales
- `kairos-K-B1-arrow.svg` — K con arrow tip
- `kairos-K-B2-italic.svg` — K italic 8° lean
- `index.html` — comparación grid (dark/light/lockup/scale)
- `prompts.md` — prompts NanoBanana (3 variantes)

**Dirección elegida:** K geométrica stencil (image #3 de NanoBanana)
- Fuente: `brand-assets/logo/kairos-logo.png` (original AI-generated)
- SVG reconstruido: `brand-assets/logo/kairos-logo.svg` (493 bytes, 3 shapes)
- Script de conversión: `scripts/png-to-svg.mjs`

**Estructura del SVG actual (v5):**
```svg
<!-- 3 elementos: stem + brazo superior + brazo inferior -->
<rect x="0" y="0" width="120" height="620"/>          <!-- Stem -->
<polygon points="120,310 240,310 500,0 380,0"/>        <!-- Upper arm "/" — BL conectado, TL flotando -->
<polygon points="130,355 250,355 500,620 380,620"/>    <!-- Lower arm "\" — 10px notch, después del gap -->
```

**Pendiente Fase 3:**
- [ ] Aprobar geometría final del SVG (usuario validando en preview.html)
- [ ] Una vez aprobado: derivar variantes
  - `kairos-monogram.svg` (símbolo aislado)
  - `kairos-monogram-knockout.svg` (sobre fondo claro)
  - `kairos-wordmark.svg` (solo tipografía "Kairos")
  - `kairos-logo-horizontal.svg` (K + "Kairos" lateral) — master
  - `kairos-logo-stacked.svg` (K encima, "Kairos" debajo)
  - `kairos-logo-mono.svg` (single tint, sin acento naranja)
  - Exports PNG en `brand-assets/logo/exports/` (1x, 2x, 512px)

---

## Fase 3.5 — Wordmark Cascade ⏳

Remover "studio" del lockup visual. Cambios necesarios:

| Archivo | Cambio | Estado |
|---|---|---|
| `src/components/layout/Nav.tsx:18-26` | `Kairos · studio` → `[K] Kairos` component | ⏳ |
| `brand-assets/brand-book/brand-guidelines.html` | Actualizar wordmarks | ⏳ |
| `brand-assets/brand-book/brand-book.html` | Cover + footer | ⏳ |
| `brand-assets/colors/palette.svg` | Header "KAIROS STUDIO" | ⏳ |
| `brand-assets/typography/typography-specimen.svg` | Header | ⏳ |

**MANTENER "Kairos Studio" en:** `src/app/layout.tsx` (title), `opengraph-image.tsx`, `MOODBOARD.md`, copy/footer del sitio.

---

## Fase 4 — Iconografía web ⏳

Depende de: Fase 3 aprobada (necesita monograma final)

- `brand-assets/icons/favicon.svg` (SVG moderno)
- `brand-assets/icons/favicon-16.png`, `favicon-32.png`
- `brand-assets/icons/apple-touch-icon.png` (180×180)
- `brand-assets/icons/icon-192.png`, `icon-512.png`
- Copiar a `public/`
- Actualizar `src/app/layout.tsx` metadata de iconos

---

## Fase 5 — Moodboard visual ⏳

Prompts disponibles en `brand-assets/moodboard/moodboard-prompt.md`.
- Ejecutar Prompt 1 (brand guidelines sheet) en NanoBanana
- Guardar resultado en `brand-assets/moodboard/brand-guidelines-ai.png`

---

## Fase 7 — Social kit ⏳

- `brand-assets/social-kit/linkedin-banner.svg` (1584×396)
- Depende de: logo final aprobado

---

## Fase 8 — Wire-up final ⏳

- `MOODBOARD.md §8` checklist — marcar completados
- `AGENTS.md` — actualizar con instrucciones del brand book final
- `src/components/layout/Nav.tsx` — component `<KairosLogo />` que importa el SVG

---

## Archivos clave

```
brand-assets/
├── README.md                        ← índice navegable
├── references/                      ← PNGs originales de referencias
├── logo/
│   ├── kairos-logo.png              ← fuente AI (NanoBanana output)
│   ├── kairos-logo.svg              ← SVG reconstruido (editable)
│   ├── preview.html                 ← comparación live vs PNG
│   └── explorations/                ← 4 variantes + comparación
├── brand-book/
│   ├── brand-book.html              ← brand guide 9 secciones
│   └── brand-guidelines.html        ← AIS-style portrait reference
├── colors/palette.svg
├── typography/typography-specimen.svg
└── moodboard/moodboard-prompt.md

src/app/opengraph-image.tsx          ← ✅ colores ya corregidos
```
