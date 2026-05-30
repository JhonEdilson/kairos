import { Link } from "@/i18n/navigation";

export default function HeroCtaSecondary({ label }: { label: string }) {
  return (
    <Link
      href="/diagnostico"
      className="inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium
                 border border-[color:var(--border-strong)]
                 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                 transition-all duration-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] animate-pulse" />
      {label}
    </Link>
  );
}
