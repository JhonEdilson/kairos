import { createClient } from "@supabase/supabase-js";

// Server-only: imported ONLY in API routes, never in client components.
// Uses the service_role key — full DB access, must stay server-side.
export function createAdminClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawUrl || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  // Strip any path suffix — the JS client needs just the project root URL.
  // e.g. "https://xyz.supabase.co/rest/v1/" → "https://xyz.supabase.co"
  const url = rawUrl.replace(/\/(rest\/v1\/?|auth\/v1\/?).*$/, "").replace(/\/$/, "");

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

/*
  SQL to run in Supabase SQL editor:

  CREATE TABLE diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    contact_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    industry TEXT,
    employee_count TEXT,
    manual_processes TEXT[],
    hours_per_week TEXT,
    people_involved TEXT,
    main_bottleneck TEXT,
    automation_goal TEXT,
    automation_experience TEXT,
    current_tools TEXT[],
    ai_adoption TEXT,
    report_summary TEXT,
    locale TEXT DEFAULT 'es',
    ip_hash TEXT
  );

  CREATE INDEX idx_diagnostics_email ON diagnostics(email);
  CREATE INDEX idx_diagnostics_created_at ON diagnostics(created_at);

  ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;
  -- Only service_role can read/write (default with RLS + no policies)
*/
