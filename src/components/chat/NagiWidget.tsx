"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const NagiChat = dynamic(() => import("./NagiChat").then((m) => m.NagiChat), {
  ssr: false,
});

// NagiWidget — FAB flotante de Nagi.
// Cuando /public/nagi-avatar.mp4 esté disponible:
//   1. Cambia NAGI_AVATAR_READY a true
//   2. El video reemplaza el placeholder automáticamente
const NAGI_AVATAR_READY = false;

export function NagiWidget() {
  const t = useTranslations("nagi");
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Escucha el evento global 'nagi:open' para abrir el chat con contexto pre-cargado
  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail;
      setIsOpen(true);
      setPendingMessage(message);
    };
    window.addEventListener("nagi:open", handler);
    return () => window.removeEventListener("nagi:open", handler);
  }, []);

  return (
    <>
      {/* Backdrop — captura clicks afuera para cerrar el chat */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel de chat — AnimatePresence mantiene el componente montado durante el exit */}
      <AnimatePresence>
        {isOpen && (
          <NagiChat
            key="nagi-chat"
            onClose={() => setIsOpen(false)}
            initialMessage={pendingMessage}
            onInitialMessageConsumed={() => setPendingMessage(null)}
          />
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label={t("label")}
        aria-expanded={isOpen}
      >
        <div
          className="flex items-center gap-3 pr-1.5 pl-5
                     bg-[color:var(--bg-tertiary)] border border-[color:var(--border-strong)]
                     text-sm font-medium backdrop-blur-xl rounded-full
                     shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]
                     transition-all duration-500"
        >
          {/* Label expansible — solo visible en hover */}
          <span
            className={`overflow-hidden transition-all duration-500 whitespace-nowrap ${
              hovered && !isOpen ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            {t("label")}
          </span>

          {/* Avatar circular */}
          <span className="relative w-12 h-12 shrink-0">
            {NAGI_AVATAR_READY ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-full"
              >
                <source src="/nagi-avatar.mp4" type="video/mp4" />
              </video>
            ) : (
              <span className="w-full h-full rounded-full bg-[color:var(--accent)]
                               flex items-center justify-center">
                <span className="font-display font-medium text-[color:var(--fg-primary)] text-lg">
                  {isOpen ? "×" : "N"}
                </span>
              </span>
            )}
          </span>
        </div>
      </button>
    </>
  );
}
