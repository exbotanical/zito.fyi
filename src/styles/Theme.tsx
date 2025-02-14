import React, { createContext, useCallback, useMemo } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useLocalStorage } from '@/hooks'
import { isBrowserRuntime } from '@/utils'

import * as themes from './colors'
import { KEYS } from './constants'
import { Reset } from './Reset'
import { ScrollbarStyles } from './Scrollbar'
import { Typography } from './Typography'

type Themes = 'dark' | 'light'

// Use typeof to ensure parity between the themes
export interface Theme {
  dark: boolean
  colors: {
    font: {
      primary: string
      secondary: string
      hover: string
      heading: string
    }
    bg: {
      primary: string
      secondary: string
      tertiary: string
      quaternary: string
    }
    border: {
      primary: string
    }
    link: string
    scroll: {
      fg: string
      bg: string
    }
    base: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

interface ThemeContext {
  theme: Themes
  toggleTheme: () => void
}

interface ThemeProps {
  readonly children: React.ReactNode
}

const { darkTheme, lightTheme } = themes.nordTheme
export { darkTheme, lightTheme }

export const ThemeToggleContext = createContext({} as ThemeContext)

export function ThemeProvider({ children }: ThemeProps): JSX.Element {
  const prefersDark =
    isBrowserRuntime &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage<Themes>(
    KEYS.THEME_STORAGE_KEY,

    prefersDark ? 'dark' : 'light',
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
        <ScrollbarStyles />
        {children}
      </StyledThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
