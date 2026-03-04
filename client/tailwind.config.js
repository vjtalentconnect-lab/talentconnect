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
        primary: '#ec5b13',
        secondary: '#1A1A1A',
        'background-light': '#f8f6f6',
        'background-dark': '#120a07',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1a1a1a',
        'accent-dark': '#2a1a14',
        'card-dark': '#1e1410',
        'border-dark': '#36241c',
      },
      fontFamily: {
        display: ['Public Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
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
