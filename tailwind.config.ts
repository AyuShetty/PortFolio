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
        "neon-yellow": "#D2FF00",
        "deep-charcoal": "#111112",
        "off-white": "#F4F3F1",
        "muted-sage": "#7F8177",
        "dark-olive": "#2D3126",
      },
      fontFamily: {
        header: ["'Mona Sans'", "sans-serif"],
        body: ["'Hubot Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
