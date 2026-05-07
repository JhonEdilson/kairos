"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { StepIndicator } from "./StepIndicator";
import { ReportView } from "./ReportView";
import { LoadingAnimation } from "./LoadingAnimation";
import type { DiagnosticoReport } from "@/lib/claude-diagnostico";

// ──────────────── Types ────────────────

interface FormData {
  website_url: string;
  business_type: string;
  contact_name: string;
  company_name: string;
  email: string;
  industry: string;
  employee_count: string;
  consent: boolean;
  manual_processes: string[];
  hours_per_week: string;
  people_involved: string;
  main_bottleneck: string;
  automation_goal: string;
  automation_experience: string;
  current_tools: string[];
  ai_adoption: string;
}

const EMPTY_FORM: FormData = {
  website_url: "", business_type: "",
  contact_name: "", company_name: "", email: "", industry: "",
  employee_count: "", consent: false,
  manual_processes: [], hours_per_week: "", people_involved: "",
  main_bottleneck: "", automation_goal: "", automation_experience: "",
  current_tools: [], ai_adoption: "",
};

// ──────────────── Sub-components ────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-400">{msg}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-[color:var(--fg-muted)] mb-2 uppercase tracking-widest text-xs">
      {children}
    </label>
  );
}

function TextInput({
  value, onChange, placeholder, type = "text", required,
}: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 text-sm bg-transparent border border-[color:var(--border)]
                 focus:border-[color:var(--accent)] focus:outline-none transition-colors
                 text-[color:var(--fg-primary)] placeholder:text-[color:var(--fg-muted)]"
    />
  );
}

function SelectCard({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-sm border transition-all duration-200
                  ${selected
                    ? "border-[color:var(--accent)] text-[color:var(--fg-primary)] bg-[color:var(--accent)]/10"
                    : "border-[color:var(--border)] text-[color:var(--fg-muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--fg-primary)]"
                  }`}
    >
      <span className={`inline-block w-3.5 h-3.5 border mr-2.5 align-middle transition-colors
                        ${selected ? "border-[color:var(--accent)] bg-[color:var(--accent)]" : "border-[color:var(--fg-muted)]"}`}
      />
      {label}
    </button>
  );
}

function RadioCard({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-sm border transition-all duration-200
                  ${selected
                    ? "border-[color:var(--accent)] text-[color:var(--fg-primary)] bg-[color:var(--accent)]/10"
                    : "border-[color:var(--border)] text-[color:var(--fg-muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--fg-primary)]"
                  }`}
    >
      <span className={`inline-block w-3.5 h-3.5 rounded-full border mr-2.5 align-middle transition-colors
                        ${selected ? "border-[color:var(--accent)] bg-[color:var(--accent)]" : "border-[color:var(--fg-muted)]"}`}
      />
      {label}
    </button>
  );
}

// ──────────────── New step components ────────────────

function StepWebsite({
  data, set, errors,
}: { data: FormData; set: (k: keyof FormData, v: string) => void; errors: Record<string, string> }) {
  const t = useTranslations("diagnostico");

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-[color:var(--fg-muted)] uppercase tracking-widest text-xs">
            {t("stepWebsite.label")}
          </label>
          <span className="text-xs text-[color:var(--fg-muted)] normal-case tracking-normal font-normal">
            {t("stepWebsite.optional")}
          </span>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-[color:var(--fg-muted)] pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
          <input
            type="url"
            value={data.website_url}
            onChange={(e) => set("website_url", e.target.value)}
            placeholder={t("stepWebsite.placeholder")}
            className="w-full pl-10 pr-4 py-3 text-sm bg-transparent border border-[color:var(--border)]
                       focus:border-[color:var(--accent)] focus:outline-none transition-colors
                       text-[color:var(--fg-primary)] placeholder:text-[color:var(--fg-muted)]"
          />
        </div>
        <FieldError msg={errors.website_url} />
      </div>
    </div>
  );
}

