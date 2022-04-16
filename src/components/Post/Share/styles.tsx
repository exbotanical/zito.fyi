import { Link } from '@styled-icons/boxicons-regular'
import styled from 'styled-components'

import { H3 } from '@/styles'

export const Wrapper = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 8px;
  margin: auto 0;
`

export const LinkWrapper = styled.div`
  display: grid;
  align-content: center;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 24px;
  margin-top: 6rem;

  & svg,
  h3 {
    color: ${({ theme }) => theme.colors.link} !important;
  }

  @media (max-width: 404px) {
    justify-content: center;
    grid-auto-flow: row;
    grid-gap: 8px;
    justify-items: center;
  }
`

export const Label = styled(H3)`
  color: ${({ theme }) => theme.colors.font.primary};
  text-transform: uppercase;
`

export const LinkGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 12px;

  & svg {
    color: ${({ theme }) => theme.colors.font.primary};
  }
`

export const LinkButton = styled(Link)`
  cursor: pointer;
`
