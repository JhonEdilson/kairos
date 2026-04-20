import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ChallengeCard } from "@/components/ui/ChallengeCard";
import { ToolCard } from "@/components/ui/ToolCard";
import { auroraContent } from "@/content/casos/aurora-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aurora" });
  return { title: t("meta.title"), description: t("meta.description") };
}

// Case study Aurora — Want2Peak.
// Contenido bilingüe via src/content/casos/aurora-content.ts.
// Ambas rutas (/es/casos/aurora y /en/casos/aurora) son SSG — compiladas en build.
export default async function AuroraPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = auroraContent[locale as "es" | "en"] ?? auroraContent.es;
  const tools = [
    "WhatsApp Cloud API",
    "OpenAI GPT-4o",
    "MongoDB",
    "n8n",
    "Slack",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 hero-glow relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="font-display font-medium text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.04em]">
            {c.title}
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-[color:var(--fg-muted)] text-pretty">
            {c.heroDesc}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
              {c.metaDates[0]}
            </span>
            <span className="w-1 h-1 rounded-full bg-[color:var(--fg-muted)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
              {c.metaDates[1]}
            </span>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <Section className="hairline-t py-0! md:py-0!">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)]">
          {c.statsBanner.map((item) => (
            <div key={item.label} className="bg-[color:var(--bg-primary)] py-10 px-10">
              <div className="font-display text-6xl md:text-7xl font-medium tracking-[-0.04em] text-[color:var(--accent)]">
                {item.stat}
              </div>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* El Desafio / The Challenge */}
      <Section className="hairline-t">
        <Eyebrow>{c.challengeEyebrow}</Eyebrow>
        <Heading className="mb-12">{c.challengeHeading}</Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6 text-lg leading-relaxed text-[color:var(--fg-muted)]">
            {c.challengeBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="space-y-6">
            {c.challengeCards.map((item) => (
              <ChallengeCard key={item.title} stat={item.stat} title={item.title} desc={item.desc} />
            ))}
          </div>
        </div>
      </Section>

      {/* La Solucion / The Solution */}
      <Section className="bg-[color:var(--bg-secondary)]">
        <Eyebrow>{c.solutionEyebrow}</Eyebrow>
        <Heading className="mb-16">{c.solutionHeading}</Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)]">
          {c.solutionSteps.map((item) => (
            <div key={item.step} className="bg-[color:var(--bg-secondary)] p-8 md:p-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--accent)] mb-4">
                {item.step}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-4">
                {item.title}
              </h3>
              <p className="text-sm text-[color:var(--fg-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Resultados / Results */}
      <Section className="hairline-t">
        <Eyebrow>{c.resultsEyebrow}</Eyebrow>
        <Heading className="mb-16">{c.resultsHeading}</Heading>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[color:var(--border-strong)]">
                {c.tableHeaders.map((h, i) => (
                  <th
                    key={i}
                    className={`pb-4 font-mono text-[11px] uppercase tracking-[0.25em] font-normal ${
                      i === 2
                        ? "text-[color:var(--accent)]"
                        : "text-[color:var(--fg-muted)]"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-base">
              {c.tableRows.map((row) => (
                <tr key={row.metric} className="border-b border-[color:var(--border)]">
                  <td className="py-5 pr-6 font-medium">{row.metric}</td>
                  <td className="py-5 pr-6 text-[color:var(--fg-muted)]">{row.before}</td>
                  <td className="py-5 text-[color:var(--accent)]">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--border)] mt-16">
          {c.impactStats.map((item) => (
            <div key={item.label} className="bg-[color:var(--bg-primary)] p-8">
              <div className="font-display text-4xl md:text-5xl font-medium tracking-[-0.04em] text-[color:var(--accent)]">
                {item.value}
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section className="bg-[color:var(--bg-secondary)]">
        <Eyebrow>{c.stackEyebrow}</Eyebrow>
        <Heading className="mb-12">{c.stackHeading}</Heading>
        <div
          className="grid gap-px bg-[color:var(--border)]"
          style={{ gridTemplateColumns: `repeat(${tools.length}, 1fr)` }}
        >
          {tools.map((tool) => (
            <ToolCard key={tool} name={tool} size="sm" />
          ))}
        </div>
        <p className="mt-8 text-sm text-[color:var(--fg-muted)]">{c.stackNote}</p>
      </Section>

      {/* CTA */}
      <Section className="hairline-t">
        <div className="text-center max-w-2xl mx-auto">
          <Heading className="mx-auto text-center mb-8">{c.ctaHeading}</Heading>
          <p className="text-lg text-[color:var(--fg-muted)] mb-10">{c.ctaBody}</p>
          <Button href="/contacto" variant="primary" size="lg">
            {c.ctaButton}
          </Button>
        </div>
      </Section>
    </>
  );
}
