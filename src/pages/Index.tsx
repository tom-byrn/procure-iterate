import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import ChatInput from "@/components/chat/ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I understand you'd like to analyze your procurement data. Once you connect your data source, I'll be able to generate interactive dashboards using High Charts. For now, I'm ready to help you plan your dashboard requirements.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Procure</h1>
              <p className="text-xs text-muted-foreground">
                AI-Powered Procurement Analytics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden">
        <div className="mx-auto h-full max-w-5xl">
          <ChatContainer messages={messages} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Procure AI can analyze procurement data and generate dashboards.
            Results may require verification.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
