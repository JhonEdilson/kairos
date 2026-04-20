"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger una sola vez — seguro hacerlo en el provider global.
gsap.registerPlugin(ScrollTrigger);

// Wrapper client que inicializa smooth scroll global con Lenis
// y lo sincroniza con GSAP ScrollTrigger.
//
// Patron de integración Lenis + GSAP (oficial):
// - gsap.ticker reemplaza el RAF loop manual de Lenis
// - lenis.on('scroll', ScrollTrigger.update) mantiene ScrollTrigger en sync
// - gsap.ticker.lagSmoothing(0) elimina el lag compensation que rompe el sync
//
// Resultado: Lenis maneja la física del scroll suave, ScrollTrigger puede
// hacer pin, scrub y snap sobre ese scroll sin conflictos.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync: cuando Lenis scrollea → actualizar ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Usar gsap.ticker en lugar de requestAnimationFrame manual.
    // Esto asegura que Lenis y GSAP comparten el mismo tick de animación.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
