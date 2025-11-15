import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <ScrollArea className="h-full" ref={scrollRef}>
      <div className="divide-y divide-border">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
