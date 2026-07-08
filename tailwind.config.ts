import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic, adaptive theme variables
        background: "var(--color-bg)",
        primary: "var(--color-text-main)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        card: "var(--card-bg)",
        "card-hover": "var(--card-bg-hover)",
        "card-border": "var(--card-border)",
        
        // Static references (if needed)
        "neon-yellow": "#D2FF00",
        "deep-charcoal": "#111112",
        "off-white": "#F4F3F1",
        "muted-sage": "#7F8177",
        "dark-olive": "#2D3126",
      },
      boxShadow: {
        card: "var(--card-shadow)",
        "card-hover": "var(--card-shadow-hover)",
      },
      fontFamily: {
        header: ["var(--font-header)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
