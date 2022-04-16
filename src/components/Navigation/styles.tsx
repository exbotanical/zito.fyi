import styled from 'styled-components'

import { PrimaryLink, AnimatedLink } from '@/components/Links'
import { typographyStyles } from '@/styles'

export const HomeButton = styled(PrimaryLink)`
  display: grid;
  align-items: center;
  color: ${({ theme }) => theme.colors.font.primary};
  grid-auto-flow: column;
  grid-gap: 16px;
  text-decoration: nonwse;
`

export const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const NavGrid = styled.nav`
  display: grid;
  align-items: flex-start;
  grid-auto-flow: column;
  grid-gap: 24px;
`

export const SiteTitle = styled.p`
  ${typographyStyles.ButtonLabel}
  @media (max-width: 500px) {
    display: none;
  }
`

export const NavButton = styled(AnimatedLink)`
  ${typographyStyles.ButtonLabel}

  color: ${({ theme }) => theme.colors.font.primary};

  &::after {
    margin: 8px 0 0 0;
  }
`

export const ThemeButton = styled.div`
  cursor: pointer;
`
