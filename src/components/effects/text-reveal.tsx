"use client";

import { useRef, useEffect } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>(".reveal-char");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((char, i) => {
              setTimeout(() => {
                char.style.transform = "translateY(0)";
                char.style.opacity = "1";
              }, delay * 1000 + i * stagger * 1000);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      <Tag style={{ display: "inline" }}>
        {children.split("").map((char, i) => (
          <span
            key={i}
            className="reveal-char inline-block"
            style={{
              transform: "translateY(100%)",
              opacity: 0,
              transition: `transform 0.6s cubic-bezier(0.25,0.25,0,1), opacity 0.4s ease`,
              transitionDelay: `${i * stagger}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    </div>
  );
}
