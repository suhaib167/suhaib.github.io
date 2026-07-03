"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface CommandEntry {
  input: string;
  output: string;
}

const bootSequence = [
  "[BOOT] Initializing AI Surveillance System...",
  "[BOOT] Loading Portfolio...",
  "[BOOT] Connecting Modules...",
  "[BOOT] Access Granted.",
];

const commands: Record<string, string> = {
  help: `Available commands:
  about     - About Mohamed Suhaib
  skills    - List skills
  projects  - View projects
  resume    - Download resume
  contact   - Contact info
  clear     - Clear terminal
  sudo hire-suhaib - Easter egg
  matrix    - Easter egg
  coffee    - Easter egg`,
  about: "Mohamed Suhaib — AI Developer, Embedded Engineer, Full Stack Developer. Passionate about building intelligent systems.",
  skills: "Programming: Python, TypeScript, C, C++ | AI/ML: TensorFlow, PyTorch, OpenCV | Embedded: Arduino, ESP32, ARM",
  projects: "4 featured projects. Visit the Projects section above or type 'projects' for details.",
  resume: "Opening resume... Click the Resume button in the navbar.",
  contact: "Email: suhaib@example.com | GitHub: github.com/MohamedSuhaib",
  "sudo hire-suhaib": "🎉 Access granted! Suhaib is ready for new opportunities. Email: suhaib@example.com",
  matrix: "🔮 Entering the Matrix... Look at the background!",
  coffee: "☕ Here's a coffee for you! Or maybe some chai? 🫖",
};

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setBootLines([]);
    setHistory([]);
    setBooted(false);
    bootSequence.forEach((line, i) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
        if (i === bootSequence.length - 1) {
          setTimeout(() => setBooted(true), 300);
        }
      }, (i + 1) * 400);
    });
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, bootLines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = commands[trimmed] || `Command not found: ${trimmed}. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { input: trimmed, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 p-3 rounded-full glass hover:border-emerald-500/30 transition-all shadow-lg"
        aria-label="Open terminal"
      >
        <TerminalIcon className="w-5 h-5 text-emerald-400" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[480px] glass rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-gray-400">terminal@suhaib:~$</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-black/40">
              {bootLines.map((line, i) => (
                <p key={i} className="text-emerald-400/80 mb-1">
                  {line}
                </p>
              ))}

              {booted && (
                <>
                  {history.map((entry, i) => (
                    <div key={i} className="mb-2">
                      <p className="text-emerald-400">
                        <span className="text-gray-500">$ </span>
                        {entry.input}
                      </p>
                      <p className="text-gray-300 whitespace-pre-line">{entry.output}</p>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-white outline-none border-none"
                      placeholder="Type 'help'..."
                      autoFocus
                    />
                  </div>
                </>
              )}
              <div ref={endRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
