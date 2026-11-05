/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js,jsx,css}",
    "./components/**/*.{html,js,jsx,css}",
    "./*.{html,js,jsx,css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        naste: ['Naste', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
