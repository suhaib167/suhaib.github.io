"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.nav.map((n) => n.href.replace("#", ""));

export function Navbar() {
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useState(0);

  useEffect(() => {
    let prev = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > 200 && current > prev);
      prev = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
        hidden && "-translate-y-full"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollTo("#home")}
            className="text-xl font-heading font-bold text-white hover:text-emerald-400 transition-colors"
          >
            <span className="text-emerald-400">&lt;</span>
            Suhaib
            <span className="text-emerald-400">/&gt;</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  activeSection === link.href.replace("#", "")
                    ? "text-emerald-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-emerald-500/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#resume")}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-400 border border-emerald-400/30 rounded-xl hover:bg-emerald-400/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>

            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#09090b]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {siteConfig.nav.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "w-full text-left px-3 py-3 text-sm font-medium rounded-xl transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#resume")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-400 border border-emerald-400/30 rounded-xl mt-3"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
