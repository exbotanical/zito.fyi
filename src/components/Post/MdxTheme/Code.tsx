import React from 'react'
import { styled, createGlobalStyle, css } from 'styled-components'

import { SIDE_PADDING } from '@/components/Post/PostSpacing'
import { typographyStyles } from '@/styles'

const CODE_CONTENT_WIDTH = '736px'
const CODE_BLOCK_SIZE = `calc(${CODE_CONTENT_WIDTH} + 2 * ${SIDE_PADDING})`

interface CodeProps {
  readonly className?: string
  readonly children?: React.ReactNode
}

export const InlineCode = undefined

export const GlobalCodeStyle = createGlobalStyle`${css`
  .gatsby-highlight {
    width: 100%;
    padding: 0;

    @media (min-width: ${CODE_BLOCK_SIZE}) {
      max-width: ${CODE_BLOCK_SIZE};
      padding: 0 16px;
    }
  }
`}
`

export const Pre = styled.pre`
  ${typographyStyles.Code}

  width: 100%;
  max-width: 100%;
  margin: 0 !important;

  /* Set border radius depending on element state */
  border-radius: 0 !important;

  @media (min-width: ${CODE_BLOCK_SIZE}) {
    max-width: ${CODE_BLOCK_SIZE};
    border-radius: 6px !important;
  }
`

export const StyledCode = styled.code`
  ${typographyStyles.Code}

  width: 100%;
  max-width: 100%;
`

export function Code({ className, children }: CodeProps): React.JSX.Element {
  return (
    <StyledCode className={className} tabIndex={0}>
      {children}
    </StyledCode>
  )
}
