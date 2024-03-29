import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* Animations */
      keyframes: {
        "slide-in-out": {
          "0%": { opacity: "0", transform: "translateY(-200%)" },
          "50%": { opacity: "1" },
          "80%, 100%": { opacity: "0", transform: "translateY(0px)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        /* Modal Animations */
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translate(var(--translateX, 0), var(--translateY, 0))",
          },
          "100%": { opacity: "1", transform: "translate(0, 0)" },
        },
        "slide-out": {
          "0%": { opacity: "1", transform: "translate(0, 0)" },
          "100%": {
            opacity: "0",
            transform: "translate(var(--translateX, 0), var(--translateY, 0))",
          },
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
        surface: "#00060E",
        primary: {
          10: "#001C3B",
          20: "#00315F",
          30: "#004786",
          40: "#205FA6",
          50: "#4078C1",
          60: "#5C92DC",
          70: "#78ADF9",
          80: "#A6C8FF",
          90: "#D5E3FF",
          95: "#EBF1FF",
          99: "#FDFCFF",
        },
        secondary: {
          10: "#121C2B",
          20: "#273141",
          30: "#3D4758",
          40: "#555F71",
          50: "#6D788A",
          60: "#8791A5",
          70: "#A1ACC0",
          80: "#BDC7DC",
          90: "#D9E3F8",
          // 95 & 99 are the same as `primary-*`
        },
        tertiary: {
          10: "#27132F",
          20: "#3D2846",
          30: "#553F5D",
          40: "#6E5676",
          50: "#886E90",
          60: "#A388AA",
          70: "#BEA2C6",
          80: "#DABDE2",
          90: "#F7D8FF",
          95: "#FEEBFF",
          99: "#FFFBFF",
        },
        neutral: {
          10: "#1A1C1E",
          20: "#2F3033",
          30: "#46474A",
          40: "#5E5E62",
          50: "#76777A",
          60: "#909094",
          70: "#ABABAE",
          80: "#C7C6CA",
          90: "#E3E2E6",
          95: "#F1F0F4",
          99: "#FDFBFF",
        },
        neutralAlt: {
          10: "#181C22",
          20: "#2D3038",
          30: "#43474E",
          40: "#5B5E66",
          50: "#74777F",
          60: "#8D9199",
          70: "#A8ABB4",
          80: "#C4C6CF",
          90: "#E0E2EC",
          95: "#EEF0FA",
          99: "#FDFBFF",
        },
        carrot: {
          55: "#FF5D1F",
          60: "#EB6A28",
          70: "#FF8C57",
        },
        rarity: {
          1: "#A0A0A0",
          2: "#DAE33E",
          3: "#00B3FD",
          4: "#D6C5D6",
          5: "#FFC802",
          6: "#DC7621",
        },
      },
      boxShadow: {
        lift: "0 1px 2px 1px rgba(0, 0, 0, 0.25)",
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
        xs: "12px",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
