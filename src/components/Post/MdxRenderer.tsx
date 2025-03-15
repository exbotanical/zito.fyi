import React from 'react'
import { styled } from 'styled-components'

import type { Post } from '@/types'

import { MDXTheme } from './MdxTheme'
import { WrapperCss } from './PostSpacing'

interface RenderProps {
  readonly post: Post
  readonly children: React.ReactNode
}

const Wrapper = styled.article`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;

  /* center and space child els */
  & > *,
  & > span > * {
    margin-right: auto;
    margin-bottom: 24px;
    margin-left: auto;
  }

  /* apply generic width rules to everything save for images, separators, containers */
  & > *:not(figure, div, hr) {
    ${WrapperCss}
  }

  /* apply margins for headings */
  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 36px;
    margin-bottom: 16px;
  }

  /* remove bottom margin from the last child */
  & > *:last-child {
    margin-bottom: 0;
  }

  a figure {
    min-width: 100%;
  }
`

export function MdxRenderer({
  post,
  children,
}: RenderProps): React.JSX.Element {
  if (!post.body) {
    throw Error(
      `[MdxRenderer] post data does not contain MDX body for rendering. Slug: ${post.slug}`,
    )
  }

  return (
    <Wrapper>
      <MDXTheme post={post}>{children}</MDXTheme>
    </Wrapper>
  )
}
