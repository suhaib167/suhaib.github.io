"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { projects } from "@/lib/config";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { cn } from "@/lib/utils";

const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)));

export function Projects() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; PROJECTS
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["All", ...allTechs].map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                  filter === tech
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "glass text-gray-400 hover:text-white hover:border-emerald-500/30"
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </SectionReveal>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <TiltCard tiltDegree={6} glare scale={1.01}>
                  <div
                    onClick={() => router.push(`/project/${project.slug}`)}
                    className="cursor-pointer group glass rounded-2xl overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                  >
                    <div className="h-48 bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-emerald-500/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10" />
                      <div className="text-6xl font-heading font-bold text-emerald-400/20 group-hover:text-emerald-400/35 transition-all duration-500 z-20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github, "_blank", "noopener,noreferrer");
                          }}
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          <FiGithub className="w-4 h-4" />
                          Code
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo, "_blank", "noopener,noreferrer");
                          }}
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
