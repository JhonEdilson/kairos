# Moodboard & Brand Guidelines — Prompts AI

> Prompts para generar la imagen de brand guidelines de Kairos Studio.
> Referencia de estilo: imagen AIS Brand Guidelines (portrait, dark, 2-col grid).

---

## OPCIÓN A — Brand Guidelines Sheet (RECOMENDADO)

Genera una imagen que parezca un **documento de brand guidelines profesional** de estudio de diseño premium.
Mismo formato que el AIS Brand Guidelines: retrato, fondo oscuro, grid 2 columnas, bullet points, specs técnicas.

### Prompt Midjourney (--ar 2:3)

```
kairos studio brand identity guidelines document, professional design agency brand sheet,
dark navy background #0B0F1A, burnt orange #D97706 accent color, cream #FAF3E7 typography,

two column layout, portrait format, editorial grid,
left column: wordmark specimen "Kairos · studio" in large modern sans-serif, 
logo clearspace diagram with dashed measurement lines, 
typography specimens showing "Ab" in 3 fonts with full alphabet ABCDEFGHIJKLMNOPQRSTUVWXYZ,
right column: logo variations on dark/light/mono backgrounds, 
brand color palette swatches grid with hex codes, 
button style components, minimal UI elements,

section headers with small orange bullet dots, monospace labels uppercase tracking,
film grain texture overlay, hairline borders between sections,
style: basement.studio meets darkroom.engineering, premium dark studio aesthetic,
NOT generic corporate, NOT white background, NOT colorful, NOT busy

--ar 2:3 --style raw --v 6.1 --q 2
```

### Prompt NanoBanana / Gemini Imagen

```
Professional brand identity guidelines reference sheet for "Kairos Studio" automation consultancy.

Dark navy background (#0B0F1A). Burnt orange (#D97706) as the only accent color. Cream text (#FAF3E7).

Document structure: portrait format, 2-column grid layout.
Left column shows: large wordmark "Kairos · studio" typographic specimen, 
clearspace measurement diagram, three font specimens with alphabets 
(PP Neue Montreal display, Inter body, JetBrains Mono code).
Right column shows: logo on dark/light/monochrome backgrounds, 
color palette swatches with hex codes and names, minimal UI components.

Section headers use small orange circle bullet + uppercase monospace label.
All elements have hairline borders. Film grain overlay. Zero white space in background.

Aesthetic reference: high-end independent design studio, cinematic dark, editorial precision.
Output: 1200x1700px portrait, single page document image.
```

### Prompt para Adobe Firefly / DALL-E 3

```
A professional brand guidelines document page for "Kairos Studio". 
Portrait format, dark navy (#0B0F1A) background throughout.
Single burnt orange (#D97706) accent color.
Cream white (#FAF3E7) text.
Two-column layout with typography specimens, color swatches, logo variations.
Monospace labels, hairline borders, editorial grid.
Premium design studio aesthetic. Dark mode. No white backgrounds.
```

---

## OPCIÓN B — Moodboard Visual (collage de referencias)

Para uso interno de inspiración — NO para compartir con clientes.

### Prompt

```
Dark editorial design moodboard collage for "Kairos Studio" automation studio.
References: basement.studio, darkroom.engineering, secretlevel aesthetic.
Navy deep background, burnt orange accent #D97706, cream typography #FAF3E7.
Shows: color swatches, typography specimens, dark website screenshot mockups,
film grain texture, geometric shapes suggesting timing/precision.
16:9 aspect ratio. No white. Premium independent studio mood.
```

---

## Output

Guardar resultado como:
- Brand guidelines sheet → `brand-assets/moodboard/brand-guidelines-ai.png`
- Moodboard collage → `brand-assets/moodboard/moodboard.png`

---

## Referencia local

El HTML del brand guidelines (editable y exportable a PDF/PNG):
`brand-assets/brand-book/brand-guidelines.html`

Para exportar el HTML a PNG:
1. Abrir en Chrome
2. `F12` → `Ctrl+Shift+P` → "Capture full size screenshot"
3. Guardar como `brand-assets/brand-book/brand-guidelines.png`
