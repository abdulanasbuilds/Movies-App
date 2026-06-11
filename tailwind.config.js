/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#e50914', // Netflix Red
        secondary: '#f47521', // Crunchyroll Orange
        surface: '#141414',
      },
    },
  },
  plugins: [],
}
