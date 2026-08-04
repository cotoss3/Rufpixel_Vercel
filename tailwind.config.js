/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ruforange: {
          50: '#FFF5F0',
          100: '#FFEADF',
          200: '#FFCEBF',
          300: '#FFAA94',
          400: '#FF7D5D',
          500: '#FF5E14', // Brand Accent Orange
          600: '#E04700', // Hover
          700: '#B83400',
          800: '#8A2500',
          900: '#5C1700',
          DEFAULT: '#FF5E14',
        },
        rufdark: {
          950: '#070707',
          900: '#0D0D0D', // Header & Footer Jet Black
          800: '#141414', // Dark Section Surface
          700: '#1F1F1F', // Card Dark Surface
          600: '#2A2A2A',
          DEFAULT: '#0D0D0D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ruf-glow': '0 0 20px rgba(255, 94, 20, 0.25)',
        'ruf-card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};
