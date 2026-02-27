import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ffgym: {
          red: '#C8102E',
          blue: '#002855',
          'gradient-start': '#0055A4',
          'gradient-mid': '#003A6E',
          'gradient-end': '#001C38',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'ffgym-red': '0 10px 40px -10px rgba(200, 16, 46, 0.35)',
        'ffgym-red-lg': '0 12px 48px -10px rgba(200, 16, 46, 0.45)',
        'ffgym-blue': '0 10px 40px -10px rgba(0, 43, 85, 0.25)',
        'glow-emerald': '0 10px 40px -10px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 10px 40px -10px rgba(244, 63, 94, 0.4)',
        'card': '0 4px 20px -4px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 30px -8px rgba(0, 0, 0, 0.15)',
        'modal': '0 25px 80px -20px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
