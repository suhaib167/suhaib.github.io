"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const prevScroll = useRef(0);

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const current = window.scrollY;
      const delta = current - prevScroll.current;
      const v = Math.abs(delta / dt) * 16;
      setVelocity(Math.min(v, 50));
      setDirection(delta >= 0 ? "down" : "up");
      prevScroll.current = current;
      lastTime = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return { velocity, direction };
}
