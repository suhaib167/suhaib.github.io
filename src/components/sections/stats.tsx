"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { SectionReveal } from "@/components/ui/section-reveal";
import { stats } from "@/lib/config";
import { FolderGit2, Award, Cpu, Code2 } from "lucide-react";

const statItems: {
  icon: React.FC<{ className?: string }>;
  value: number;
  label: string;
  suffix: string;
}[] = [
  { icon: FolderGit2 as React.FC<{ className?: string }>, value: stats.projects, label: "Projects", suffix: "+" },
  { icon: Award as React.FC<{ className?: string }>, value: stats.certifications, label: "Certifications", suffix: "+" },
  { icon: Cpu as React.FC<{ className?: string }>, value: stats.technologies, label: "Technologies", suffix: "+" },
  { icon: Code2 as React.FC<{ className?: string }>, value: stats.problemsSolved, label: "Problems Solved", suffix: "+" },
];

function StatCard({ icon: Icon, value, label, suffix }: {
  icon: React.FC<{ className?: string }>;
  value: number;
  label: string;
  suffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-8 text-center hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)] transition-all duration-500 group"
    >
      <div className="inline-flex p-3.5 rounded-xl bg-emerald-500/10 mb-4 group-hover:bg-emerald-500/15 group-hover:scale-110 transition-all duration-500">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1 tabular-nums">
        {isInView ? (
          <CountUp end={value} duration={2.5} separator="," enableScrollSpy />
        ) : (
          "0"
        )}
        <span className="text-emerald-400">{suffix}</span>
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statItems.map((item, i) => (
            <SectionReveal key={item.label} delay={i * 0.08}>
              <StatCard {...item} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
