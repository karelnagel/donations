const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[600],
        secondary: colors.red[400],
        background: colors.zinc[900],
        white: colors.white,
        black: colors.stone[900],
        //remove
        primaryDark: colors.blue[900],
        stream1: colors.blue[700],
        stream2: colors.red[600],
      },
      backgroundImage: {
        blobs: "url('/svgs/blobs.svg')",
        footer: "url('/svgs/footer.svg')",
        back: "url('/svgs/background.svg')",
        project: "url('/svgs/project.svg')",
      }
    },
  },
  plugins: [],
}