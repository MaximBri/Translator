import { useEffect, useState, useCallback } from 'react'
import { THEME_KEY } from '../config/localStorageKeys'

export type ThemeOption = 'light' | 'dark' | 'system'

export function useTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'system'

  const [theme, setThemeState] = useState<ThemeOption>(
    currentTheme as ThemeOption
  )

  const applyTheme = useCallback((theme: ThemeOption) => {
    const root = window.document.documentElement

    const isSystemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    const finalTheme =
      theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme

    root.classList.remove('light', 'dark')
    root.classList.add(finalTheme)
  }, [])

  const handler = () => {
    if (theme === 'system') {
      applyTheme('system')
    }
  }

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const prefersQuery = window.matchMedia('(prefers-color-scheme: dark)')

    prefersQuery.addEventListener('change', handler)
    return () => prefersQuery.removeEventListener('change', handler)
  }, [theme, applyTheme])

  return { theme, setTheme: setThemeState as (t: ThemeOption) => void }
}
