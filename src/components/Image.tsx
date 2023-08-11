import styled, { css } from 'styled-components'

export const ImageShadow = css`
  box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.1);
`

export const BaseImage = styled.img`
  object-fit: cover;
  height: 100%;
  ${ImageShadow};
`
