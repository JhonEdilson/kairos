import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000";
  return {
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
        "x-default": `${base}/es`,
      },
    },
  };
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
