import { MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              AI Policy Chatbot
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
