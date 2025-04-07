import type { Theme } from './Theme'

export const invertTheme: Record<'darkTheme' | 'lightTheme', Theme> = {
  lightTheme: {
    dark: false,
    colors: {
      font: {
        heading: '#81A1C1',
        primary: 'rgb(0, 0, 0)',
        secondary: 'rgb(251, 248, 228)',
        hover: 'rgb(250, 239, 204)',
      },
      bg: {
        primary: 'rgb(251, 248, 228)',
        secondary: 'rgb(10, 49, 68)',
        tertiary: 'rgb(191, 85, 105)',
        quaternary: 'rgb(10, 49, 68)',
      },
      border: {
        primary: 'rgb(102, 95, 101)',
      },
      link: 'rgb(224, 102, 125)',
      scroll: {
        fg: 'rgb(224, 102, 125)',
        bg: 'rgb(255, 181, 120)',
      },
      base: 'rgb(0, 0, 0)',
    },
  },

  darkTheme: {
    dark: true,
    colors: {
      font: {
        heading: 'inherit',
        primary: 'rgb(216, 222, 233)',
        secondary: 'rgb(216, 222, 233)',
        hover: 'rgb(47, 43, 69)',
      },
      bg: {
        primary: '#282A36',
        secondary: 'rgb(37, 35, 47)',
        tertiary: 'rgb(206, 166, 186)',
        quaternary: 'rgb(68, 71, 90)',
      },

      border: {
        primary: 'rgb(100, 102, 140)',
      },
      link: 'rgb(163, 249, 184)',
      scroll: {
        fg: 'rgb(206, 166, 186)',
        bg: 'rgb(99, 105, 109)',
      },
      base: 'rgb(255, 255, 255)',
    },
  },
}
