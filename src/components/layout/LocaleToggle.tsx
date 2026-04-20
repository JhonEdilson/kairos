"use client";

import { usePathname } from "@/i18n/navigation";

// Toggle ES/EN con persistencia por URL.
// Usa navegación dura (window.location) en lugar de router.replace para garantizar
// que el middleware de next-intl recargue los mensajes del locale correcto.
// router.replace tiene un bug conocido con el cache de RSC en Next.js 16 + next-intl v4.
export function LocaleToggle({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname(); // retorna path SIN prefijo locale (ej. "/" o "/casos/aurora")

  const switchTo = (locale: "es" | "en") => {
    if (locale === currentLocale) return;
    // Construir la nueva URL con el locale correcto
    const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center gap-0 font-mono text-xs uppercase tracking-[0.2em] border border-[color:var(--border)]">
      <button
        onClick={() => switchTo("es")}
        className={`px-3 py-1.5 transition-colors ${
          currentLocale === "es"
            ? "bg-[color:var(--fg-primary)] text-[color:var(--bg-primary)]"
            : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)]"
        }`}
        aria-label="Espanol"
      >
        ES
      </button>
      <button
        onClick={() => switchTo("en")}
        className={`px-3 py-1.5 transition-colors ${
          currentLocale === "en"
            ? "bg-[color:var(--fg-primary)] text-[color:var(--bg-primary)]"
            : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
