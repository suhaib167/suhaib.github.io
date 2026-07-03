"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Sparkles, Zap, Eye, Terminal, Coffee } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  unlocked: boolean;
}

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

const defaultAchievements: Achievement[] = [
  { id: "first-visit", title: "First Contact", description: "Visited the portfolio", icon: Eye, unlocked: true },
  { id: "viewed-projects", title: "Explorer", description: "Viewed all projects", icon: Sparkles, unlocked: false },
  { id: "opened-terminal", title: "Hacker", description: "Opened the terminal", icon: Terminal, unlocked: false },
  { id: "found-easter-egg", title: "Egg Hunter", description: "Found a secret", icon: Zap, unlocked: false },
  { id: "used-command-palette", title: "Power User", description: "Used CTRL+K", icon: Coffee, unlocked: false },
];

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [toast, setToast] = useState<Achievement | null>(null);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const ach = prev.find((a) => a.id === id);
      if (ach && !ach.unlocked) {
        setToast(ach);
        setTimeout(() => setToast(null), 4000);
        return prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
      }
      return prev;
    });
  };

  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-[100] glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl border border-emerald-500/20"
          >
            <div className="p-2 rounded-xl bg-emerald-500/20">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Achievement Unlocked!</p>
              <p className="text-xs text-emerald-400">{toast.title} — {toast.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error("useAchievements must be used within AchievementProvider");
  return ctx;
}
