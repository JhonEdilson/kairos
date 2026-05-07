"use client";

import { AnimatedList } from "@/components/ui/animated-list";

const stepsES = [
  { icon: "🔍", text: "Analizando tus procesos actuales..." },
  { icon: "⚡", text: "Identificando cuellos de botella en tu operación..." },
  { icon: "⏱️", text: "Calculando el tiempo que podrías recuperar cada semana..." },
  { icon: "💡", text: "Encontrando oportunidades de mejora en tu sector..." },
  { icon: "🛠️", text: "Seleccionando las mejores herramientas para tu caso..." },
  { icon: "📋", text: "Preparando tu informe personalizado..." },
];

const stepsEN = [
  { icon: "🔍", text: "Analyzing your current processes..." },
  { icon: "⚡", text: "Identifying bottlenecks in your operation..." },
  { icon: "⏱️", text: "Calculating time you could recover each week..." },
  { icon: "💡", text: "Finding improvement opportunities in your sector..." },
  { icon: "🛠️", text: "Selecting the best tools for your case..." },
  { icon: "📋", text: "Preparing your personalized report..." },
];

interface Props {
  locale?: string;
}

export function LoadingAnimation({ locale = "es" }: Props) {
  const steps = locale === "en" ? stepsEN : stepsES;
  const heading = locale === "en" ? "Generating your diagnosis..." : "Generando tu diagnóstico...";

  return (
    <div className="w-full max-w-lg mx-auto py-16">
      <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--accent)] mb-2 text-center">
        {locale === "en" ? "FREE DIAGNOSIS" : "DIAGNÓSTICO GRATUITO"}
      </p>
      <h2 className="font-display text-2xl text-[color:var(--fg-primary)] text-center mb-12">
        {heading}
      </h2>

      <AnimatedList delay={1400}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="w-full flex items-center gap-4 px-5 py-4
                       bg-[color:var(--bg-secondary)]
                       border border-[color:var(--border)]"
          >
            <span className="text-xl flex-shrink-0" aria-hidden>{step.icon}</span>
            <span className="text-sm text-[color:var(--fg-primary)]">{step.text}</span>
            <span className="ml-auto text-[color:var(--accent)] text-xs font-mono flex-shrink-0">✓</span>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
