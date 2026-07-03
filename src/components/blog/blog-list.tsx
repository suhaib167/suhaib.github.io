"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { blogPosts } from "@/lib/config";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function BlogList() {
  return (
    <section className="relative py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">&gt; BLOG</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Latest <span className="text-gradient">Posts</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <SectionReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
