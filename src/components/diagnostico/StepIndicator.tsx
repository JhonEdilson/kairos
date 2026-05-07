"use client";

interface Props {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: Props) {
  const pct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.9375rem] font-mono text-[color:var(--fg-muted)] uppercase tracking-widest">
          {labels?.[currentStep - 1] ?? `Paso ${currentStep} de ${totalSteps}`}
        </span>
        <span className="text-[0.9375rem] font-mono text-[color:var(--accent)]">{pct}%</span>
      </div>
      <div className="h-px w-full bg-[color:var(--border)]">
        <div
          className="h-px bg-[color:var(--accent)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
