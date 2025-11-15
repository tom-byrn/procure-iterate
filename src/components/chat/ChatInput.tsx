import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}
const ChatInput = ({
  onSendMessage,
  disabled
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 rounded-3xl border border-input bg-card p-3 shadow-medium transition-all duration-300 focus-within:border-primary focus-within:shadow-lg">
        <Button type="button" variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="What type of dashboard would you like?" disabled={disabled} rows={1} className="min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 leading-tight" />
        <Button type="submit" size="icon" disabled={!message.trim() || disabled} className={cn("shrink-0 rounded-xl bg-gradient-primary transition-all duration-300", message.trim() && !disabled ? "scale-100 opacity-100" : "scale-90 opacity-50")}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>;
};
export default ChatInput;