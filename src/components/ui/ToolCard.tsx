import { cn } from "@/lib/cn";

type Props = {
  name: string;
  size?: "sm" | "lg";
  invert?: boolean;
};

export function ToolCard({ name, size = "sm", invert = false }: Props) {
  return (
    <div
      className={cn(
        "transition-colors",
        size === "sm" ? "p-6" : "p-8",
        invert
          ? "bg-[color:var(--bg-primary)] hover:bg-[color:var(--bg-secondary)]"
          : "bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-primary)]"
      )}
    >
      <span
        className={cn(
          "font-display font-medium tracking-tight",
          size === "sm" ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
        )}
      >
        {name}
      </span>
    </div>
  );
}
