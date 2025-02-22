const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        secondary: "#64748b",
        accent: "#0ea5e9",
        background: "#111827",
        card: "#1f2937",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
    },
  },
  plugins: [],
};
