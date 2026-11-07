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
          bg: '#FFF7E8',
          cream: '#FFF7E8',
          card: '#F1E8D8',
          dark: '#000000',
          black: '#000000',
          navy: '#000000',
          royal: '#355CDE',
          'royal-hover': '#2447B8',
          'royal-active': '#1A379B',
          primary: '#355CDE',
          'primary-hover': '#2447B8',
          accent: '#355CDE',
          ink: '#0F0E0C',
          espresso: '#3D362E',
          umber: '#6B6053',
          muted: '#3D362E',
          border: '#E2D7C3',
          'border-subtle': '#EDE4D2',
          light: '#FFFDF9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 14, 12, 0.05), 0 2px 6px -1px rgba(15, 14, 12, 0.03)',
        'elevated': '0 12px 30px -4px rgba(15, 14, 12, 0.10), 0 4px 10px -2px rgba(15, 14, 12, 0.04)',
        'royal': '0 8px 25px -4px rgba(53, 92, 222, 0.25)',
        'navy': '0 8px 25px -4px rgba(0, 0, 0, 0.28)',
      }
    },
  },
  plugins: [],
}
