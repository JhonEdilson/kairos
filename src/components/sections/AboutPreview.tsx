import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";

// AboutPreview — sección compacta en homepage.
// Foto + bio corta + link a /about. Fondo secondary para contraste.
export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <Section className="bg-[color:var(--bg-secondary)]">
      <Eyebrow>{t("eyebrow")}</Eyebrow>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Foto */}
        <div className="md:col-span-4">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/perfil.jpeg"
              alt="Jhon Escobar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] mb-8">
            {t("heading")}
          </h2>
          <p className="text-lg leading-relaxed text-[color:var(--fg-muted)] text-pretty max-w-xl">
            {t("bio")}
          </p>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-sm font-medium
                         text-[color:var(--accent)] hover:text-[color:var(--accent-hover)]
                         transition-colors duration-300 group"
            >
              {t("link")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
