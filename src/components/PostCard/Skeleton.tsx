import React from 'react';
import styled, { keyframes } from 'styled-components';

import { BREAKPOINTS } from '@/theme/constants';

const SkeletonAnimation = keyframes`
	from {
		background-position: var(--loading-position);
	}

	to {
		background-position: var(--loading-position-end);
	}
`;

const SkeletonBlock = styled.div`
	animation: ${SkeletonAnimation} 7s linear infinite;
	background-blend-mode: lighten;
	background-color: var(--color-grey-300, rgb(12, 105, 121));
	background-image: var(--loading-gradient);
	background-position: var(--loading-position);
	background-repeat: no-repeat;
	background-size: var(--loading-size);
	border-radius: 4px;

	/* Loading animation gradient settings */
	--loading-gradient:
		linear-gradient(
			90deg,
			var(--color-grey-300, rgb(12, 105, 121)) 0,
			rgba(254, 254, 254, 0.3) 45%,
			rgba(254, 254, 254, 0.3) 55%,
			var(--color-grey-300, rgb(12, 105, 121)) 100%
		);
	--loading-size: 200px 100%;
	--loading-position: -67% 0;
	--loading-position-end: 200% 0;

	/* Disable the animation on slow devices or when the user requests reduced animation. */
	@media screen and (prefers-reduced-motion: reduce), (update: slow) {
		animation: unset;
	}
`;

const Wrapper = styled.div`
	display: grid;
	grid-gap: 40px;
`;

const Cover = styled(SkeletonBlock)`
	width: 100%;
	height: 344px;
	border-radius: 10px;

	@media (max-width: 500px) {
		height: 296px;
	}

	@media (max-width: 440px) {
		height: 246px;
	}
`;

const Details = styled.div`
	display: grid;
	grid-gap: 24px;
`;

const TitleSkeleton = styled(SkeletonBlock)`
	width: 70%;

	/* Tune loading gradient settings to match animation stages */
	--loading-position: -121% 0;
	--loading-position-end: 364% 0;

	height: 33px;

	@media (max-width: ${BREAKPOINTS.sm}) {
		height: 29px;
	}
`;

const ExcerptSkeleton = styled(SkeletonBlock)`
	width: 90%;

	/* Tune loading gradient settings to match animation stages */
	--loading-position: -75% 0;
	--loading-position-end: 223% 0;

	height: 18px;

	@media (max-width: ${BREAKPOINTS.sm}) {
		height: 16px;
	}
`;

export function PostCardSkeleton(): JSX.Element {
  return <Wrapper>
		<Cover />
		<Details>
			<TitleSkeleton /> <ExcerptSkeleton />
		</Details>
	</Wrapper>
}
