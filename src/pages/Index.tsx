import { useState, useEffect } from "react";
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
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you'd like to analyze your procurement data. Once you connect your data source, I'll be able to generate interactive dashboards using High Charts. For now, I'm ready to help you plan your dashboard requirements."
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  return <div className="relative flex h-screen items-center justify-center overflow-hidden bg-white">
      {/* Dot Matrix Background */}
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Cursor Reactive Overlay */}
      <div className="absolute h-full w-full bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none transition-opacity duration-150" style={{
      maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
      WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
    }}></div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="space-y-8">
          {/* Welcome Text */}
          <div className="text-center space-y-3 animate-fade-in">
            <h1 className="text-5xl font-bold text-foreground">Welcome to Procure</h1>
            <h3 className="text-xl text-muted-foreground">Generate dynamic dashboards based on your procurement data.              </h3>
          </div>

          {/* Chat Messages - Only show when there are messages */}
          {messages.length > 0 && <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-medium max-h-[400px] overflow-hidden">
              <ChatContainer messages={messages} />
            </div>}

          {/* Input Area */}
          <div className="space-y-2">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            
          </div>
        </div>
      </div>
    </div>;
};
export default Index;