import { GatsbyImage } from 'gatsby-plugin-image'
import styled, { css } from 'styled-components'

import { ImageShadow } from '@/components/Image'
import { Body, BREAKPOINTS } from '@/styles'

interface CardStyleProps {
  hero?: boolean
}

export const Cover = styled(GatsbyImage)`
  width: 100%;
  height: 368px;

  /* Tune the height on smaller screen resolutions */
  @media (max-width: 500px) {
    height: 320px;
  }

  @media (max-width: 440px) {
    height: 270px;
  }

  & img {
    ${ImageShadow}

    border-radius: 10px;
  }
`

export const Wrapper = styled.div<CardStyleProps>`
  display: grid;
  grid-gap: 8px;

  ${({ hero }) =>
    hero &&
    css`
      @media (min-width: ${BREAKPOINTS.lg}) {
        grid-column: span 2;
        grid-gap: 32px;
        grid-template-columns: 6fr 4fr;
      }
    `}
`

export const Header = styled.div`
  display: grid;
  align-content: start;
  align-items: flex-start;
  grid-gap: 12px;
`

export const DescriptionText = styled(Body)<CardStyleProps>`
  display: box;
  overflow: hidden;
  box-orient: vertical;
  -webkit-line-clamp: ${({ hero }) => (hero ? 5 : 2)};
`

export const Meta = styled.div`
  display: grid;
  align-content: start;
  align-items: flex-start;
  grid-gap: 12px;
`

export const Details = styled.div<CardStyleProps>`
  display: grid;

  ${({ hero }) =>
    hero &&
    css`
      @media (min-width: var(--breakpoint-lg)) {
        align-content: space-between;
      }
    `}
`
