import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Section";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  return { title: t("meta.title"), description: t("meta.description") };
}

// Contacto — dos CTA: Calendly embed (fase 2 del build) y chatbot Nagi.
// Por ahora muestra el embed con el URL desde env + fallback link.
export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="pt-40 pb-32 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Eyebrow>Contacto · Discovery call</Eyebrow>
        <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.04em] text-balance max-w-4xl mb-6">
          20 minutos,<br />
          <span className="text-[color:var(--accent)]">Un diagnóstico,</span><br />
          Sin compromiso.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-[color:var(--fg-muted)] leading-relaxed text-pretty mb-16">
          En 20 minutos podemos identificar si tu proceso es automatizable y,
          si lo es, cuál sería el ROI esperado. Si no lo es, te digo por qué y
          qué hacer en su lugar.
        </p>

        <div className="hairline-t pt-12">
          {calendlyUrl ? (
            <div className="rounded-none overflow-hidden border border-[color:var(--border-strong)]">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="700"
                loading="lazy"
                style={{ border: 0 }}
                title="Agendar llamada con Jhon"
              />
            </div>
          ) : (
            <div className="p-10 border border-dashed border-[color:var(--border-strong)] text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--fg-muted)] mb-4">
                Calendly embed — pending env var
              </p>
              <p className="text-[color:var(--fg-muted)] text-sm">
                Definir <code className="font-mono text-[color:var(--accent)]">NEXT_PUBLIC_CALENDLY_URL</code> en{" "}
                <code className="font-mono text-[color:var(--accent)]">.env.local</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
