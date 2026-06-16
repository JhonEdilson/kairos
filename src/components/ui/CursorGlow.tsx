"use client";

import { useEffect, useRef } from "react";

const TRAIL = 10;

export function CursorGlow() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouse     = useRef({ x: -300, y: -300 });
  const glowPos   = useRef({ x: -300, y: -300 });
  const history   = useRef(Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 })));

  // Solo en dispositivos con puntero fino (mouse). En touch no hay cursor que
  // seguir: salir temprano evita un rAF infinito y trabajo inútil en móvil.
  // Los elementos arrancan fuera de pantalla (transform inicial abajo), así que
  // sin este efecto no se ve ningún artefacto. Mismo patrón que LenisProvider.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const { x: mx, y: my } = mouse.current;

      // Dot snaps directly to cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }

      // Glow drifts behind with lag
      glowPos.current.x = lerp(glowPos.current.x, mx, 0.20);
      glowPos.current.y = lerp(glowPos.current.y, my, 0.20);
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glowPos.current.x}px, ${glowPos.current.y}px)`;
      }

      // Shift trail history
      history.current = [{ x: mx, y: my }, ...history.current.slice(0, TRAIL - 1)];

      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const pos = history.current[i + 1];
        if (!pos) return;
        const t       = i / TRAIL;
        const size    = 5 * (1 - t * 0.7);
        const opacity = (1 - t) * 0.9;
        el.style.transform  = `translate(${pos.x}px, ${pos.y}px)`;
        el.style.opacity    = String(opacity);
        el.style.width      = `${size}px`;
        el.style.height     = `${size}px`;
        el.style.marginLeft = `${-size / 2}px`;
        el.style.marginTop  = `${-size / 2}px`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Lantern glow — teal, drifts behind cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(20,184,166,0.28) 0%, rgba(20,184,166,0.14) 25%, rgba(20,184,166,0.03) 55%, transparent 70%)",
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
        }}
      />

      {/* Trail */}
      {Array.from({ length: TRAIL - 1 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailsRef.current[i] = el; }}
          className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
          style={{
            width: 3.5,
            height: 3.5,
            backgroundColor: "#14B8A6",
            transform: "translate(-9999px, -9999px)",
            willChange: "transform, opacity, width, height",
          }}
        />
      ))}

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          backgroundColor: "#14B8A6",
          boxShadow: "0 0 6px #14B8A6, 0 0 14px rgba(20,184,166,0.7), 0 0 24px rgba(20,184,166,0.3)",
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
        }}
      />
    </>
  );
}
