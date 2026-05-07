import { NextRequest, NextResponse } from "next/server";
import React from "react";
import ReactPDF, { type DocumentProps } from "@react-pdf/renderer";
import type { JSXElementConstructor, ReactElement } from "react";
import { pdfSchema } from "@/lib/diagnostico-schema";
import { DiagnosticoPDF } from "@/lib/pdf/DiagnosticoPDF";
import { limitDiagnostic, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Rate limit: reuse diagnostic limiter
  const ip = clientIp(req);
  const rl = await limitDiagnostic(ip);
  if (!rl.success) {
    return NextResponse.json({ error: "rate_limit" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = pdfSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { company_name, contact_name, report } = parsed.data;

  const locale = (req.headers.get("accept-language") ?? "es").startsWith("en")
    ? "en"
    : "es";

  try {
    const element = React.createElement(DiagnosticoPDF, {
      companyName: company_name,
      contactName: contact_name,
      report,
      locale,
    }) as ReactElement<DocumentProps, string | JSXElementConstructor<unknown>>;

    const buffer = await ReactPDF.renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="diagnostico-kairos-${company_name.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[api/diagnostico/pdf] render error:", err);
    return NextResponse.json({ error: "pdf_error" }, { status: 500 });
  }
}
