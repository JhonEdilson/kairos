"use client";

import { useTranslations } from "next-intl";
import type { DiagnosticoReport } from "@/lib/claude-diagnostico";

interface Props {
  report: DiagnosticoReport;
  companyName: string;
  contactName: string;
}

export function ReportView({ report, companyName, contactName }: Props) {
  const t = useTranslations("diagnostico");
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/jhon-vanegas-506/30min";

  const handleBookClick = () => {
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto print-report">
      {/* One-shot warning — hidden when printing */}
      <div className="mb-8 px-4 py-3 border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 text-sm text-[color:var(--accent)] print-hide">
        ⚠ {t("report.oneShot")}
      </div>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--accent)] mb-3">
          {t("report.title")}
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[color:var(--fg-primary)] tracking-tight mb-1">
          {companyName}
        </h2>
        <p className="text-sm text-[color:var(--fg-muted)]">{contactName}</p>
      </div>

      {/* Pain point highlight */}
      <div className="mb-8 p-6 border-l-2 border-[color:var(--accent)] bg-[color:var(--bg-secondary)]">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--accent)] mb-3">
          {t("report.sectionPainPoint")}
        </p>
        <p className="text-lg text-[color:var(--fg-primary)] leading-relaxed font-medium">
          {report.painPoint}
        </p>
      </div>

      {/* Summary */}
      <p className="mb-10 text-[color:var(--fg-muted)] leading-relaxed">{report.summary}</p>

      {/* Processes */}
      <section className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)] mb-4">
          {t("report.sectionProcesses")}
        </p>
        <ul className="space-y-3">
          {report.processes.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-[color:var(--accent)] text-sm flex-shrink-0">✓</span>
              <span className="text-sm text-[color:var(--fg-primary)] leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ROI */}
      <section className="mb-8 p-5 bg-[color:var(--bg-secondary)]">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)] mb-3">
          {t("report.sectionRoi")}
        </p>
        <p className="text-[color:var(--fg-primary)] leading-relaxed">{report.roiEstimate}</p>
      </section>

      {/* Stack */}
      <section className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)] mb-4">
          {t("report.sectionStack")}
        </p>
        <div className="flex flex-wrap gap-2">
          {report.stack.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs border border-[color:var(--accent)]/40 text-[color:var(--accent)] font-mono"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--fg-muted)] mb-4">
          {t("report.sectionSteps")}
        </p>
        <ol className="space-y-3">
          {report.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-xs font-mono text-[color:var(--accent)] flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="text-sm text-[color:var(--fg-primary)] leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Personalized CTA paragraph — visible in print too */}
      {report.ctaMessage && (
        <div className="mb-8 p-6 bg-[color:var(--bg-secondary)] border-l-2 border-[color:var(--accent)]">
          <p className="text-base text-[color:var(--fg-primary)] leading-relaxed">
            {report.ctaMessage}
          </p>
        </div>
      )}

      {/* CTA buttons — hidden when printing */}
      <div className="border-t border-[color:var(--border)] pt-8 print-hide">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleBookClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                       bg-[color:var(--accent)] text-[color:var(--fg-primary)]
                       hover:bg-[color:var(--accent-hover)] transition-colors"
          >
            {t("report.ctaBook")}
            <span aria-hidden>→</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                       border border-[color:var(--border-strong)]
                       hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                       transition-colors"
          >
            {t("report.ctaDownload")}
            <span aria-hidden>↓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
