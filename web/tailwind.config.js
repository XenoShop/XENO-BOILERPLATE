/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ui: {
          bg: '#0b0c10',
          panel: '#12141a',
          layer: '#161920',
          raised: '#1b1f27',
          border: 'rgba(255,255,255,0.07)',
          textMuted: '#8a909d',
          accent: 'rgb(var(--ui-accent) / <alpha-value>)',
          accentBright: 'rgb(var(--ui-accent-bright) / <alpha-value>)',
          accentDeep: 'rgb(var(--ui-accent-deep) / <alpha-value>)',
          accentInk: 'rgb(var(--ui-accent-ink) / <alpha-value>)',
          success: '#10B981',
          info: '#06B6D4',
          danger: '#EF4444',
          violet: '#8B5CF6',
          blue: '#3B82F6',
          amber: '#F59E0B',
          pink: '#EC4899',
          yellow: '#EAB308',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ui-soft': '0 24px 60px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)',
        'ui-glow': '0 0 22px rgb(var(--ui-accent) / 0.35)',
      },
      borderRadius: {
        'panel-xl': '22px',
      },
      backdropBlur: {
        panel: '12px',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.45' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

