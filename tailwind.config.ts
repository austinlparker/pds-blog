import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: {
            light: "#f1f1f1",
            dark: "#1a1a1a",
          },
          text: {
            light: "#2a2a2a",
            dark: "#e1e1e1",
          },
          accent: {
            light: "#2d5a27",
            dark: "#4CAF50",
          },
          muted: {
            light: "#666666",
            dark: "#888888",
          },
          border: {
            light: "#dedede",
            dark: "#333333",
          },
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        kode: ["var(--font-kode-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
