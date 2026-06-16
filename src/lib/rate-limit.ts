import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// Fail-open con aviso: si en producción faltan las env de Upstash, el rate
// limiting queda desactivado en TODAS las rutas. Sin este warning el deploy
// quedaría expuesto a abuso de costo (OpenAI/n8n) en silencio.
if (!hasUpstash && process.env.NODE_ENV === "production") {
  console.warn(
    "[rate-limit] Upstash no configurado (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN ausentes). " +
      "Las rutas /api/chat y /api/diagnostico/* quedan SIN rate limiting."
  );
}

const redis = hasUpstash ? Redis.fromEnv() : null;

export const chatLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "kairos:chat",
    })
  : null;

// Diagnostic endpoint: 5 attempts per hour per IP
export const diagnosticLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
      prefix: "kairos:diagnostic",
    })
  : null;

export async function limit(identifier: string) {
  if (!chatLimiter) {
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }
  return chatLimiter.limit(identifier);
}

export async function limitDiagnostic(identifier: string) {
  if (!diagnosticLimiter) {
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }
  return diagnosticLimiter.limit(identifier);
}

export function clientIp(req: Request): string {
  // x-real-ip lo fija el edge de Vercel con la IP real del cliente y NO es
  // falsificable por el cliente. x-forwarded-for SÍ puede venir manipulado
  // (el cliente prepende su propio valor), así que queda solo como fallback.
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return "anon";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
