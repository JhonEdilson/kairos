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

// About — bio completa + foto + stack.
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Eyebrow>About</Eyebrow>
          <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.04em] text-balance max-w-4xl">
            Una persona.
            <br />
            <span className="text-[color:var(--accent)]">Dos</span> sistemas en
            produccion.
            <br />
            Cero caja negra.
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
                alt="Jhon Escobar — Consultor de automatizacion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-7 md:col-start-6">
            <Heading>Barbosa, Antioquia.</Heading>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[color:var(--fg-muted)] text-pretty">
              <p>
                Jhon Edilson Escobar Vanegas — tecnólogo en programación y consultor de
                automatización IA.  
              </p>
              <p>
                Trabajo desde Barbosa, Antioquia, con clientes que necesitan que
                sus operaciones escalen sin duplicar personal. En menos de un
                año construí dos sistemas en producción: un agente de IA que
                procesa 992 mensajes/mes con 98.8% de autonomía, y un CRM que
                eliminó errores de cálculo en una operación de seguros.
              </p>
              <p>
                No soy una agencia. No hay account manager, no hay equipo de
                ventas. Si decidimos trabajar juntos, hablas directamente con la
                persona que diseña, construye y entrega tu solución. Eso se nota
                en la velocidad, la profundidad del diagnóstico y el precio.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stack */}
      <Section className="hairline-t">
        <Eyebrow>Stack habitual</Eyebrow>
        <Heading className="mb-16">Herramientas que uso todos los dias.</Heading>
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
