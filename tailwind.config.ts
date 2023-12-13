import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        array: ["var(--font-array)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "geist-sans": ["var(--font-geist-sans)"],
        khand: ["var(--font-khand)"],
      },
      fontSize: {
        "cq-title": ["clamp(2.25rem, min(7.5vw, 15cqw), 15rem)", "1.15"],
        "cq-paragraph": "clamp(1rem, min(2.5vw, 6cqw), 5rem)",
      },
      transitionProperty: {
        visibility: "opacity, visibility",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
