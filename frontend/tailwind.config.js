/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        glassWhite: 'rgba(255, 255, 255, 0.3)',
        glassDark: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
