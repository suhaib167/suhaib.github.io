"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { TextReveal } from "@/components/effects/text-reveal";
import { personalInfo, education } from "@/lib/config";
import { GraduationCap, MapPin, Target, Heart } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; ABOUT.ME
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              <span className="text-gradient">About</span> Me
            </h2>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <SectionReveal delay={0.1}>
            <div className="glass rounded-2xl p-8 space-y-6">
              <TextReveal
                as="p"
                className="text-gray-300 text-lg leading-relaxed"
                stagger={0.02}
              >
                {personalInfo.bio}
              </TextReveal>
              <p className="text-gray-400 leading-relaxed">
                I specialize in building intelligent systems that bridge the gap
                between software and hardware. With expertise in AI, computer
                vision, and embedded systems, I create solutions that make a real
                impact.
              </p>
              <div className="flex items-center gap-2 text-gray-400 pt-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-5">
            <SectionReveal delay={0.2}>
              <div className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <GraduationCap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-1">
                      {education[0].degree}
                    </h3>
                    <p className="text-emerald-400 text-sm font-mono">
                      {education[0].school}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {education[0].year}
                    </p>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      {education[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-1">
                      Career Goals
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      To build cutting-edge AI systems that solve real-world
                      problems and contribute to open-source projects that
                      advance the field of artificial intelligence and embedded
                      systems.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <Heart className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-1">
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        "AI Research",
                        "Embedded Systems",
                        "IoT",
                        "Open Source",
                        "Photography",
                        "Chess",
                      ].map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
