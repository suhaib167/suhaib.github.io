"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

const themes = [
  { key: "dark", icon: Moon, label: "Dark" },
  { key: "light", icon: Sun, label: "Light" },
  { key: "cyber", icon: Monitor, label: "Cyber" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

}
