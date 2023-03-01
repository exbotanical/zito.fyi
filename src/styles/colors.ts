import type { Theme } from './Theme'

export const invertTheme: Record<'lightTheme' | 'darkTheme', Theme> = {
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
        primary: 'rgb(206, 166, 186)',
        secondary: 'rgb(206, 166, 186)',
        hover: 'rgb(47, 43, 69)',
      },
      bg: {
        primary: 'rgb(17, 16, 21)',
        secondary: 'rgb(37, 35, 47)',
        tertiary: 'rgb(214, 102, 149)',
        quaternary: 'rgb(47, 43, 69)',
      },

      border: {
        primary: 'rgb(100, 102, 140)',
      },

      link: 'rgb(249, 255, 250)',
      scroll: {
        fg: 'rgb(211, 103, 135)',
        bg: 'rgb(99, 105, 109)',
      },
      base: 'rgb(255, 255, 255)',
    },
  },
}

export const nordTheme = {
  ...invertTheme,

  darkTheme: {
    dark: true,
    colors: {
      font: {
        heading: 'inherit',
        primary: 'rgb(216, 222, 233)',
        secondary: 'rgb(129, 161, 193)',
        hover: 'rgb(163, 190, 140)',
      },
      bg: {
        primary: 'rgb(35, 39, 49)',
        secondary: 'rgb(41, 45, 56)',
        tertiary: 'rgb(163, 190, 140)',
        quaternary: 'rgb(59, 66, 82)',
      },

      border: {
        primary: 'rgb(136, 192, 208)',
      },

      link: 'rgb(136, 192, 208)',
      scroll: {
        fg: 'rgb(180, 142, 173)',
        bg: 'rgb(67, 76, 94)',
      },
      base: 'rgb(229, 233, 240)',
    },
  },
}
