/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          green: {
            light: '#E8F5E9',
            DEFAULT: '#81C784',
            dark: '#4CAF50',
          },
          yellow: {
            light: '#FFF9C4',
            DEFAULT: '#FFE082',
            dark: '#FFD54F',
          },
          brown: {
            light: '#D7CCC8',
            DEFAULT: '#A1887F',
            dark: '#795548',
          }
        }
      },
    },
  },
  plugins: [],
}
