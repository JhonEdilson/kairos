"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";

const AnimateOnScrollClient = dynamic(
  () =>
    import("./AnimateOnScrollClient").then((m) => m.AnimateOnScrollClient),
  { ssr: false }
);

export function AnimateOnScroll({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnimateOnScrollClient delay={delay}>{children}</AnimateOnScrollClient>
    </Suspense>
  );
}
