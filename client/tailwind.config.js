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
        primary: '#0A0F1E',
        accent: '#C9A84C',
        surface: '#F7F5F0',
        'text-primary': '#0A0F1E',
        'text-secondary': '#6B6B6B',
        'text-on-dark': '#F7F5F0',
        success: '#1A7F5A',
        danger: '#C0392B',
        border: '#E2DDD6',
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
