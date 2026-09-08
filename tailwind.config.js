/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Chivo', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        dark: {
          background: '#08070D',
          surface: '#190D2B',
          card: '#21172D',
          modal: '#2D203D',
          border: '#4D3C62',
          divider: '#2D203D',
        },
        text: {
          primary: '#F5F2FA',
          secondary: '#E0E0E0',
          tertiary: '#BDBDBD',
          disabled: '#757575',
        },
        purple: {
          primary: '#8B5CF6',
          hover: '#C4B5FD',
          active: '#7C3AED',
          secondary: '#190D2B',
        },
        status: {
          success: '#00C853',
          error: '#FF1744',
          warning: '#FFB300',
          info: '#2196F3',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientSpin: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'gradient-spin': 'gradientSpin 6s ease infinite',
        'soft-pulse': 'softPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
