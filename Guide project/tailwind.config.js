/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#121212',
          surface: '#1E1E1E',
          card: '#2D2D2D',
          modal: '#333333',
          border: '#424242',
          divider: '#333333',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          tertiary: '#BDBDBD',
          disabled: '#757575',
        },
        purple: {
          primary: '#9C27B0',
          hover: '#AB47BC',
          active: '#7B1FA2',
          secondary: '#4A148C',
        },
        status: {
          success: '#00C853',
          error: '#FF1744',
          warning: '#FFB300',
          info: '#2196F3',
        },
      },
    },
  },
  plugins: [],
};