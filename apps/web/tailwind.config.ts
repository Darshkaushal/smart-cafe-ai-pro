import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cafe: {
          dark: "#120909",
          brown: "#5B2B20",
          caramel: "#E2A354",
          cream: "#FFF3DF",
          neon: "#B6FF7D"
        }
      },
      boxShadow: {
        glow: "0 0 45px rgba(226, 163, 84, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
