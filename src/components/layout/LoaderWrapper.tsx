"use client";

import { useEffect, useState } from "react";
import { IntroLoader } from "./IntroLoader";

const STORAGE_KEY = "kairos:introPlayed";

export function LoaderWrapper() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Skip on touch/mobile — intro video no añade valor en pantallas pequeñas
    // y bloquea el LCP ~3s en mobile Lighthouse.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      if (!played) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowLoader(true);
        document.body.style.overflow = "hidden";
      }
    } catch {
      // private mode or SSR — fail open (no loader)
    }
  }, []);

  const handleComplete = () => {
    setShowLoader(false);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    // Layout shift: liberar overflow cambia la altura del documento.
    // Notificar a ScrollTrigger (ScrollShowcase) para que re-mida sus triggers.
    window.dispatchEvent(new Event("intro:complete"));
  };

  if (!showLoader) return null;
  return <IntroLoader onComplete={handleComplete} />;
}
