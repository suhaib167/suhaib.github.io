"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { certifications } from "@/lib/config";
import { FiExternalLink, FiX } from "react-icons/fi";
import { Award } from "lucide-react";

export function Certifications() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="certifications" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; CERTIFICATIONS
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              <span className="text-gradient">Certifications</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0.5 }}
                className="group glass rounded-2xl p-6 cursor-pointer hover:border-emerald-500/30 transition-all duration-300"
                onClick={() => setSelected(i)}
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Award className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-emerald-400 text-sm font-mono">{cert.issuer}</p>
                <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                {certifications[selected].title}
              </h3>
              <p className="text-emerald-400 font-mono mb-1">
                {certifications[selected].issuer}
              </p>
              <p className="text-gray-500 text-sm mb-6">{certifications[selected].date}</p>
              <a
                href={certifications[selected].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-medium rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <FiExternalLink className="w-4 h-4" />
                View Credential
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
