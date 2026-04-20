"use client";

import { useEffect } from "react";

// Sincroniza el atributo lang del <html> con el locale activo.
// Necesario porque el root layout renderiza lang="es" como default estático
// y Next.js 16 no permite acceder al locale desde el root (segmento padre).
export function HtmlLangUpdater({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
