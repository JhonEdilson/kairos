import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/marquee";
import { CyclingWord } from "@/components/ui/CyclingWord";
import HeroCtaSecondary from "./HeroCtaSecondary";

// Métricas clave para el marquee — datos reales de proyectos Aurora + SURA.
// Los números no cambian por locale, solo el formato de las labels.
const METRICS = [
  { value: "119×", label: "ROI — Aurora" },
  { value: "55h", label: "/ mes ahorradas" },
  { value: "$10M+", label: "en inscripciones" },
  { value: "43 días", label: "de implementación" },
  { value: "98.8%", label: "autonomía — Aurora" },
  { value: "24/7", label: "disponibilidad" },
  { value: "Sistema centralizado", label: "en un solo lugar" },
];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="hero-glow relative min-h-screen flex flex-col justify-between pt-24 pb-0 overflow-hidden">
      {/* ROW 2 — Headline centrado */}
      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col items-center text-center w-full">
          <h1
            className="font-display font-medium leading-[1.0] tracking-[-0.04em]
                       text-[clamp(2rem,5.5vw,6.5rem)]"
          >
            <span className="block">
              <span className="block reveal-1">{t("headlineLine1")}</span>
            </span>
            <span className="block">
              <span className="block reveal-2">{t("headlineLine2")}</span>
            </span>
            <span className="block">
              <span className="block reveal-3">
                <CyclingWord words={t.raw("cyclingWords") as string[]} />{" "}
                <span className="inline-block align-top text-[color:var(--accent)]">·</span>
              </span>
            </span>
          </h1>

          {/* Sub + CTAs */}
          <div className="mt-8 md:mt-10 flex flex-col items-center gap-5 max-w-xl fade-up-2">
            <p className="text-base md:text-lg text-[color:var(--fg-muted)] leading-relaxed text-pretty text-center">
              {t("sub")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 fade-up-3">
              <Button href="/contacto" variant="primary" size="md">
                {t("ctaPrimary")}
              </Button>
              <HeroCtaSecondary label={t("ctaSecondary")} />
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3 — Métricas en marquee */}
      <div className="w-full hairline-t py-4 bg-[color:var(--bg-primary)]/60 backdrop-blur-sm">
        <Marquee pauseOnHover repeat={3} className="[--duration:30s] [--gap:3rem]">
          {METRICS.map((m) => (
            <MetricChip key={m.value + m.label} value={m.value} label={m.label} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 px-4 shrink-0">
      <span className="font-display font-medium text-xl md:text-2xl tracking-[-0.03em] text-[color:var(--fg-primary)]">
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-muted)] whitespace-nowrap">
        {label}
      </span>
      <span className="ml-4 text-[color:var(--accent)]/40 text-xl select-none">·</span>
    </div>
  );
}


