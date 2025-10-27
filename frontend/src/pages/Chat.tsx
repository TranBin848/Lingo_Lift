import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import TypingDots from "../components/chat/TypingDots";
import type { ChatMessage as Msg } from "../services/ai";
import { streamMessage } from "../services/ai";

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      content:
        "Chào bạn! Mình là trợ lý AI. Bạn muốn luyện kỹ năng nào hôm nay?",
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
        // replace last assistant message with updated content
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...assistant };
          return copy;
        });
      },
      () => {
        // Stream completed successfully
        setIsStreaming(false);
      },
      (err) => {
        // Stream error
        console.error("Stream error:", err);
        setIsStreaming(false);
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b bg-white">
        <h1 className="text-lg font-semibold">Chat AI</h1>
        <p className="text-xs text-gray-500">Hỏi đáp trực tiếp với Gemini</p>
      </div>
      <div className="h-[calc(100%-60px-64px)] overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <TypingDots />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInput disabled={isStreaming} onSend={handleSend} />
    </div>
  );
}
