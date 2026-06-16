import type { Metadata } from "next";

// Construye canonical + hreflang para una página concreta. Los paths son
// relativos: Next.js los resuelve contra metadataBase (src/app/layout.tsx).
// `path` es el segmento después del locale — ej. "/servicios" o "" para la home.
// Antes el canonical se seteaba en [locale]/layout.tsx como `/${locale}`, lo que
// hacía que TODAS las páginas canonicalizaran a la home del idioma (duplicate content).
export function localeAlternates(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      es: `/es${path}`,
      en: `/en${path}`,
      "x-default": `/es${path}`,
    },
  };
}

// OG image compartida (route handler en src/app/opengraph-image.tsx).
const OG_IMAGE = "/opengraph-image";

// Construye openGraph + twitter localizados para una página. Necesario porque
// Next REEMPLAZA openGraph por completo en cada segmento: si una página define
// openGraph sin `images`, pierde las del layout root. Por eso lo centralizamos.
export function pageOpenGraph(
  locale: string,
  title: string,
  description: string
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "en" ? "en_US" : "es_CO",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
