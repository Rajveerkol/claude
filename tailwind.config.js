/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF9F6',
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F4F2EC',
          300: '#ECE8DE',
          400: '#E0DACD',
        },
        richblack: {
          DEFAULT: '#171717',
          50: '#2A2A2A',
          100: '#1F1F1F',
          200: '#171717',
          300: '#111111',
          400: '#0A0A0A',
        },
        burgundy: {
          DEFAULT: '#8D2635',
          50: '#FBF0F2',
          100: '#F4D7DB',
          200: '#E4A9B3',
          300: '#D07687',
          400: '#B04457',
          500: '#8D2635',
          600: '#751E2B',
          700: '#5C1722',
          800: '#46111A',
          900: '#320B12',
        },
        champagne: {
          DEFAULT: '#E8DDCF',
          50: '#FAF7F3',
          100: '#F4EFE7',
          200: '#E8DDCF',
          300: '#D8C6B1',
          400: '#C5AC91',
          500: '#B29272',
          600: '#947656',
        },
        softgray: {
          DEFAULT: '#F1F1EF',
          50: '#FAF9F8',
          100: '#F1F1EF',
          200: '#E4E4E1',
          300: '#D5D5D0',
          400: '#A8A8A2',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(23, 23, 23, 0.05), 0 2px 6px -1px rgba(23, 23, 23, 0.03)',
        'luxury-lg': '0 10px 30px -4px rgba(23, 23, 23, 0.08), 0 4px 10px -2px rgba(23, 23, 23, 0.04)',
        'luxury-hover': '0 16px 36px -6px rgba(141, 38, 53, 0.12), 0 6px 14px -3px rgba(23, 23, 23, 0.06)',
        'dark-luxury': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'luxury': '16px',
        'luxury-lg': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
