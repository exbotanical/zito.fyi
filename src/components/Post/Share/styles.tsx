import { Link } from '@styled-icons/boxicons-regular'
import { styled } from 'styled-components'

import { BREAKPOINTS, H1 } from '@/styles'

export const Wrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  margin: 1rem auto;
  grid-auto-flow: row;
  stroke: ${({ theme }) =>
    theme.dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'};
`

export const LinkWrapper = styled.div`
  display: grid;
  align-content: center;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 24px;

  & svg,
  h3 {
    color: white;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    justify-content: center;
    grid-auto-flow: row;
    grid-gap: 8px;
    justify-items: center;
  }
`

export const Label = styled(H1)`
  color: ${({ theme }) => theme.colors.base};
  text-transform: uppercase;

  @supports (-webkit-text-stroke: 3px white) {
    -webkit-text-fill-color: ${({ theme }) => (theme.dark ? 'black' : 'white')};
    -webkit-text-stroke: 3px ${({ theme }) => (theme.dark ? 'white' : 'black')};
  }
`

export const LinkGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 12px;

  // Make the icons smaller on small mobile viewports
  @media (max-width: 365px) {
    grid-gap: 0px;

    & svg {
      transform: scale(0.75);
    }
  }

  // Ensure the icons wrap when the viewport is very small
  @media (max-width: 315px) {
    display: block;
  }
`

export const LinkButton = styled(Link)`
  cursor: pointer;
`
