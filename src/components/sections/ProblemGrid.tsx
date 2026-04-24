import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Section";

// ProblemGrid — full viewport (h-screen), 4 tarjetas que llenan el espacio disponible.
// Layout: header compacto → grid 2x2 que crece con flex-1.
// Sin Section wrapper (que agrega py-24) — layout manual para control total del height.
export function ProblemGrid() {
  const t = useTranslations("problem");
  const items = [1, 2, 3, 4] as const;

  return (
    <section className="relative min-h-screen flex flex-col bg-[color:var(--bg-secondary)]">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-16 pb-8 md:pt-24 md:pb-12 shrink-0">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl leading-[1.05]
                       tracking-[-0.03em] text-balance max-w-3xl">
          {t("heading")}
        </h2>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-28 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--border)]">
          {items.map((i) => (
            <div
              key={i}
              className="group relative bg-[color:var(--bg-secondary)] p-6 md:p-8 flex flex-col justify-between
                         hover:bg-[color:var(--bg-primary)] transition-colors duration-500"
            >
              {/* Stat grande */}
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-none tracking-[-0.04em]
                              text-[color:var(--fg-primary)] group-hover:text-[color:var(--accent)]
                              transition-colors duration-500">
                {t(`items.${i}.stat`)}
              </div>

              {/* Texto inferior */}
              <div>
                <h3 className="font-display text-lg md:text-xl font-medium mb-2 tracking-tight">
                  {t(`items.${i}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--fg-muted)] text-pretty">
                  {t(`items.${i}.body`)}
                </p>
              </div>

              {/* Index */}
              <span className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
                0{i} / 04
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
