"use client";

import Link from "next/link";

export function LogoLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2"
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  );
}
