import { NextRequest, NextResponse } from "next/server";
import { diagnosticoSchema } from "@/lib/diagnostico-schema";
import { limitDiagnostic, clientIp, hashIp } from "@/lib/rate-limit";
import { generateDiagnostico } from "@/lib/claude-diagnostico";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// ── Option code → human-readable label mappings ──────────────────────────────
// Keys match the values sent by the form radio/select buttons.
// Stored in Spanish (primary audience) alongside the raw code for filtering.

const BOTTLENECK_LABELS: Record<string, string> = {
  repeat:    "Responde las mismas preguntas constantemente",
  errors:    "Los procesos manuales generan errores costosos",
  scale:     "No puede crecer sin contratar más gente",
  scattered: "Los datos están dispersos en varias herramientas",
  followup:  "Pierde clientes por falta de seguimiento",
  slow:      "Sus procesos son más lentos que la competencia",
};

const GOAL_LABELS: Record<string, string> = {
  sales:    "Conseguir más clientes o ventas",
  product:  "Mejorar el producto o servicio",
  strategy: "Trabajo más estratégico e innovación",
  rest:     "Descanso y balance",
  notsure:  "No sé, pero necesito el tiempo",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  no:      "Nunca ha intentado automatizar",
  failed:  "Lo intentó antes pero no funcionó bien",
  partial: "Tiene algunas cosas automatizadas",
};

const HOURS_LABELS: Record<string, string> = {
  "lt5":   "Menos de 5 horas/semana",
  "5-15":  "5 a 15 horas/semana",
  "15-30": "15 a 30 horas/semana",
  "gt30":  "Más de 30 horas/semana",
};

const PEOPLE_LABELS: Record<string, string> = {
  solo:  "Solo el dueño o responsable",
  "2-5": "2 a 5 personas",
  "6-15":"6 a 15 personas",
  gt15:  "Más de 15 personas",
};

function label<T extends Record<string, string>>(map: T, code: string | undefined): string {
  if (!code) return "";
  return map[code] ?? code;
}

// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP
  const ip = clientIp(req);
  const rl = await limitDiagnostic(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: "ip_limit" },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  // 2. Parse + validate
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = diagnosticoSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 3. Check per-email rate limit in DB (1 per 7 days)
  let supabase: ReturnType<typeof createAdminClient> | null = null;
  try {
    supabase = createAdminClient();
    const since = new Date(Date.now() - SEVEN_DAYS_MS).toISOString();
    const { data: existing } = await supabase
      .from("diagnostics")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .gte("created_at", since)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "email_limit" }, { status: 429 });
    }
  } catch (err) {
    console.warn("[api/diagnostico] Supabase check skipped:", err);
    supabase = null;
  }

  // 4. Generate AI report
  let report;
  try {
    report = await generateDiagnostico(data);
  } catch (err) {
    console.error("[api/diagnostico] AI error:", err);
    return NextResponse.json({ error: "ai_error" }, { status: 502 });
  }

  // 5. Save to DB (best-effort — don't fail the request if this errors)
  if (supabase) {
    try {
      await supabase.from("diagnostics").insert({
        contact_name:          data.contact_name,
        company_name:          data.company_name,
        email:                 data.email.toLowerCase(),
        industry:              data.industry,
        employee_count:        data.employee_count,
        manual_processes:      data.manual_processes,
        // Human-readable labels instead of raw option codes
        hours_per_week:        label(HOURS_LABELS,      data.hours_per_week),
        people_involved:       label(PEOPLE_LABELS,     data.people_involved),
        main_bottleneck:       label(BOTTLENECK_LABELS, data.main_bottleneck),
        automation_goal:       label(GOAL_LABELS,       data.automation_goal),
        automation_experience: label(EXPERIENCE_LABELS, data.automation_experience),
        current_tools:         data.current_tools,
        ai_adoption:           data.ai_adoption,
        // AI-generated analysis fields
        report_summary:        report.summary,
        pain_point_detail:     report.painPoint,
        automation_barrier:    report.automationBarrier,
        locale:                data.locale,
        ip_hash:               hashIp(ip),
      });
    } catch (err) {
      console.error("[api/diagnostico] DB insert error:", err);
    }
  }

  return NextResponse.json({ report });
}
