import { Link } from '@styled-icons/boxicons-regular'
import styled from 'styled-components'
import { H1 } from '@/styles'

const makeBox = (color: string) =>
  `data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 625 320.03" stroke="${color}" preserveAspectRatio="none"><path fill="none" stroke="${color}" stroke-miterlimit="10" stroke-width="5px" d="M611,3H15A12,12,0,0,0,3,15V253a12,12,0,0,0,12,12H381.49l65.64,50.45V265H611a12,12,0,0,0,12-12V15A12,12,0,0,0,611,3Z"/></svg>`

export const Wrapper = styled.section`
  display: flex;
  grid-auto-flow: row;
  margin: auto 0;
  justify-content: flex-start;
  stroke: ${({ theme }) => (theme.dark ? '' : 'rgb(0, 0, 0)')};
  padding: 2rem 6.25rem 12.5rem 2rem;
  margin: 1rem;

  background: url('${({ theme }) => makeBox(theme.colors.base)}') no-repeat top
    center;
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
