"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  words: string[];
};

// Cicla entre palabras con fade-slide. Arranca 3s después del mount
// para dejar que las animaciones de reveal del headline terminen primero.
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
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="inline-block"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
