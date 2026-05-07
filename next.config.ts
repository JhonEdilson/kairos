import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDX = createMDX({ extension: /\.mdx?$/ });
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// HSTS and upgrade-insecure-requests must NOT be sent in dev — the HTTP localhost
// dev server has no TLS, so the browser caches the HSTS rule and upgrades all RSC
// payload fetches to https://localhost, causing ERR_SSL_PROTOCOL_ERROR.
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  ...(!isDev
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://vercel.live https://*.vercel.live",
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.fontshare.com https://assets.calendly.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com",
      "connect-src 'self' https://vercel.live https://*.vercel.live wss://*.pusher.com https://*.supabase.co",
      "frame-src https://calendly.com https://*.calendly.com https://www.loom.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      ...(!isDev ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  // Prevent Turbopack/webpack from bundling these server-only packages.
  // @react-pdf/renderer uses Node.js native APIs (canvas, fontkit, etc.)
  // @anthropic-ai/sdk uses Node.js streams and TLS internals.
  serverExternalPackages: ["@react-pdf/renderer", "@anthropic-ai/sdk", "openai"],
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(withMDX(withBundleAnalyzer(nextConfig)));
