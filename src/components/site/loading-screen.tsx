"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Brief loading animation shown on first paint — fades out as soon as the
 * page is ready (or after a short max duration as a safety net).
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500"
                animate={{
                  scale: [1, 0.85, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-xl border border-violet-400/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 text-base font-bold text-white">L</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
            >
              LSGZ
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ·
              </motion.span>
              loading
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
