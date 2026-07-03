"use client";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { useMemo } from "react";

export function MouseSpotlight() {
  const { x, y } = useMousePosition();

  const spotlightStyle = useMemo(
    () => ({
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 40%)`,
    }),
    [x, y]
  );

  const innerStyle = useMemo(
    () => ({
      background: `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 40%)`,
    }),
    [x, y]
  );

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={spotlightStyle}
      />
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={innerStyle}
      />
    </>
  );
}
