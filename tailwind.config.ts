import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: "#10B981",
        dark: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
