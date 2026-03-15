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
        primary: "#ee2b3b",
        "background-light": "#f8f6f6",
        "background-dark": "#221012",
        "surface-dark": "#1a1a1a",
        "accent-dark": "#2a1a14",
        "card-dark": "#1a1a1a",
        "border-dark": "rgba(238, 43, 59, 0.1)",
        accent: '#ee2b3b', 
        surface: '#1a1a1a',
        'text-primary': '#f8f6f6',
        'text-secondary': '#a1a1aa',
        'text-on-dark': '#f8f6f6',
        success: '#10b981',
        danger: '#ef4444',
        border: 'rgba(238, 43, 59, 0.1)',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
