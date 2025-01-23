import { heroui } from "@heroui/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*",
    "./src/pages/**/*",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
