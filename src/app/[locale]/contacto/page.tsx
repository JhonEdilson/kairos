import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, pageOpenGraph } from "@/lib/metadata";
import { Eyebrow } from "@/components/ui/Section";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const LINKEDIN = "https://www.linkedin.com/in/jhon-edilson-escobar-vanegas-464757275";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  const title = t("meta.title");
  const description = t("meta.description");
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/contacto"),
    ...pageOpenGraph(locale, title, description),
  };
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

        {/* Canales alternativos */}
        <div className="mt-16 pt-12 hairline-t">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--fg-muted)]/60 mb-8">
            O escríbeme directamente
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {WHATSAPP && (
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Jhon, vi tu portfolio y me interesa hablar sobre automatización para mi negocio.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 text-sm font-medium
                           border border-[color:var(--border-strong)]
                           hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                           transition-colors group"
              >
                {/* WhatsApp icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp
                <span className="ml-auto text-[color:var(--fg-muted)] group-hover:text-[color:var(--accent)] transition-colors" aria-hidden>↗</span>
              </a>
            )}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 text-sm font-medium
                         border border-[color:var(--border-strong)]
                         hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                         transition-colors group"
            >
              {/* LinkedIn icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
              <span className="ml-auto text-[color:var(--fg-muted)] group-hover:text-[color:var(--accent)] transition-colors" aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
