/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
      backgroundImage: {
        stars: "url('/images/4-point-stars.svg')",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
