import { styled } from 'styled-components'

export const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
`
