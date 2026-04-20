import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<"button">, "children" | "className">;

const base =
  "inline-flex items-center gap-3 font-medium tracking-tight transition-all duration-300 group";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--fg-primary)] text-[color:var(--bg-primary)] " +
    "hover:bg-[color:var(--accent)] hover:text-[color:var(--fg-primary)]",
  accent:
    "bg-[color:var(--accent)] text-[color:var(--fg-primary)] " +
    "hover:bg-[color:var(--accent-hover)]",
  ghost:
    "border border-[color:var(--border-strong)] text-[color:var(--fg-primary)] " +
    "hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-sm",
  xl: "px-8 py-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}
