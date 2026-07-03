"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { skills } from "@/lib/config";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, string> = {
  Programming: "{ }",
  Frontend: "</>",
  Backend: "=>",
  "AI & ML": "AI",
  "Embedded Systems": "µC",
  Tools: "⚙",
};

const categoryColors: Record<string, string> = {
  Programming: "from-blue-400 to-emerald-400",
  Frontend: "from-emerald-400 to-cyan-400",
  Backend: "from-emerald-400 to-green-400",
  "AI & ML": "from-purple-400 to-emerald-400",
  "Embedded Systems": "from-amber-400 to-emerald-400",
  Tools: "from-pink-400 to-emerald-400",
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("Programming");
  const categories = Object.keys(skills);
  const currentSkills = skills[activeCategory as keyof typeof skills] || [];

  return (
    <section id="skills" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; SKILLS
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              My <span className="text-gradient">Skills</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                activeCategory === cat
                  ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                  : "glass text-gray-400 hover:text-white hover:border-emerald-500/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {currentSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="group glass rounded-xl p-4 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {categoryIcons[activeCategory]}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600">
                      {Math.floor(60 + Math.random() * 35)}%
                    </span>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${60 + Math.random() * 35}%` }}
                      transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        categoryColors[activeCategory]
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
