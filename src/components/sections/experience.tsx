"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { experience } from "@/lib/config";
import { Briefcase } from "lucide-react";

function TimelineItem({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative pl-10 pb-12 last:pb-0">
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="absolute left-[7px] top-3 w-[2px] bg-gradient-to-b from-emerald-400 to-transparent"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.2 }}
        className="absolute left-0 top-1 w-[16px] h-[16px] rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-heading font-semibold text-white">
            {item.title}
          </h3>
        </div>
        <p className="text-emerald-400 text-sm font-mono mb-1">{item.company}</p>
        <p className="text-gray-500 text-xs mb-3">{item.period}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; EXPERIENCE
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Work <span className="text-gradient">Experience</span>
            </h2>
          </div>
        </SectionReveal>

        <div>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
