import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Section";

// Testimonials — 2 tarjetas en grid con hairline border (patrón Process/ProblemGrid).
// Fondo: bg-primary. Paneles: bg-primary → hover:bg-secondary.
// Posición en home: entre ScrollShowcase y Process.
export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative bg-[color:var(--bg-primary)]">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-24 pb-12">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl leading-[1.05]
                       tracking-[-0.03em] text-balance max-w-3xl">
          {t("heading")}
        </h2>
      </div>

      {/* Grid — hairline border igual que Process y ProblemGrid */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border)]">
          {(["0", "1"] as const).map((i, idx) => (
            <div
              key={i}
              className="bg-[color:var(--bg-primary)] p-8 md:p-10 flex flex-col gap-8
                         hover:bg-[color:var(--bg-secondary)] transition-colors duration-500"
            >
              {/* Índice + línea separadora — igual que Process */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  0{idx + 1}
                </span>
                <span className="h-px flex-1 bg-[color:var(--border-strong)]" />
              </div>

              {/* Quote */}
              <p className="font-display text-xl md:text-2xl leading-[1.35] tracking-[-0.02em]
                             text-pretty flex-1">
                &ldquo;{t(`items.${i}.quote`)}&rdquo;
              </p>

              {/* Autor */}
              <div>
                <p className="font-medium text-sm">{t(`items.${i}.name`)}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]
                               text-[color:var(--fg-muted)] mt-1">
                  {t(`items.${i}.role`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
