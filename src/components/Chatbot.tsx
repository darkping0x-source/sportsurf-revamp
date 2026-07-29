"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Bot, X, Send } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

const WELCOME: Message = {
  role: "model",
  text: "Hi, I'm SportSurf's AI assistant. Ask me about our products, projects, certifications, or how to get a quote.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const history = messages.filter((m) => m !== WELCOME);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply ?? "Something went wrong. Please try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having trouble connecting. Please WhatsApp us at +91 91886 71109 or email info@sportsurf.in.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-navy/10 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <div>
              <p className="flex items-center gap-1.5 font-semibold">
                SportSurf Assistant
                <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-navy uppercase">
                  AI
                </span>
              </p>
              <p className="text-xs text-white/60">Automated, not a human</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-navy text-white"
                    : "border border-navy/10 bg-white text-navy"
                }`}
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <div className="max-w-[85%] rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm text-navy/50">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-navy/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-md border border-navy/15 px-3 py-2 text-sm text-navy focus:border-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold text-navy transition hover:bg-amber disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        {!open && (
          <span className="hidden items-center gap-1.5 rounded-full bg-navy px-3 py-2 text-xs font-semibold text-white shadow-lg sm:flex">
            <Bot className="h-3.5 w-3.5 text-gold" /> Ask our AI
          </span>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open AI chat assistant"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition hover:bg-amber"
        >
          {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