function BizTypeCard({
  icon, label, sublabel, selected, onClick,
}: { icon: React.ReactNode; label: string; sublabel: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-3 px-6 py-8 border transition-all duration-200 cursor-pointer active:scale-[0.98] hover:scale-[1.02]
                  ${selected
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10"
                    : "border-[color:var(--border)] hover:border-[color:var(--border-strong)]"
                  }`}
    >
      <span className={`flex items-center justify-center w-14 h-14 rounded-xl transition-colors duration-200
                        ${selected ? "bg-[color:var(--accent)]/20 text-[color:var(--accent)]" : "bg-[color:var(--border)] text-[color:var(--fg-muted)]"}`}>
        {icon}
      </span>
      <span className={`text-base font-semibold tracking-tight transition-colors ${selected ? "text-[color:var(--fg-primary)]" : "text-[color:var(--fg-muted)]"}`}>
        {label}
      </span>
      <span className="text-xs text-[color:var(--fg-muted)]">{sublabel}</span>
    </button>
  );
}

function StepBizType({
  data, set,
}: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations("diagnostico");

  const b2bIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const b2cIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <BizTypeCard
        icon={b2bIcon}
        label={t("stepBizType.b2b")}
        sublabel={t("stepBizType.b2bSub")}
        selected={data.business_type === "b2b"}
        onClick={() => set("business_type", data.business_type === "b2b" ? "" : "b2b")}
      />
      <BizTypeCard
        icon={b2cIcon}
        label={t("stepBizType.b2c")}
        sublabel={t("stepBizType.b2cSub")}
        selected={data.business_type === "b2c"}
        onClick={() => set("business_type", data.business_type === "b2c" ? "" : "b2c")}
      />
    </div>
  );
}

// ──────────────── Step renderers ────────────────

function Step1({
  data, set, errors,
}: { data: FormData; set: (k: keyof FormData, v: string | boolean) => void; errors: Record<string, string> }) {
  const t = useTranslations("diagnostico");

  const industries = [
    ["tech", t("step1.industryOptions.tech")],
    ["ecommerce", t("step1.industryOptions.ecommerce")],
    ["health", t("step1.industryOptions.health")],
    ["logistics", t("step1.industryOptions.logistics")],
    ["education", t("step1.industryOptions.education")],
    ["services", t("step1.industryOptions.services")],
    ["realestate", t("step1.industryOptions.realestate")],
    ["finance", t("step1.industryOptions.finance")],
    ["other", t("step1.industryOptions.other")],
  ] as const;

  const employees = [
    ["1-5", t("step1.employeeOptions.1-5")],
    ["6-20", t("step1.employeeOptions.6-20")],
    ["21-50", t("step1.employeeOptions.21-50")],
    ["51-200", t("step1.employeeOptions.51-200")],
    ["200+", t("step1.employeeOptions.200+")],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>{t("step1.name")}</Label>
          <TextInput value={data.contact_name} onChange={(v) => set("contact_name", v)} placeholder={t("step1.namePlaceholder")} required />
          <FieldError msg={errors.contact_name} />
        </div>
        <div>
          <Label>{t("step1.company")}</Label>
          <TextInput value={data.company_name} onChange={(v) => set("company_name", v)} placeholder={t("step1.companyPlaceholder")} required />
          <FieldError msg={errors.company_name} />
        </div>
      </div>

      <div>
        <Label>{t("step1.email")}</Label>
        <TextInput type="email" value={data.email} onChange={(v) => set("email", v)} placeholder={t("step1.emailPlaceholder")} required />
        <FieldError msg={errors.email} />
      </div>

      <div>
        <Label>{t("step1.industry")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {industries.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.industry === val} onClick={() => set("industry", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step1.employees")}</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {employees.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.employee_count === val} onClick={() => set("employee_count", val)} />
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[color:var(--accent)] flex-shrink-0"
        />
        <span className="text-xs text-[color:var(--fg-muted)] leading-relaxed">
          {t("step1.consent")}
        </span>
      </label>
      <FieldError msg={errors.consent} />
    </div>
  );
}

function Step2({
  data, set, toggle,
}: { data: FormData; set: (k: keyof FormData, v: string) => void; toggle: (k: "manual_processes" | "current_tools", v: string) => void }) {
  const t = useTranslations("diagnostico");

  const processes = [
    ["crm", t("step2.processes.crm")],
    ["reports", t("step2.processes.reports")],
    ["billing", t("step2.processes.billing")],
    ["onboarding", t("step2.processes.onboarding")],
    ["support", t("step2.processes.support")],
    ["inventory", t("step2.processes.inventory")],
    ["scheduling", t("step2.processes.scheduling")],
    ["other", t("step2.processes.other")],
  ] as const;

  const hours = [
    ["lt5", t("step2.hoursOptions.lt5")],
    ["5-15", t("step2.hoursOptions.5-15")],
    ["15-30", t("step2.hoursOptions.15-30")],
    ["gt30", t("step2.hoursOptions.gt30")],
  ] as const;

  const people = [
    ["solo", t("step2.peopleOptions.solo")],
    ["2-5", t("step2.peopleOptions.2-5")],
    ["6-15", t("step2.peopleOptions.6-15")],
    ["gt15", t("step2.peopleOptions.gt15")],
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <Label>{t("step2.title")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {processes.map(([val, label]) => (
            <SelectCard key={val} label={label} selected={data.manual_processes.includes(val)} onClick={() => toggle("manual_processes", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step2.hoursTitle")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {hours.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.hours_per_week === val} onClick={() => set("hours_per_week", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step2.peopleTitle")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {people.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.people_involved === val} onClick={() => set("people_involved", val)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({
  data, set,
}: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  const t = useTranslations("diagnostico");

  const bottlenecks = [
    ["repeat", t("step3.bottleneckOptions.repeat")],
    ["errors", t("step3.bottleneckOptions.errors")],
    ["scale", t("step3.bottleneckOptions.scale")],
    ["scattered", t("step3.bottleneckOptions.scattered")],
    ["followup", t("step3.bottleneckOptions.followup")],
    ["slow", t("step3.bottleneckOptions.slow")],
  ] as const;

  const goals = [
    ["sales", t("step3.goalOptions.sales")],
    ["product", t("step3.goalOptions.product")],
    ["strategy", t("step3.goalOptions.strategy")],
    ["rest", t("step3.goalOptions.rest")],
    ["notsure", t("step3.goalOptions.notsure")],
  ] as const;

  const experiences = [
    ["no", t("step3.experienceOptions.no")],
    ["failed", t("step3.experienceOptions.failed")],
    ["partial", t("step3.experienceOptions.partial")],
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <Label>{t("step3.bottleneckTitle")}</Label>
        <div className="grid grid-cols-1 gap-2">
          {bottlenecks.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.main_bottleneck === val} onClick={() => set("main_bottleneck", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step3.goalTitle")}</Label>
        <div className="grid grid-cols-1 gap-2">
          {goals.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.automation_goal === val} onClick={() => set("automation_goal", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step3.experienceTitle")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {experiences.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.automation_experience === val} onClick={() => set("automation_experience", val)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({
  data, set, toggle,
}: { data: FormData; set: (k: keyof FormData, v: string) => void; toggle: (k: "manual_processes" | "current_tools", v: string) => void }) {
  const t = useTranslations("diagnostico");

  const tools = [
    ["google", t("step4.tools.google")],
    ["microsoft", t("step4.tools.microsoft")],
    ["slack", t("step4.tools.slack")],
    ["whatsapp", t("step4.tools.whatsapp")],
    ["crm", t("step4.tools.crm")],
    ["pm", t("step4.tools.pm")],
    ["accounting", t("step4.tools.accounting")],
    ["ecommerce", t("step4.tools.ecommerce")],
    ["none", t("step4.tools.none")],
  ] as const;

  const aiLevels = [
    ["none", t("step4.aiOptions.none")],
    ["personal", t("step4.aiOptions.personal")],
    ["partial", t("step4.aiOptions.partial")],
    ["integrated", t("step4.aiOptions.integrated")],
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <Label>{t("step4.toolsTitle")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tools.map(([val, label]) => (
            <SelectCard key={val} label={label} selected={data.current_tools.includes(val)} onClick={() => toggle("current_tools", val)} />
          ))}
        </div>
      </div>

      <div>
        <Label>{t("step4.aiTitle")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {aiLevels.map(([val, label]) => (
            <RadioCard key={val} label={label} selected={data.ai_adoption === val} onClick={() => set("ai_adoption", val)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────── Main component ────────────────

const TOTAL_STEPS = 6;
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export function DiagnosticoForm() {
  const t = useTranslations("diagnostico");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnosticoReport | null>(null);

  const setField = (k: keyof FormData, v: string | boolean) =>
    setData((prev) => ({ ...prev, [k]: v }));

  const toggleMulti = (k: "manual_processes" | "current_tools", v: string) =>
    setData((prev) => {
      const arr = prev[k] as string[];
      return {
        ...prev,
        [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v],
      };
    });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 3) {
      if (!data.contact_name.trim()) errs.contact_name = t("errors.invalid");
      if (!data.company_name.trim()) errs.company_name = t("errors.invalid");
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = t("errors.invalid");
      if (!data.consent) errs.consent = t("errors.invalid");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      submit();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };

  const submit = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/diagnostico/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_name: data.contact_name,
          company_name: data.company_name,
          email: data.email,
          website_url: data.website_url || undefined,
          business_type: data.business_type || undefined,
          industry: data.industry || undefined,
          employee_count: data.employee_count || undefined,
          manual_processes: data.manual_processes,
          hours_per_week: data.hours_per_week || undefined,
          people_involved: data.people_involved || undefined,
          main_bottleneck: data.main_bottleneck || undefined,
          automation_goal: data.automation_goal || undefined,
          automation_experience: data.automation_experience || undefined,
          current_tools: data.current_tools,
          ai_adoption: data.ai_adoption || undefined,
          locale,
        }),
      });

      if (res.status === 429) {
        const body = await res.json().catch(() => ({}));
        setApiError(body.error === "email_limit" ? t("errors.rateLimit") : t("errors.ipLimit"));
        return;
      }
      if (!res.ok) {
        setApiError(t("errors.server"));
        return;
      }

      const body = await res.json();
      setReport(body.report);
    } catch {
      setApiError(t("errors.server"));
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = [
    t("stepWebsite.title"),
    t("stepBizType.title"),
    t("step1.title"),
    t("step2.title"),
    t("step3.title"),
    t("step4.title"),
  ];

  if (isLoading) {
    return <LoadingAnimation locale={locale} />;
  }

  if (report) {
    return (
      <ReportView
        report={report}
        companyName={data.company_name}
        contactName={data.contact_name}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} labels={stepLabels} />

      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--accent)] mb-2">
          {t("badge")}
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-[color:var(--fg-primary)] tracking-tight">
          {stepLabels[step - 1]}
        </h2>
        <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
          {step === 1 && t("stepWebsite.sub")}
          {step === 2 && t("stepBizType.sub")}
          {step === 3 && t("step1.sub")}
          {step === 4 && t("step2.sub")}
          {step === 5 && t("step3.sub")}
          {step === 6 && t("step4.sub")}
        </p>
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {step === 1 && <StepWebsite data={data} set={setField} errors={errors} />}
          {step === 2 && <StepBizType data={data} set={setField} />}
          {step === 3 && <Step1 data={data} set={setField} errors={errors} />}
          {step === 4 && <Step2 data={data} set={setField} toggle={toggleMulti} />}
          {step === 5 && <Step3 data={data} set={setField} />}
          {step === 6 && <Step4 data={data} set={setField} toggle={toggleMulti} />}
        </motion.div>
      </AnimatePresence>

      {apiError && (
        <div className="mt-4 px-4 py-3 border border-red-500/30 text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <div className="flex items-center justify-between mt-10">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)] transition-colors flex items-center gap-2"
          >
            ← {t("back")}
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium
                     bg-[color:var(--accent)] text-[color:var(--fg-primary)]
                     hover:bg-[color:var(--accent-hover)] transition-colors"
        >
          {step === TOTAL_STEPS ? t("submit") : t("next")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
