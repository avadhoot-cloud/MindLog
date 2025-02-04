/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite', // Slow spinning effect
      },
    },
  },
  plugins: [],
};
