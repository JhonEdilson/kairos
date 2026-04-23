import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { ToolCard } from "@/components/ui/ToolCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.04em] text-balance max-w-4xl">
            {t("hero.line1")}
            <br />
            <span className="text-[color:var(--accent)]">{t("hero.accentWord")}</span>
            {t("hero.line2rest")}
            <br />
            {t("hero.line3")}
          </h1>
        </div>
      </section>

      {/* Bio + Foto */}
      <Section className="hairline-t">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Foto */}
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/perfil.jpeg"
                alt={t("imgAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-7 md:col-start-6">
            <Heading>{t("bio.location")}</Heading>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[color:var(--fg-muted)] text-pretty">
              <p>{t("bio.p1")}</p>
              <p>{t("bio.p2")}</p>
              <p>{t("bio.p3")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stack */}
      <Section className="hairline-t">
        <Eyebrow>{t("stack.eyebrow")}</Eyebrow>
        <Heading className="mb-16">{t("stack.heading")}</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--border)]">
          {[
            "N8N",
            "Claude Code",
            "Supabase",
            "Next.js",
            "Gemini",
            "Firecrawl",
            "Vercel",
            "Antigravity",
          ].map((tool) => (
            <ToolCard key={tool} name={tool} size="lg" invert />
          ))}
        </div>
      </Section>
    </>
  );
}
