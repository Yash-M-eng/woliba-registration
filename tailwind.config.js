/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E05A66',
        primaryHover: '#d14855',
        secondary: '#1A2B4C',
        textMuted: '#666666',
        inputBorder: '#E5E7EB',
        inputFocus: '#1A2B4C',
        cardBg: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
