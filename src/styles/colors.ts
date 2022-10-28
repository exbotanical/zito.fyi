export const invertTheme = {
  lightTheme: {
    dark: false,
    colors: {
      font: {
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
        primary: '#d8dee9',
        secondary: '#81A1C1',
        hover: '#A3BE8C',
      },
      bg: {
        primary: '#232731',
        secondary: '#292D38',
        tertiary: '#A3BE8C',
        quaternary: '#3B4252',
      },

      border: {
        primary: '#88c0d0',
      },

      link: '#88c0d0',
      scroll: {
        fg: '#434c5eaa',
        bg: '#434c5e99',
      },
      base: '#E5E9F0',
    },
  },
}
