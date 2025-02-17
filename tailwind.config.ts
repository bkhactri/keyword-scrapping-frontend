import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  important: "#root",
  theme: {
    extend: {},
  },
} satisfies Config;
