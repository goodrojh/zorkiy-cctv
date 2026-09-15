import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080B12",
        night: "#0E1421",
        steel: "#161E2E",
        accent: { DEFAULT: "#00D68F", dark: "#00B377", glow: "#33FFB0" },
        alert: { DEFAULT: "#FF4D3D" },
      },
      fontFamily: {
        display: ["'Chakra Petch'", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
