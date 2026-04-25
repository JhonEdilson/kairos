"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DemoDrawer } from "@/components/ui/DemoDrawer";

export type DemoConfig = {
  key: string;
  videoUrl?: string;
  showDrawer?: boolean; // flag explícito para mostrar el botón "Ver demo"
};

type Props = {
  demos: DemoConfig[];
  calendlyUrl: string;
};

export function DemosSection({ demos, calendlyUrl }: Props) {
  const t = useTranslations("trabajo");
  const s = useTranslations("showcase");
  const d = useTranslations("demos");

  const [openKey, setOpenKey] = useState<string | null>(null);

  const openDemo = demos.find((p) => p.key === openKey) ?? null;

  return (
    <>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border)]">
        {demos.map(({ key, videoUrl, showDrawer }) => (
          <div
            key={key}
            className="p-8 md:p-10 flex flex-col justify-between min-h-[420px] bg-[color:var(--bg-secondary)]"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-0.5"
                  style={{
                    color: "var(--fg-muted)",
                    border: "1px solid var(--border-strong)",
                  }}
                >
                  {s("typeDemo")}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
                  {s(`${key}.client`)}
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[0.95] mb-4">
                {s(`${key}.title`)}
              </h2>
              <p className="text-[color:var(--fg-muted)] text-base leading-relaxed max-w-lg">
                {s(`${key}.desc`)}
              </p>
            </div>

            {/* Footer — stats + CTAs */}
            <div className="mt-8">
              <div className="flex gap-6 md:gap-10 hairline-t pt-6 mb-8">
                {([s(`${key}.stats.1`), s(`${key}.stats.2`), s(`${key}.stats.3`)] as string[]).map(
                  (stat, i) => (
                    <div key={i}>
                      <div
                        className="font-display text-xl md:text-2xl font-medium tracking-[-0.02em]"
                        style={{ color: i === 0 ? "var(--accent)" : "var(--fg-primary)" }}
                      >
                        {stat}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Button href="/contacto" variant="ghost" size="sm">
                  {t("demoCta")}
                </Button>
                {showDrawer && (
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => setOpenKey(key)}
                  >
                    {t("verDemo")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer — panel shell siempre en DOM para la animación, contenido solo monta cuando openKey !== null */}
      <DemoDrawer
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        title={openKey ? s(`${openKey}.title`) : ""}
        client={openKey ? s(`${openKey}.client`) : ""}
        videoUrl={openDemo?.videoUrl ?? ""}
        features={openKey ? (d.raw(`${openKey}.features`) as string[]) : []}
        nagiMessage={openKey ? d(`${openKey}.nagiMessage`) : ""}
        calendlyUrl={calendlyUrl}
        labels={{
          schedule: t("demoDrawerSchedule"),
          nagi: t("demoDrawerNagi"),
          videoPlaceholder: t("demoVideoPlaceholder"),
          featuresHeading: t("demoFeaturesHeading"),
        }}
      />
    </>
  );
}
