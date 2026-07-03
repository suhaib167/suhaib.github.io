"use client";

import { useEffect, useRef } from "react";

export function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLDivElement>(".orb");
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      orbs.forEach((orb, i) => {
        const speed = 0.15 + i * 0.05;
        const x = Math.sin(elapsed * speed + i * 2) * 80;
        const y = Math.cos(elapsed * speed * 0.8 + i * 1.5) * 60;
        const scale = 1 + Math.sin(elapsed * speed * 0.5) * 0.1;
        orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      <div className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="orb absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-green-500/8 blur-[80px]" />
      <div className="orb absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-cyan-500/8 blur-[90px]" />
    </div>
  );
}
