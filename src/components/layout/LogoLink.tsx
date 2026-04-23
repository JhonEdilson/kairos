"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export function LogoLink({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}`}
      className="group flex items-center gap-2"
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  );
}
