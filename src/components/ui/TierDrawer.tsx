"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";

export type TierData = {
  num: string;
  name: string;
  tagline: string;
  price: string;
  currency: string;
  timeline: string;
  autonomy: string;
  features: string[];
  popular: boolean;
  comparison: string;
  nagiMessage: string;
  ref: string;
};

type Props = {
  tier: TierData | null;
  calendlyUrl: string;
  labels: { drawerSchedule: string; drawerNagi: string; drawerWhy: string };
  onClose: () => void;
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

export function TierDrawer({ tier, calendlyUrl, labels, onClose }: Props) {
  const open = tier !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — bottom sheet on mobile, right drawer on desktop */}
      <div
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-[color:var(--bg-primary)] border-[color:var(--border-strong)]",
          "transition-transform duration-300 ease-in-out",
          "inset-x-0 bottom-0 h-[85vh] rounded-t-2xl border-t",
          "md:inset-x-auto md:right-0 md:top-0 md:bottom-0 md:h-full md:w-[420px]",
          "md:rounded-none md:border-t-0 md:border-l",
          open
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-x-full md:translate-y-0"
        )}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={tier?.name ?? ""}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden shrink-0 flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[color:var(--border-strong)]" />
        </div>

        {tier && (
          <>
            {/* Scrollable content */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-8 pt-8 pb-4 md:px-10 md:pt-10 flex flex-col gap-6
                         [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]
                         [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
                         [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/[0.1]
                         [&::-webkit-scrollbar-thumb:hover]:bg-white/[0.2]"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)] mb-2">
                    / {tier.num}
                  </p>
                  <h2 className="font-display font-medium text-3xl leading-[1.0] tracking-[-0.025em]">
                    {tier.name}
                  </h2>
                  <p className="text-sm text-[color:var(--fg-muted)] mt-2">{tier.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)] transition-colors mt-1"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Price card */}
              <div className="p-5 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-secondary)]">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-medium text-3xl tracking-[-0.03em]">
                    {tier.price}
                  </span>
                  <span className="text-xs text-[color:var(--fg-muted)] font-mono">
                    {tier.currency}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[color:var(--fg-muted)]">{tier.timeline}</p>
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono border bg-[color:var(--bg-primary)]/80 text-[color:var(--fg-muted)] border-[color:var(--border)]">
                    {tier.autonomy}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
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
              </ul>

              {/* Comparison callout */}
              {tier.comparison && (
                <div className="rounded-xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[0.06] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent)]/70 mb-2.5">
                    {labels.drawerWhy}
                  </p>
                  <p className="text-sm text-[color:var(--fg-muted)] leading-relaxed">
                    {tier.comparison}
                  </p>
                </div>
              )}

              {/* Case reference */}
              {tier.ref && (
                <p className="font-mono text-[10px] text-[color:var(--accent)]/70 tracking-wide pb-2">
                  ★ {tier.ref}
                </p>
              )}
            </div>

            {/* Fixed CTAs — outside scroll area */}
            <div className="shrink-0 px-8 pb-8 pt-5 md:px-10 md:pb-10 border-t border-[color:var(--border)] flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 text-sm font-medium
                           bg-[color:var(--accent)] text-[color:var(--fg-primary)]
                           hover:bg-[color:var(--accent-hover)] transition-all duration-300 group"
              >
                {labels.drawerSchedule}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("nagi:open", { detail: { message: tier.nagiMessage } })
                  );
                  onClose();
                }}
                className="flex items-center justify-center gap-3 w-full py-3.5 text-sm font-medium
                           border border-[color:var(--border-strong)] text-[color:var(--fg-primary)]
                           hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                           transition-all duration-300 group"
              >
                {labels.drawerNagi}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
