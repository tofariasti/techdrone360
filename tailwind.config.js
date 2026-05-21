/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f1',
          100: '#fae8dc',
          400: '#e8a078',
          500: '#e8956a',
          600: '#d97b4a',
          700: '#b85f32',
        },
        dark: {
          900: '#0a0f14',
          800: '#111827',
          700: '#1f2937',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
