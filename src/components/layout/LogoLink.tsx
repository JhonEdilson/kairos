"use client";

import { Link } from "@/i18n/navigation";

export function LogoLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2"
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      {children}
    </Link>
  );
}
