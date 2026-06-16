import { Suspense } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { NagiWidget } from "@/components/chat/NagiWidget";
import { CursorGlow } from "@/components/ui/CursorGlow";

// Pre-genera las rutas estaticas para cada locale soportado.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// <html> y <body> viven en src/app/layout.tsx (root).
// Este layout solo monta los providers y la chrome UI (Nav, Footer, Nagi).
// HtmlLangUpdater sincroniza document.documentElement.lang con el locale real post-mount.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Si el locale en la URL no esta en routing.locales, 404.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Suspense fallback={null}>
        <LenisProvider>
          <HtmlLangUpdater locale={locale} />
          <Nav />
          <main>{children}</main>
          <Footer />
          <NagiWidget />
          <CursorGlow />
        </LenisProvider>
      </Suspense>
    </NextIntlClientProvider>
  );
}
