import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        admin: {
          dark: "#080B14",
          panel: "#111827",
          line: "#263145",
          green: "#B6FF7D",
          gold: "#E2A354"
        }
      }
    }
  },
  plugins: []
};

export default config;
