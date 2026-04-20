"use client";

import { useEffect, useRef, useState } from "react";

// Loader de introducción cinematico.
// Reproduce /public/loader.mp4 (generado con Gemini Veo 3.1) en fullscreen,
// luego hace fade-out y llama a onComplete() para revelar el sitio.
//
// ASSET REQUERIDO: /public/loader.mp4
// Si el video no existe, el loader muestra el wordmark KAIROS animado como fallback.
//
// Flujo: mount → video plays → onEnded → fade-out (700ms) → onComplete()
// El componente se desmonta desde el padre cuando onComplete() es llamado.

type Props = {
  onComplete: () => void;
};

export function IntroLoader({ onComplete }: Props) {
  const [fading, setFading] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [fallbackDone, setFallbackDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fallback: si no hay video, mostrar wordmark 2.5s y continuar
  useEffect(() => {
    if (!videoFailed) return;
    const t = setTimeout(() => {
      setFallbackDone(true);
      setFading(true);
      setTimeout(onComplete, 700);
    }, 2500);
    return () => clearTimeout(t);
  }, [videoFailed, onComplete]);

  const handleVideoEnd = () => {
    setFading(true);
    setTimeout(onComplete, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0F1A] flex items-center justify-center
                  transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      {!videoFailed ? (
        // Video cinematico generado con Gemini Veo 3.1
        // playbackRate=2 via onLoadedMetadata — no existe atributo HTML para esto,
        // se debe setear via JS después de que el video está cargado.
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={() => {
            if (videoRef.current) videoRef.current.playbackRate = 1.0;
          }}
          onEnded={handleVideoEnd}
          onError={() => setVideoFailed(true)}
          className="w-full h-full object-cover"
        >
          <source src="/loader.webm" type="video/webm" />
          <source src="/loader.mp4" type="video/mp4" />
        </video>
      ) : (
        // Fallback: wordmark con clip-path reveal (mismo patron que el hero)
        <div className="flex flex-col items-center gap-4">
          <span
            className="font-display font-medium text-[clamp(4rem,15vw,14rem)] leading-none
                       tracking-[-0.04em] text-[#FAF3E7]"
            style={{
              animation: fallbackDone
                ? "none"
                : "kairos-reveal 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s both",
            }}
          >
            KAIROS
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#A8B0BD]"
            style={{
              animation: "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1s both",
            }}
          >
            by Jhon Escobar
          </span>
        </div>
      )}
    </div>
  );
}
