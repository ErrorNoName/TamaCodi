/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['VT323', 'monospace'],
      },
      keyframes: {
        analyze: {
          '0%': { transform: 'scaleX(0)' },
          '50%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' }
        }
      },
    },
  },
  plugins: [],
};
