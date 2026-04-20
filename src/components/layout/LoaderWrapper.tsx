"use client";

import { useEffect, useState } from "react";
import { IntroLoader } from "./IntroLoader";

const STORAGE_KEY = "kairos:introPlayed";

export function LoaderWrapper() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      if (!played) {
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
  };

  if (!showLoader) return null;
  return <IntroLoader onComplete={handleComplete} />;
}
