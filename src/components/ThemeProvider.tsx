"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Thin wrapper around next-themes ThemeProvider.
 *
 * next-themes injects an inline <script> to set the theme class before first
 * paint (to avoid flash). React 19 logs a warning about script tags inside
 * components — this is informational and does not affect functionality.
 * The correct mitigation is suppressHydrationWarning on <html> in layout.tsx,
 * which is already in place.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}