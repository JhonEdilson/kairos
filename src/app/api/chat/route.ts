import { NextRequest, NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validate-chat";
import { limit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function stubReply(message: string, locale: string) {
  const isEN = locale === "en";
  const summary = message
    ? encodeURIComponent(`Hola Jhon, vengo del chat en Kairos. Consulté sobre: "${message}".`)
    : "";
  const waUrl = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${summary}` : "#";
  return {
    reply: isEN
      ? "Hi, I'm Nagi — currently in training mode. For now, the best way to get a concrete answer is to book a 20-minute call or send me a WhatsApp."
      : "Hola, soy Nagi — estoy en modo de entrenamiento. Por ahora, la forma más directa de obtener una respuesta concreta es agendar una llamada de 20 minutos o escribirme por WhatsApp.",
    suggestedActions: [
      ...(CALENDLY_URL
        ? [{ type: "calendly", url: CALENDLY_URL, label: isEN ? "Book 20-min call" : "Agendar llamada" }]
        : []),
      ...(WHATSAPP_NUMBER
        ? [{ type: "whatsapp", url: waUrl, label: isEN ? "Message on WhatsApp" : "Escribir por WhatsApp" }]
        : []),
    ],
  };
}

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP
  const ip = clientIp(req);
  const rl = await limit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { reply: "Demasiadas solicitudes. Intenta en un minuto.", suggestedActions: [] },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // 2. Parse + validate
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  const parsed = chatRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid body", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const body = parsed.data;

  // 3. Stub mode (webhook not configured)
  if (!WEBHOOK_URL) {
    return NextResponse.json(stubReply(body.message, body.locale));
  }

  // 4. Proxy to n8n with shared-secret header
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(WEBHOOK_SECRET ? { "X-Webhook-Secret": WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`n8n ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/chat] webhook error:", err);
    return NextResponse.json(stubReply(body.message, body.locale));
  }
}
