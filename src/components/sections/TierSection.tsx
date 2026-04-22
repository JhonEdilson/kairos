"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { TierDrawer, type TierData } from "@/components/ui/TierDrawer";

export type { TierData };

type Labels = {
  cta: string;
  popular: string;
  footer: string;
  drawerSchedule: string;
  drawerNagi: string;
};

type Props = {
  tiers: TierData[];
  calendlyUrl: string;
  labels: Labels;
};

const Check = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    className="shrink-0 mt-[3px]"
    aria-hidden="true"
  >
    <path
      d="M2 6.5L5 9.5L11 3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function TierSection({ tiers, calendlyUrl, labels }: Props) {
  const [openTier, setOpenTier] = useState<TierData | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:pb-3">
        {tiers.map((tier) => (
          <div
            key={tier.num}
            className={cn(
              "relative flex flex-col rounded-2xl p-8 border transition-all duration-500",
              tier.popular
                ? "border-[color:var(--accent)] md:-translate-y-3 shadow-[0_0_80px_-20px_rgba(217,119,6,0.3)] z-10"
                : "border-[color:var(--border)] hover:border-[color:var(--border-strong)] hover:scale-[1.01]"
            )}
            style={
              tier.popular
                ? {
                    background:
                      "linear-gradient(160deg, rgba(120,53,15,0.18) 0%, rgba(19,33,58,0.95) 50%)",
                  }
                : { background: "var(--bg-secondary)" }
            }
          >
            {/* "Más popular" badge */}
            {tier.popular && (
              <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest bg-[color:var(--accent)] text-[color:var(--fg-primary)] rounded-full">
                  {labels.popular}
                </span>
              </div>
            )}

            {/* Tier number */}
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)] mb-7">
              /{" "}
              {tier.num}
            </p>

            {/* Name + tagline */}
            <h3 className="font-display font-medium text-[2.2rem] leading-[1.0] tracking-[-0.025em] mb-2">
              {tier.name}
            </h3>
            <p className="text-sm text-[color:var(--fg-muted)] mb-7">{tier.tagline}</p>

            {/* Price block */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display font-medium text-4xl tracking-[-0.03em]">
                {tier.price}
              </span>
              <span className="text-xs text-[color:var(--fg-muted)] font-mono">{tier.currency}</span>
            </div>
            <p className="font-mono text-[11px] text-[color:var(--fg-muted)] mb-6">
              {tier.timeline}
            </p>

            {/* Autonomy pill */}
            <div className="mb-7">
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-[11px] font-mono border",
                  tier.popular
                    ? "bg-[color:var(--accent)]/15 text-[color:var(--accent)] border-[color:var(--accent)]/30"
                    : "bg-[color:var(--bg-primary)]/80 text-[color:var(--fg-muted)] border-[color:var(--border)]"
                )}
              >
                {tier.autonomy}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[color:var(--border)] mb-6" />

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-snug text-[color:var(--fg-muted)]"
                >
                  <span className="text-[color:var(--accent)]">
                    <Check />
                  </span>
                  {feat}
                </li>
              ))}
              {tier.ref && (
                <li className="pt-2 font-mono text-[10px] text-[color:var(--accent)]/70 tracking-wide">
                  ★ {tier.ref}
                </li>
              )}
            </ul>

            {/* CTA — opens drawer */}
            <button
              onClick={() => setOpenTier(tier)}
              className={cn(
                "flex items-center justify-center gap-3 w-full py-3.5 text-sm font-medium transition-all duration-300 group",
                tier.popular
                  ? "bg-[color:var(--accent)] text-[color:var(--fg-primary)] hover:bg-[color:var(--accent-hover)]"
                  : "border border-[color:var(--border-strong)] text-[color:var(--fg-primary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              )}
            >
              {labels.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center font-mono text-[11px] text-[color:var(--fg-muted)] mt-10 tracking-wide">
        {labels.footer}
      </p>

      <TierDrawer
        tier={openTier}
        calendlyUrl={calendlyUrl}
        labels={labels}
        onClose={() => setOpenTier(null)}
      />
    </>
  );
}
