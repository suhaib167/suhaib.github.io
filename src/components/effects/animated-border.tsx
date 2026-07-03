"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  speed?: number;
}

export function AnimatedBorder({
  children,
  className = "",
  active = true,
  speed = 3,
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || !active) return;

    let start = 0;
    let animId: number;

    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = (time - start) / 1000;
      const x = (elapsed * speed * 50) % 200;
      bg.style.backgroundPosition = `${x}% 0%`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [active, speed]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={bgRef}
        className="absolute -inset-[1px] rounded-[inherit] opacity-75 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)",
          backgroundSize: "200% 100%",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
}
