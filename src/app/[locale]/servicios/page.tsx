import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { PartnerCTAButton } from "@/components/ui/PartnerCTAButton";
import { TierSection } from "@/components/sections/TierSection";

const Check = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    className="shrink-0 mt-[3px]"
    aria-hidden="true"
  >
    <path
      d="M2 6.5L5 9.5L11 3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const tier1Features = t.raw("agents.tiers.1.features") as string[];
  const tier2Features = t.raw("agents.tiers.2.features") as string[];
  const tier3Features = t.raw("agents.tiers.3.features") as string[];
  const consultingFeatures = t.raw("consulting.features") as string[];
  const partnerBenefits = t.raw("partner.benefits") as string[];

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#";

  const tiers = [
    {
      num: "01",
      name: t("agents.tiers.1.name"),
      tagline: t("agents.tiers.1.tagline"),
      price: t("agents.tiers.1.price"),
      currency: t("agents.tiers.1.currency"),
      timeline: t("agents.tiers.1.timeline"),
      autonomy: t("agents.tiers.1.autonomy"),
      features: tier1Features,
      popular: false,
      comparison: t("agents.tiers.1.comparison"),
      nagiMessage: t("agents.tiers.1.nagiMessage"),
      ref: t("agents.tiers.1.ref"),
    },
    {
      num: "02",
      name: t("agents.tiers.2.name"),
      tagline: t("agents.tiers.2.tagline"),
      price: t("agents.tiers.2.price"),
      currency: t("agents.tiers.2.currency"),
      timeline: t("agents.tiers.2.timeline"),
      autonomy: t("agents.tiers.2.autonomy"),
      features: tier2Features,
      popular: true,
      comparison: t("agents.tiers.2.comparison"),
      nagiMessage: t("agents.tiers.2.nagiMessage"),
      ref: t("agents.tiers.2.ref"),
    },
    {
      num: "03",
      name: t("agents.tiers.3.name"),
      tagline: t("agents.tiers.3.tagline"),
      price: t("agents.tiers.3.price"),
      currency: t("agents.tiers.3.currency"),
      timeline: t("agents.tiers.3.timeline"),
      autonomy: t("agents.tiers.3.autonomy"),
      features: tier3Features,
      popular: false,
      comparison: t("agents.tiers.3.comparison"),
      nagiMessage: t("agents.tiers.3.nagiMessage"),
      ref: t("agents.tiers.3.ref"),
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-40 pb-14">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-[6rem] leading-[0.92] tracking-[-0.04em] text-balance max-w-4xl mb-6">
            {t("hero.heading")}
          </h1>
          <p className="text-[color:var(--fg-muted)] text-lg max-w-xl leading-relaxed">
            {t("hero.sub")}
          </p>
        </div>
      </section>

      {/* ── AGENTES IA — 3 TIERS ── */}
      <Section className="hairline-t">
        {/* Section header — centered */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="ticker-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
              {t("agents.eyebrow")}
            </span>
          </div>
          <Heading className="mx-auto text-center">
            {t("agents.heading")}
          </Heading>
          <p className="text-[color:var(--fg-muted)] text-base mt-5 max-w-sm mx-auto leading-relaxed">
            {t("agents.sub")}
          </p>
        </div>

        <TierSection
          tiers={tiers}
          calendlyUrl={calendlyUrl}
          labels={{
            cta: t("agents.cta"),
            popular: t("agents.popular"),
            footer: t("agents.footer"),
            drawerSchedule: t("agents.drawerSchedule"),
            drawerNagi: t("agents.drawerNagi"),
          }}
        />
      </Section>

      {/* ── CONSULTORÍA ── */}
      <Section className="hairline-t">
        {/* Section header */}
        <div className="mb-12">
          <Eyebrow>{t("consulting.eyebrow")}</Eyebrow>
          <Heading>{t("consulting.heading")}</Heading>
        </div>

        <div className="rounded-2xl border border-[color:var(--border)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — context */}
            <div className="p-10 md:p-14 bg-[color:var(--bg-secondary)]">
              <span className="inline-block mb-8 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-900/30 text-emerald-400 border border-emerald-800/40">
                {t("consulting.badge")}
              </span>
              <p className="text-[color:var(--fg-muted)] leading-relaxed text-pretty">
                {t("consulting.desc")}
              </p>
            </div>

            {/* Right — features + CTA */}
            <div className="p-10 md:p-14 bg-[color:var(--bg-primary)] border-t md:border-t-0 md:border-l border-[color:var(--border)] flex flex-col justify-between gap-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)] mb-5">
                  {t("consulting.includes")}
                </p>
                <ul className="space-y-4">
                  {consultingFeatures.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-snug text-[color:var(--fg-muted)]"
                    >
                      <span className="text-[color:var(--accent)]">
                        <Check />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-medium
                           bg-[color:var(--fg-primary)] text-[color:var(--bg-primary)]
                           hover:bg-[color:var(--accent)] hover:text-[color:var(--fg-primary)]
                           transition-all duration-300 group self-start"
              >
                {t("consulting.cta")}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── PLAN PARTNER ── */}
      <Section id="plan-partner" className="hairline-t">
        {/* Section header */}
        <div className="mb-12">
          <Eyebrow>{t("partner.eyebrow")}</Eyebrow>
          <Heading>{t("partner.heading")}</Heading>
        </div>

        <div
          className="rounded-2xl overflow-hidden px-10 py-14 md:px-16 md:py-20
                     border border-[color:var(--border-strong)]"
          style={{
            background: [
              "radial-gradient(ellipse 70% 60% at 10% 50%, rgba(217,119,6,0.12) 0%, transparent 65%)",
              "radial-gradient(ellipse 50% 70% at 90% 80%, rgba(30,58,138,0.12) 0%, transparent 60%)",
              "var(--bg-secondary)",
            ].join(", "),
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left — pitch */}
            <div>
              <p className="text-[color:var(--fg-muted)] leading-relaxed mb-10 max-w-md text-pretty">
                {t("partner.desc")}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <PartnerCTAButton
                  label={t("partner.cta")}
                  message={t("partner.nagiMessage")}
                />
                <span className="font-mono text-[11px] text-[color:var(--fg-muted)] uppercase tracking-wider">
                  {t("partner.price")}
                </span>
              </div>
            </div>

            {/* Right — benefits */}
            <div>
              <ul className="space-y-1">
                {partnerBenefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-4 border-b border-[color:var(--border)] last:border-0"
                  >
                    <span className="font-mono text-[11px] text-[color:var(--accent)]/70 tabular-nums shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-[color:var(--fg-muted)]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
