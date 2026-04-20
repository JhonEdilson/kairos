"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const panelAnim = {
  initial: { opacity: 0, scale: 0.9, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit:    { opacity: 0, scale: 0.88, y: 18 },
  transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
};

type SuggestedAction = {
  type: "calendly" | "whatsapp";
  url: string;
  label: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: SuggestedAction[];
};

type Props = {
  onClose: () => void;
  initialMessage?: string | null;
  onInitialMessageConsumed?: () => void;
};

export function NagiChat({ onClose, initialMessage, onInitialMessageConsumed }: Props) {
  const locale = useLocale();
  const t = useTranslations("nagi");

  const [phase, setPhase] = useState<"welcome" | "chat">("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  // Pre-fill el input si se abrió con contexto externo (ej: CTA del Plan Partner)
  const [input, setInput] = useState(initialMessage ?? "");
  const [loading, setLoading] = useState(false);

  const [sessionId] = useState<string>(() => {
    if (typeof window === "undefined") return crypto.randomUUID();
    const stored = localStorage.getItem("nagi-session-id");
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem("nagi-session-id", newId);
    return newId;
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Limpia el pendingMessage del padre al montar para que el FAB no re-use el contexto
  useEffect(() => {
    if (initialMessage) onInitialMessageConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (quickText?: string) => {
    const text = quickText ?? input.trim();
    if (!text || loading) return;
    if (text.length > 1000) {
      setInput(text.slice(0, 1000));
      return;
    }

    if (!quickText) setInput("");
    if (phase === "welcome") setPhase("chat");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text, locale, conversationHistory }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          actions: data.suggestedActions ?? [],
        },
      ]);
    } catch {
      const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chat.errorFallback"),
          actions: [{ type: "calendly", url: calendlyUrl, label: t("chat.bookCall") }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = t.raw("quickChips") as string[];

  /* ── WELCOME STATE ── */
  if (phase === "welcome") {
    return (
      <motion.div
        className="fixed bottom-24 right-6 z-50 flex flex-col
                    w-[400px] max-w-[calc(100vw-1.5rem)] h-[540px] max-h-[85vh]
                    bg-[color:var(--bg-tertiary)] border border-[color:var(--border-strong)]
                    rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)]
                    overflow-hidden"
        style={{ transformOrigin: "bottom right" }}
        {...panelAnim}
      >
        {/* Close button — absolute top-right */}
        <button
          onClick={onClose}
          aria-label={t("chat.close")}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white
                     transition-colors p-1.5 rounded-lg hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hero background */}
        <div
          className="relative h-[220px] shrink-0 overflow-hidden rounded-t-2xl"
          style={{
            background: [
              "radial-gradient(ellipse 65% 55% at 75% 25%, rgba(217,119,6,0.28) 0%, transparent 65%)",
              "radial-gradient(ellipse 45% 55% at 15% 80%, rgba(30,58,138,0.25) 0%, transparent 60%)",
              "linear-gradient(160deg, #101828 0%, #0B0F1A 100%)",
            ].join(", "),
          }}
        >
          {/* Large N watermark */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center
                       font-display font-bold leading-none select-none pointer-events-none
                       text-white/[0.04]"
            style={{ fontSize: "200px" }}
          >
            N
          </span>

          {/* Intro text — bottom-left */}
          <div className="absolute bottom-6 left-6">
            <p className="font-display font-medium text-xl text-white leading-tight">
              {t("welcomeTitle")}
            </p>
            <p className="font-mono text-[10px] text-white/45 mt-1 uppercase tracking-[0.15em]">
              {t("welcomeSubtitle")}
            </p>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-col gap-2 px-4 pt-4 pb-2">
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => send(chip)}
              className="text-left px-4 py-2.5 rounded-xl text-sm
                         border border-[color:var(--border-strong)]
                         text-[color:var(--fg-muted)] hover:text-[color:var(--fg-primary)]
                         hover:border-[color:var(--accent)]/50 hover:bg-[color:var(--bg-secondary)]
                         transition-all duration-200"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-auto px-4 pb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={t("chat.placeholder")}
              maxLength={1000}
              className="flex-1 bg-[color:var(--bg-secondary)] rounded-xl px-4 py-2.5 text-sm
                         placeholder:text-[color:var(--fg-muted)] outline-none
                         focus:ring-1 focus:ring-[color:var(--accent)]/50 transition-opacity"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              aria-label="Send"
              className="w-10 h-10 rounded-xl bg-[color:var(--accent)] flex items-center justify-center
                         hover:opacity-90 active:scale-95 disabled:opacity-40
                         transition-all duration-150 shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 7.5L2.5 2.5l2 5-2 5 11-5z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── CHAT STATE ── */
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50 flex flex-col
                  w-[380px] max-w-[calc(100vw-1.5rem)] h-[480px] max-h-[80vh]
                  bg-[color:var(--bg-tertiary)] border border-[color:var(--border-strong)]
                  rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)]
                  overflow-hidden"
      style={{ transformOrigin: "bottom right" }}
      {...panelAnim}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--border)] shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[color:var(--accent)] flex items-center justify-center shrink-0">
            <span className="font-display font-medium text-[color:var(--fg-primary)] text-sm leading-none">
              N
            </span>
          </span>
          <div>
            <p className="font-medium text-sm leading-none">Nagi</p>
            <p className="font-mono text-[10px] text-[color:var(--fg-muted)] mt-0.5">
              {t("hint")}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label={t("chat.close")}
          className="text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] transition-colors p-1 rounded-lg hover:bg-[color:var(--bg-secondary)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 nagi-scroll"
        data-lenis-prevent
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[color:var(--accent)] text-[color:var(--fg-primary)] rounded-2xl rounded-br-sm"
                  : "bg-[color:var(--bg-secondary)] text-[color:var(--fg)] rounded-2xl rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>

            {msg.actions && msg.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 max-w-[85%]">
                {msg.actions.map((action, j) => (
                  <a
                    key={j}
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                               border border-[color:var(--accent)] text-[color:var(--accent)]
                               hover:bg-[color:var(--accent)] hover:text-[color:var(--fg-primary)]
                               transition-colors duration-200"
                  >
                    {action.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-start">
            <div className="bg-[color:var(--bg-secondary)] rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--fg-muted)] animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--fg-muted)] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--fg-muted)] animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[color:var(--border)] shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={t("chat.placeholder")}
            disabled={loading}
            maxLength={1000}
            className="flex-1 bg-[color:var(--bg-secondary)] rounded-xl px-4 py-2.5 text-sm
                       placeholder:text-[color:var(--fg-muted)] outline-none
                       focus:ring-1 focus:ring-[color:var(--accent)]/50
                       disabled:opacity-50 transition-opacity"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="w-10 h-10 rounded-xl bg-[color:var(--accent)] flex items-center justify-center
                       hover:opacity-90 active:scale-95 disabled:opacity-40
                       transition-all duration-150 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 7.5L2.5 2.5l2 5-2 5 11-5z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
