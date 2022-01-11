import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { Caption } from '@/theme/Primitives';

const popUpStartState = css`
	bottom: 0;
	opacity: 0;
`;

const popUpEndState = css`
	bottom: 32px;
	opacity: 1;
`;

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
`;

const reducedPopUpAnimation = keyframes`
	from {
		${popUpEndState}
	}

	to {
		${popUpEndState}
	}
`;

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
	background-color: var(--color-primary-100, rgb(0, 0, 0));
	border-radius: 6px;
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12),
		0 3px 5px rgba(0, 0, 0, 0.2);
	color: var(--color-primary-900, rgb(251, 248, 228));
	transform: translateX(-50%);

	@media screen and (prefers-reduced-motion: reduce), (update: slow) {
		animation: ${reducedPopUpAnimation} step-end 3s;
	}
`;

interface SnackbarProps {
	onAnimationEnd?: () => void;
}

export function LinkCopyNotification({
	onAnimationEnd
}: SnackbarProps): JSX.Element {
	return (
		<PopUp onAnimationEnd={onAnimationEnd}>
			<Caption>Link copied to clipboard</Caption>
		</PopUp>
	);
}
