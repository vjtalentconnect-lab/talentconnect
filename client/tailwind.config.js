/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee2b3b',
        secondary: '#1A1A1A',
        'background-light': '#f8f6f6',
        'background-dark': '#221012',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1E1E1E',
        'accent-dark': '#2a1a14',
        'card-dark': '#1e1410',
        'border-dark': '#3d2b22',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
