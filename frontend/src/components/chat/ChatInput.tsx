import { useState } from "react";

type Props = {
  disabled?: boolean;
  onSend: (message: string) => void;
};

export default function ChatInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const msg = value.trim();
    if (!msg) return;
    onSend(msg);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-gray-200 p-3 bg-white">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder="Nhập tin nhắn..."
        className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] max-h-40"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="h-[44px] px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow"
      >
        Gửi
      </button>
    </div>
  );
}
