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
        /* PRIMARY ACCENT – RESTRICTED USE */
        "neon-yellow": "#D2FF00",
        
        /* PALETTE CORE */
        "charcoal-deep": "#111112",   /* Tech background */
        "cream-slate": "#F4F3F1",     /* Creative background */
        "sage-muted": "#7F8177",      /* Neutral border/text */
        "olive-dark": "#2D3126",      /* Secondary surface */
        
        /* TECH MODE BACKGROUNDS */
        "bg-tech-card": "rgba(45, 49, 38, 0.50)",
        "bg-tech-card-hover": "rgba(45, 49, 38, 0.65)",
        
        /* CREATIVE MODE BACKGROUNDS */
        "bg-creative-card": "rgba(255, 255, 255, 0.60)",
        "bg-creative-card-hover": "rgba(255, 255, 255, 0.75)",
        
        /* TEXT COLORS – TECH MODE */
        "text-tech-primary": "#F4F3F1",
        "text-tech-secondary": "rgba(244, 243, 241, 0.85)",
        "text-tech-tertiary": "rgba(244, 243, 241, 0.65)",
        "text-tech-muted": "rgba(127, 129, 119, 0.75)",
        
        /* TEXT COLORS – CREATIVE MODE */
        "text-creative-primary": "#111112",
        "text-creative-secondary": "rgba(17, 17, 18, 0.75)",
        "text-creative-tertiary": "rgba(17, 17, 18, 0.60)",
        "text-creative-muted": "rgba(127, 129, 119, 0.65)",
      },
      
      borderColor: {
        /* TECH BORDERS */
        "tech-subtle": "rgba(127, 129, 119, 0.12)",
        "tech-active": "rgba(127, 129, 119, 0.30)",
        "tech-highlight": "rgba(127, 129, 119, 0.40)",
        
        /* CREATIVE BORDERS */
        "creative-subtle": "rgba(45, 49, 38, 0.08)",
        "creative-active": "rgba(45, 49, 38, 0.16)",
        "creative-highlight": "rgba(45, 49, 38, 0.24)",
      },
      
      boxShadow: {
        /* TECH SHADOWS */
        "tech-subtle": "0 2px 8px rgba(0, 0, 0, 0.15)",
        "tech-lift": "0 8px 24px rgba(0, 0, 0, 0.20)",
        "tech-floating": "0 12px 40px rgba(0, 0, 0, 0.25)",
        
        /* CREATIVE SHADOWS */
        "creative-subtle": "0 2px 8px rgba(45, 45, 45, 0.08)",
        "creative-lift": "0 8px 24px rgba(45, 45, 45, 0.12)",
        "creative-floating": "0 12px 40px rgba(45, 45, 45, 0.16)",
        
        /* NEON GLOW – USE SPARINGLY */
        "neon-glow": "0 0 12px rgba(210, 255, 0, 0.15)",
        "neon-glow-intense": "0 0 20px rgba(210, 255, 0, 0.25)",
      },
      
      fontFamily: {
        header: ["'Mona Sans'", "sans-serif"],
        body: ["'Hubot Sans'", "sans-serif"],
      },
      
      /* UTILITY PLUGINS FOR DUAL-MODE CARDS */
      // Use CSS classes in components: className="card-tech" or "card-creative"
    },
  },
  plugins: [],
};

export default config;
