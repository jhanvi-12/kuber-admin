/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#16141c',
          muted: '#5c5866',
          faint: '#8b8794',
        },
        paper: {
          DEFAULT: '#f7f5f1',
          warm: '#efebe4',
        },
        line: '#e6e1d8',
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6c2bd9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1280px',
        prose: '42rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 20, 28, 0.06)',
        lift: '0 12px 32px rgba(22, 20, 28, 0.08)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
