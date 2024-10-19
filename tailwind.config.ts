import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes.emerald,
          primary: themes.emerald.secondary,
          'primary-content': themes.emerald['secondary-content'],
          secondary: themes.emerald.primary,
          'secondary-content': themes.emerald['primary-content'],
        },
        dark: {
          ...themes.dark,
        },
      },
    ],
  },
} satisfies Config
