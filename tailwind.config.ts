import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F5B800",
          hover: "#E0A800",
          light: "#FFF8E1",
        },
        dark: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
        },
      },
    },
  },
  plugins: [],
};

export default config;
