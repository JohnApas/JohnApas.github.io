import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_TRANSITION_MS = 1000
export const THEME_COVER_MS = 500

interface ThemeContextValue {
  theme: Theme
  isTransitioning: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
