"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // resolvedTheme is undefined until next-themes has read localStorage/system pref.
  // We default to "dark" here only to decide icon animation targets —
  // the button shell itself is always rendered, so no element-type mismatch occurs.
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
      className="relative flex items-center justify-center w-10 h-10 rounded-full
                 border border-card-border bg-background focus:outline-none focus:ring-2
                 focus:ring-accent transition-colors duration-300 hover:bg-card z-50 overflow-hidden"
      aria-label="Toggle Dark Mode"
      // Suppress the attribute diff next-themes causes on the <html> element
      // from propagating into this button's children during first render.
      suppressHydrationWarning
    >
      <div className="relative w-5 h-5 flex items-center justify-center text-primary">
        {/* Sun icon — hidden until mounted; then visible only in light mode */}
        <motion.div
          initial={false}
          animate={{
            scale: mounted && !isDark ? 1 : 0,
            opacity: mounted && !isDark ? 1 : 0,
            rotate: mounted && !isDark ? 0 : -90,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </motion.div>

        {/* Moon icon — hidden until mounted; then visible only in dark mode */}
        <motion.div
          initial={false}
          animate={{
            scale: mounted && isDark ? 1 : 0,
            opacity: mounted && isDark ? 1 : 0,
            rotate: mounted && isDark ? 0 : 90,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-4 h-4 text-primary" strokeWidth={1.5} />
        </motion.div>
      </div>
    </button>
  );
}