import React from 'react'
import { styled } from 'styled-components'

import { SIDE_PADDING } from '@/components/Post/PostSpacing'

const FOOTNOTE_CONTENT_WIDTH = '920px'
const FOOTNOTE_SIZE = `calc(${FOOTNOTE_CONTENT_WIDTH} + 2 * ${SIDE_PADDING})`

interface FootnoteProps {
  readonly className?: string
  readonly children?: React.ReactNode
}

export const Wrapper = styled.div`
  /* Ensure li is centered with article content */
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${FOOTNOTE_SIZE}) {
    max-width: ${FOOTNOTE_SIZE};
    padding: 0 16px;
    border-radius: 6px !important;
  }
`

export function Footnote({
  className,
  children,
}: FootnoteProps): React.JSX.Element {
  return (
    <Wrapper className={className} tabIndex={0}>
      {children}
    </Wrapper>
  )
}
