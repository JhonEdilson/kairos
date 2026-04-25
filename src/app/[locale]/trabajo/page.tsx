import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DemosSection } from "@/components/trabajo/DemosSection";

// /trabajo — galería de todos los proyectos de Kairos Studio.
// Muestra flagships (con enlace al caso) y demos (con CTA a contacto).
// Consume los textos de showcase.* ya existentes en es/en.json.

type ProjectKey = "aurora" | "sura" | "onboarding" | "conserje";

type ProjectConfig = {
  key: ProjectKey;
  type: "flagship" | "demo";
  href?: string;      // si existe página dedicada (flagships)
  videoUrl?: string;  // URL embed Loom — vacío = placeholder elegante hasta grabar
  showDrawer?: boolean;
};

const PROJECTS: ProjectConfig[] = [
  { key: "aurora",     type: "flagship", href: "/casos/aurora" },
  { key: "sura",       type: "flagship", href: "/casos/sura" },
  { key: "onboarding", type: "demo" },
  { key: "conserje",   type: "demo", videoUrl: "https://www.loom.com/embed/1b4a727107b54a9c810dd593a7a12021", showDrawer: true },
];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trabajo" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function TrabajoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TrabajoContent />;
}

// Componente cliente-friendly — usa hooks de next-intl en un server component
// a través del patrón de extracción de contenido.
function TrabajoContent() {
  const t = useTranslations("trabajo");
  const s = useTranslations("showcase");

  const flagships = PROJECTS.filter((p) => p.type === "flagship");
  const demos     = PROJECTS.filter((p) => p.type === "demo");

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 hero-glow relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.04em] text-balance max-w-4xl">
            {t("heading")}
          </h1>
        </div>
      </section>

      {/* Flagships */}
      <Section className="hairline-t">
        <Eyebrow>{t("flagships")}</Eyebrow>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border)]">
          {flagships.map(({ key, href }) => (
            <ProjectCard
              key={key}
              type="flagship"
              typeLabel={s("typeFlag")}
              client={s(`${key}.client`)}
              title={s(`${key}.title`)}
              desc={s(`${key}.desc`)}
              stats={[s(`${key}.stats.1`), s(`${key}.stats.2`), s(`${key}.stats.3`)]}
              ctaLabel={s("viewCase")}
              ctaHref={href!}
            />
          ))}
        </div>
      </Section>

      {/* Demos */}
      <Section className="hairline-t">
        <Eyebrow>{t("demos")}</Eyebrow>
        <DemosSection
          demos={demos.map(({ key, videoUrl, showDrawer }) => ({ key, videoUrl, showDrawer }))}
          calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#"}
        />
      </Section>

      {/* CTA final */}
      <Section className="hairline-t">
        <div className="text-center max-w-2xl mx-auto">
          <Heading className="mx-auto text-center mb-8">
            {t("finalHeading")}
          </Heading>
          <p className="text-lg text-[color:var(--fg-muted)] mb-10">
            {t("finalSub")}
          </p>
          <Button href="/contacto" variant="primary" size="lg">
            {t("demoCta")}
          </Button>
        </div>
      </Section>
    </>
  );
}

// Card de proyecto — reutilizable para flagship y demo.
// Flagship: fondo primario, accent color en etiqueta, CTA "Ver caso"
// Demo: fondo secundario, etiqueta muted, CTA a contacto
type CardProps = {
  type: "flagship" | "demo";
  typeLabel: string;
  client: string;
  title: string;
  desc: string;
  stats: [string, string, string];
  ctaLabel: string;
  ctaHref: string;
};

function ProjectCard({
  type,
  typeLabel,
  client,
  title,
  desc,
  stats,
  ctaLabel,
  ctaHref,
}: CardProps) {
  const isFlagship = type === "flagship";

  return (
    <div
      className={`p-8 md:p-10 flex flex-col justify-between min-h-[420px]
        ${isFlagship ? "bg-[color:var(--bg-primary)]" : "bg-[color:var(--bg-secondary)]"}`}
    >
      {/* Header */}
      <div>
        {/* Tipo + cliente */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-0.5"
            style={{
              color: isFlagship ? "var(--accent)" : "var(--fg-muted)",
              border: `1px solid ${isFlagship ? "var(--accent)" : "var(--border-strong)"}`,
            }}
          >
            {typeLabel}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-muted)]">
            {client}
          </span>
        </div>

        {/* Título */}
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[0.95] mb-4">
          {title}
        </h2>

        {/* Descripción */}
        <p className="text-[color:var(--fg-muted)] text-base leading-relaxed max-w-lg">
          {desc}
        </p>
      </div>

      {/* Footer — stats + CTA */}
      <div className="mt-8">
        {/* Stats */}
        <div className="flex gap-6 md:gap-10 hairline-t pt-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i}>
              <div
                className="font-display text-xl md:text-2xl font-medium tracking-[-0.02em]"
                style={{ color: i === 0 ? "var(--accent)" : "var(--fg-primary)" }}
              >
                {stat}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button href={ctaHref} variant="ghost" size="sm">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
