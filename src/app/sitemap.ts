import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const locales = ["es", "en"];
const routes = ["", "/about", "/servicios", "/trabajo", "/contacto", "/casos/aurora", "/casos/sura"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return locales.flatMap((l) =>
    routes.map((r) => ({
      url: `${base}/${l}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1.0 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((ll) => [ll, `${base}/${ll}${r}`])),
      },
    }))
  );
}
