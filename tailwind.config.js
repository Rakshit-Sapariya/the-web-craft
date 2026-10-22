/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F1ECE6',
          card: '#DDD5CD',
          primary: '#7D4047',
          'primary-hover': '#67333a',
          'primary-light': '#98535c',
          'primary-subtle': '#f3e8e9',
          dark: '#2E2E2E',
          muted: '#625f5c',
          border: '#DDD5CD',
          light: '#FAFAF8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 46, 46, 0.06), 0 2px 6px -1px rgba(46, 46, 46, 0.04)',
        'elevated': '0 12px 30px -4px rgba(46, 46, 46, 0.12), 0 4px 10px -2px rgba(46, 46, 46, 0.06)',
        'wine': '0 8px 25px -4px rgba(125, 64, 71, 0.28)',
      }
    },
  },
  plugins: [],
}
