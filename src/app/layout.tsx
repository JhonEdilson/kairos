import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Fonts definidos en root — son globales y no dependen del locale.
// Las variables CSS se consumen en globals.css y [locale]/layout.tsx ya no las repite.
const neueMontreal = localFont({
  src: "../fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-neue-montreal",
  display: "swap",
  weight: "100 800",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ),
  title: {
    default: "Kairos Studio — Automatización con IA para equipos operativos",
    template: "%s | Kairos Studio",
  },
  description:
    "Jhon Escobar, consultor de automatización con IA. n8n + LLMs para eliminar trabajo manual en equipos operativos.",
  openGraph: {
    title: "Kairos Studio",
    description: "Automatización con IA para equipos operativos.",
    type: "website",
    images: ["/opengraph-image"],
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos Studio",
    description: "Automatización con IA para equipos operativos.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

// Next.js 16 exige <html> y <body> en el root layout.
// lang="es" como default; HtmlLangUpdater en [locale]/layout lo sincroniza al locale real post-mount.
// suppressHydrationWarning evita el mismatch entre el "es" estático y el lang que el cliente actualiza.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${neueMontreal.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
