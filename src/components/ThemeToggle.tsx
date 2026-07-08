"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid var(--card-border)",
          background: "var(--card-bg)",
          opacity: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid var(--card-border)",
        background: "var(--color-bg)",
        color: "var(--color-text-main)",
        cursor: "pointer",
        transition: "background 300ms ease, border-color 300ms ease",
        zIndex: 50,
        overflow: "hidden",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--nav-bg-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg)";
      }}
    >
      <div style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Sun icon — visible in light mode */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Sun style={{ width: 20, height: 20, color: "var(--color-text-main)" }} strokeWidth={1.5} />
        </motion.div>

        {/* Moon icon — visible in dark mode */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Moon style={{ width: 16, height: 16, color: "var(--color-accent)" }} strokeWidth={1.5} />
        </motion.div>
      </div>
    </button>
  );
}