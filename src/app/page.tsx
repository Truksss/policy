"use client";

import ChatWindow from "../components/ChatWindow";
import Header from "../components/Header";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <ChatWindow />
      </div>
    </main>
  );
}
