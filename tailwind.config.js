/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Vercel Commerce
        primary: '#000000',
        secondary: '#18181B',
        accent: {
          0: '#FAFAFA',
          1: '#F4F4F5',
          2: '#E4E4E7',
          3: '#D4D4D8',
          4: '#A1A1AA',
          5: '#71717A',
          6: '#52525B',
          7: '#3F3F46',
          8: '#27272A',
          9: '#18181B',
        },
        // Colores de acento
        violet: {
          light: '#A78BFA',
          DEFAULT: '#7C3AED',
          dark: '#4C1D95',
        },
        pink: {
          light: '#F472B6',
          DEFAULT: '#EC4899',
        },
        cyan: {
          light: '#67E8F9',
          DEFAULT: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      maxWidth: {
        '8xl': '1920px',
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        128: '32rem',
      },
      boxShadow: {
        magical: '0 2px 40px 0 rgba(0, 0, 0, 0.08)',
        'outline-normal': '0 0 0 2px var(--accent-2)',
      },
      letterSpacing: {
        accents: '.15em',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}