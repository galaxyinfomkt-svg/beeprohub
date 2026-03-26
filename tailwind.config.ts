import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#fec603", hover: "#e5b003", light: "#FFF8E1" },
        dark: { DEFAULT: "#141112", light: "#1e1c1d" },
        gold: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#fec603", 600: "#e5b003" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "-apple-system", "sans-serif"] },
      boxShadow: {
        glow: "0 4px 20px rgba(254,198,3,0.4)",
        "glow-lg": "0 8px 40px rgba(254,198,3,0.3)",
        card: "0 10px 30px rgba(0,0,0,0.08)",
        "card-hover": "0 20px 50px rgba(254,198,3,0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-yellow": "pulseYellow 2s ease-in-out infinite",
        shine: "shine 3s infinite",
        shimmer: "shimmer 3s infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-left": "fadeLeft 0.7s ease-out both",
        "fade-right": "fadeRight 0.7s ease-out both",
        "bounce-in": "bounceIn 0.8s ease-out both",
        wiggle: "wiggle 1s ease-in-out infinite",
        gradient: "gradient 6s ease infinite",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-15px)" } },
        pulseYellow: { "0%, 100%": { boxShadow: "0 0 0 0 rgba(254,198,3,0.6)" }, "50%": { boxShadow: "0 0 0 15px rgba(254,198,3,0)" } },
        shine: { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        shimmer: { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(40px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeLeft: { from: { opacity: "0", transform: "translateX(-40px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        fadeRight: { from: { opacity: "0", transform: "translateX(40px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        bounceIn: { "0%": { opacity: "0", transform: "scale(0.3)" }, "50%": { transform: "scale(1.05)" }, "70%": { transform: "scale(0.9)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        wiggle: { "0%, 100%": { transform: "rotate(-2deg)" }, "50%": { transform: "rotate(2deg)" } },
        gradient: { "0%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" }, "100%": { backgroundPosition: "0% 50%" } },
      },
    },
  },
  plugins: [],
};

export default config;
