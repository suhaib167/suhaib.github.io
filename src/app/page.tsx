import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Skills } from "@/components/sections/skills";
import { SkillConstellation } from "@/components/sections/skill-constellation";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { AnalyticsDashboard } from "@/components/analytics/dashboard";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero /> 
      <About /> 
      <Stats />
      <Skills />
      <SkillConstellation />
      <Projects />
      <Experience />
      <Certifications /> 

      <section id="resume" className="py-32 flex items-center justify-center border-t border-white/5">
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold text-gradient mb-6">Resume</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Download my resume to learn more about my experience, skills, and achievements.
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
          >
            Download Resume
          </a>
        </div>
      </section>

      <AnalyticsDashboard /> 

      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Read My <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Articles about AI, embedded systems, and full-stack development.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-400/30 text-emerald-400 font-medium rounded-xl hover:bg-emerald-400/10 transition-all"
          >
            View Blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Contact />

      <footer className="py-20 text-center">
  <h2
    className="text-zinc-500 tracking-[0.8em]"
    style={{
      fontFamily: "'Noto Sans Arabic', sans-serif",
      textShadow: "0 0 25px rgba(16,185,129,0.7)",
    }}
  >
    ٱلْحَمْدُ لِلّٰهِ
  </h2>

  <p className="text-zinc-500 tracking-[0.4em]">
    THANK YOU FOR VISITING
  </p>
</footer>
    </>
  );
}
