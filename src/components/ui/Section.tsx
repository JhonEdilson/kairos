import { cn } from "@/lib/cn";

// Wrapper semantico para secciones del sitio.
// Patron: eyebrow monoespacial + heading display + grid de contenido.
// Padding generoso (py-32) crea el "breathing room" del genero.
type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: Props) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">{children}</div>
    </section>
  );
}

// Eyebrow = label pequeno, mono, uppercase con dot pulsante
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="ticker-dot" />
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
        {children}
      </span>
    </div>
  );
}

// Heading display con estilo tight del genero cinematic
export function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] text-balance max-w-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
