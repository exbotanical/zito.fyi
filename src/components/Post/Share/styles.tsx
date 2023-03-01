import { Link } from '@styled-icons/boxicons-regular'
import styled from 'styled-components'

import { H1 } from '@/styles'

export const Wrapper = styled.section`
  display: flex;
  grid-auto-flow: row;
  margin: 1rem auto;
  justify-content: flex-start;
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

  @media (max-width: 404px) {
    justify-content: center;
    grid-auto-flow: row;
    grid-gap: 8px;
    justify-items: center;
  }
`

export const Label = styled(H1)`
  color: ${({ theme }) => theme.colors.base};
  text-transform: uppercase;
`

export const LinkGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 12px;
`

export const LinkButton = styled(Link)`
  cursor: pointer;
`
