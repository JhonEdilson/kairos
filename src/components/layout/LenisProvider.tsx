"use client";

import { useEffect } from "react";

// Wrapper client que inicializa smooth scroll global con Lenis
// y lo sincroniza con GSAP ScrollTrigger.
//
// Importa GSAP y Lenis dinámicamente (dentro de useEffect) para que
// no entren en el bundle crítico — se cargan en paralelo al primer paint.
// En dispositivos touch (mobile) se omite: el scroll nativo es más rápido
// y elimina completamente la carga de GSAP en mobile.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Touch devices: native momentum scroll es mejor UX y elimina el TBT de GSAP
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let cleanup: (() => void) | undefined;

    Promise.all([
      import("lenis").then((m) => m.default),
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.default),
    ]).then(([Lenis, gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      };
    });

    return () => cleanup?.();
  }, []);

  return <>{children}</>;
}
