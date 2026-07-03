"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/ui/loader";
import { Navbar } from "@/components/sections/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MouseSpotlight } from "@/components/effects/mouse-spotlight";
import { ParticleNetwork } from "@/components/background/particles";
import { MatrixRain } from "@/components/background/matrix-rain";
import { FloatingOrbs } from "@/components/background/floating-orbs";
import { AnimatedGrid } from "@/components/background/animated-grid";
import { CommandPalette } from "@/components/effects/command-palette";
import { Terminal } from "@/components/chat/terminal";
import { AIChat } from "@/components/chat/ai-chat";
import { MiniAvatar } from "@/components/chat/mini-avatar";
import { ThemeSwitcher } from "@/components/effects/theme-switcher";
import { AmbientMusic } from "@/components/effects/ambient-music";
import { EasterEggs } from "@/components/effects/easter-eggs";
import { AchievementProvider, useAchievements } from "@/components/effects/achievement-system";

const CustomCursor = dynamic(
  () => import("@/components/effects/custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

function ShellContent({ children }: { children: React.ReactNode }) {
  const { unlockAchievement } = useAchievements();

  return (
    <>
      <AnimatedGrid />
      <ParticleNetwork />
      <MatrixRain />
      <FloatingOrbs />
      <MouseSpotlight />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <ThemeSwitcher />
      <AmbientMusic />
      <main>{children}</main>
      <CommandPalette />
      <Terminal />
      <AIChat />
      <MiniAvatar />
      <EasterEggs />
    </>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}

      <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <AchievementProvider>
          <ShellContent>{children}</ShellContent>
        </AchievementProvider>
      </div>

      <div className="noise-overlay" />
    </>
  );
}
