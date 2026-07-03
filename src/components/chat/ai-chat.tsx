"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What can you do?",
  "Tell me about Suhaib",
  "Show me your skills",
  "Contact info",
];

const responses: Record<string, string> = {
  "what can you do": "I'm Suhaib's AI portfolio assistant! I can tell you about his skills, projects, experience, certifications, and more. Try asking me something!",
  "tell me about suhaib": "Mohamed Suhaib is an AI Developer and Embedded Engineer passionate about building intelligent systems. He specializes in computer vision, IoT, and full-stack development. Check out the About section for more!",
  "show me your skills": "Suhaib's key skills include: Python, TypeScript, TensorFlow, PyTorch, OpenCV, Embedded C, Arduino, ESP32, React, Next.js, and more! Visit the Skills section for details.",
  "contact info": "You can reach Suhaib via:\n- Email: suhaib@example.com\n- GitHub: github.com/MohamedSuhaib\n- LinkedIn: linkedin.com/in/MohamedSuhaib",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lower.includes(key)) return value;
  }
  return "I'm not sure about that. Try asking about Suhaib's skills, projects, or background!";
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Suhaib's AI assistant. How can I help you? 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getResponse(text) },
      ]);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 text-black shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
        aria-label="Open AI chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] glass rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">AI Assistant</p>
                  <p className="text-xs text-emerald-400 font-mono">Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-black"
                        : "bg-white/5 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200" />
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 text-xs text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-white/5 rounded-xl text-sm text-white outline-none border border-white/10 focus:border-emerald-500/30 transition-colors placeholder:text-gray-500"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="p-2 rounded-xl bg-emerald-500 text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
