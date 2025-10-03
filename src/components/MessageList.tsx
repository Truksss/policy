import React from "react";
import MessageItem from "./MessageItem";
import type { Message } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul className="space-y-4">
      <AnimatePresence>
        {messages.map((m) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageItem message={m} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
