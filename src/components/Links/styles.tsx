import styled, { css } from 'styled-components'

import { BaseLink } from '@/components/Links/BaseLink'

interface LinkStyleProps {
  activeClassName?: string
}

const TransparentCSS = css`
  width: 100%;
  color: inherit;
  text-decoration: none;
`

export const IconCSS = css`
  color: ${({ theme }) => theme.colors.font.secondary};

  /* &:hover {
		color: ${({ theme }) => theme.colors.font.secondary};
	} */
`

const PrimaryCSS = css`
  display: inline-block;
  color: ${({ theme }) => theme.colors.font.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }
`

const AnimatedCSS = css<LinkStyleProps>`
  display: inline-block;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;

  &::after {
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.link};
    content: '';
    transform: scaleX(0);
    transition: transform 300ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.${props => props.activeClassName} {
    &::after {
      transform: scaleX(1);
    }
  }
`

const HeadingCss = css`
  color: inherit;
  text-decoration: none;

  &:hover::before {
    position: absolute;
    display: block;
    padding-right: 8px;
    color: ${({ theme }) => theme.colors.link};
    content: '#';
    transform: translateX(-100%);
  }
`

export const AnimatedLink = styled(BaseLink).attrs(
  ({ activeClassName }: LinkStyleProps) => ({
    activeClassName: activeClassName || 'gatsby-active-link'
  })
)`
  ${AnimatedCSS}
`

export const TransparentLink = styled(BaseLink)`
  ${TransparentCSS}
`

export const PrimaryLink = styled(BaseLink)`
  ${PrimaryCSS}
`

export const IconLink = styled(BaseLink)`
  ${IconCSS}

  border-radius: 9999px;
  transition-duration: 300ms;
  transition-property: color, background-color, opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.25);
  }
`

export const HeadingLink = styled(BaseLink)`
  ${HeadingCss}
`
