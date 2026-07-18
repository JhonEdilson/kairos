# Registro de Nichos y Ofertas — Kairos

> **Síntesis de lectura rápida, no fuente canónica.** Este documento reconstruye el artifact
> "Kairos — Registro de Nichos y Ofertas" (publicado 2026-07-17) directamente desde los archivos
> del repo comercial (`business/ICP-CLIENTE-IDEAL.md` y `business/ofertas/_INDEX.md`, en el repo
> Jarvis). Si algo diverge, ganan esos dos archivos.
>
> Copia gemela en `C:\Dev\Jarvis\business\ofertas\REGISTRO-NICHOS-OFERTAS.md` (registro comercial
> interno). Sirve aquí como referencia de contexto de negocio para quien trabaje en este sitio.

---

## 1. Ficha por nicho

### N-01 — Salud Privada PYME · **PRIMARIO**
Clínicas dentales, centros estéticos, consultorios, centros médicos privados.
- **Dolor:** no-shows (15-25% baseline) + agenda sin atender fuera de horario.
- **Dinero en juego:** $2.5M-$12M COP/mes perdidos con 8-10 no-shows/semana.
- **Urgencia en frío:** mensaje nocturno "diseño de sonrisa" — si responden al día siguiente
  citando problemas de agenda, el ángulo está confirmado.
- **Fit:** 01 (alto), 02 (alto), 06 (si no tiene web o está mala).
- **Pool:** 200-400 perfiles LinkedIn Colombia; REPS registra 12,212+ sedes IPS (CIIU 8622).

### N-02 — Agencias Inmobiliarias · Activo (Gemini Deep Research, 2026-07-17)
Agencias PYME de venta usada y arriendo residencial/comercial.
- **Dolor:** ~70% de leads de portales se pierden sin seguimiento en 72h. No-shows a visitas
  18-25%. 78% de compradores trabaja con la primera inmobiliaria que responde.
- **Urgencia en frío:** "cliente misterioso digital" — clic al WhatsApp de un anuncio pautado;
  mensaje automático genérico o >15 min de respuesta confirma el diagnóstico.
- **Fit:** 02 (alto, crítico), 01 (alto), 04 (sync CRM + reactivación de leads fríos).
- **Pool:** Fedelonjas agremia 10,500+ agentes; mercado $51.2B COP movilizados en 2025 (+31.5%).

### N-03 — Academias / IETDH · Activo, caso propio (Want2Peak)
Academias de idiomas + Instituciones de Educación para el Trabajo (IETDH).
- **Dolor:** atención lenta por WhatsApp, agendamiento manual de clases de prueba/entrevistas,
  seguimiento caótico; en IETDH además cobranza manual (morosidad, deserción por pago).
- **Costo de inacción en $:** por cuantificar — sin cifra validada, no inventar (a diferencia de
  Salud e Inmobiliarias).
- **Urgencia en frío:** Meta Ads Library + reclamos públicos tipo "llevo tres días escribiendo
  al WhatsApp y nadie me responde".
- **Fit:** 02 (alto), 01 (alto), 04 (alto, cobranza/matrícula), 06 (si aplica).
- **Pool:** caso propio Want2Peak + SIET: 4,097 instituciones IETDH, 599,584+ estudiantes.

### N-04 — Agencias boutique (contable/marketing) · Canal de PARTNERSHIP, no outbound directo
No entra al ICP por mercado (falla los 4 criterios Hormozi) — entra como Trojan Horse: ellas
refieren a SUS clientes de nichos 1-3 a cambio de discovery calls/comisión/co-marca.
- **Fit primario:** partnership. **Fit secundario (cliente directo):** 04 back-office, 02 captación.

### N-05 — PropTech / gestoras de propiedad · Prioridad mínima
- **Dolor:** coordinación manual de reservas, respuesta 24/7, seguimiento de leads de arriendo.
- **Urgencia:** baja y explícita — sin gremio ni pico estacional que fuerce prospección.
- **Fit:** 02 (alto), 01 (medio). Pool: 50-100 perfiles.

**Priorización:** 1) Salud → 2) Inmobiliarias → 3) Academias/IETDH → 4) Boutique (partnership,
no compite en prioridad de prospección fría) → 5) PropTech (oportunista).

---

## 2. Escalera de ofertas

```
Discovery (gratis) → 03 Diagnóstico ($150K-$300K) → 01/02/04 Piloto 45 días ($1.5M-$2.5M)
                                                            → 05 Retainer (Básico/Intermedio/Avanzado)
```

Este modelo de piloto por resultado (01/02/04) es distinto al catálogo de 3 tiers de precio fijo
que vende `/servicios` en este sitio (Bot FAQ / Bot Inteligente / Agente Autónomo) — son dos
formas de empaquetar la misma capacidad, una por outcome medido, otra por producto. Ver
`src/messages/es.json` → `services` para el modelo vigente en el sitio.

---

## 3. Modelo de garantías (dos capas)

**Garantía de Entrega (100%)** — universal: "construyo el sistema completo según lo acordado.
Si al final de los 45 días no cumple con las funciones prometidas, o no era lo que tu negocio
necesitaba, te devuelvo el 100% del piloto." (Reflejada en `/servicios` como banda universal.)

**Garantía de Progreso Medido** (no 100% — depende de factores fuera de control), umbral por oferta:
- **Anti-No-Show:** no-show baja ≥30% relativo desde línea base.
- **Captación 24/7:** 98% de leads respondidos en <60s.
- **Back-Office:** ≥70% del volumen documental automatizado.

(Reflejada en `/servicios` como ejemplos del modo "resultado medido", ver
`GuaranteeSection`/bloque `guarantee` en `page.tsx`.)

---

## 4. Matriz de fit por nicho

| Oferta | Salud | Inmobiliarias | Academias/IETDH | Agencias boutique | PropTech |
|---|---|---|---|---|---|
| Anti-No-Show | Alto | Alto | Alto | Bajo | Medio |
| Captación 24/7 | Alto | Alto (crítico) | Alto | Medio | Alto |
| Diagnóstico | Alto | Alto | Alto | Partnership | Alto |
| Back-Office | Medio | Medio | Alto | Alto | Alto |
| Retainer | Alto | Alto | Alto | Alto | Alto |

Los headlines por nicho de Salud/Inmobiliarias/Academias que viven en `/servicios` (bloque
`industries`) vienen de esta matriz — Anti-No-Show y Captación 24/7 son ancla en los 3 nichos
activos.
