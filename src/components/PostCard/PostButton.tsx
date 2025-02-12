import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { typographyStyles } from '@/styles'
import { BREAKPOINTS } from '@/styles/constants'

import { PromptIcon } from '../Icons/Composed/Prompt'

interface PostButtonProps {
  readonly to: string
}

export const ReadButton = styled(GatsbyLink)`
  display: grid;
  align-items: center;
  align-self: flex-end;
  justify-content: end;
  color: ${({ theme }) => theme.colors.link};
  grid-auto-flow: column;
  grid-gap: 12px;
  text-decoration: none;
  ${typographyStyles.ButtonLabel}
  @media (max-width: ${BREAKPOINTS.lg}) {
    display: none;
  }
`

export function PostButton({ to }: PostButtonProps): JSX.Element {
  return (
    <ReadButton to={to}>
      <PromptIcon direction="left" />
      Read the post
      <PromptIcon direction="right" />
    </ReadButton>
  )
}
