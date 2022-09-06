import React from 'react'
import styled from 'styled-components'

interface PromptIconProps {
  direction: 'left' | 'right'
}

const StyledContainer = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

export function PromptIcon({ direction }: PromptIconProps) {
  const promptChar = direction === 'left' ? '‹' : '›'

  return (
    <StyledContainer>
      <span style={{ color: 'rgb(255, 255, 128)' }}>{promptChar}</span>
      <span style={{ color: 'rgb(254, 86, 86)' }}>{promptChar}</span>
      <span style={{ color: 'rgb(173, 216, 230)' }}>{promptChar}</span>
    </StyledContainer>
  )
}
