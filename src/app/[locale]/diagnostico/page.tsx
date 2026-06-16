import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DiagnosticoForm } from "@/components/diagnostico/DiagnosticoForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("diagnostico");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: { index: false, follow: false },
  };
}

export default async function DiagnosticoPage() {
  const t = await getTranslations("diagnostico");

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] pt-32 pb-24 px-6 md:px-10">
      {/* Page header */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--accent)] mb-4">
          {t("badge")}
        </p>
        <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-balance mb-6">
          {t("heading")}{" "}
          <span className="text-[color:var(--accent)]">{t("headingAccent")}</span>
        </h1>
        <p className="text-lg text-[color:var(--fg-muted)] max-w-xl">{t("sub")}</p>

        {/* Includes */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {(["1", "2", "3", "4"] as const).map((n) => (
            <span key={n} className="flex items-center gap-2 text-sm text-[color:var(--fg-muted)]">
              <span className="text-[color:var(--accent)]">✓</span>
              {t(`includes.${n}`)}
            </span>
          ))}
        </div>
      </div>

      {/* Accent line */}
      <div className="max-w-3xl mx-auto mb-12 h-px bg-gradient-to-r from-[color:var(--accent)]/40 via-[color:var(--accent)]/10 to-transparent" />

      {/* Form */}
      <DiagnosticoForm />
    </div>
  );
}
