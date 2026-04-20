import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// MagicUI Marquee — infinite horizontal/vertical scroll.
// Source: https://magicui.design/docs/components/marquee
// Adapted: import cn from @/lib/cn (project convention)

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const outerDir = vertical ? "flex-col" : "flex-row";
  const innerAnim = vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row";
  const pauseClass = pauseOnHover ? "group-hover:[animation-play-state:paused]" : "";
  const reverseClass = reverse ? "[animation-direction:reverse]" : "";

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:2rem] gap-(--gap)",
        outerDir,
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-(--gap)",
              innerAnim,
              pauseClass,
              reverseClass
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
