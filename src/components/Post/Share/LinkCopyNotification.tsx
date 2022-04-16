import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Caption } from '@/styles/Primitives'

const popUpStartState = css`
  bottom: 0;
  opacity: 0;
`

const popUpEndState = css`
  bottom: 32px;
  opacity: 1;
`

const popUpAnimation = keyframes`
	from {
		${popUpStartState}
	}

	10% {
		${popUpEndState}
	}

	to {
		${popUpEndState}
	}
`

const reducedPopUpAnimation = keyframes`
	from {
		${popUpEndState}
	}

	to {
		${popUpEndState}
	}
`

const PopUp = styled.div`
  position: fixed;
  z-index: 9999;
  left: 50%;
  max-width: 90%;
  padding: 8px 16px;
  animation: ${popUpAnimation} ease-out 1.5s;
  animation-direction: alternate;
  animation-fill-mode: both;
  animation-iteration-count: 2;
  background-color: ${({ theme }) => theme.colors.bg.tertiary};
  border-radius: 6px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12),
    0 3px 5px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.bg.primary};
  transform: translateX(-50%);

  @media screen and (prefers-reduced-motion: reduce), (update: slow) {
    animation: ${reducedPopUpAnimation} step-end 3s;
  }
`

interface SnackbarProps {
  onAnimationEnd?: () => void
}

export function LinkCopyNotification({
  onAnimationEnd
}: SnackbarProps): JSX.Element {
  return (
    <PopUp onAnimationEnd={onAnimationEnd}>
      <Caption>Link copied to clipboard</Caption>
    </PopUp>
  )
}
