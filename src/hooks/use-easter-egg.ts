"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useEasterEgg() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.key].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      if (
        newSequence.length === KONAMI_CODE.length &&
        newSequence.every((key, i) => key === KONAMI_CODE[i])
      ) {
        setKonamiActivated(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence]);

  return { konamiActivated, setKonamiActivated };
}
