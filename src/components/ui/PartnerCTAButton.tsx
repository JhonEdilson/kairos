"use client";

type Props = {
  label: string;
  message: string;
};

export function PartnerCTAButton({ label, message }: Props) {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("nagi:open", { detail: { message } })
        )
      }
      className="inline-flex items-center gap-3 px-7 py-4 text-sm font-medium
                 bg-[color:var(--accent)] text-[color:var(--fg-primary)]
                 hover:bg-[color:var(--accent-hover)]
                 transition-all duration-300 group"
    >
      {label}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}
