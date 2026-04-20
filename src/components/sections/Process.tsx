import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/Section";

export function Process() {
  const t = useTranslations("process");
  const steps = [1, 2, 3, 4] as const;

  return (
    <section className="relative flex flex-col bg-[color:var(--bg-primary)]">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-24 pb-12 shrink-0">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl leading-[1.05]
                       tracking-[-0.03em] text-balance max-w-3xl">
          {t("heading")}
        </h2>
      </div>

      {/* Lista vertical de pasos */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-24">
        {steps.map((i) => (
          <div
            key={i}
            className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 py-10 md:py-14 hairline-t"
          >
            {/* Índice */}
            <div className="pt-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                0{i}
              </span>
            </div>

            {/* Contenido */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.02em]">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--fg-muted)] text-pretty max-w-2xl">
                {t(`steps.${i}.body`)}
              </p>
              {i === 4 && (
                <Link
                  href="/servicios#plan-partner"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[10px]
                             uppercase tracking-[0.18em] text-[color:var(--accent)]
                             border border-[color:var(--accent)]/30 px-3 py-1.5
                             hover:bg-[color:var(--accent)]/10 transition-colors"
                >
                  {t("partnerTag")}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
