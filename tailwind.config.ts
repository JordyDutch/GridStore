import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lukso: {
          pink: "#FE005B",
          purple: "#7B3FE4",
          dark: "#0D0D0D",
          gray: "#1A1A1A",
          light: "#F5F5F5",
        },
      },
      backgroundImage: {
        "gradient-lukso": "linear-gradient(135deg, #FE005B 0%, #7B3FE4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
