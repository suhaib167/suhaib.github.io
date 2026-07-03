"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "@/lib/config";
import { Magnetic } from "@/components/ui/magnetic";

export function ProjectDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = params ? (params as unknown as { slug: string }).slug : "";

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="h-64 md:h-80 bg-gradient-to-br from-emerald-500/30 via-emerald-500/10 to-emerald-500/5 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
            <div className="text-8xl font-heading font-bold text-emerald-400/20 relative z-10">
              {project.title.charAt(0)}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {project.title}
            </h1>

            <p className="text-gray-400 text-lg mb-8">{project.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Magnetic>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                >
                  <FiGithub className="w-5 h-5" />
                  View Source
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-400/30 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-400/10 transition-all"
                >
                  <FiExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              </Magnetic>
            </div>

            {project.features && (
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                  Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {project.architecture && (
              <div>
                <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                  Architecture
                </h2>
                <div className="glass rounded-xl p-6">
                  <p className="text-gray-400">{project.architecture}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
