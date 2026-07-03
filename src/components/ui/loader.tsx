"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { loaderWords, matrixChars } from "@/lib/config";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const letters = text.querySelectorAll(".loader-letter");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            gsap.to(container, {
              opacity: 0,
              duration: 0.5,
              delay: 0.3,
              onComplete: () => {
                setVisible(false);
                onComplete();
              },
            });
          }, 500);
        },
      });

      tl.fromTo(
        letters,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        }
      )
        .to(letters, {
          textShadow:
            "0 0 20px rgba(16,185,129,0.8), 0 0 40px rgba(16,185,129,0.4)",
          duration: 0.5,
          stagger: 0.02,
        })
        .to(letters, {
          y: -60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.in",
          delay: 0.5,
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const items = circle.querySelectorAll<HTMLSpanElement>(".orbit-word");
    const radius = 260;

    items.forEach((item, i) => {
      const angle = (i / items.length) * Math.PI * 2;

      const x =
        window.innerWidth / 2 - 50 +
        Math.cos(angle) * radius;

      const y =
        window.innerHeight / 2 +
        Math.sin(angle) * radius;

      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      if (
        item.textContent === "بِسْمِ اللهِ" ||
        item.textContent === "✨مُحَمَّد صُهَيْب✨" ||
        item.textContent === "எல்லா புகழும் இறைவனுக்கே"
      ) {
        item.style.transform = "translate(-50%, -50%)";
      } else {
        item.style.transform =
          `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`;
      }

      item.style.opacity = "0.8";

      if (
        item.textContent?.includes("الله") ||
        item.textContent?.includes("புகழும்") ||
        item.textContent?.includes("مُحَمَّد")
      ) {
        item.style.fontSize = "28px";
        item.style.fontWeight = "600";
      } else {
        item.style.fontSize = "14px";
      }

      item.style.animationDuration = `${
        15 + Math.random() * 20
      }s`;
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090b] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="noise-overlay" />

      {/* Outer circle border */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full border border-emerald-400/40"
        style={{
          boxShadow:
            "0 0 30px rgba(16,185,129,0.3), inset 0 0 30px rgba(16,185,129,0.2)",
        }}
      />

      {/* Small glowing dots on the circle */}
      <div className="absolute w-[550px] h-[550px]">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <span
              key={i}
              className="absolute w-2 h-2 bg-emerald-300 rounded-full"
              style={{
                left: `${275 + Math.cos(angle) * 275}px`,
                top: `${275 + Math.sin(angle) * 275}px`,
                boxShadow: "0 0 10px #10b981,0 0 20px #10b981",
              }}
            />
          );
        })}
      </div>

      {/* Orbiting words */}
      <div
        ref={circleRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: "rotate-slow 60s linear infinite",
        }}
      >
        {loaderWords.map((word) => (
          <span
            key={word}
            className="orbit-word absolute text-emerald-300 whitespace-nowrap"
            style={{
              fontFamily:
                "var(--font-arabic), var(--font-tamil), sans-serif",
              fontSize: "18px",
              letterSpacing: "1px",
              textShadow:
                "0 0 10px rgba(16,185,129,0.8), 0 0 25px rgba(16,185,129,0.6)",
              animation:
                word === "بِسْمِ اللهِ" ||
                word === "✨مُحَمَّد صُهَيْب✨" ||
                word === "எல்லா புகழும் இறைவனுக்கே"
                  ? "none"
                  : "rotate-slow 20s linear infinite",
              transformOrigin: "center center",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Central text content – fixed structure */}
      <div ref={textRef} className="relative z-10 text-center">
        <div className="mb-6 space-y-3">
          <p
            className="text-2xl text-emerald-300"
            style={{
              fontFamily: "var(--font-arabic)",
              textShadow: "0 0 20px rgba(16,185,129,0.7)",
            }}
          >
            بِسْمِ اللهِ
          </p>

          <p
            className="text-lg text-emerald-300"
            style={{
              fontFamily: "var(--font-tamil)",
              textShadow: "0 0 20px rgba(16,185,129,0.7)",
            }}
          >
            எல்லா புகழும் இறைவனுக்கே
          </p>

          <p
            className="text-2xl text-emerald-300"
            style={{
              fontFamily: "var(--font-arabic)",
              textShadow: "0 0 20px rgba(16,185,129,0.7)",
            }}
          >
          </p>
        </div>

        <p className="text-xs tracking-[0.3em] text-emerald-400/60 font-mono mb-4">
          WELCOME TO
        </p>

        <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight">
          {"SUHAIB'S PORTFOLIO".split("").map((char, i) => (
            <span
              key={i}
              className="loader-letter inline-block text-white"
              style={{
                textShadow:
                  "0 0 20px rgba(255,255,255,0.7),0 0 50px rgba(16,185,129,0.7)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400/60 font-mono tracking-widest">
            INITIALIZING SYSTEM...
          </span>
        </div>
      </div>
    </div>
  );
}