"use client";

import { useEffect, useState } from "react";

export function NavScrollIsland({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--bg-primary)]/70 border-b border-[color:var(--border)]"
          : "bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}
