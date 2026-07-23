/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#2c3d57',
        'navy-deep': '#153454',
        cream: '#f7f3eb',
        'cream-warm': '#f3eee7',
        sage: '#85a2a3',
        yellow: '#e8b92f',
        rust: '#b7553d',
        'navy-light': '#4a5568',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
