"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Gradientes de fondo por proyecto — paleta dentro del design system.
const PROJECT_COLORS = [
  "from-[#0B0F1A] via-[#13213A] to-[#0B1020]",   // Aurora — navy profundo
  "from-[#0B0F1A] via-[#1C1410] to-[#0B0F1A]",   // SURA — tono cálido oscuro
];

const PROJECT_ACCENTS = ["#D97706", "#C26A00"];

type ProjectKey = "aurora" | "sura";

const PROJECT_KEYS: { key: ProjectKey; href: string }[] = [
  { key: "aurora", href: "/casos/aurora" },
  { key: "sura",   href: "/casos/sura"   },
];

// ScrollShowcase — panels full-viewport con crossfade al scrollear.
//
// Arquitectura (sin GSAP pin — evita mutacion del DOM que rompe React):
// - wrapperRef: div externo con height = n * 100vh (provee el espacio de scroll)
// - containerRef: div interno con CSS `position: sticky, top: 0` — mismo efecto visual
//   que GSAP pin pero sin mover nodos, React puede desmontarlo sin error
// - GSAP ScrollTrigger solo lee el progreso de scroll → onUpdate → setActiveIndex
// - Snap via ScrollTrigger sin pin
export function ScrollShowcase() {
  const t = useTranslations("showcase");
  const wrapperRef = useRef<HTMLDivElement>(null);   // trigger del scroll, da el espacio
  const containerRef = useRef<HTMLDivElement>(null); // sticky visual
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      snap: {
        snapTo: 1 / (PROJECT_KEYS.length - 1),
        duration: { min: 0.3, max: 0.6 },
        ease: "power2.inOut",
        delay: 0.1,
      },
      onEnter: () => setActiveIndex(0),
      onLeaveBack: () => setActiveIndex(0),
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (PROJECT_KEYS.length - 1));
        setActiveIndex(idx);
      },
    });

    // Re-medir cuando el layout se estabiliza. En carga fresca, ScrollTrigger
    // mide con fonts a medio cargar y con el IntroLoader bloqueando el body
    // (overflow:hidden). Cuando el loader termina y el overflow se libera,
    // el documento se re-flowea y las mediciones iniciales quedan stale.
    // Al navegar via SPA esto no ocurre porque el layout ya está estable.
    const refresh = () => ScrollTrigger.refresh();

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    window.addEventListener("load", refresh);
    window.addEventListener("intro:complete", refresh);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", refresh);
      window.removeEventListener("intro:complete", refresh);
    };
  }, []);

  return (
    // Wrapper externo — alto = (n + 1) × 100vh.
    // Rango de scroll útil (top-top → bottom-bottom) = wrapperH - viewportH = n × 100vh,
    // por lo que cada proyecto obtiene exactamente 100vh de scroll. Si usas n × 100vh cada
    // proyecto solo recibiría (n-1)/n × 100vh y la transición se dispara demasiado pronto.
    <div
      ref={wrapperRef}
      style={{ height: `${(PROJECT_KEYS.length + 1) * 100}vh` }}
      className="relative"
    >
      {/* Sticky inner — queda fijo via CSS, React puede desmontarlo libremente */}
      <div
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Panels — crossfade via opacity */}
        {PROJECT_KEYS.map(({ key, href }, i) => (
          <ProjectPanel
            key={key}
            active={i === activeIndex}
            gradientClass={PROJECT_COLORS[i]}
            accentColor={PROJECT_ACCENTS[i]}
            index={String(i + 1).padStart(2, "0")}
            total={PROJECT_KEYS.length}
            client={t(`${key}.client`)}
            title={t(`${key}.title`)}
            desc={t(`${key}.desc`)}
            stats={[t(`${key}.stats.1`), t(`${key}.stats.2`), t(`${key}.stats.3`)]}
            href={href}
            viewLabel={t("viewCase")}
          />
        ))}

        {/* Navegacion lateral — dots */}
        <ScrollNav active={activeIndex} total={PROJECT_KEYS.length} />

        {/* Eyebrow fijo en top-left */}
        <div className="absolute top-6 left-6 md:left-10 flex items-center gap-3 z-20">
          <span className="ticker-dot" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
            {t("eyebrow")}
          </span>
        </div>
      </div>
    </div>
  );
}

// Panel individual — full viewport, fondo gradiente, contenido del proyecto
type PanelProps = {
  active: boolean;
  gradientClass: string;
  accentColor: string;
  index: string;
  total: number;
  client: string;
  title: string;
  desc: string;
  stats: [string, string, string];
  href: string;
  viewLabel: string;
};

function ProjectPanel({
  active,
  gradientClass,
  accentColor,
  index,
  total,
  client,
  title,
  desc,
  stats,
  href,
  viewLabel,
}: PanelProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center md:justify-end
                  transition-opacity duration-700 ease-in-out
                  bg-gradient-to-br ${gradientClass}
                  ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      {/* Overlay grain */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Index gigante decorativo — fondo */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 font-display font-medium
                      text-[20vw] leading-none tracking-[-0.04em] select-none pointer-events-none
                      text-[color:var(--fg-primary)]/[0.03]">
        {index}
      </div>

      {/* Contenido del panel — alineado al bottom */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-8 pt-8 md:pb-14 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left — info del proyecto */}
          <div className="lg:col-span-8">
            {/* Cliente */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                {client}
              </span>
            </div>

            {/* Titulo gigante */}
            <h2 className="font-display font-medium
                           text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] tracking-[-0.04em]
                           text-[color:var(--fg-primary)] mb-6">
              {title}
            </h2>

            {/* Descripcion */}
            <p className="text-base md:text-lg text-[color:var(--fg-muted)] leading-relaxed
                          max-w-xl text-pretty mb-8">
              {desc}
            </p>

            {/* Stats row */}
            <div className="flex gap-3 sm:gap-6 md:gap-12 hairline-t pt-6 overflow-hidden">
              {stats.map((stat, i) => (
                <div key={i} className="flex-1 min-w-0">
                  <div className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[-0.02em]"
                       style={{ color: i === 0 ? accentColor : "var(--fg-primary)" }}>
                    {stat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href={href}
              className="group inline-flex items-center gap-3 px-6 py-4 text-sm font-medium
                         border border-[color:var(--border-strong)]
                         hover:border-current transition-all duration-300"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = accentColor;
                el.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "";
                el.style.color = "";
              }}
            >
              {viewLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Progress bar bottom */}
        <div className="mt-8 h-px bg-[color:var(--border)]">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${(parseInt(index) / total) * 100}%`, backgroundColor: accentColor }}
          />
        </div>
      </div>
    </div>
  );
}

// Dots de navegacion laterales — indican el proyecto activo
function ScrollNav({ active, total }: { active: number; total: number }) {
  return (
    <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-20
                    flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active
              ? "w-1.5 h-6 bg-[color:var(--accent)]"
              : "w-1.5 h-1.5 bg-[color:var(--fg-primary)]/30"
          }`}
        />
      ))}
    </div>
  );
}
