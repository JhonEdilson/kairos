import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

// FinalCTA — full viewport (h-screen), centrado vertical y horizontal.
// Background navy-secondary como corte de ritmo. Headline gigante + CTA único.
export function FinalCTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
                        bg-[color:var(--bg-secondary)] px-6 md:px-10 py-32">
      {/* Accent lines top + bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-40" />

      <div className="text-center max-w-5xl mx-auto">
        <h2 className="font-display font-medium text-5xl md:text-7xl lg:text-[clamp(3.5rem,8vw,8rem)]
                       leading-[0.95] tracking-[-0.035em] text-balance">
          {t("heading")}
        </h2>
        <p className="mt-8 text-lg md:text-xl text-[color:var(--fg-muted)] max-w-2xl mx-auto text-balance">
          {t("sub")}
        </p>
        <div className="mt-10">
          <Button href="/contacto" variant="accent" size="xl">
            {t("button")}
          </Button>
        </div>
      </div>

    </section>
  );
}
