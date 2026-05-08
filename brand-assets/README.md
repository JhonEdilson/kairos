# brand-assets — Kairos Studio

Artefactos visuales de identidad. Source of truth para todo lo que use la marca.

> **Tokens vivos:** Los colores y fuentes que ves aquí se derivan de `src/app/globals.css`.
> Si cambias un token, actualiza también este README y regenera el PDF.

---

## Estructura

```
brand-assets/
├── references/          ← Referencias de logos enviadas por Jhon (input para Fase 3)
├── logo/                ← Logo final + variantes (pendiente Fase 3)
│   └── exports/         ← PNG a 1x/2x para uso web
├── icons/               ← Favicon + app icons (pendiente Fase 3)
├── colors/
│   └── palette.svg      ← Swatches de todos los tokens de color
├── typography/
│   └── typography-specimen.svg  ← Specimens de las 3 fuentes
├── moodboard/
│   ├── moodboard-prompt.md  ← Prompts para NanoBanana/Midjourney
│   └── moodboard.png        ← Output AI (ejecutar prompt y guardar aquí)
├── brand-book/
│   ├── brand-book.html      ← Brand guide completo (abre en navegador)
│   ├── brand-book.pdf       ← Render para compartir (ver instrucciones)
│   ├── brand-poster.html    ← Poster 1920×1080
│   └── brand-poster.png     ← Screenshot del poster
└── social-kit/
    └── linkedin-banner.svg  ← Banner LinkedIn 1584×396
```

---

## Cómo abrir el brand book

1. Abrir `brand-book/brand-book.html` en Chrome o Edge
2. Las fuentes cargan desde CDN — necesita conexión a internet la primera vez

## Cómo exportar el brand book a PDF

1. Abrir `brand-book/brand-book.html` en Chrome
2. `Ctrl+P` (Windows) / `Cmd+P` (Mac)
3. Destino: **Guardar como PDF**
4. Papel: **A4** | Márgenes: **Mínimos** | Escala: **100%**
5. Guardar como `brand-book/brand-book.pdf`

## Cómo exportar el poster a PNG

1. Abrir `brand-book/brand-poster.html` en Chrome
2. La página tiene dimensiones exactas 1920×1080
3. Usar DevTools → `Ctrl+Shift+P` → "Capture full size screenshot"
4. O usar la extensión "Full Page Screen Capture"
5. Guardar como `brand-book/brand-poster.png`

## Cómo generar el moodboard visual

1. Abrir `moodboard/moodboard-prompt.md`
2. Copiar el prompt de NanoBanana o Midjourney
3. Ejecutar en la herramienta AI de tu preferencia
4. Guardar resultado como `moodboard/moodboard.png`

---

## Estado actual

| Asset | Estado | Notas |
|---|---|---|
| `colors/palette.svg` | ✅ Listo | Todos los tokens de `globals.css` |
| `typography/typography-specimen.svg` | ✅ Listo | 3 fuentes con specimens |
| `moodboard/moodboard-prompt.md` | ✅ Listo | Ejecutar en NanoBanana |
| `brand-book/brand-book.html` | ✅ Listo | Abrir en Chrome para ver |
| `brand-book/brand-poster.html` | ✅ Listo | Screenshot para PNG |
| `brand-book/brand-book.pdf` | ⏳ Exportar | Ver instrucciones arriba |
| `brand-book/brand-poster.png` | ⏳ Screenshot | Ver instrucciones arriba |
| `moodboard/moodboard.png` | ⏳ Generar | Prompt en `moodboard-prompt.md` |
| `references/` | ⏳ Input | Jhon envía imágenes de logos referencia |
| `logo/` | ⏳ Fase 3 | Depende de referencias + aprobación |
| `icons/favicon.svg` | ⏳ Fase 4 | Depende del logo monograma |
| `icons/apple-touch-icon.png` | ⏳ Fase 4 | Idem |
| `social-kit/linkedin-banner.svg` | ⏳ Pendiente | |

---

## Fixes aplicados en el codebase

- `src/app/opengraph-image.tsx` — colores corregidos a tokens canónicos (era verde esmeralda #10B981)

## Referencias cruzadas

- Moodboard completo: `MOODBOARD.md`
- Tokens de color: `src/app/globals.css:4-13`
- Componentes: `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`
