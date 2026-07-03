"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

const TRAIL_COUNT = 12;
const DOT_SIZE = 3;
const RING_SIZE = 32;
const RING_HOVER = 80;

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const state = useRef({
    dot: { x: 0, y: 0 },
    ring: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    trails: Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 })),
    speed: 0,
    angle: 0,
  });

  const handleHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const label =
      target.getAttribute("data-cursor") ||
      target.closest("[data-cursor]")?.getAttribute("data-cursor");

    if (label || target.closest("[data-cursor]")) {
      ring.style.width = `${RING_HOVER}px`;
      ring.style.height = `${RING_HOVER}px`;
      ring.style.borderColor = "#10b981";
      ring.style.backgroundColor = "rgba(16,185,129,0.08)";
      ring.style.backdropFilter = "blur(4px)";
      if (label) {
        ring.innerHTML = `<span style="font-size:10px;color:#10b981;font-weight:600;text-transform:uppercase;letter-spacing:2px">${label}</span>`;
      }
      dot.style.width = `${DOT_SIZE * 1.5}px`;
      dot.style.height = `${DOT_SIZE * 1.5}px`;
    } else {
      ring.style.width = `${RING_SIZE}px`;
      ring.style.height = `${RING_SIZE}px`;
      ring.style.borderColor = "rgba(16,185,129,0.5)";
      ring.style.backgroundColor = "transparent";
      ring.style.backdropFilter = "none";
      ring.innerHTML = "";
      dot.style.width = `${DOT_SIZE}px`;
      dot.style.height = `${DOT_SIZE}px`;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseover", handleHover);
    return () => document.removeEventListener("mouseover", handleHover);
  }, [handleHover]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const container = containerRef.current;
    if (!container) return;

    const trailDots: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        width: 3px; height: 3px;
        border-radius: 50%;
        background: rgba(16,185,129,${0.3 - (i / TRAIL_COUNT) * 0.25});
        pointer-events: none; z-index: 99998;
        transition: opacity 0.1s;
        will-change: transform;
      `;
      container.appendChild(dot);
      trailDots.push(dot);
    }

    let animId: number;

    const animate = () => {
      const s = state.current;

      s.dot.x += (x - s.dot.x) * 0.18;
      s.dot.y += (y - s.dot.y) * 0.18;
      s.ring.x += (x - s.ring.x) * 0.08;
      s.ring.y += (y - s.ring.y) * 0.08;

      const dx = x - s.prev.x;
      const dy = y - s.prev.y;
      s.speed = Math.sqrt(dx * dx + dy * dy);
      s.angle = Math.atan2(dy, dx) * (180 / Math.PI);
      s.prev = { x, y };

      const stretch = Math.min(s.speed * 0.12, 6);
      const dotScale = 1 + Math.min(s.speed * 0.03, 0.8);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.dot.x}px, ${s.dot.y}px) scale(${dotScale})`;
      }
      if (ringRef.current) {
        const ringEl = ringRef.current;
        const currentW = parseFloat(ringEl.style.width || `${RING_SIZE}`);
        const isHover = currentW > RING_SIZE;
        if (!isHover) {
          const rx = 1 + stretch * 0.015;
          const ry = 1 - stretch * 0.008;
          ringEl.style.transform = `translate(${s.ring.x}px, ${s.ring.y}px) translate(-50%, -50%) rotate(${s.angle}deg) scaleX(${rx}) scaleY(${ry})`;
        } else {
          ringEl.style.transform = `translate(${s.ring.x}px, ${s.ring.y}px) translate(-50%, -50%)`;
        }
      }

      s.trails.unshift({ x: s.dot.x, y: s.dot.y });
      s.trails.pop();

      trailDots.forEach((el, i) => {
        const t = s.trails[i] || s.trails[0];
        el.style.transform = `translate(${t.x}px, ${t.y}px)`;
        el.style.opacity = `${0.35 - (i / TRAIL_COUNT) * 0.3}`;
        const size = DOT_SIZE - (i / TRAIL_COUNT) * 1.5;
        el.style.width = `${Math.max(size, 1)}px`;
        el.style.height = `${Math.max(size, 1)}px`;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.cursor = "";
      trailDots.forEach((d) => d.remove());
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] will-change-transform"
        style={{
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          background: "#10b981",
          boxShadow:
            "0 0 8px rgba(16,185,129,0.6), 0 0 20px rgba(16,185,129,0.3)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center will-change-transform"
        style={{
          width: `${RING_SIZE}px`,
          height: `${RING_SIZE}px`,
          border: "1.5px solid rgba(16,185,129,0.5)",
          transition:
            "width 0.25s cubic-bezier(0.25,0.25,0,1), height 0.25s cubic-bezier(0.25,0.25,0,1), border-color 0.25s ease, background-color 0.25s ease",
        }}
      />
      <div ref={containerRef} />
    </>
  );
}
