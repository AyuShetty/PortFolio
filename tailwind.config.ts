import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-green": "#0b3d2e",
        "forest-green": "#1f7a63",
        sand: "#e6d5b8",
        "off-white": "#f5f5f5",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
