/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins']
      },
      colors: {
        'golden-700': '#5A3C07',
        'golden-500': '#FDB000'
      }
    },
  },
  plugins: [],
}

