"use client";

import { useRef, useCallback, useEffect } from "react";

interface ParallaxTarget {
  x: number;
  y: number;
  dampen: number;
}

export function useMouseParallax(dampen = 0.05) {
  const target = useRef<ParallaxTarget>({ x: 0, y: 0, dampen });
  const elements = useRef<Map<HTMLElement, { strength: number; x: number; y: number }>>(new Map());

  const register = useCallback((el: HTMLElement | null, strength = 10) => {
    if (el) {
      elements.current.set(el, { strength, x: 0, y: 0 });
    }
  }, []);

  const unregister = useCallback((el: HTMLElement | null) => {
    if (el) elements.current.delete(el);
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      elements.current.forEach((state, el) => {
        state.x += (target.current.x * state.strength - state.x) * dampen;
        state.y += (target.current.y * state.strength - state.y) * dampen;
        el.style.transform = `translate(${state.x}px, ${state.y}px)`;
      });
      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current.x = (e.clientX - cx) / cx;
      target.current.y = (e.clientY - cy) / cy;
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, [dampen]);

  return { register, unregister };
}
