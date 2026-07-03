"use client";

import { useRef, useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { skills } from "@/lib/config";

interface Star {
  x: number;
  y: number;
  r: number;
  label: string;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
}

export function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x: mx, y: my } = useMousePosition();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const resize = () => {
      setDimensions({ w: window.innerWidth, h: 500 });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.w) return;
    canvas.width = dimensions.w;
    canvas.height = dimensions.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const allSkills = Object.values(skills).flat();
    const stars: Star[] = allSkills.map((label, i) => {
      const angle = (i / allSkills.length) * Math.PI * 2;
      const radius = 80 + Math.random() * 120;
      return {
        x: dimensions.w / 2 + Math.cos(angle) * radius,
        y: dimensions.h / 2 + Math.sin(angle) * radius,
        r: 2 + Math.random() * 3,
        label,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
        pulse: Math.random(),
      };
    });

    stars.forEach((s, i) => {
      stars.forEach((t, j) => {
        if (i !== j) {
          const dx = s.x - t.x;
          const dy = s.y - t.y;
          if (Math.sqrt(dx * dx + dy * dy) < 180) {
            s.connections.push(j);
          }
        }
      });
    });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);

      stars.forEach((star) => {
        const dx = mx - star.x;
        const dy = my - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          star.x -= dx * 0.01;
          star.y -= dy * 0.01;
        }
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > dimensions.w) star.vx *= -1;
        if (star.y < 0 || star.y > dimensions.h) star.vy *= -1;
      });

      stars.forEach((star) => {
        star.connections.forEach((j) => {
          const other = stars[j];
          const dx = star.x - other.x;
          const dy = star.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(star.label, star.x, star.y - star.r - 4);
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [dimensions, mx, my]);

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-emerald-400 tracking-[0.2em] mb-4">
            &gt; SKILL_CONSTELLATION
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Skill <span className="text-gradient">Constellation</span>
          </h2>
        
        </div>
        <div className="glass rounded-2xl p-4 overflow-hidden relative">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />

  <canvas
    ref={canvasRef}
    className="w-full relative z-10"
    style={{ height: "500px" }}
  />
</div>
      </div>
    </section>
  );
}
