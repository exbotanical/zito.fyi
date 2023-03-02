import { createGlobalStyle, css } from 'styled-components'

export const ScrollbarStyles = createGlobalStyle`${css`
  /* Firefox */
  * {
    scrollbar-color: ${({ theme }) => theme.colors.font.primary};
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scroll.bg};
  }

  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scroll.fg};
    border-radius: 1.5px;
  }
`}
`
