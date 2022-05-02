const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.red[600],
        primaryDark: colors.red[800],
        secondary: colors.blue[700],
        white: colors.white,
        black: colors.stone[900],
        stream1: colors.blue[700],
        stream2: colors.red[600],
      }
    },
  },
  plugins: [],
}