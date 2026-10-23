/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B192C',
          'navy-dark': '#060D17',
          'navy-light': '#1E3E62',
          'navy-surface': '#15253F',
          gold: '#D4AF37',
          'gold-dark': '#B8860B',
          'gold-light': '#F7E096',
          'gold-subtle': '#FFFDF5',
          white: '#FFFFFF',
          'slate-bg': '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 20px 40px -15px rgba(11, 25, 44, 0.12)',
        'gold-glow': '0 4px 20px 0 rgba(212, 175, 55, 0.35)',
      },
    },
  },
  plugins: [],
};
