import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          accent:  '#60A5FA',
          bg:      '#090909',
          surface: '#111111',
          border:  '#1E1E1E',
          muted:   '#6B7280',
          text:    '#FFFFFF',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee':        'marquee 30s linear infinite',
        'marquee-rev':    'marquee-rev 25s linear infinite',
        'fade-up':        'fadeUp 0.6s ease-out forwards',
        'bounce-slow':    'bounceSlow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(37, 99, 235, 0.35)',
        'glow-sm':   '0 0 20px rgba(37, 99, 235, 0.2)',
        'card':      '0 1px 3px rgba(0,0,0,0.8), 0 0 0 1px #1E1E1E',
      },
    },
  },
  plugins: [],
}

export default config
