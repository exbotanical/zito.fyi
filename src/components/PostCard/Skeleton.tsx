import React from 'react'
import { styled, keyframes } from 'styled-components'

import { BREAKPOINTS } from '@/styles/constants'

const SkeletonAnimation = keyframes`
	from {
		background-position: var(--loading-position);
	}

	to {
		background-position: var(--loading-position-end);
	}
`

const SkeletonBlock = styled.div`
  animation: ${SkeletonAnimation} 7s linear infinite;
  background-blend-mode: lighten;
  background-color: ${({ theme }) => theme.colors.border.primary};
  background-image: var(--loading-gradient);
  background-position: var(--loading-position);
  background-repeat: no-repeat;
  background-size: var(--loading-size);
  border-radius: 4px;

  /* loading animation gradient configurations */
  --loading-gradient: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border.primary}; 0,
    rgba(254, 254, 254, 0.3) 45%,
    rgba(254, 254, 254, 0.3) 55%,
    ${({ theme }) => theme.colors.border.primary}; 100%
  );
  --loading-size: 200px 100%;
  --loading-position: -67% 0;
  --loading-position-end: 200% 0;

  /* disable the animation on slow devices or when the user prefers reduced animation */
  @media screen and (prefers-reduced-motion: reduce), (update: slow) {
    animation: unset;
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-gap: 40px;
`

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
`

const Details = styled.div`
  display: grid;
  grid-gap: 24px;
`

const TitleSkeleton = styled(SkeletonBlock)`
  width: 70%;

  /* tune loading gradient configurations to match animation stage */
  --loading-position: -121% 0;
  --loading-position-end: 364% 0;

  height: 33px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 29px;
  }
`

const DescriptionSkeleton = styled(SkeletonBlock)`
  width: 90%;

  /* tune loading gradient configurations to match animation stage */
  --loading-position: -75% 0;
  --loading-position-end: 223% 0;

  height: 18px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 16px;
  }
`

export function PostCardSkeleton(): React.JSX.Element {
  return (
    <Wrapper>
      <Cover />
      <Details>
        <TitleSkeleton />
        <DescriptionSkeleton />
      </Details>
    </Wrapper>
  )
}
