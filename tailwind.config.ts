import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

/*
const baseTheme = {
  primary: 'oklch(69.71% 0.329 342.55)',
  secondary: 'oklch(65.69% 0.196 275.75)',
}
*/

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
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
          //...baseTheme,
        },
        dark: {
          ...themes.dark,
          //...baseTheme,
        },
      },
    ],
  },
} satisfies Config
