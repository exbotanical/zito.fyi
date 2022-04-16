import React, { createContext, useCallback, useMemo } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useLocalStorage } from '@/hooks'
import { isBrowserRuntime } from '@/utils'

import { KEYS } from './constants'
import { Reset } from './Reset'
import { Typography } from './Typography'

type Themes = 'dark' | 'light'
interface ThemeContext {
  theme: Themes
  toggleTheme: () => void
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof lightTheme.colors
  }
}

interface ThemeProps {
  children: React.ReactNode
}

export const lightTheme = {
  colors: {
    font: {
      primary: 'rgb(0, 0, 0)',
      secondary: 'rgb(251, 248, 228)',
      hover: 'rgb(250, 239, 204)'
    },
    bg: {
      primary: 'rgb(251, 248, 228)',
      secondary: 'rgb(10, 49, 68)',
      tertiary: 'rgb(191, 85, 105)'
    },
    border: {
      primary: 'rgb(102, 95, 101)'
    },
    link: 'rgb(224, 102, 125)',
    scroll: {
      fg: 'rgb(224, 102, 125)',
      bg: 'rgb(255, 181, 120)'
    }
  }
}

export const darkTheme = {
  colors: {
    font: {
      primary: 'rgb(206, 166, 186)',
      secondary: 'rgb(206, 166, 186)',
      hover: 'rgb(47, 43, 69)'
    },
    bg: {
      primary: 'rgb(25, 23, 37)',
      secondary: 'rgb(47, 43, 69)',
      tertiary: 'rgb(214, 102, 149)'
    },

    border: {
      primary: 'rgb(100, 102, 140)'
    },

    link: 'rgb(75, 187, 172)',
    scroll: {
      fg: 'rgb(214, 102, 149)',
      bg: 'rgb(100, 102, 140)'
    }
  }
}
// rgb(104, 157, 225)

export const ThemeToggleContext = createContext({} as ThemeContext)

export function ThemeProvider({ children }: ThemeProps): JSX.Element {
  const prefersDark =
    isBrowserRuntime &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage<Themes>(
    KEYS.THEME_STORAGE_KEY,

    prefersDark ? 'dark' : 'light'
  )

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [theme, setTheme])

  const ctx = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeToggleContext.Provider value={ctx}>
      <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Reset />
        <Typography />
        {children}
      </StyledThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
