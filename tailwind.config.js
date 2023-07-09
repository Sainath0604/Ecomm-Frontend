/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customDark: {
          500: "#020102",
        },
      },
    },
  },
  plugins: [],
};
