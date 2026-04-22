import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleToggle } from "./LocaleToggle";
import { NavScrollIsland } from "./NavScrollIsland";
import { LogoLink } from "./LogoLink";

// Nav fija con backdrop blur que se activa al scrollear.
// El "K" wordmark reemplaza el logo completo — patron de Linear/Vercel/basement.
export async function Nav() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <NavScrollIsland>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Wordmark — K con acento. Simple, memorable, 0 horas de diseño. */}
        <LogoLink>
          <span className="font-display text-2xl font-medium tracking-tight text-[color:var(--fg-primary)]">
            Kairos
          </span>
          <span className="w-1 h-1 rounded-full bg-[color:var(--accent)] group-hover:scale-150 transition-transform" />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
            studio
          </span>
        </LogoLink>

        <nav className="hidden md:flex items-center gap-10 text-sm">
          <NavLink href="/trabajo">{t("work")}</NavLink>
          <NavLink href="/servicios">{t("services")}</NavLink>
          <NavLink href="/about">{t("about")}</NavLink>
        </nav>

        <div className="flex items-center gap-5">
          <LocaleToggle currentLocale={locale} />
          <Link
            href="/contacto"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[color:var(--border-strong)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
          >
            {t("contact")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </NavScrollIsland>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)] transition-colors
                 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[color:var(--accent)]
                 hover:after:w-full after:transition-all after:duration-500"
    >
      {children}
    </Link>
  );
}
