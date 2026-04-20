"use client";

export default function HeroCtaSecondary({ label }: { label: string }) {
  const openNagi = () => {
    window.dispatchEvent(
      new CustomEvent("nagi:open", {
        detail: { message: "Quiero un diagnostico con IA de mi proceso" },
      })
    );
  };
  return (
    <button
      type="button"
      onClick={openNagi}
      className="inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium
                 border border-[color:var(--border-strong)]
                 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                 transition-all duration-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] animate-pulse" />
      {label}
    </button>
  );
}
