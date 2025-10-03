import React from "react";
import type { Message } from "../types";
import { Clipboard, RefreshCw, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Props = {
  message: Message;
  onRegenerate?: (msg: Message) => void;
  onUseAsPrompt?: (msg: Message) => void;
};

export default function MessageItem({ message, onRegenerate }: Props) {
  const fromUser = message.role === "user";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
  };

  return (
    <div
      className={`flex gap-2 ${
        fromUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant avatar */}
      {!fromUser && (
        <div className="flex-shrink-0">
          <div className="h-7 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}

      <div className={`relative group ${fromUser ? "order-1" : ""}`}>
        <div
          className={`${
            fromUser
              ? "bg-blue-600 text-white"
              : "bg-slate-50 border border-slate-200"
          } max-w-[1000px] px-4 py-3 rounded-2xl shadow-sm`}
        >
          <div
            className={`text-[10px] font-medium mb-2 ${
              fromUser ? "text-blue-200" : "text-slate-500"
            }`}
          >
            {fromUser ? "You" : "Assistant"}
          </div>

          {fromUser ? (
            <div className="text-10px leading-relaxed whitespace-pre-wrap">
              {message.text}
            </div>
          ) : (
            <div className="text-10px leading-relaxed space-y-1">
              <ReactMarkdown
                components={{
                  p: ({ ...props }) => <p className="mb-1" {...props} />,
                  ul: ({ ...props }) => (
                    <ul className="mb-1 list-disc list-inside" {...props} />
                  ),
                  li: ({ ...props }) => <li className="mb-0" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="absolute -bottom-6 left-0 flex gap-3 opacity-0 group-hover:opacity-100 transition">
          <ActionButton
            label="Copy"
            icon={<Clipboard size={14} />}
            onClick={copyToClipboard}
          />
          {!fromUser && onRegenerate && (
            <ActionButton
              label="Retry"
              icon={<RefreshCw size={14} />}
              onClick={() => onRegenerate(message)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
      title={label}
    >
      {icon} {label}
    </button>
  );
}