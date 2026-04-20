import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonts definidos en root — son globales y no dependen del locale.
// Las variables CSS se consumen en globals.css y [locale]/layout.tsx ya no las repite.
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
  title: "Kairos — by Jhon Escobar",
  description:
    "Automatizaciones disparadas en el momento exacto. One builder, two real flagships, auditable numbers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    title: "Kairos — by Jhon Escobar",
    description: "Automations triggered at the right moment.",
    type: "website",
  },
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
