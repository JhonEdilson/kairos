import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Footer rediseñado.
// Problema anterior: sin bg propio, heredaba el fondo de la sección de arriba
// → se veía diferente en homepage vs otras páginas.
// Solución: bg-secondary sólido siempre. KAIROS como texto decorativo
// dentro del footer (no absoluto), visible solo en esa franja oscura.
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--bg-secondary)] border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        {/* Fila principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14">

          {/* Left — wordmark + tagline */}
          <div className="md:col-span-4 space-y-4">
            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-medium tracking-tight text-[color:var(--fg-primary)]">
                Kairos
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
                studio
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-[color:var(--fg-muted)] leading-relaxed max-w-xs">
              {t("tagline")}
            </p>

            {/* Ubicacion */}
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--fg-muted)]/60">
              Barbosa · Antioquia · CO
            </p>
          </div>

          {/* Col: Trabajo */}
          <div className="md:col-span-2 md:col-start-7">
            <FooterCol title={t("work")}>
              <FooterLink href="/casos/aurora">Aurora</FooterLink>
              <FooterLink href="/casos/sura">CRM SURA</FooterLink>
              <FooterLink href="/servicios">Servicios</FooterLink>
            </FooterCol>
          </div>

          {/* Col: Kairos */}
          <div className="md:col-span-2">
            <FooterCol title={t("company")}>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contacto">Contacto</FooterLink>
            </FooterCol>
          </div>

          {/* Col: Contacto */}
          <div className="md:col-span-2">
            <FooterCol title={t("contact")}>
              <a
                href="https://www.linkedin.com/in/jhon-edilson-escobar-vanegas-464757275"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--accent)] transition-colors block"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/jhonescobar"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--accent)] transition-colors block mt-2"
              >
                GitHub ↗
              </a>
              {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--accent)] transition-colors block mt-2"
                >
                  WhatsApp ↗
                </a>
              )}
            </FooterCol>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-[color:var(--fg-muted)]/60">
            © {year} — {t("rights")}
          </p>
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-[color:var(--fg-muted)]/60">
            by Jhon Edilson Escobar Vanegas · Consultor independiente de automatización
          </p>
        </div>

      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]/60 mb-4">
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)] transition-colors"
    >
      {children}
    </Link>
  );
}
