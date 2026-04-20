import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export const chatRequestSchema = z.object({
  sessionId: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/, "sessionId must be URL-safe"),
  message: z
    .string()
    .min(1, "message must not be empty")
    .max(1000, "message exceeds 1000-character limit"),
  locale: z.enum(["es", "en"]),
  conversationHistory: z.array(chatMessageSchema).max(20).default([]),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
