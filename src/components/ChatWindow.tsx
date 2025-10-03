import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { sendChatMessage } from "../lib/api";
import type { Message } from "../types";
import Link from "next/link";

const uuidv4 = () => crypto.randomUUID();

const QUICK_PROMPTS = [
    "Write a simple AI policy",
    "Help me explain AI ethics to my students",
    "Summarize AI risks for a meeting",
    "Suggest AI guidelines for student homework",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: uuidv4(),
      role: "system",
      text: "Hi! I'm your AI Policy chatbot. Try a quick prompt below.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const addLocalMessage = (role: Message["role"], text: string) => {
    setMessages((m) => [
      ...m,
      { id: uuidv4(), role, text, createdAt: new Date().toISOString() },
    ]);
  };

  const handleSend = async (text: string) => {
    addLocalMessage("user", text);
    setLoading(true);
    try {
      const data = await sendChatMessage({ text });
      const reply = data?.answer || "No reply from server.";
      addLocalMessage("assistant", reply);
    } catch {
      addLocalMessage("assistant", "Can't reach backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-lg p-5">
      <div className="flex items-center mb-4">
        <div className="ml-auto">
          <Link href="/policy" className="btn btn-primary shadow">
            Generate Policy
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="border border-slate-200 rounded-xl h-[500px] overflow-auto p-4 bg-gradient-to-b from-slate-50 to-white">
          <MessageList messages={messages} />
          {loading && (
            <div className="flex items-center gap-1 text-slate-500 text-sm px-2 py-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex mt-3 flex-wrap">
        {QUICK_PROMPTS.map((q) => (
          <button
            key={q}
            className="px-4 py-2 text-sm rounded-full bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:bg-blue-50 transition mx-auto"
            onClick={() => handleSend(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <MessageInput onSend={handleSend} disabled={loading} />
      </div>
    </section>
  );
}
