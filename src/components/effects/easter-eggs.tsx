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

export function EasterEggs() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [showDevMsg, setShowDevMsg] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSeq = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSeq);

      if (
        newSeq.length === KONAMI_CODE.length &&
        newSeq.every((k, i) => k === KONAMI_CODE[i])
      ) {
        setActivated(true);
        setShowDevMsg(true);
        setTimeout(() => setShowDevMsg(false), 5000);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "H1" && target.textContent?.includes("Suhaib")) {
        setShowDevMsg(true);
        setTimeout(() => setShowDevMsg(false), 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [sequence]);

  return (
    <>
      {showDevMsg && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="glass rounded-2xl px-8 py-6 text-center animate-pulse">
            {activated ? (
              <>
                <p className="text-4xl mb-2">🎉🥚</p>
                <p className="text-emerald-400 font-heading text-xl font-bold">
                  Konami Code Activated!
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  You found the secret! Suhaib is hiring-ready.
                </p>
              </>
            ) : (
              <>
                <p className="text-emerald-400 font-mono text-sm">🔧</p>
                <p className="text-gray-400 text-sm mt-2">
                  &quot;The best way to predict the future is to invent it.&quot; — Alan Kay
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
