"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin, FiCode } from "react-icons/fi";
import { personalInfo, siteConfig } from "@/lib/config";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import Image from "next/image";

function ParallaxLayer({
  children,
  strength = 8,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { register, unregister } = useMouseParallax(0.04);

  useEffect(() => {
    if (ref.current) register(ref.current, strength);
    return () => { if (ref.current) unregister(ref.current); };
  }, [register, unregister, strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FiGithub, href: siteConfig.links.github, label: "GitHub" },
    { icon: FiLinkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
    { icon: Mail, href: siteConfig.links.email, label: "Email" },
    { icon: FiCode, href: siteConfig.links.leetcode, label: "LeetCode" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxLayer strength={15} className="absolute top-20 left-[10%]">
          <div className="w-3 h-3 rounded-full bg-emerald-400/20" />
        </ParallaxLayer>
        <ParallaxLayer strength={-12} className="absolute top-40 right-[15%]">
          <div className="w-2 h-2 rounded-full bg-emerald-400/15" />
        </ParallaxLayer>
        <ParallaxLayer strength={20} className="absolute bottom-32 left-[20%]">
          <div className="w-4 h-4 rounded-full bg-emerald-400/10" />
        </ParallaxLayer>
        <ParallaxLayer strength={-18} className="absolute bottom-40 right-[10%]">
          <div className="w-2 h-2 rounded-full bg-emerald-400/20" />
        </ParallaxLayer>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4"
            >
              &gt; Hello World_
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-4"
            >
              <span className="text-white">Hi, I&apos;m</span>{" "}
              <span className="text-gradient">Mohamed Suhaib</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-gray-400 mb-6 h-9"
            >
              <TypeAnimation
                sequence={[
                  "AI Developer",
                  2000,
                  "Embedded Engineer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "Computer Vision Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-emerald-400 font-mono"
                cursor={false}
              />
              <span className="animate-pulse text-emerald-400 ml-0.5">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group relative px-8 py-3 bg-emerald-500 text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollTo("resume")}
                className="px-8 py-3 border border-emerald-400/30 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-400/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 border border-white/10 text-gray-300 font-semibold rounded-xl hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/10 rounded-xl text-gray-400 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-500/5 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <ParallaxLayer strength={-6} className="hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-96 h-96"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl" />
              <div className="absolute inset-3 rounded-full border border-emerald-400/15 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-emerald-400/10 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-9 rounded-full border border-emerald-400/5 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-105 h-105 rounded-full bg-gradient-to-br from-emerald-400/15 to-emerald-500/5 flex items-center justify-center backdrop-blur-xl border border-emerald-400/10 shadow-[0_0_60px_rgba(16,185,129,0.1)]">
                  <div className="text-center">
                    <div className="w-80 h-80 mx-auto mb-3 rounded-full overflow-hidden animate-pulse border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                      <Image
                        src="/avatar.png"
                        alt="Avatar"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-emerald-500 font-mono text-2xl font-bold tracking-[0.15em]">
  ✨مُحَمَّ صُهَيْب✨
</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-600 font-mono tracking-[0.25em]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[18px] h-[30px] rounded-full border border-gray-600 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [4, 8, 4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-[2px] rounded-full bg-emerald-400"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
