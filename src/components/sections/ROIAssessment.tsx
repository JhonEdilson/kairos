"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// ROIAssessment — 4 criterios de calificacion Nate Herk.
// Threshold: 2/4 para mostrar CTA. Sin backend — scoring instantaneo en cliente.
//
// Criterios:
// 1. Repetitivo — pasos deterministicos que se repiten igual
// 2. Alto volumen — +2 horas/semana
// 3. Propenso a error — errores con costo real
// 4. Escalable — crecimiento limitado por el proceso manual
export function ROIAssessment() {
  const t = useTranslations("roi");
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const score = checked.filter(Boolean).length;

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));

  // 3-4 = altamente automatizable | 2 = potencial | 0-1 = no es el momento
  const result =
    score >= 3
      ? { key: "high" as const, color: "#22C55E" }   // verde — "proceed"
      : score === 2
        ? { key: "mid" as const, color: "#EAB308" }
        : { key: "low" as const, color: "var(--fg-muted)" };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] text-balance max-w-4xl mb-16">
          {t("heading")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Criterios */}
          <div className="lg:col-span-7 space-y-4">
            {[1, 2, 3, 4].map((n, i) => (
              <button
                key={n}
                type="button"
                onClick={() => toggle(i)}
                className={`w-full text-left p-6 border transition-all duration-300 flex items-start gap-5 group
                  ${checked[i]
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)]/[0.06]"
                    : "border-[color:var(--border-strong)] hover:border-[color:var(--fg-muted)]/30"
                  }`}
              >
                {/* Checkbox */}
                <div
                  className={`mt-0.5 w-5 h-5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
                    ${checked[i]
                      ? "border-[color:var(--accent)] bg-[color:var(--accent)]"
                      : "border-[color:var(--border-strong)]"
                    }`}
                >
                  {checked[i] && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 4"
                        stroke="var(--bg-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <div>
                  <div className="font-display text-lg md:text-xl font-medium tracking-tight">
                    {t(`criteria.${n}.title`)}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--fg-muted)] leading-relaxed">
                    {t(`criteria.${n}.desc`)}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Resultado */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="border border-[color:var(--border-strong)] p-8 md:p-10">
              {/* Score */}
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className="font-display text-6xl md:text-7xl font-medium tracking-[-0.04em] transition-colors duration-500"
                  style={{ color: result.color }}
                >
                  {score}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                  / 4
                </span>
              </div>

              {/* Mensaje */}
              <p
                className="text-lg font-medium mb-3 transition-colors duration-500"
                style={{ color: result.color }}
              >
                {t(`result.${result.key}.title`)}
              </p>
              <p className="text-sm text-[color:var(--fg-muted)] leading-relaxed mb-8">
                {t(`result.${result.key}.desc`)}
              </p>

              {/* CTA — visible con 2 o mas criterios (threshold Nate Herk) */}
              {score >= 2 && (
                <Button href="/contacto" variant="primary" size="lg">
                  {t("cta")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
