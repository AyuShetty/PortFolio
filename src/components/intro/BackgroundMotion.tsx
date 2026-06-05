"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function BackgroundMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Motion values for tracking cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor lag effect
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the blob to center it on the cursor
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
      {/* 
        Layer 1: Ambient Telemetry Glows (Slow & Passive) 
        These simulate depth and a living atmosphere behind your content.
      */}
      {!prefersReducedMotion ? (
        <>
          {/* Deep Olive Glow */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-surface blur-[120px] opacity-20 transition-colors duration-500"
            animate={{
              x: ["0%", "10%", "-5%", "0%"],
              y: ["0%", "20%", "5%", "0%"],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Neon Yellow Accent Glow (Very Faint) */}
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent blur-[150px] opacity-[0.03] transition-colors duration-500"
            animate={{
              x: ["0%", "-15%", "5%", "0%"],
              y: ["0%", "-10%", "-5%", "0%"],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Deep Slate Secondary Glow */}
          <motion.div
            className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-[#1E293B] blur-[100px] opacity-30"
            animate={{
              x: ["0%", "-10%", "15%", "0%"],
              y: ["0%", "-15%", "5%", "0%"],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        /* Static fallbacks for users preferring reduced motion */
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-surface blur-[120px] opacity-20 transition-colors duration-500" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent blur-[150px] opacity-[0.03] transition-colors duration-500" />
        </>
      )}

      {/* 
        Layer 2: Interactive Cursor Lighting/Distortion 
        Follows the mouse with spring physics and illuminates underlying content.
      */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full from-accent/10 to-surface/20 blur-[80px]"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.15,
            x: cursorX,
            y: cursorY,
            mixBlendMode: "screen", // Illuminates elements beneath it
          }}
        />
      )}

      {/* 
        Optional Noise Texture Overlays 
        Adds a tactile, cinematic "lens" grain to the dark canvas 
      */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
