"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid Glass card — a premium glassmorphism orb with aurora background,
 * animated caustics, orbiting satellites, dust motes, and a soft sweep
 * reflection that triggers every 5-9 seconds.
 *
 * Ported from the user's liquid_glass.html reference. Uses the white logo
 * (logo-glass.png) centered inside the glass orb.
 *
 * The card is a square aspect-ratio element. It scales responsively —
 * smaller on mobile, larger on desktop — via a max-width constraint.
 */
export function LiquidGlassCard({ className }: { className?: string }) {
  const sweepRef = useRef<HTMLDivElement>(null);

  // Soft sweep reflection — triggers every 5-9 seconds (random)
  useEffect(() => {
    const sweep = sweepRef.current;
    if (!sweep) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isRunning = true;

    const triggerSweep = () => {
      if (!isRunning) return;
      sweep.classList.remove("active");
      void sweep.offsetWidth; // force reflow
      sweep.classList.add("active");
      const delay = 5000 + Math.random() * 4000; // 5-9 sec
      timeoutId = setTimeout(triggerSweep, delay);
    };

    timeoutId = setTimeout(triggerSweep, 1000);

    return () => {
      isRunning = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={cn(
        "lg-glass-hero relative w-full overflow-hidden rounded-3xl bg-[#090b14]",
        className
      )}
      style={{
        aspectRatio: "1",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 0 40px rgba(139, 92, 246, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.6)",
        isolation: "isolate",
        maxWidth: "min(560px, 92vw)",
        margin: "0 auto",
      }}
    >
      {/* Aurora background — slow layer */}
      <div
        className="lg-glass-aurora-slow pointer-events-none absolute"
        style={{
          inset: "-25%",
          background:
            "radial-gradient(circle at 30% 35%, rgba(139, 92, 246, 0.3), transparent 35%), radial-gradient(circle at 70% 65%, rgba(76, 201, 255, 0.18), transparent 35%)",
          filter: "blur(50px)",
          animation: "lgAuroraSlow 24s ease-in-out infinite alternate",
          zIndex: 0,
          willChange: "transform",
        }}
      />
      {/* Aurora background — fast layer */}
      <div
        className="lg-glass-aurora-fast pointer-events-none absolute"
        style={{
          inset: "-15%",
          background:
            "radial-gradient(circle at 65% 75%, rgba(160, 120, 255, 0.15), transparent 40%), radial-gradient(circle at 25% 40%, rgba(76, 201, 255, 0.12), transparent 35%)",
          filter: "blur(40px)",
          animation: "lgAuroraFast 16s ease-in-out infinite alternate",
          zIndex: 0,
          willChange: "transform",
        }}
      />

      {/* Grid mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(circle, #000 55%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 75%)",
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      {/* Logo center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 grid place-items-center"
        style={{
          width: "30%",
          height: "30%",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 12px rgba(139,92,246,0.25))",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,92,255,0.28), transparent 70%)",
            filter: "blur(18px)",
            zIndex: -1,
            animation: "lgGlowPulse 4s ease-in-out infinite alternate",
          }}
        />
        <img
          src="/logo-glass.png"
          alt="LSGZ"
          className="w-[75%] opacity-95"
          style={{
            animation: "lgLogoFloat 7s ease-in-out infinite",
            willChange: "transform",
          }}
          draggable={false}
        />
        <div
          className="absolute"
          style={{
            top: "15%",
            left: "17%",
            width: "45%",
            height: "15%",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.22)",
            filter: "blur(5px)",
            transform: "rotate(-18deg)",
            opacity: 0.65,
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 55%, rgba(0,0,0,0.38))",
          zIndex: 10,
        }}
      />

      {/* Orb wrapper */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 grid place-items-center"
        style={{
          width: "68%",
          height: "68%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
          willChange: "transform",
        }}
      >
        {/* SVG orb */}
        <svg
          className="h-full w-full"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(132, 92, 255, 0.25)) drop-shadow(0 0 42px rgba(92, 170, 255, 0.2))",
          }}
        >
          <defs>
            <linearGradient id="lgGlassFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.09)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <radialGradient id="lgEdgeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="65%" stopColor="#9b7cff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#49cfff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g style={{ animation: "lgBubbleBreath 6s ease-in-out infinite", transformOrigin: "center", willChange: "transform" }}>
            <path
              d="M250 48 C356 42 438 124 432 232 C425 342 343 430 248 438 C132 446 56 350 58 236 C60 118 144 52 250 48Z"
              fill="url(#lgGlassFill)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.4"
              style={{
                animation:
                  "lgOrbFloat 8s ease-in-out infinite, lgOrbRotate 18s ease-in-out infinite",
                transformOrigin: "center",
                willChange: "transform",
              }}
            />
            <ellipse
              cx="170" cy="145" rx="82" ry="22"
              fill="rgba(255,255,255,0.18)"
              transform="rotate(-16 170 145)"
            />
            <ellipse
              cx="185" cy="140" rx="45" ry="12"
              fill="rgba(255,255,255,0.22)"
              transform="rotate(-16 185 140)"
              filter="blur(2px)"
            />
            <ellipse cx="315" cy="335" rx="66" ry="60" fill="rgba(70,170,255,0.14)" />
            <circle cx="250" cy="250" r="188" fill="url(#lgEdgeGlow)" opacity="0.75" />
          </g>
        </svg>

        {/* Glass overlay layers */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.22), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            mixBlendMode: "screen",
            filter: "blur(0.3px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 72% 78%, rgba(76,201,255,0.16), transparent 26%), radial-gradient(circle at 24% 76%, rgba(160,120,255,0.08), transparent 28%)",
            mixBlendMode: "screen",
            filter: "blur(4px)",
            opacity: 0.8,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            mixBlendMode: "overlay",
            opacity: 0.5,
            filter: "blur(10px)",
            animation: "lgCausticPulse 6s ease-in-out infinite",
          }}
        />

        {/* Dust motes */}
        <div className="lg-dust pointer-events-none absolute rounded-full bg-white" style={{ left: "18%", top: "28%", width: 5, height: 5, filter: "blur(1px)", opacity: 0.2, animation: "lgDustFloat 8s ease-in-out infinite", animationDelay: "0s" }} />
        <div className="lg-dust pointer-events-none absolute rounded-full bg-white" style={{ left: "70%", top: "18%", width: 3, height: 3, opacity: 0.2, animation: "lgDustFloat 8s ease-in-out infinite", animationDelay: "2s" }} />
        <div className="lg-dust pointer-events-none absolute rounded-full bg-white" style={{ left: "25%", top: "74%", width: 2, height: 2, opacity: 0.2, animation: "lgDustFloat 8s ease-in-out infinite", animationDelay: "5s" }} />
        <div className="lg-dust pointer-events-none absolute rounded-full bg-white" style={{ left: "58%", top: "82%", width: 3, height: 3, opacity: 0.2, animation: "lgDustFloat 8s ease-in-out infinite", animationDelay: "1.5s" }} />
        <div className="lg-dust pointer-events-none absolute rounded-full bg-white" style={{ left: "85%", top: "40%", width: 2, height: 2, opacity: 0.2, animation: "lgDustFloat 8s ease-in-out infinite", animationDelay: "4.2s" }} />

        {/* Soft sweep reflection */}
        <div
          ref={sweepRef}
          className="lg-soft-sweep pointer-events-none absolute"
          style={{
            left: "-60%",
            top: "-30%",
            width: "80%",
            height: "160%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
            filter: "blur(18px)",
            transform: "rotate(18deg)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        {/* Edge refraction */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: "-2px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03), 0 0 14px rgba(132,92,255,0.08), 0 0 26px rgba(76,201,255,0.06), inset 0 0 12px rgba(255,255,255,0.05)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Inner caustics */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "62%", height: "62%", left: "19%", top: "22%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 72%)",
            filter: "blur(16px)",
            animation: "lgCausticMove1 9s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "45%", height: "45%", left: "28%", top: "28%",
            background: "radial-gradient(circle, rgba(160,120,255,0.15), transparent 70%)",
            filter: "blur(20px)",
            animation: "lgCausticMove2 7s ease-in-out infinite 1.5s",
            willChange: "transform, opacity",
          }}
        />

        {/* Orbiting satellites */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "50%", top: "50%",
            width: "106%", height: "106%",
            transform: "translate(-50%, -50%)",
            animation: "lgOrbitSpin 42s linear infinite",
            willChange: "transform",
          }}
        >
          {[
            { top: "-1%", left: "50%", tx: "-50%", ty: "0", w: 6, h: 6, small: false },
            { top: "50%", right: "-1%", tx: "0", ty: "-50%", w: 6, h: 6, small: false },
            { bottom: "-1%", left: "50%", tx: "-50%", ty: "0", w: 6, h: 6, small: false },
            { left: "-1%", top: "50%", tx: "0", ty: "-50%", w: 6, h: 6, small: false },
            { top: "15%", left: "85%", w: 4, h: 4, small: true },
            { top: "85%", left: "15%", w: 4, h: 4, small: true },
            { top: "15%", left: "15%", w: 4, h: 4, small: true },
            { top: "85%", left: "85%", w: 4, h: 4, small: true },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: s.w, height: s.h,
                ...(s.top && { top: s.top }),
                ...(s.bottom && { bottom: s.bottom }),
                ...(s.left && { left: s.left }),
                ...(s.right && { right: s.right }),
                transform: `translate(${s.tx}, ${s.ty})`,
                boxShadow: s.small
                  ? "0 0 5px #fff, 0 0 8px #4cc9ff"
                  : "0 0 6px #fff, 0 0 12px #8b5cf6",
                animation: "lgSatPulse 2.5s ease-in-out infinite alternate",
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframes (scoped via unique prefix lg) */}
      <style>{`
        @keyframes lgAuroraSlow {
          from { transform: translate(-3%, -2%) rotate(2deg) scale(1); }
          to { transform: translate(3%, 2%) rotate(-2deg) scale(1.12); }
        }
        @keyframes lgAuroraFast {
          from { transform: translate(2%, 1%) rotate(-1deg) scale(1.05); }
          to { transform: translate(-2%, -1%) rotate(3deg) scale(1.08); }
        }
        @keyframes lgBubbleBreath {
          0%, 100% { transform: scale(1, 1) rotate(0deg); }
          25% { transform: scale(1.014, 0.986) rotate(0.3deg); }
          50% { transform: scale(0.992, 1.018) rotate(-0.4deg); }
          75% { transform: scale(1.008, 0.994) rotate(0.2deg); }
        }
        @keyframes lgOrbFloat {
          50% { transform: translateY(-6px) scale(1.01); }
        }
        @keyframes lgOrbRotate {
          50% { transform: rotate(2deg) translateY(-6px); }
        }
        @keyframes lgCausticPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        @keyframes lgCausticMove1 {
          50% { transform: translateY(-8px) translateX(4px) scale(1.06); opacity: 0.7; }
        }
        @keyframes lgCausticMove2 {
          50% { transform: translateY(6px) translateX(-4px) scale(1.1); opacity: 0.6; }
        }
        @keyframes lgDustFloat {
          50% { opacity: 0.55; transform: translateY(-14px); }
        }
        @keyframes lgOrbitSpin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes lgSatPulse {
          from { opacity: 0.7; transform: scale(1); }
          to { opacity: 1; transform: scale(1.3); }
        }
        @keyframes lgGlowPulse {
          from { opacity: 0.65; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1.05); }
        }
        @keyframes lgLogoFloat {
          50% { transform: translateY(-4px) scale(1.02); }
        }
        .lg-soft-sweep.active {
          animation: lgSoftSweepAnim 2.4s ease-in-out forwards;
        }
        @keyframes lgSoftSweepAnim {
          0% { transform: translateX(-220%) rotate(18deg); opacity: 0; }
          20% { opacity: 0.55; }
          50% { transform: translateX(300%) rotate(18deg); opacity: 0.55; }
          80% { opacity: 0; }
          100% { transform: translateX(420%) rotate(18deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
