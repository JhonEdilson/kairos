import { z } from "zod";

const str = (max: number) => z.string().trim().min(1).max(max);
const optStr = (max: number) => z.string().trim().max(max).optional();

export const diagnosticoSchema = z.object({
  contact_name: str(100),
  company_name: str(150),
  email: z.string().trim().email().max(254),
  industry: optStr(80),
  employee_count: optStr(20),
  manual_processes: z.array(z.string().trim().max(80)).max(10).default([]),
  hours_per_week: optStr(20),
  people_involved: optStr(20),
  main_bottleneck: optStr(150),
  automation_goal: optStr(150),
  automation_experience: optStr(80),
  current_tools: z.array(z.string().trim().max(80)).max(15).default([]),
  ai_adoption: optStr(80),
  locale: z.enum(["es", "en"]).default("es"),
});

export type DiagnosticoInput = z.infer<typeof diagnosticoSchema>;

export const pdfSchema = z.object({
  company_name: str(150),
  contact_name: str(100),
  report: z.object({
    processes: z.array(z.string().max(300)).max(10),
    roiEstimate: z.string().max(500),
    stack: z.array(z.string().max(200)).max(10),
    nextSteps: z.array(z.string().max(300)).max(8),
    painPoint: z.string().max(500),
    summary: z.string().max(1000),
    ctaMessage: z.string().max(600).default(""),
    automationBarrier: z.string().max(600).default(""),
  }),
});

export type PdfInput = z.infer<typeof pdfSchema>;
