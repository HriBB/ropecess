export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export const isValidTheme = (theme: any): theme is Theme =>
  Object.values(Theme).includes(theme)
