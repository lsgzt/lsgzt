"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/site/logo";

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
            <div className="relative flex h-14 w-14 items-center justify-center">
              {/* Pulsing ring around the logo */}
              <motion.span
                className="absolute inset-0 rounded-full border border-violet-400/40"
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
              {/* The custom logo (theme-aware: black/white) */}
              <motion.div
                className="relative z-10 h-10 w-10"
                animate={{ scale: [1, 0.9, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Logo size={40} className="h-10 w-10" />
              </motion.div>
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
