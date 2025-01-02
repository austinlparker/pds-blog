import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        kode: ["var(--font-kode-mono)"],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },

            "not(pre) > code": {
              backgroundColor: "rgb(240 253 244)", // green-50
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },

            pre: {
              padding: "0",
              margin: "0",
              backgroundColor: "transparent",
              border: "none",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontWeight: "400",
            },

            // Dark mode
            ".dark &": {
              "not(pre) > code": {
                backgroundColor: "rgb(6 78 59 / 0.15)", // dark green with low opacity
              },
              a: {
                borderColor: "rgb(88 28 135)", // purple-800
                "&:hover": {
                  borderColor: "rgb(216 180 254)", // purple-300
                },
              },
            },
            "--tw-prose-body": "rgb(55 65 81)", // gray-700
            "--tw-prose-headings": "rgb(126 34 206)", // purple-700 (contrast ratio 7.42:1 on white)
            "--tw-prose-links": "rgb(126 34 206)", // purple-700
            "--tw-prose-code": "rgb(22 163 74)", // green-600
            "--tw-prose-pre-code": "rgb(229 231 235)", // gray-200
            "--tw-prose-pre-bg": "rgb(31 41 55)", // gray-800

            // Dark mode
            "--tw-prose-invert-body": "rgb(229 231 235)", // gray-200
            "--tw-prose-invert-headings": "rgb(216 180 254)", // purple-300 (contrast ratio 14.95:1 on gray-900)
            "--tw-prose-invert-links": "rgb(216 180 254)", // purple-300
            "--tw-prose-invert-code": "rgb(74 222 128)", // green-400
            "--tw-prose-invert-pre-code": "rgb(229 231 235)", // gray-200
            "--tw-prose-invert-pre-bg": "rgb(17 24 39)", // gray-900

            // Base styles
            maxWidth: "none",
            a: {
              textDecoration: "none",
              borderBottom: "1px solid",
              borderColor: "rgb(233 213 255)", // purple-200
              transition: "border-color 0.2s ease",
              "&:hover": {
                borderColor: "rgb(126 34 206)", // purple-700
              },
            },
            img: {
              borderRadius: "0.5rem",
            },
            "figure img": {
              margin: "0 auto",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
