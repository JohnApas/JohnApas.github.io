import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  THEME_COVER_MS,
  THEME_TRANSITION_MS,
  ThemeContext,
  type Theme,
} from '../../hooks/useTheme'

function readStoredTheme(): Theme {
  const stored = localStorage.getItem('theme')
  return stored === 'dark' ? 'dark' : 'light'
}

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
  localStorage.setItem('theme', theme)
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrim, setScrim] = useState<{ color: string; opacity: number } | null>(
    null,
  )

  useEffect(() => {
    applyThemeClass(theme)
    const id = window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-instant')
    })
    return () => window.cancelAnimationFrame(id)
  }, [theme])

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return

    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const color = next === 'dark' ? '#000000' : '#f5f5f7'

    setIsTransitioning(true)
    setScrim({ color, opacity: 0 })

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setScrim({ color, opacity: 1 })
      })
    })

    window.setTimeout(() => {
      setTheme(next)
      applyThemeClass(next)
      setScrim({ color, opacity: 0 })
    }, THEME_COVER_MS)

    window.setTimeout(() => {
      setScrim(null)
      setIsTransitioning(false)
    }, THEME_TRANSITION_MS)
  }, [isTransitioning, theme])

  const value = useMemo(
    () => ({ theme, isTransitioning, toggleTheme }),
    [theme, isTransitioning, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {scrim && (
        <div
          className="theme-scrim"
          style={{ backgroundColor: scrim.color, opacity: scrim.opacity }}
          aria-hidden="true"
        />
      )}
    </ThemeContext.Provider>
  )
}
