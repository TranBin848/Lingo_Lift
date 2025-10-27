type Props = {
  role: "user" | "model";
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
            : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
