/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#4CAC70',
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },

    },
  },
  plugins: [],
}

