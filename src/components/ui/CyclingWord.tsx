"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
};

// Cicla entre palabras con un fade-slide en CSS (sin framer-motion, para no
// arrastrar la librería al bundle inicial del Hero, que es el LCP).
// Arranca 3s después del mount para dejar terminar el reveal del headline.
// key={index} remonta el <span> en cada cambio, replayando la animación CSS.
export function CyclingWord({ words }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % words.length);
      }, 2500);
    }, 3000);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [words.length]);

  return (
    <span key={index} className="cycling-word">
      {words[index]}
    </span>
  );
}
