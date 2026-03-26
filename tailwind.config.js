/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FDF6E3',
          200: '#FBE8B0',
          300: '#F8D678',
          400: '#F5C23B',
          500: '#D4AF37', // Royal Gold
          600: '#AA8A2A',
          700: '#82681D',
          800: '#5C4A13',
          900: '#382D0A',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5C23B 0%, #D4AF37 50%, #AA8A2A 100%)',
        'dark-gradient': 'linear-gradient(to bottom right, #0a0a0a, #121212)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
};
