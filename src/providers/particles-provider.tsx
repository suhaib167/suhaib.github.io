"use client";

import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function ParticlesInitProvider({ children }: { children: React.ReactNode }) {
  return (
    <ParticlesProvider
      init={async (engine: Engine) => {
        await loadSlim(engine);
      }}
    >
      {children}
    </ParticlesProvider>
  );
}
