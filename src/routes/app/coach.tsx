import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { askCoach, getProfile, listCoachMessages, type CoachMessage } from "@/lib/hale-server";

export const Route = createFileRoute("/app/coach")({ component: CoachPage });

function CoachPage() {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [program, setProgram] = useState<string | undefined>();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listCoachMessages()
      .then(setMessages)
      .catch(() => setMessages([]));
    getProfile()
      .then((p) => setProgram(p?.program_slug ?? undefined))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const q = text.trim();
    if (!q || busy) return;
    setText("");
    setBusy(true);
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: "user", body: q, created_at: new Date().toISOString() },
    ]);
    try {
      const res = await askCoach({ data: { question: q, program } });
      if (res.ok) {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            role: "coach",
            body: res.text,
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            role: "coach",
            body: res.error,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70dvh] flex-col">
      <p className="eyebrow text-paper/45">Coach</p>
      <h1 className="display mt-2 text-4xl">Ask the coach</h1>
      <p className="mt-2 text-sm text-paper/55">
        Technique, programming, and nutrition. Keep questions concise.
      </p>

      <div className="mt-6 flex-1 space-y-4">
        {messages.length === 0 ? (
          <p className="rounded-2xl bg-paper/8 px-4 py-3 text-sm text-paper/70">
            Ask about today’s session, a lift that is stalling, or your protein target.
          </p>
        ) : null}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-paper text-ink"
                : "bg-paper/8 text-paper"
            }`}
          >
            {m.body}
          </div>
        ))}
        {busy ? <p className="text-xs text-paper/40">Coach is writing…</p> : null}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="sticky bottom-20 mt-6 flex gap-2 md:bottom-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question"
          className="h-12 flex-1 rounded-full border border-paper/15 bg-paper/5 px-5 text-sm text-paper placeholder:text-paper/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/25"
        />
        <Button type="submit" variant="inverse" disabled={busy}>
          Send
        </Button>
      </form>
    </div>
  );
}
