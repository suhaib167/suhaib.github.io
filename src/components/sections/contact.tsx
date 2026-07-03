"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { siteConfig } from "@/lib/config";
import { Mail, MapPin, Send } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("https://formspree.io/f/xeebvabk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setSent(true);
      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => setSent(false), 3000);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  return (
    <section id="contact" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
              &gt; CONTACT
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Get In <span className="text-gradient">Touch</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-heading font-semibold text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={siteConfig.links.email}
                    className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <span>mohamedsuhaib167@gmail.com</span>
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <FiGithub className="w-5 h-5 text-emerald-400" />
                    <span>github.com/MohamedSuhaib</span>
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <FiLinkedin className="w-5 h-5 text-emerald-400" />
                    <span>linkedin.com/in/MohamedSuhaib27</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <span>Hosur, India</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-heading font-semibold text-white mb-4">
                  Availability
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-gray-400">Open for opportunities</span>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white text-sm outline-none border border-white/10 focus:border-emerald-500/30 transition-colors placeholder:text-gray-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white text-sm outline-none border border-white/10 focus:border-emerald-500/30 transition-colors placeholder:text-gray-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white text-sm outline-none border border-white/10 focus:border-emerald-500/30 transition-colors placeholder:text-gray-600 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Magnetic>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                >
                  {sent ? (
                    "Sent! ✓"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
