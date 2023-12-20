import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* Animations */
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: "0", transform: "translateY(-200%)" },
          "50%": { opacity: "1" },
          "80%, 100%": { opacity: "0", transform: "translateY(0px)" },
        },
      },
      transitionProperty: {
        visibility: "opacity, visibility",
      },
      /* Styling */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        caerula: {
          40: "#99A5B4",
          60: "#66798F",
          80: "#334C69",
          100: "#001F44",
          120: "#001936",
          160: "#000C1B",
          180: "#00060E",
        },
        dust: {
          5: "#F2F2F2",
          10: "#E6E6E6",
          20: "#D9D9D9",
          30: "#666666",
          85: "#4D4D4D",
          100: "#262626",
          150: "#131313",
          165: "#0E0E0C",
        },
        desatAqua: {
          70: "#5F9EA0",
          100: "#134E4A",
        },
      },
      /* Grid */
      gridTemplateColumns: {
        autoFill:
          "repeat(auto-fill, minmax(min(var(--min-col-size, 200px), 100%), 1fr))",
        autoFit:
          "repeat(auto-fit, minmax(min(var(--min-col-size, 200px), 100%), 1fr))",
      },
      gridTemplateRows: {
        autoFill:
          "repeat(auto-fill, minmax(min(var(--min-row-size, 200px), 100%), 1fr))",
        autoFit:
          "repeat(auto-fit, minmax(min(var(--min-row-size, 200px), 100%), 1fr))",
      },
      /* Fonts */
      fontFamily: {
        array: ["var(--font-array)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "geist-sans": ["var(--font-geist-sans)"],
        khand: ["var(--font-khand)"],
      },
      fontSize: {
        "cq-title": ["clamp(2rem, min(7.5vw, 15cqw), 15rem)", "1.15"],
        "cq-heading-3": ["clamp(1rem, 11.25cqw, 12.5rem)", "1.15"],
        "cq-paragraph": "clamp(1rem, min(2.5vw, 6cqw), 5rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
