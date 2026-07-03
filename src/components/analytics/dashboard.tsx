"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { FiGithub, FiCode } from "react-icons/fi";
import { Cpu, GitCommit, Users, Star } from "lucide-react";

// NOTE: Replace the values below with your actual GitHub stats
const githubStats = {
  username: "MohamedSuhaib",
  stars: "45+",
  repos: "8+",
  contributions: "8+",
  followers: "12+",
};

const codingStats = {
  languages: ["Python", "TypeScript", "C++", "JavaScript", "Rust"],
  totalHours: "300+",
  problemsSolved: "150",
};

export function AnalyticsDashboard() {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">&gt; ANALYTICS</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              <span className="text-gradient">Dashboard</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionReveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiGithub className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-heading font-semibold text-white">GitHub Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cpu, label: "Repos", value: githubStats.repos },
                  { icon: Star, label: "Stars", value: githubStats.stars },
                  { icon: GitCommit, label: "Contributions", value: githubStats.contributions },
                  { icon: Users, label: "Followers", value: githubStats.followers },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center">
                    <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiCode className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-heading font-semibold text-white">Coding Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Problems Solved</span>
                  <span className="text-white font-heading font-bold">{codingStats.problemsSolved}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Hours</span>
                  <span className="text-white font-heading font-bold">{codingStats.totalHours}h</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-3">Top Languages</p>
                  <div className="space-y-2">
                    {codingStats.languages.map((lang) => (
                      <div key={lang} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20">{lang}</span>
                        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            style={{
                              width: `${60 + Math.random() * 35}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
