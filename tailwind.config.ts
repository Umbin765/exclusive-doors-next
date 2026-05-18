import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF6600',
          hover: '#E55A00',
        },
        cream: '#F4F1EC',
        'warm-dark': '#1C1710',
        'warm-text': '#2C2418',
        'warm-muted': '#8A7D6E',
        'warm-border': '#E2D9CE',
        'warm-subtle': '#EDE9E3',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        disp: ['Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
