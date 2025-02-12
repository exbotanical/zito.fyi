import React from 'react'
import { css, createGlobalStyle } from 'styled-components'

import { BaseImage } from '@/components/Image'
import { AnimatedLink } from '@/components/Links'
import {
  PostImage,
  PostImageSpacing,
  FigCaptionCss,
} from '@/components/Post/PostImage'
import { ExtensionWrapper } from '@/components/Post/PostSpacing'
import { Separator } from '@/components/Separator'

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  readonly activeClassName?: string
  readonly to: string
}

export function Break(): JSX.Element {
  return (
    <ExtensionWrapper>
      <Separator />
    </ExtensionWrapper>
  )
}

export function Link({
  children,
  className,
  activeClassName,
  to,
  href,
  target,
  rel,
  style,
}: LinkProps): JSX.Element {
  // allow `gatsby-remark-images` to handle its own links
  if (className === 'gatsby-resp-image-link') {
    return (
      <a
        className={className}
        href={href}
        rel={rel}
        style={style}
        target={target}
      >
        {children}
      </a>
    )
  }

  return (
    <AnimatedLink
      activeClassName={activeClassName}
      className={className}
      href={href}
      to={to}
    >
      {children}
    </AnimatedLink>
  )
}

export const GlobalGatsbyImageStyle = createGlobalStyle`${css`
  .gatsby-resp-image-figure {
    width: 100%;

    ${PostImageSpacing}
  }

  .gatsby-resp-image-figcaption {
    margin-top: 8px;
    text-align: center;

    ${FigCaptionCss}
  }
`}
`

export function MdxImage({
  src,
  alt,
  className,
  title,
  srcSet,
  sizes,
  loading,
  style,
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  if (className === 'gatsby-resp-image-image') {
    return (
      <BaseImage
        alt={alt}
        className={className}
        loading={loading}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        style={style}
        title={title}
      />
    )
  }

  if (!alt) {
    throw Error(
      `MDX image is missing an alt tag. Image source: ${src || ''}, title: ${
        title || ''
      }.`,
    )
  }

  return <PostImage alt={alt} src={src} title={title} />
}
