/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#122848',
          dark: '#070F1E',
          50: '#E8EDF5',
          100: '#C5D2E8',
          900: '#0B1F3A',
        },
        royal: {
          DEFAULT: '#0066FF',
          light: '#3385FF',
          dark: '#0052CC',
        },
        gold: {
          DEFAULT: '#FFC107',
          light: '#FFD54F',
          dark: '#FF8F00',
        },
        emerald: {
          bank: '#00C853',
          light: '#69F0AE',
          dark: '#00952A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(11, 31, 58, 0.10)',
        'card-lg': '0 8px 40px rgba(11, 31, 58, 0.18)',
        'royal': '0 4px 20px rgba(0, 102, 255, 0.30)',
        'gold': '0 4px 20px rgba(255, 193, 7, 0.30)',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 50%, #0052CC 100%)',
        'gradient-royal': 'linear-gradient(135deg, #0052CC 0%, #0066FF 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FF8F00 0%, #FFC107 100%)',
      },
      animation: {
        'fade-up': 'fadeInUp 0.6s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}
