import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingDots from "./TypingDots";
import type { ChatMessage as Msg } from "../../services/ai";
import { streamMessage } from "../../services/ai";

type Props = {
  onClose: () => void;
};

export default function ChatWindow({ onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      content: "Chào bạn! Mình là trợ lý AI học tiếng Anh. Bạn cần giúp gì? 😊",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<{ cancel: () => void } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSend = (text: string) => {
    const userMsg: Msg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setIsStreaming(true);

    const assistant: Msg = { role: "model", content: "" };
    setMessages((prev) => [...prev, assistant]);

    abortRef.current = streamMessage(
      text,
      messages,
      (chunk) => {
        assistant.content += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...assistant };
          return copy;
        });
      },
      () => {
        setIsStreaming(false);
      },
      (err) => {
        console.error("Stream error:", err);
        setIsStreaming(false);
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
            <p className="text-blue-100 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1.5 transition"
          aria-label="Close chat"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-gray-500 pl-2">
            <TypingDots />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput disabled={isStreaming} onSend={handleSend} />
    </div>
  );
}
