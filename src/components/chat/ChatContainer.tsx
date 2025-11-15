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
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md animate-fade-in">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-medium">
              <span className="text-3xl">📊</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to Procure AI
          </h2>
          <p className="text-muted-foreground">
            Start by asking about your procurement data or request a custom
            dashboard visualization. I'll help you analyze and visualize your
            data with dynamic charts.
          </p>
        </div>
      </div>
    );
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
