/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#2c3d57',
        cream: '#F4F3F0',
        sage: '#85a2a3',
        yellow: '#f1d263',
        'navy-light': '#4a5568',
        'sage-light': '#a8c5c6',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
