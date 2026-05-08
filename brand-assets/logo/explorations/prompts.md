# Kairos K Monogram — Prompts NanoBanana / Gemini Imagen

> Ejecutar en paralelo con las exploraciones SVG.
> Guardar outputs en `explorations/ai/` con nombre descriptivo.
> Objetivo: generar variantes AI para comparar con los SVG — ver cuál dirección prefiere Jhon.

---

## PROMPT 1 — Dirección A: Geométrico / Anthropic-style

**Para:** NanoBanana (Gemini Imagen) o Midjourney

```
Single letter K logo mark, geometric sans-serif letterform, 
ultra bold weight, flat ends on all strokes, perfectly uniform stroke width,
similar to Anthropic AI logo style but for the letter K,
single color solid black, on clean cream white background (#FAF3E7),
the K is made of 3 simple geometric shapes: one vertical rectangle and two diagonal parallelograms,
no serifs, no decorations, no gradients, no shadows,
clean vector style, professional monogram for AI automation studio,
high contrast, minimal, timeless,
square format 1:1
```

Variantes a pedir (ejecutar 3-4 veces con ligeros ajustes):
- Con `ultra bold` vs `bold` weight
- Con `condensed` vs `normal` proportion
- Con arms meeting at exact center vs slightly above center

Guardar como: `ai/A1-geometric-01.png`, `ai/A1-geometric-02.png`, etc.

---

## PROMPT 2 — Dirección B: Momentum / Movement

**Para:** NanoBanana (Gemini Imagen) o Midjourney

```
Letter K logo mark with subtle forward momentum, 
geometric letterform, bold weight, 
the lower diagonal arm of the K ends in a sharp arrow point pointing right,
creating a built-in directional vector — the K suggests forward movement and automation,
single color cream white on deep navy blue background (#0B0F1A),
clean geometric shapes, no gradients, no textures,
professional logo for AI automation consultancy called "Kairos",
flat vector style, minimal,
square format 1:1
```

Variantes:
- `lower arm as arrow` (como B1)
- `entire K slightly italicized/slanted` (como B2) 
- `K with motion lines or speed streaks` (variante libre)

Guardar como: `ai/B1-arrow-01.png`, `ai/B2-italic-01.png`, `ai/B-free-01.png`, etc.

---

## PROMPT 3 — Variante libre (opcional)

Si quieres explorar más allá de las 2 direcciones:

```
Minimalist K monogram logo for "Kairos Studio" AI automation agency,
geometric construction, single black letterform on cream background,
inspired by: Anthropic, Linear, Vercel logos — that style of tech company symbols,
the K could incorporate a subtle kairos concept (timing, precise moment, Greek symbol),
ultra clean, single color, professional,
NOT: gradients, multiple colors, robots, circuits, bulbs, or tech clichés
```

---

## Instrucciones de ejecución

1. En NanoBanana: pegar el prompt, generar 4 variantes
2. Elegir las mejores 2 de cada dirección
3. Guardar en `explorations/ai/` con nombre descriptivo
4. Abrir `explorations/index.html` y comparar side-by-side con los SVG

**Después:** comunicar cuál SVG + cuál AI output te gusta más (o elementos de cada uno). 
Eso desbloquea la Fase 3.2 (refinement) y la Fase 3.5 (wordmark cascade).
