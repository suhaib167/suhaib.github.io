"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        className="h-full rounded-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #10b981, #34d399, #6ee7b7, #34d399, #10b981)",
          boxShadow: "0 0 10px rgba(16,185,129,0.5)",
        }}
      />
    </div>
  );
}
