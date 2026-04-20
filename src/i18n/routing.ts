import { defineRouting } from "next-intl/routing";

// Dos locales soportados. ES es el primario (Jhon vende en Colombia),
// EN es secundario (portfolio internacional).
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // localePrefix: "always" fuerza /es y /en explicitos en la URL.
  // Asi el toggle persiste via navegacion, no solo cookie.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
