import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

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
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anon";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
