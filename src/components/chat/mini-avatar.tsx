"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const messages = [
  "Hi, I'm Suhaib 👋",
  "Thanks for visiting!",
  "Check out my projects!",
  "Want to collaborate?",
  "Have a great day! ✨",
];

export function MiniAvatar() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(messages[0]);
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, [show]);

  const handleClick = () => {
    setShow(!show);
    if (!show) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 left-0 glass rounded-2xl px-4 py-2 whitespace-nowrap"
          >
            <p className="text-sm text-white">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
  onClick={handleClick}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  animate={{ y: [0, -4, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
>
  <Image
    src="/Avatar.png"
    alt="Avatar"
    fill
    className="object-cover"
    sizes="56px"
  />

  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
</motion.button>
    </div>
  );
}
