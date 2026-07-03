"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.4,
  radius = 200,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const power = (1 - dist / radius) * strength;
      el.style.transform = `translate(${dx * power}px, ${dy * power}px)`;
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    setHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: hovering
          ? "transform 0.1s cubic-bezier(0.25,0.25,0,1)"
          : "transform 0.4s cubic-bezier(0.25,0.25,0,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
