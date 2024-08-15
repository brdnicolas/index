import type { Config } from 'tailwindcss'

const SPACINGS = {
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: ' 24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
  21: '84px',
  22: '88px',
  23: '92px',
  24: '96px',
  25: '100px',
  26: '104px',
  27: '108px',
  28: '116px'
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      desktop: '1216px',
      tablet: '768px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontSize: { ...SPACINGS },
      spacing: {
        layout: '1204px',
        ...SPACINGS
      },
      borderRadius: {
        ...SPACINGS
      },
      colors: {
        success: '#20D761',
        dark: {
          default: '#000000',
          800: '#1B1B1B',
          700: '#404040',
          600: '#282828',
          500: '#A0A0A0',
          400: '#645959',
          300: '#BFBFBF',
          100: '#6E6E6E'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
}
export default config
