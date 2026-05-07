"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/navigation";

type Labels = {
  work: string;
  services: string;
  about: string;
  contact: string;
  diagnostic: string;
};

export function MobileMenu({ labels }: { labels: Labels }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/trabajo",     label: labels.work },
    { href: "/servicios",   label: labels.services },
    { href: "/about",       label: labels.about },
    { href: "/diagnostico", label: labels.diagnostic },
  ] as const;

  return (
    <>
      {/* Hamburger toggle — only on mobile */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-[color:var(--fg-primary)]"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <div className="flex flex-col gap-1.5 w-5">
          <span
            className={`h-px w-full bg-current transition-transform duration-300 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-current transition-transform duration-300 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* Full-screen overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col
          bg-[color:var(--bg-primary)] border-t border-[color:var(--border)]
          transition-[opacity,transform] duration-300 ease-out
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="group flex items-center justify-between hairline-b py-5
                         text-4xl font-display font-medium tracking-[-0.03em]
                         text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)]
                         transition-colors duration-200"
            >
              {label}
              <span
                className="text-xl text-[color:var(--accent)] opacity-0 -translate-x-2
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-[opacity,transform] duration-200"
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <div className="px-6 mt-auto pb-10">
          <Link
            href="/contacto"
            onClick={close}
            className="flex items-center justify-center gap-2 w-full px-6 py-4
                       text-sm font-medium
                       border border-[color:var(--border-strong)]
                       hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]
                       transition-colors duration-200"
          >
            {labels.contact}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
